You can install DreamFactory on a Mac OS X desktop by following the links below.

### Bitnami Installer

An easy way to install on Mac OS X is to use the Bitnami installer. Just follow the instructions on Bitnami's website.

* [Bitnami Installer for Mac OS X](https://bitnami.com/stack/dreamfactory/installer#osx)

If you already use a Bitnami MAMP stack, include the DreamFactory module by going to the stack module listing here:

* [DreamFactory Module for Bitnami MAMP Stack](https://bitnami.com/stack/mamp/modules#dreamfactory)

### Direct from GitHub

For the engineer familiar with server-side installations and web server implementations, DreamFactory code may be deployed directly from [github.com](http://github.com/dreamfactorysoftware/dsp-core) onto a Mac web server. This will allow the use of existing cloud or onsite infrastructure to deploy production applications with DSP, including adding customizations to our code base and controlling every detail of the process.

Below are instructions for installing DreamFactory's open source code base in Mac OS X:

<b> Prerequisites </b>

<p>DreamFactory requires the following packages to run successfully:</p>
<ul>
<li>curl</li>
<li>apache2</li>
<li>php5</li>
<li>php5-common</li>
<li>php5-cli</li>
<li>php5-curl</li>
<li>php5-json</li>
<li>php5-mcrypt</li>
<li>php5-gd</li>
<li>php5-mysql</li>
<li>mysql-server</li>
<li>mysql-client</li>
<li>git</li>
<li>php-pear (for MongoDB support)</li>
<li>php5-dev (for MongoDB support)</li>
</ul>

<B>Set up MySQL</B>

<p>You need to create a database, and a DreamFactory user in your MySQL instance.  On a fresh install, this is quite simple:</p>

```bash
$ mysql -u root -p
```
   ```sql
   mysql> create database dreamfactory;
   Query OK, 1 row affected (0.00 sec)
   mysql> grant all privileges on dreamfactory.* to 'dsp_user'@'localhost' identified by 'dsp_user';
   Query OK, 0 rows affected (0.05 sec)
   mysql> quit
   Bye
   ```

<b>DSP Installation from Github</b>

<p>To prepare for the DreamFactory installation from Github, create the DreamFactory directory on your server with the appropriate rights.</p>

```bash
$ sudo mkdir -p /Applications/dsp/platform
$ sudo chmod 777 /Applications/dsp/platform
```

<p>Next we will do a git clone to download the DreamFactory repository dsp-core.</p>

```bash
$ git clone https://github.com/dreamfactorysoftware/dsp-core.git /Applications/dsp/platform
```

<p>Now that the DreamFactory files are downloaded we will execute the installation script.</p>

```bash
$ cd /Applications/dsp/platform
$ sudo ./scripts/installer.sh –cv
```

<b>Enable Site</b>
<p>
Finally configure apache to connect to the DreamFactory application.