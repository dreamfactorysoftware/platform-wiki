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

<b>Configuring Your Instance</b>

```bash
ubuntu@ip-10-164-45-80:~$ sudo apt-get install curl apache2 php5 php5-common php5-cli
php5-curl php5-json php5-mcrypt php5-gd php5-mysql mysql-server mysql-client git
Reading package lists... Done
Building dependency tree       
Reading state information... Done
curl is already the newest version.
The following extra packages will be installed:
... yada yada yada ...
Updating the super catalog...
```

<B>Set up MySQL</B>

<p>You need to create a database, and a DreamFactory user in your MySQL instance.  On a fresh install, this is quite simple:</p>

```bash
ubuntu@ip-10-164-45-80:~$ mysql -u root -p


Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 36
Server version: 5.5.31-0ubuntu0.12.10.1 (Ubuntu)

Copyright (c) 2000, 2013, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

```bash
mysql> create database dreamfactory;
Query OK, 1 row affected (0.00 sec)
```

```bash
mysql> grant all privileges on dreamfactory.* to 'dsp_user'@'localhost' identified by 'dsp_user';
Query OK, 0 rows affected (0.05 sec)
```

```bash
mysql> quit
Bye
```


<b>Configuring MongoDB Support<\b>

<p>There is an extra step to setup library support for MongoDB:</p>

```bash
ubuntu@ip-10-164-45-80:~$ sudo pecl install mongo

downloading mongo-1.4.1.tgz ...
Starting to download mongo-1.4.1.tgz (138,957 bytes)
..............................done: 138,957 bytes
84 source files, building
```


<b>DSP Installation from Github</b>

<p>To prepare for the DreamFactory installation from Github, create the DreamFactory directory on your server with the appropriate rights.</p>

```bash
$ sudo mkdir -p /opt/dreamfactory/platform

$ sudo chmod 777 /opt/dreamfactory/platform
```

<p>Next we will do a git clone to download the DreamFactory repository dsp-core.</p>

```bash
$ git clone https://github.com/dreamfactorysoftware/dsp-core.git /opt/dreamfactory/platform
```

<p>Now that the DreamFactory files are downloaded we will execute the installation script.</p>

```bash
$ cd /opt/dreamfactory/platform

$ sudo ./scripts/installer.sh –cv


********************************************************************************
  DreamFactory Services Platform(tm) Linux Installer [Mode: Local v1.3.3]
********************************************************************************

  * info:	Clean install. Dependencies removed.
  * info:	Verbose mode enabled
  * info:	Install user is "ubuntu"
  * info:	No composer found, installing: /opt/dreamfactory/platform/composer.phar
#!/usr/bin/env php
All settings correct for using Composer
...
```

<b>Enable Site</b>
<p>
Finally we need to configure apache to connect to the DreamFactory application.

Below are the instructions to change the default site on Apache2.  For instructions on setting up virtual hosts on apache 2.2 and 2.4 please review the apache documentation.

In this example we will edit the Apache default configuration file.
</p>
```bash
$ sudo nano /etc/apache2/sites-available/default
```

<p>Change the DocumentRoot to /opt/dreamfactory/platform/web  and the value of AllowOverride to <B>All</B></p>

```bash
DocumentRoot /opt/dreamfactory/platform/web
<Directory />
        Options FollowSymLinks
        AllowOverride All
</Directory>
```

<p>Update the Directory Path and the value of AllowOverride to <B>All</B></p>

```bash
<Directory /opt/dreamfactory/platform/web/>
	Options Indexes FollowSymLinks MultiViews
   AllowOverride All #update to all
   Order allow,deny
   allow from all
</Directory>
```
<p>Enable the apache2 rewrite engine.</p>

```bash
$ sudo a2enmod rewrite
```

<p>Change the rights, so that the assets directory is writable.</p>

```bash
$ sudo chmod 775 /opt/dreamfactory/platform/web/assets/
```

Restart the apache server

```bash
$ sudo service apache2 restart.
```

<p>Your DreamFactory Application should now be active, and available by entering the DNS name or IP address of your server into a web browser.</p>