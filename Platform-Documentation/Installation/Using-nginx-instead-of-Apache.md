Your DSP can be configured to use any web server you want. The core package ships with configuration examples for [Apache][_ap2] as well as [nginx][_ng]. This guide will show you how to transform your ordinary, default Apache/pre-fork DSP into a shiny new nginx/FPM DSP! Sound cool? It is!

# Prerequisites and Assumptions
This guide assumes you're running the latest DreamFactory Services Platform&trade; and on a major linux distribution (Ubuntu, CentOS, Red Hat, Debian), or a derivative of one. The DSP can be a virtual machine on your dev box, a [vagrant](http://vagrantup.com/) box, or even a real live server. Other distributions may need tweaking to locations. But the configuration options should the same. It is also assumed (and required) that you have *sudo* access to your DSP's server.

Please note that this guide will not work with [free-hosted][_df-www] or [Bitnami][_bn] stack installations. Only self-installed versions are supported.

# Install Packages
If you've already installed the necessary part, you can skip ahead to the next part, otherwise you'll start here.

We need to install two main packages to get this going. The first is the nginx server package. The second is [PHP FPM](http://php-fpm.org/), or FastCGI Process Manager, package. Check out the link if you're not familiar with it.

## nginx
We are going to install the `nginx-extras` package for this guide. It has the core server and a few extras we need:

```shell
$ sudo apt-get install nginx-extras
```

When that's done you'll have a nice new `/etc/nginx` directory to play with.

## PHP FPM
The second package we need is the PHP FPM package. Install it like this:

```shell
$ sudo apt-get install php5-fpm
```

After it's installed, we need to copy a file from the DSP to the PHP FPM directory. It's detailed below in [Configuration].

# Configuration
The **VERY** first thing you *should* do is make a copy of the **nginx** installation. You can do this easily:

```shell
$ mkdir ~/nginx && sudo cp -r /etc/nginx/* ~/nginx
```

That will come in handy someday when you break your server. Trust me. ;)

Now we can start fiddling in the configs. We need to copy a few files from your DSP installation directory.

>For the purpose of this guide, we will assume you are in your DSP's root directory. All paths shown will be relative from there.

First the PHP FPM file:

```shell
$ sudo cp config/external/php/etc/php5/mods-available/dreamfactory.ini /etc/php5/mods-available/
$ sudo php5enmod dreamfactory
$ sudo service php5-fpm restart
php5-fpm stop/waiting
php5-fpm start/running, process 15113
```

Cool beans. Now we copy the nginx files:

```
$ sudo cp config/external/nginx/etc/nginx/dsp-locations.conf /etc/nginx/
$ sudo cp config/external/nginx/etc/nginx/sites-available/* /etc/nginx/sites-available/
$ sudo cp -r config/external/nginx/etc/nginx/conf.d/* /etc/nginx/conf.d/
```

## What Have I Done!?
The files copied above are building blocks and do not overwrite anything that is owned by nginx. Here's a quick rundown of what they are:

`dsp-locations.conf` is included by the files in `/etc/nginx/sites-available` to configure the web server's routes.

`/etc/nginx/sites-available` now has two new files: `dsp.single.local` and `dsp.multi.local`. These both do the same thing in different ways.

>These files configure nginx to listen for web connections and send it to PHP. If you're going to use SSL on your site we recommend you use the `dsp.single.local` file as your configuration. The **single** file runs the DSP in a single **server** section of the nginx configuration. If you're not running SSL, or not yet at least, the **multi** file has a **server** configuration for HTTP and HTTPS separated. You can comment out the HTTPS section if you do not want to use SSL.

In `/etc/nginx/conf.d` there are few new files: `dreamfactory.http.conf` and `dreamfactory.php-fpm.conf`. These configure nginx for PHP FPM and set a few defaults. Please read through them if you've not already. They're commented and you can change to your liking. That goes pretty much for all these config files.

