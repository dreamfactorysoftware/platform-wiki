## What's IBM Bluemix?
[IBM® Bluemix™](http://www.bluemix.net) is an open-standards, cloud-based platform for building, managing, and running apps of all types, such as web,
mobile, big data, and smart devices. Capabilities include Java, mobile back-end development, and application monitoring,
as well as features from ecosystem partners and open source—all provided as-a-service in the cloud.

## Prerequisites
In order to deploy your DSP to Bluemix, you'll need to do a little setup on your dev box. Below are the things you'll need to have installed before you can
deploy your DSP. You'll only have to do these things once, not every time you deploy.

 1. An account on [IBM Bluemix](http://www.bluemix.net)
 1. A running clone (or fork) of the DreamFactory Services Platform&trade; [repository on GitHub](/dreamfactorysoftware/dsp-core)
 1. The **cf** command line tool from [CloudFoundry](http://cloudfoundry.org/). Full instructions are on Bluemix's "[Building a web application](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html)" page. Follow the setup instructions on that page that refer to connecting and logging in to Bluemix. You'll have to have this done before you can deploy.

For example purposes, we will be using **my-dsp** as the name of our DSP.

### MySQL
One last prerequisite is to create a MySQL instance in Bluemix for use by your application. Please see the Bluemix docs for more information about how this is done (it's not hard, just beyond the scope of this documentation). Remember the name of your service as it will be needed later. We recommend that you name your service like `mysql-[app-name]`, where **[app-name]** is a unique name for your application. In the walk-through below, one is created via the command line interface. You can use the exact same method.

## Code
Developing an application to run on Bluemix isn't really any different than developing an application that lives on a stand-alone server. However, there is one major difference. Bluemix deployed applications have no persistent storage. That is to say, all storage on your Bluemix DSP is ephemeral. Because of this, you *must* develop and test your application locally. If your application *expects* disk space, you'll need to refactor it to store that data either on a remote storage service or in the database.
 
So code and test your app and when you're ready to run it on Bluemix, move on to the next step.

## Configure
There are a few files we need to create in order to deploy to Bluemix. These are the database configuration file and the application's **manifest** file. Templates are provided for these two in the repository. But we'll cover them individually here.

### Database Configuration
In your project's `config/databases` directory there is a file called `database.bluemix.config.php-dist`. Copy this to `config/database.config.php`

>The following, and all future command line examples are shown as being done from the root of your DSP install.

From your project's root directory:

```bash
$ cp config/databases/database.bluemix.config.php-dist config/database.config.php
```

You do not need to edit this file. The system will automatically use it if it exists.

### Application Manifest
In the project's `config/manifests` directory there is a file called `manifest.bluemix.yml-dist`. We need to make a copy of this file and tailor it for your application. 

Again, from your project's root directory:

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
same but must be unique across the Bluemix environment. Remember, we're using **my-dsp** for our names. So your manifest should look like this:

```yml
---
applications:
- name: my-dsp
  memory: 512M
  instances: 1
  host: my-dsp
  domain: mybluemix.net
  path: .
  buildpack: https://github.com/dmikusa-pivotal/cf-php-build-pack.git
```

>More information about application manifests can be found in the [CloudFoundry documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).

## Deploy
When your app is running correctly locally, you'll want to put it up on Bluemix to test. This is the easy part.

### Push to Bluemix
Now, using the **cf** tool, we *push* the application to Bluemix:

```shell
$ cf push
Using manifest file manifest.yml

Creating app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

Using route my-dsp.mybluemix.net
Binding my-dsp.mybluemix.net to my-dsp...
OK

Uploading my-dsp...
Uploading app files from: /opt/dreamfactory/paas/bluemix/my-dsp
Uploading 5.2M, 856 files
OK

Starting app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
-----> Downloaded app package (4.7M)
Cloning into '/tmp/buildpacks/cf-php-build-pack'...
Installing Nginx
Installing PHP
Loading composer repositories with package information
Installing dependencies from lock file
Generating autoload files
Finished: [2014-08-21 15:19:58.008891]
-----> Uploading droplet (65M)

0 of 1 instances running, 1 starting
1 of 1 instances running

App started

Showing health and status for app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

requested state: started
instances: 1/1
usage: 512M x 1 instances
urls: my-dsp.mybluemix.net

     state     since                    cpu    memory          disk
#0   running   2014-08-21 11:20:28 AM   0.0%   73.9M of 512M   201.5M of 1G
Endpoint deprecated
```
This process can take some time depending on your app and internet speed and whatnot. When it has completed, your app has been deployed to Bluemix and should be running. However, we still need a database configured and bound to our application. Unless you unbind or delete the database, this is only needed to be done once.

>At the end of your first push, you may see the "Endpoint deprecated" message. This is because we haven't yet bound our database service. On subsequent pushes, you will not see this message as the database service will be available. No need for concern there.

>There is additional output that was omitted from above because it isn't relevant unless there is an error. Basically it is log information about what is being installed. You'll see when you do it.

### Create and Bind a Database Service
As stated, this step only needs to be performed once per application. If you change the name of your application you may need to re-bind the service.

Let's create and bind a database service to our application:

```shell
$ cf create-service mysql 100 mysql-my-dsp
Creating service mysql-my-dsp in org DreamFactory / space dev as user@domain.com...
OK
$ cf bind-service my-dsp mysql-my-dsp
Binding service mysql-my-dsp to app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
TIP: Use 'cf restage' to ensure your env variable changes take effect
```

These commands create and bind the database to your application for storage. Because the app was running when we did this, it cannot use the newly bound service, therefore it must be restarted. This is done as follows:

```shell
$ cf restage my-dsp
Restaging app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
-----> Downloaded app package (4.7M)
-----> Downloaded app buildpack cache (32M)
Cloning into '/tmp/buildpacks/cf-php-build-pack'...
Installing Nginx
Installing PHP
Loading composer repositories with package information
Installing dependencies from lock file
Generating autoload files
Finished: [2014-08-21 15:24:34.557655]
-----> Uploading droplet (65M)

1 of 1 instances running

App started

Showing health and status for app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

requested state: started
instances: 1/1
usage: 512M x 1 instances
urls: my-dsp.mybluemix.net

     state     since                    cpu    memory          disk
#0   running   2014-08-21 11:25:01 AM   0.0%   78.7M of 512M   201.5M of 1G
```

See how we did not get the "Endpoint deprecated" message this time?

>You do not need to bind the service to your application each time you deploy unless the service name has changed, been removed, and/or recreated.

## Test
If all goes well, you should have a running DSP in Bluemix after all commands have completed. Using the name you set in your `manifest.yml` for the `host` parameter, fire up your browser and go to `[host-name].mybluemix.net`.
 
You will be prompted for your DSP administrator information (if none exists) and the familiar DSP Admin Console will be displayed.

Now test your app and get it out there!

# Complete Deployment Walk-Through

This walk-through will install a base DSP on Bluemix from the latest version.

Move into your projects or workspace directory and perform the following commands:

## Clone and Configure

In this section, we do the following:

 1. Clone the main DSP repository from GitHub and run the installation script
 2. Create a `config/database.config.php` file for Bluemix
 3. Create a `manifest.yml` file for deployment settings

```shell
$ git clone https://github.com/dreamfactorysoftware/dsp-core.git my-dsp
Cloning into 'my-dsp'...
remote: Counting objects: 20276, done.
remote: Compressing objects: 100% (247/247), done.
remote: Total 20276 (delta 133), reused 0 (delta 0)
Receiving objects: 100% (20276/20276), 16.10 MiB | 398.00 KiB/s, done.
Resolving deltas: 100% (12734/12734), done.
Checking connectivity... done.
$ cd my-dsp/
$ sudo ./scripts/installer.sh
  * info:	Created /opt/dreamfactory/paas/bluemix/my-dsp/log/
********************************************************************************
  DreamFactory Services Platform(tm) Linux Installer [Mode: Local v1.3.10]
********************************************************************************

  * info:	Install user is "jablan"
  * info:	No composer found, installing: /opt/dreamfactory/paas/bluemix/my-dsp/composer.phar
#!/usr/bin/env php
  * info:	External modules updated
  * info:	Checking file system structure and permissions
  * info:	Created /opt/dreamfactory/paas/bluemix/my-dsp/storage/
  * info:	Created /opt/dreamfactory/paas/bluemix/my-dsp/web/assets
  * info:	Installing dependencies
  * info:	Complete. Enjoy the rest of your day!

$ cp config/databases/database.bluemix.config.php-dist config/database.config.php
$ cp config/manifests/manifest.bluemix.yml-dist manifest.yml
$ nano manifest.yml # edit file and change app-name and host-name to "my-dsp"
```

## Deploy DSP
The last step is to push your code up to Bluemix. This is done with the **cf** command line tool as shown below. An important note here is that whatever
is in your root directory is deployed. If you do not wish for a file or directory to be deployed, add the pattern to the `.cfignore` file. The syntax is
identical to `.gitignore`.

```shell
$ cf push
Using manifest file manifest.yml

Creating app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

Using route my-dsp.mybluemix.net
Binding my-dsp.mybluemix.net to my-dsp...
OK

Uploading my-dsp...
Uploading app files from: /opt/dreamfactory/paas/bluemix/my-dsp
Uploading 5.2M, 856 files
OK

Starting app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
-----> Downloaded app package (4.7M)
Cloning into '/tmp/buildpacks/cf-php-build-pack'...
Installing Nginx
Installing PHP
Loading composer repositories with package information
Installing dependencies from lock file
Generating autoload files
Finished: [2014-08-21 15:19:58.008891]
-----> Uploading droplet (65M)

0 of 1 instances running, 1 starting
1 of 1 instances running

App started

Showing health and status for app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

requested state: started
instances: 1/1
usage: 512M x 1 instances
urls: my-dsp.mybluemix.net

     state     since                    cpu    memory          disk
#0   running   2014-08-21 11:20:28 AM   0.0%   73.9M of 512M   201.5M of 1G
Endpoint deprecated
$ cf create-service mysql 100 mysql-my-dsp
Creating service mysql-my-dsp in org DreamFactory / space dev as user@domain.com...
OK
$ cf bind-service my-dsp mysql-my-dsp
Binding service mysql-my-dsp to app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
TIP: Use 'cf restage' to ensure your env variable changes take effect
$ cf restage my-dsp
Restaging app my-dsp in org DreamFactory / space dev as user@domain.com...
OK
-----> Downloaded app package (4.7M)
-----> Downloaded app buildpack cache (32M)
Cloning into '/tmp/buildpacks/cf-php-build-pack'...
Installing Nginx
Installing PHP
Loading composer repositories with package information
Installing dependencies from lock file
Generating autoload files
Finished: [2014-08-21 15:24:34.557655]
-----> Uploading droplet (65M)

1 of 1 instances running

App started

Showing health and status for app my-dsp in org DreamFactory / space dev as user@domain.com...
OK

requested state: started
instances: 1/1
usage: 512M x 1 instances
urls: my-dsp.mybluemix.net

     state     since                    cpu    memory          disk
#0   running   2014-08-21 11:25:01 AM   0.0%   78.7M of 512M   201.5M of 1G
```

>The output of `cf restage` is nearly identical to the output of a `cf push` and thus portions of both have been omitted.

If the state of your push is not **running** as shown above, something has gone awry and it is suggested to try again.

## Test Web Server
Send a **ping** request to your new server and see if it responds properly.

```bash
$ curl http://my-dsp.mybluemix.net/ping.php
pong
```

## Try It Out!
Fire up your web browser and go to your [new app](http://my-dsp.mybluemix.net)!
