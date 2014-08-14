## What's IBM Bluemix?
[IBM® Bluemix™](http://www.bluemix.net) is an open-standards, cloud-based platform for building, managing, and running apps of all types, such as web,
mobile, big data, and smart devices. Capabilities include Java, mobile back-end development, and application monitoring,
as well as features from ecosystem partners and open source—all provided as-a-service in the cloud.

## Prerequisites
In order to deploy your DSP to Bluemix, you'll need to do a little setup on your dev box. Below are the things you'll need to have installed before you can
deploy your DSP. You'll only have to do these things once, not every time you deploy.

 1. An account on [IBM Bluemix](http://www.bluemix.net)
 1. A clone (or fork) of the DreamFactory Services Platform&trade; [repository on GitHub](/dreamfactorysoftware/dsp-core)
 1. The **cf** command line tool from [CloudFoundry](http://cloudfoundry.org/). Full instructions are here: [Installing the **cf** command line interface]
 (https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html). Follow the instructions on that page that refer to connecting and logging in to Bluemix.
 You'll have to have this done before you can deploy.

For example purposes, we will be using **my-dsp** as the name of our DSP.

### MySQL
One last prerequisite is to create a MySQL instance in Bluemix for use by your application. Please see the Bluemix docs for more information about how this
is done (it's not hard, just beyond the scope of this documentation). Remember the name of your service as it will be needed later. We recommend that you
name your service like `mysql-[app-name]`, where **[app-name]** is a unique name for your application. In the walk-through below,
one is created via the command line interface. You can use the exact same method.

## Code
Developing an application to run on Bluemix isn't really any different than developing an application that lives on a stand-alone server. However,
there is one major difference. Bluemix deployed applications have no persistent storage. That is to say, all storage on your Bluemix DSP is ephemeral.
Because of this, you *must* develop and test your application locally. If your application *expects* disk space,
you'll need to refactor it to store that data either on a remote storage service or in the database.
 
So code and test your app and when you're ready to run it on Bluemix, move on to the next step.

## Configure
There are a few files we need to create in order to deploy to Bluemix. These are the database configuration file and the application's **manifest** file.
Templates are provided for these two in the repository. But we'll cover them individually here.

### Database Configuration
In your project's `config` directory there is a file called `database.bluemix.config.php-dist`. Copy this to `database.config.php`. 

From your project's root directory:

```bash
$ cp config/database.bluemix.config.php-dist config/database.config.php
```

You do not need to edit this file. The system will automatically use it if it exists.

### Application Manifest
In the project's `config/manifests` directory there is a file called `manifest.bluemix.yml-dist`. We need to make a copy of this file and tailor it for your
application.

From your project's root directory:

```bash
$ cp config/manifests/manifest.bluemix.yml-dist manifest.yml
```

The file contains the following:

```yml
---
applications:
- name: [app-name]
  memory: 512M
  instances: 1
  host: [host-name]
  domain: mybluemix.net
  path: .
  buildpack: https://github.com/dmikusa-pivotal/cf-php-build-pack.git
```

Edit this copy with your favorite editor and change **[app-name]** and **[host-name]** to appropriate values for your app and host names. These can be the
same but must be unique across the Bluemix environment.

More information about application manifests can be found in the [CloudFoundry documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).

## Deploy
Now your app is ready and you want to put it up on Bluemix to test. This is the easy part. 

### Update Dependencies

Change to your project's root directory and update the system dependencies:

```bash
$ sudo ./scripts/installer.sh -c
```

### Push to Bluemix

Now, use the **cf** tool to push the application to Bluemix:

```bash
$ cf push
```

Your application will be automagically sent to Bluemix and started. This can take 5-10 minutes. It all depends on your internet connection,
Bluemix's current load, and the amount of data in your application.

### Bind MySQL Service
This step only needs to be performed once per application. If you change the name of your application you may need to re-bind the service.

Using the name of your MySQL service configured earlier, issue the following command:

```bash
$ cf bind-service <app-name> <mysql-name>
$ cf restage <app-name>
```

Where **<app-name>** is the same from your `manifest.yml` and **<mysql-name>** is the name of the MySQL service created for this application (above). 

These commands bind the MySQL database to your application for storage, then tells the application to restart. Because the app was running,
it cannot use the new service bound so it must be restarted.

You do not need to bind the service to your application each time you deploy unless the MySQL service name changed, or was removed and/or recreated.

## Test
If all goes well, you should have a running DSP in Bluemix after all commands have completed. Using the name you set in your `manifest.yml` for the `host`
parameter, fire up your browser and go to `[host-name].mybluemix.net`. If you get a white screen, just refresh your browser page. It appears the first
connection to MySQL after being bound to an application fail thus causing a white screen. Refreshing the page makes a new connection and everything flows.
 
You will be prompted for your DSP administrator information (if none exists) and the familiar DSP Admin Console will be displayed.

Now test your app and get it out there!

# Complete Deployment Walk-Through

This walk-through will install a base DSP on Bluemix from the latest version.

Move into your projects or workspace directory and perform the following commands:

## Clone and Configure

In this section, we do the following:

 1. Clone the main DSP repository from GitHub
 2. Create a `config/database.config.php` file for IBM Bluemix
 3. Create a `manifest.yml` file for deployment settings

```bash
$ git clone https://github.com/dreamfactorysoftware/dsp-core.git my-dsp
Cloning into 'my-dsp'...
remote: Counting objects: 19882, done.
remote: Compressing objects: 100% (144/144), done.
remote: Total 19882 (delta 72), reused 0 (delta 0)
Receiving objects: 100% (19882/19882), 16.03 MiB | 809.00 KiB/s, done.
Resolving deltas: 100% (12472/12472), done.
Checking connectivity... done.
$ cd my-dsp/
$ cp config/database.bluemix.config.php-dist config/database.config.php        # No changes necessary
$ cp config/manifests/manifest.bluemix.yml-dist manifest.yml                # Create our manifest
$ nano manifest.yml                                                        # edit file and change app-name and host-name to "my-dsp"
```

## Install Dependencies
The next step is to run the DreamFactory `scripts/installer.sh` script to pull in the required dependencies.

> This step is necessary because it updates the `composer.lock` file with the latest dependencies so you always have the freshest code! This `vendor`
directory will not be transferred.

```shell
$ sudo ./scripts/installer.sh -c        # Run as sudo to avoid any permission errors
********************************************************************************
  DreamFactory Services Platform(tm) Linux Installer [Mode: Local v1.3.8]
********************************************************************************

  * info:	Clean install. Dependencies removed.
  * info:	Install user is "code_ninja"
  * info:	No composer found, installing: my-dsp/composer.phar
#!/usr/bin/env php
  * info:	External modules updated
  * info:	Checking file system structure and permissions
  * info:	Installing dependencies
  * info:	Complete. Enjoy the rest of your day!
```

## Deploy DSP
The last step is to push your code up to IBM Bluemix. This is done with the **cf** command line tool:

```bash
$ cf push
jablan@azrael:/opt/dreamfactory/paas/bluemix/bm-demo (master)$ cf push
Using manifest file /opt/dreamfactory/paas/bluemix/bm-demo/manifest.yml

Creating app bm-demo in org someone@somewhere / space dev as someone@somewhere...
OK

Creating route bm-demo.mybluemix.net...
OK

Binding bm-demo.mybluemix.net to bm-demo...
OK

Uploading bm-demo...
Uploading app files from: /opt/dreamfactory/paas/bluemix/bm-demo
Uploading 5.2M, 832 files
OK

Starting app bm-demo in org someone@somewhere / space dev as someone@somewhere...
OK
-----> Downloaded app package (4.7M)
Cloning into '/tmp/buildpacks/cf-php-build-pack'...
Installing Nginx
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/nginx/1.6.0/nginx-1.6.0.tar.gz] to [/tmp/nginx-1.6.0.tar.gz]
Installing PHP
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-5.4.31.tar.gz] to [/tmp/php-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-bz2-5.4.31.tar.gz] to [/tmp/php-bz2-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-fpm-5.4.31.tar.gz] to [/tmp/php-fpm-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-zlib-5.4.31.tar.gz] to [/tmp/php-zlib-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-pear-5.4.31.tar.gz] to [/tmp/php-pear-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-openssl-5.4.31.tar.gz] to [/tmp/php-openssl-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-mcrypt-5.4.31.tar.gz] to [/tmp/php-mcrypt-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-curl-5.4.31.tar.gz] to [/tmp/php-curl-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-mongo-5.4.31.tar.gz] to [/tmp/php-mongo-5.4.31.tar.gz]
Downloaded [http://php-bp-proxy.cfapps.io/files/lucid/php/5.4.31/php-cli-5.4.31.tar.gz] to [/tmp/php-cli-5.4.31.tar.gz]
Downloaded [https://getcomposer.org/download/1.0.0-alpha8/composer.phar] to [/tmp/composer.phar]
PHP Warning:  PHP Startup: Unable to load dynamic library '/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/pcre.so' -
/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/pcre.so: cannot open shared object file: No such file or directory in Unknown on line 0
PHP Warning:  PHP Startup: Unable to load dynamic library '/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/xml.so' -
/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/xml.so: cannot open shared object file: No such file or directory in Unknown on line 0
PHP Warning:  PHP Startup: Unable to load dynamic library '/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/tokenizer.so' -
/tmp/staged/app/php/lib/php/extensions/no-debug-non-zts-20100525/tokenizer.so: cannot open shared object file: No such file or directory in Unknown on line 0
Loading composer repositories with package information
Installing dependencies from lock file
  - Installing pear-pear.php.net/net_url2 (2.0.6)
    Downloading
  - Installing pear-pear.php.net/mail_mime (1.8.9)
    Downloading
  - Installing pear-pear.php.net/mail_mimedecode (1.5.5)
    Downloading
  - Installing pear-pear.php.net/xml_util (1.2.3)
    Downloading
  - Installing pear-pear.php.net/structures_graph (1.0.4)
    Downloading
  - Installing pear-pear.php.net/console_getopt (1.3.1)
    Downloading
  - Installing pear-pear.php.net/archive_tar (1.3.12)
    Downloading
  - Installing pear-pear.php.net/pear (1.9.5)
    Downloading
    Skipped installation of bin/pecl for package pear-pear.php.net/pear: name conflicts with an existing file
    Skipped installation of bin/peardev for package pear-pear.php.net/pear: name conflicts with an existing file
    Skipped installation of bin/pear for package pear-pear.php.net/pear: name conflicts with an existing file
  - Installing pear-pear.php.net/http_request2 (2.2.1)
    Downloading
  - Installing dreamfactory/azure-sdk-for-php (dev-develop 3326524)
    Cloning 3326524639e3f42521f7259ea6ca02a6e901e3d3
  - Installing symfony/http-foundation (dev-master d17938f)
    Cloning d17938f07e168c4e5bb35c209d3c289ccff15d80
  - Installing symfony/event-dispatcher (dev-master 68ab3c3)
    Cloning 68ab3c3f50eae2b152075da722204d4de67f596f
  - Installing psr/log (dev-master a78d650)
    Cloning a78d6504ff5d4367497785ab2ade91db3a9fbe11
  - Installing monolog/monolog (dev-master 12545cd)
    Cloning 12545cda2f7a0bd82a110f742ef455fe735e60cf
  - Installing doctrine/cache (v1.3.0)
    Downloading
  - Installing kisma/kisma (0.2.53)
    Downloading
  - Installing dreamfactory/lib-php-common (dev-develop 8da8fb6)
    Cloning 8da8fb68cf6ee39d63f7bd93ae15cbba6748d958
  - Installing swiftmailer/swiftmailer (v4.3.1)
    Downloading
  - Installing rackspace/php-opencloud (V1.5.10)
    Downloading
  - Installing phpforce/common (dev-master aa96dfb)
    Cloning aa96dfb6b0f43024c95a9d9c88396013e7513f9c
  - Installing phpforce/soap-client (dev-master 9f014c8)
    Cloning 9f014c8d5e48f5d983600f37098f22d67e9cb1e1
  - Installing nikic/php-parser (0.9.x-dev ef70767)
    Cloning ef70767475434bdb3615b43c327e2cae17ef12eb
  - Installing jeremeamia/superclosure (1.0.1)
    Downloading
  - Installing dreamfactory/yii (1.1.13.3)
    Downloading
  - Installing dreamfactory/oasys (0.4.13)
    Downloading
  - Installing dreamfactory/lib-php-common-yii (dev-develop 648fad6)
    Cloning 648fad6fdc6be509baf6aa9207bb031f3d005c51
  - Installing dreamfactory/javascript-sdk (1.0.15)
    Downloading
  - Installing dready92/php-on-couch (dev-master ae738b8)
    Cloning ae738b8779d71c8128f63e2862572516ac1a8eeb
  - Installing guzzle/guzzle (v3.8.1)
    Downloading
  - Installing aws/aws-sdk-php (2.4.12)
    Downloading
  - Installing dreamfactory/lib-php-common-platform (1.7.7)
    Downloading
symfony/event-dispatcher suggests installing symfony/dependency-injection ()
symfony/event-dispatcher suggests installing symfony/http-kernel ()
monolog/monolog suggests installing doctrine/couchdb (Allow sending log messages to a CouchDB server)
monolog/monolog suggests installing ext-amqp (Allow sending log messages to an AMQP server (1.0+ required))
monolog/monolog suggests installing graylog2/gelf-php (Allow sending log messages to a GrayLog2 server)
monolog/monolog suggests installing raven/raven (Allow sending log messages to a Sentry server)
monolog/monolog suggests installing rollbar/rollbar (Allow sending log messages to Rollbar)
monolog/monolog suggests installing ruflin/elastica (Allow sending log messages to an Elastic Search server)
monolog/monolog suggests installing videlalvaro/php-amqplib (Allow sending log messages to an AMQP server using php-amqplib)
phpforce/soap-client suggests installing doctrine/common (For caching SOAP responses)
aws/aws-sdk-php suggests installing ext-apc (Allows service description opcode caching, request and response caching, and credentials caching)
aws/aws-sdk-php suggests installing symfony/yaml (Eases the ability to write manifests for creating jobs in AWS Import/Export)
Generating autoload files
Finished: [2014-08-14 06:23:27.942464]

1 of 1 instances running

App started

Showing health and status for app bm-demo in org someone@somewhere / space dev as someone@somewhere...
OK

requested state: started
instances: 1/1
usage: 512M x 1 instances
urls: bm-demo.mybluemix.net

     state     since                    cpu    memory          disk
#0   running   2014-08-14 02:23:55 AM   0.3%   22.3M of 512M   201.5M of 1G
```

## Test Web Server
Send a **ping** request to your new server and see if it responds properly.

```bash
$ curl http://my-dsp.mybluemix.net/ping.php		# Test a ping
pong											# Got the pong!
```

## Create a Database
The DSP requires a local MySQL database for storage. So this service needs to be created and bound to the application. Once bound, the application is restarted.

```bash
$ cf create-service mysql 100 mysql-my-dsp        # Create a MySQL service instance for your DSP called "mysql-my-dsp"
Creating service mysql-my-dsp in org someone@somewhere / space dev as someone@somewhere...
OK
$ cf bind-service my-dsp mysql-my-dsp
Binding service mysql-my-dsp to app my-dsp in org someone@somewhere / space dev as someone@somewhere...
OK
TIP: Use 'cf restage' to ensure your env variable changes take effect
$ cf restage my-dsp
Restarting app my-dsp in org someone@somewhere / space dev as someone@somewhere...
OK
```

## Try It Out!
Fire up your web browser and go to your [new app](http://my-dsp.mybluemix.net)!