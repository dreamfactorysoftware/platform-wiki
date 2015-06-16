# DSP Software Upgrades

## From a Bitnami installed package
Mac OS X and Linux

```shell
# change this line to your bitnami dreamfactory installation path
cd /Applications/dreamfactory-1.7.8-0/apps/dreamfactory
cp -r htdocs htdocs.old
cd htdocs
git stash
git checkout master
git pull origin master
cp ../htdocs.old/scripts/installer.sh ./scripts/
cp ../htdocs.old/web/.htaccess ./web/
cp ../htdocs.old/web/themes/classic/views/.htaccess  ./web/themes/classic/views/
# self-update is optional, try it if you get an error without it
../../../php/bin/composer.phar self-update
../../../php/bin/composer.phar update --no-dev
../../../ctlscript.sh restart
```

Windows

Copy the folder C:\Bitnami\dreamfactory-x.x.x-x\apps\dreamfactory\htdocs to C:\Bitnami\dreamfactory-x.x.x-x\apps\dreamfactory\htdocs.old

In your GIT client of choice run:
```shell
cd C:\Bitnami\dreamfactory-x.x.x-x\apps\dreamfactory\htdocs
git stash
git checkout master
git pull origin master
```

Now open your command prompt and run:
```shell
cd C:\Bitnami\dreamfactory-1.9.0-1\apps\dreamfactory\htdocs\
copy ..\htdocs.old\scripts\installer.sh scripts\
copy ..\htdocs.old\web\.htaccess web\
copy ..\htdocs.old\web\themes\classic\views\.htaccess web\themes\classic\views\
C:\Bitnami\dreamfactory-1.9.0-1\php\php.exe C:\Bitnami\dreamfactory-1.9.0-1\php\composer.phar self-update
C:\Bitnami\dreamfactory-1.9.0-1\php\php.exe C:\Bitnami\dreamfactory-1.9.0-1\php\composer.phar update --no-dev
```

Use the Bitnami DreamFactory Stack Manager to restart your servers.

Problems?

Some upgrades require database schema updates to continue operating correctly. If you run into errors after a software upgrade, log out of your DSP (go to <server>/web/logout), complete any requested schema upgrades, and log back in.

Upgrading from pre-1.5.x releases? 

There were a lot of structural changes between 1.4.0 to 1.5.x releases. Unfortunately, the upgrade from the DSP Admin Console doesn't work as well as it should. To get back up and running, please try the following...

* Restarting Apache and MySQL via the Bitnami management console.
* Go to the following URL... `<your_server_name>/web/logout`
* You may need to clear your browser cache due to css and javascript changes in the admin panel.


If you still encounter problems, please contact our [support](Contact-DreamFactory-Support) for help.

## From a Github clone install

Use your favorite git commands to pull the latest code from the dsp-core repo. Then run the installer script from the scripts directory. For example,

```shell
git stash
git checkout master
git pull origin master
# self-update is optional, try it if you get an error without it
php composer.phar self-update
php composer.phar update --no-dev
```