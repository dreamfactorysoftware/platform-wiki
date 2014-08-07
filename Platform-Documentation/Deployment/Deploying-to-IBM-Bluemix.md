
## What's IBM Bluemix?
[IBM® Bluemix™](http://www.bluemix.net) is an open-standards, cloud-based platform for building, managing, and running apps of all types, such as web, mobile, big data, and smart devices. Capabilities include Java, mobile back-end development, and application monitoring, as well as features from ecosystem partners and open source—all provided as-a-service in the cloud. 

## Prerequisites
In order to deploy your DSP to Bluemix, you'll need to do a little setup on your dev box. Below are the things you'll need to have installed before you can deploy your DSP. You'll only have to do these things once, not every time you deploy.

 1. An account on [IBM Bluemix](http://www.bluemix.net)
 1. A clone (or fork) of the DreamFactory Services Platform&trade; for Bluemix [repository on GitHub](/dreamfactorysoftware/dsp-core-bluemix)
 1. The **cf** command line tool from [CloudFoundry](http://cloudfoundry.org/). Full instructions are here: [Installing the **cf** command line interface](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html). Follow the instructions on that page that refer to connecting and logging in to Bluemix. You'll have to have this done before you can deploy.

### MySQL
One last prerequisite is to create a MySQL instance in Bluemix for use by your application. Please see the Bluemix docs for more information about how this is done (it's not hard, just beyond the scope of this documentation). Remember the name of your service as it will be needed later. We recommend that you name your service like `mysql-[app-name]`, where **[app-name]** is a unique name for your application.

## Code
Developing an application to run on Bluemix isn't really any different than developing an application that lives on a stand-alone server. However, there is one major difference. Bluemix deployed applications have no persistent storage. That is to say, all storage on your Bluemix DSP is ephemeral. Because of this, you *must* develop and test your application locally. If your application *expects* disk space, you'll need to refactor it to store that data either on a remote storage service or in the database.
 
So code and test your app and when you're ready to run it on Bluemix, move on to the next step.

## Configure
There are a few files we need to create in order to deploy to Bluemix. These are the database configuration file and the application's **manifest** file. Templates are provided for these two in the repository. But we'll cover them individually here.

### Database Configuration
In your project's `config` directory there is a file called `database.bluemix.config.php-dist`. Copy this to `database.config.php`. 

From your project's root directory:

```bash
$ cp config/database.bluemix.config.php-dist config/database.config.php
```

You do not need to edit this file. The system will automatically use it if it exists.

### Application Manifest
In your project's root directory, there is a file called `manifest.bluemix.yml-dist`. We need to copy and modify this file for your application. 

From your project's root directory:

```bash
$ cp manifest.bluemix.yml-dist manifest.yml
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

Edit this copy with your favorite editor and change **[app-name]** and **[host-name]** to appropriate values for your app and host names. These can be the same but must be unique across the Bluemix environment.

More information about application manifests can be found in the [CloudFoundry documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).

## Deploy
Now your app is ready and you want to put it up on Bluemix to test. This is the easy part. 

### Update Dependencies

Change to your project's root directory and update the system dependencies:

```bash
$ ./scripts/installer.sh -cf
```

> Since we're pushing this to Bluemix, and not running on an actual server, there is no need to run the installer as root. Hence, the `-f` option can be used safely.

### Push to Bluemix

Now, use the **cf** tool to push the application to Bluemix:

```bash
$ cf push
```

Your application will be automagically sent to Bluemix and started. This can take 5-10 minutes. It all depends on your internet connection, Bluemix's current load, and the amount of data in your application. 

> Currently, the entire `/vendor` directory is pushed to Bluemix, which is not ideal. This will be corrected in the near future so that Bluemix runs Composer upon deployment.

### Bind MySQL Service
This step only needs to be performed once per application. If you change the name of your application you may need to re-bind the service.

Using the name of your MySQL service configured earlier, issue the following command:

```bash
$ cf bind-service <app-name> <mysql-name>
$ cf restart
```

Where **<app-name>** is the same from your `manifest.yml` and **<mysql-name>** is the name of the MySQL service created for this application (above). 

These commands bind the MySQL database to your application for storage, then tells the application to restart. Because the app was running, it cannot use the new service bound so it must be restarted.

You do not need to bind the service to your application each time you deploy unless the MySQL service name changed, or was removed and/or recreated.

## Test
If all goes well, you should have a running DSP in Bluemix after all commands have completed. Using the name you set in your `manifest.yml` for the `host` parameter, fire up your browser and go to `[host-name].mybluemix.net`. If you get a white screen, just refresh your browser page. It appears the first connection to MySQL after being bound to an application fail thus causing a white screen. Refreshing the page makes a new connection and everything flows.
 
You will be prompted for your DSP administrator information (if none exists) and the familiar DSP Admin Console will be displayed.

Now test your app and get it out there!