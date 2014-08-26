Your DSP can alternatively be configured to use [nginx](http://nginx.org) as your front end instead of the default Apache setup. It's not difficult but requires administrative privileges to your box and some additional setup. There are a variety of reasons for doing this. One popular reason is so  [varnish cache](https://www.varnish-cache.org/) can be utilized with an SSL Apache setup.

# Prerequisites and Assumptions
This guide assumes you're running the latest DreamFactory Services Platform&trade; and on an Ubuntu installation. Other standard distributions may need tweaking to locations. But the configuration options should the same. It is also assumed (and required) that you have *sudo* access to your DSP's server.

Please note that this guide will not work with free-hosted or Bitnami installations. Only self-installed versions are supported.

# 10,000 Foot View
The goal here is to install *nginx* as a front-end to your currently running Apache instance service your DSP. The default configuration places the DSP on ports 80 and 443. What we are going to do is install *nginx* and it will service ports 80 and 443, relaying these requests to your Apache server. The Apache configuration will be modified to live a different port (8080).

There is no need to configure or run an SSL virtual host in Apache once nginx is configured as it will be handling all the SSL details for you.

# Setup and Configuration
This is by no means an exhaustive or definitive guide to configuring nginx and Apache. It is a minimalistic configuration designed to get it up and running. With that said, let's get cracking.

### CentOS
CentOS requires the EPEL repository. If you do not already have it installed, perform the following:

#### v5.x

```
rpm -Uvh http://dl.fedoraproject.org/pub/epel/5/x86_64/epel-release-5-4.noarch.rpm
```

#### v6.x

```
rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

### Ubuntu/Debian
The *nginx* package is available from the distribution itself. No additional setup is necessary.

## Install nginx
THe first thing we need to do is install and configure *nginx*. Let's go ahead and install it with our package manager:

### Ubuntu/Debian
```
$ sudo apt-get install nginx
```

### CentOS
```
$ sudo yum install nginx
```

## Create nginx Configuration File

Create the following nginx configuration file:

### Ubuntu 
```bash
$ sudo nano /etc/nginx/sites-available/dsp.local
```

The file name is irrelevant. All files in `/etc/nginx/sites-available`, once enabled, are read.

### CentOS 
```bash
$ sudo nano /etc/nginx/conf.d/dsp.local.conf
```

### File Contents

Fill your newly created file with the following:

```nginx
server {
	# nginx listens on port 80
	listen 80;

	# The document root for the server
	root /var/www/launchpad/web;

	# Place web server logs into DSP's log directory
	error_log  /var/www/launchpad/log/nginx.error.log;
	access_log /var/www/launchpad/log/nginx.access.log;

	# Allow for index.php files
	index index.php index.html

	# Change this/these to the name of your server (can be localhost)
	server_name www.example.com example.com localhost 
	
	# This tries to pull the file directly, otherwise, passes to the front controller
	location / {
		try_files $uri $uri/ /index.php?$args;
	}
	
	#  Bypass apache to serve static files, 404-ing non-existent ones
	location ~ \.(js|css|png|jpg|gif|swf|ico|pdf|mov|fla|zip|rar|mustache)$ {
		try_files $uri =404;
	}
	
	#  Proxy PHP requests on to Apache
	location ~* ^.*\.php$ {
		try_files $uri =404;
		
		## Use standard Apache configuration (non-FPM). Uncomment and comment out below block to enable
#		proxy_set_header X-Real-IP $remote_addr;
#		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#		proxy_set_header Host $host;
#		proxy_pass unix:/var/run/php5-fpm.sock
	
		## Apache2/PHP5 FPM configuration. Comment out and uncomment above to disable
		fastcgi_pass unix:/var/run/php5-fpm.sock;
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
	}
	
	#  No dot files (.htaccess, .git, etc.). Don't log either
	location ~ /\. {
		deny all;
		access_log off;
		log_not_found off;
	}
}

server {
	# listen on 443
    listen          443;

	# The document root for the server
	root /var/www/launchpad/web;

	# Place web server logs into DSP's log directory
	error_log  /var/www/launchpad/log/nginx-ssl.error.log;
	access_log /var/www/launchpad/log/nginx-ssl.access.log;

	# Allow for index.php files
	index index.php index.html

	# Change this/these to the name of your server (can be localhost)
	server_name www.example.com example.com localhost 
	                           
    ## SSL Configuration
    ssl on;
    ssl_certificate /path/to/your/certificate/file;
    ssl_certificate_key /path/to/your/certificate/key/file;
    ssl_session_timeout 5m;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

	#  Bypass apache to serve static files, 404-ing non-existent ones
	location ~ \.(js|css|png|jpg|gif|swf|ico|pdf|mov|fla|zip|rar|mustache)$ {
		try_files $uri =404;
	}
	
	#  Proxy PHP requests on to Apache
	location ~* ^.*\.php$ {
		try_files $uri =404;
		
		## Use standard Apache configuration (non-FPM). Uncomment and comment out below block to enable
#		proxy_set_header X-Real-IP $remote_addr;
#		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#		proxy_set_header Host $host;
#		proxy_pass unix:/var/run/php5-fpm.sock
	
		## Apache2/PHP5 FPM configuration. Comment out and uncomment above to disable
		fastcgi_pass unix:/var/run/php5-fpm.sock;
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
	}
	
	#  No dot files (.htaccess, .git, etc.). Don't log either
	location ~ /\. {
		deny all;
		access_log off;
		log_not_found off;
	}
}
```

Change the line *server_name* to match your server's actual name. You can place multiple names on the same line separated by spaces. 

You'll also notice that there is a commented block of configuration code in the *location* section. You may run PHP through Apache in a few different ways. The default configuration of Apache uses the Multi-Process-Module, or MPM, system which, by default, runs in a *pre-fork* mode. Essentially this means that a single instance of Apache runs and creates a thread pool of listeners for inbound requests. Apache then dispatches those requests to PHP for handling. In the above configuration it is commented out in favor of the *FPM* configuration.

Our alternative, and more efficient method, is to use Apache's *FPM* or *fastcgi* processing module. When using this dispatch method, Apache waits for requests via an already-open TCP/IP socket. This can result in a significant boost in performance. We've encountered between 10%-20% increase depending on the hardware. This is mainly because the there is no socket open/close overhead by Apache.

#### Ubuntu
In Ubuntu, once that file is saved, you need to tell *nginx* to use it:

```bash
$ sudo ln -s /etc/nginx/sites-available/dsp.local /etc/nginx/sites-enabled/dsp.local
$ sudo nginx -t
$ sudo service nginx restart
```

What we're doing is symlinking the available configuration into the enabled directory. Then test the configuration before restarting the service. 

To disable this site from *nginx* just unlink the symlink:

```bash
$ sudo unlink /etc/nginx/sites-enabled/dsp.local
```

> In Ubuntu's Apache package, a set of of scripts called `a2ensite` and `a2dissite` are provided to perform the above steps. *nginx* doesn't provide these by default.

#### CentOS
In CentOS, no symlinking is necessary. Files in `/etc/nginx/conf.d` are automatically used if they end it `.conf`. 

To disable your configuration, simply rename add `.off` to the file name like so:

```bash
$ sudo mv /etc/nginx/conf.d/dsp.local /etc/nginx/conf.d/dsp.local.conf.off
```

Now test your setup and restart `nginx`

```bash
$ sudo nginx -t
$ sudo service nginx restart
```

## Apache Configuration
Now, let's set up a configuration for PHP5 FPM that can be turned on or off at will. You can do this system-wide or on a per-server basis.
 
You may need to add some Apache modules, so install them:

```bash
$ sudo apt-get install apache2-mpm-worker libapache2-mod-fastcgi php5-fpm
$ sudo a2enmod actions fastcgi alias
```

> Some of those modules may already be installed and/or enabled.
 
### Per-Server
The default setup for the DSP is to live on ports 80 and 443. For the *nginx* configuration we need to change these ports.

Edit your DSP's Apache configuration file in `/etc/apache2/sites-available/`

The first thing you need to do is change the port upon which Apache listens. You should see at the top of the file something like this:

```apache
<VirtualHost *:80>
```

Change that to read:

```apache
<VirtualHost 127.0.0.1:8080>
```

Now we add the support for the FPM module. Add the following snippet of code right before the end `</VirtualHost>` tag:

```apache
<IfModule mod_fastcgi.c>
   AddHandler php5-fcgi .php
   Action php5-fcgi /php5-fcgi
   Alias /php5-fcgi /usr/lib/cgi-bin/php5-fcgi
   FastCgiExternalServer /usr/lib/cgi-bin/php5-fcgi -socket /var/run/php5-fpm.sock -pass-header Authorization
</IfModule>
```

### System-Wide
Alternatively, you can enable this feature for *all* sites served by your Apache instance. To do this, create a file called `php5-fpm.conf` in your Apache's global configuration directory `/etc/apache2/conf.d`: 
 
```bash
$ sudo nano /etc/apache2/conf.d/php5-fpm.conf
```

And place the following into it and save:

```apache
<IfModule mod_fastcgi.c>
   AddHandler php5-fcgi .php
   Action php5-fcgi /php5-fcgi
   Alias /php5-fcgi /usr/lib/cgi-bin/php5-fcgi
   FastCgiExternalServer /usr/lib/cgi-bin/php5-fcgi -socket /var/run/php5-fpm.sock -pass-header Authorization
</IfModule>
```

> There is no need to add this to your virtual host configuration files as it will now be available for all virtual hosts. 

Finally, enable our new module:

```bash
$ sudo a2enconf php5-fpm
```

### Restart everything...
Restart both nginx and Apache now:

```bash
$ sudo service apache2 restart
$ sudo service nginx restart
```

