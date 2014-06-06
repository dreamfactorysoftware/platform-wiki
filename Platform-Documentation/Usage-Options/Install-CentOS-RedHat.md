<B>Prerequisites</B>

<p>If you are upgrading an existing installation, you may skip this section. This is only for new installations.</p>

<p>DreamFactory requires the following packages to run successfully:</p>
<ul>
<li>curl</li>
<li>httpd</li>
<li>php</li>
<li>php-common</li>
<li>php-cli</li>
<li>php-curl</li>
<li>php-json</li>
<li>php-mcrypt</li>
<li>php-gd</li>
<li>php-mysql</li>
<li>php-posix</li>
<li>php-pear</li>
<li>mysql-server</li>
<li>git</li>
</ul>

<p>Please note that the <b>php-mcrypt</b> and <b>php-json</b> packages aren't available is some distro repositories. If this is the case, you can add the [http://fedoraproject.org/wiki/EPEL RHEL EPEL] repository to your sources list.  Instructions for doing this are available [http://www.rackspace.com/knowledge_center/article/installing-rhel-epel-repo-on-centos-5x-or-6x here].</p>

<b>Configuring Your System</b>

```bash
[thedude@localhost:~]$ sudo yum install curl httpd php php-common php-cli php-curl
php-json php-mcrypt php-gd php-pear php-mysql mysql-server git
```

```bash
================================================================================================================================================================
 Package                                 Arch                            Version                                         Repository                        Size
================================================================================================================================================================
Installing:
 git                                     x86_64                          1.7.1-3.el6_4.1                                 updates                          4.6 M
 httpd                                   x86_64                          2.2.15-28.el6.centos                            updates                          821 k
 mysql-server                            x86_64                          5.1.69-1.el6_4                                  updates                          8.7 M
 php                                     x86_64                          5.3.3-22.el6                                    base                             1.1 M
 php-cli                                 x86_64                          5.3.3-22.el6                                    base                             2.2 M
 php-common                              x86_64                          5.3.3-22.el6                                    base                             524 k
 php-gd                                  x86_64                          5.3.3-22.el6                                    base                             106 k
 php-mysql                               x86_64                          5.3.3-22.el6                                    base                              81 k
Updating:
 curl                                    x86_64                          7.19.7-36.el6_4                                 updates                          193 k
Installing for dependencies:
 apr                                     x86_64                          1.3.9-5.el6_2                                   base                             123 k
 apr-util                                x86_64                          1.3.9-3.el6_0.1                                 base                              87 k
 apr-util-ldap                           x86_64                          1.3.9-3.el6_0.1                                 base                              15 k
 freetype                                x86_64                          2.3.11-14.el6_3.1                               updates                          359 k
 httpd-tools                             x86_64                          2.2.15-28.el6.centos                            updates                           73 k
 libX11                                  x86_64                          1.5.0-4.el6                                     base                             584 k
 libXpm                                  x86_64                          3.5.10-2.el6                                    base                              51 k
 mailcap                                 noarch                          2.1.31-2.el6                                    base                              27 k
 mysql                                   x86_64                          5.1.69-1.el6_4                                  updates                          907 k
 perl-DBD-MySQL                          x86_64                          4.013-3.el6                                     base                             134 k
 perl-DBI                                x86_64                          1.609-4.el6                                     base                             705 k
 perl-Error                              noarch                          1:0.17015-4.el6                                 base                              29 k
 perl-Git                                noarch                          1.7.1-3.el6_4.1                                 updates                           28 k
 php-pdo                                 x86_64                          5.3.3-22.el6                                    base                              75 k
Updating for dependencies:
 libcurl                                 x86_64                          7.19.7-36.el6_4                                 updates                          164 k
 mysql-libs                              x86_64                          5.1.69-1.el6_4                                  updates                          1.2 M

Transaction Summary
================================================================================================================================================================
Install      22 Package(s)
Upgrade       3 Package(s)

Total download size: 23 M
Is this ok [y/N]: y

... yada yada yada ...

```

<B>Set up MySQL</B>

You need to create a database, and a DreamFactory user in your MySQL instance.  On a fresh install, this is quite simple:

```bash
ubuntu@ip-10-164-45-80:~$ mysql -u root 


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

<b>DSP Installation from Github</b>

<p>To prepare for the DreamFactory installation from Github, create the DreamFactory directory on your server with the appropriate rights.</p>

```bash
$ sudo mkdir -p /opt/dreamfactory/platform

$ sudo chmod 777 /opt /dreamfactory/platform
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

If the installation script shows and error related to ownership of local files.

* error:	Composer did not complete successfully (2). Some features may not operate properly.
  * notice:	Error changing ownership of local files. Additional steps required. See note at end of run.
  * notice:
  * notice:	Be sure to run the following commands (with sudo as shown) in order to complete installation:
  * notice:	    sudo chown -R root:www-data * .git*
  * notice:	    sudo chown -R root:www-data * .git*
  * notice:
  * info:	Complete. Enjoy the rest of your day!

```

<p>If you receive an error asking you to change the ownership of your files, run the following command:</p>

```bash
$ sudo chown -R root:apache * .git*
```

<b> Enable Site </b>

<p>Finally, we need to configure httpd to connect to the DreamFactory application.

Below are the instructions to change the default site on httpd. For instructions on setting up virtual hosts, review the httpd documentation.

Edit the httpd default configuration file.
</p>
```bash
$ sudo nano /etc/httpd/conf/httpd.conf
```

<p>Change the DocumentRoot to /opt/dreamfactory/platform/web</p>

```bash
DocumentRoot /opt/dreamfactory/platform/web
```

<p>Update the Directory Path and the value of AllowOverride to <B>All</B></p>

```bash
<Directory "/opt/dreamfactory/platform/web/">

<Directory />
    Options FollowSymLinks
    AllowOverride All
</Directory>

```

<p>Enable the apache2 rewrite engine.

Change the rights of the assets directory to writeable.</p>

```bash
$ sudo chmod 777/opt/dreamfactory/platform/web/assets/
$ sudo chmod 777/opt/dreamfactory/platform/log/

```

<p>Restart the httpd server</p>

```bash
$ sudo service httpd restart
```

<p>Your DreamFactory Application should now be active, and available by entering the DNS name or IP address of your server into a web browser.</p>