In addition, there a new directory called `ssl` in which there is a file called `dreamfactory.ssl.conf`. If you're going to run SSL you just need to put the location of your keys into that file. If you're not running SSL it is ignored. This is placed in a separate place so it can be made as secure as you require.

>You can adjust the source of the include from `conf.d/ssl/` to anything you want. We'll cover that in a bit.

### nginx.conf
The last file we need to copy is the `nginx.conf` file. This step is optional. You might not want to copy this file over the default configuration without giving a good perusal.

We have found these settings to be generally good and many thanks to the gentleman referenced in that configuration file for those settings. There aren't any settings in our version of `nginx.conf` that are required to run the DSP properly. It is just tuned for speed. (thanks to that dude...).

So copy it if you want:

```shell
$ sudo cp config/external/nginx/etc/nginx/nginx.conf /etc/nginx/
```

## Choose Your Destructor
If you haven't decided by now if you're going to use the single or multi configuration files outlined above, go with the multi. Either way, you need to create a new configuration for your DSP using one of the two samples. We're going to use the single version and call it `dsp.local`:

```shell
$ cd /etc/nginx/sites-available
$ sudo cp dsp.single.local dsp.local
```

Go on in that new file (`dsp.local`) with your favorite editor and change anything that calls out to you. Your DSP root directory perhaps, or the server name, port, etc. Make sure you test your changes before restarting nginx by using the following command:

```shell
$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If you messed up, you'll get this fail:

```shell
$ sudo nginx -t
nginx: [emerg] unknown directive "included" in /etc/nginx/nginx.conf:140
nginx: configuration file /etc/nginx/nginx.conf test failed
```

#### Ninja Tip!
When you're in *DGM* (deep geek mode), having to type `sudo service nginx restart` two or three times a minute gets old. So create an alias to do the typing for you!

I run Ubuntu and **bash** is the shell that I use. When you log in, or open a terminal window, **bash** sources your `~/.bash_aliases` file. If you don't have one, you can create one and it will automatically be sourced upon next and future logins.

Here are a few of the things in my `~/.bash_aliases` file for these types of situations. Feel free to add them to your arsenal.

```bash
alias a2off='sudo service apache2 graceful-stop'
alias a2on='sudo service apache2 start'
alias a2rl='sudo service apache2 reload'
alias a2rs='sudo service apache2 restart'

alias ngtrs='sudo nginx -t && sudo service nginx restart'
alias ngtrl='sudo nginx -t && sudo service nginx reload'
alias ngtoff='sudo nginx -t && sudo service nginx stop'
alias ngton='sudo nginx -t && sudo service nginx start'
```

## Disable `default` Site
The nginx server ships with a default server configuration (in `/etc/nginx/sites-available/default`), which is enabled.

If you're not using (going to use) it, you should disable it:

```bash
$ sudo unlink /etc/nginx/sites-enabled/default
$ sudo nginx -t
$ sudo service nginx restart
```

Now we need to **enable** the DSP:

```bash
$ sudo ln -s /etc/nginx/sites-available/dsp.local /etc/nginx/sites-enabled/dsp.local
```

What we're doing is symlinking the available configuration into the enabled directory. Then test the configuration before restarting the service.

To disable this site from *nginx* just unlink the symlink:

```bash
$ sudo unlink /etc/nginx/sites-enabled/dsp.local
```

### Restart everything...
Restart both nginx and Apache now:

```bash
$ sudo service apache2 restart
$ sudo service nginx restart
```

[_df-www]: https://www.dreamfactory.com/ "DreamFactory Corporate Site"
[_df-io]: https://dreamfactorysoftware.github.io/ "DreamFactory Software"
[_df-gh]: https://github.com/dreamfactorysoftware/ "Our GitHub repositories"
[_bn]: https://bitnami.com/stack/dreamfactory/ "DreamFactory on Bitnami"

[_ng]: http://nginx.org "nginx"
[_ap2]: http://apache.org "Apache"
[_google]: http://www.google.com/
