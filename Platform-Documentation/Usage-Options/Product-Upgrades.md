# DSP Software Upgrades


## From a Bitnami installed package

From the DSP Admin Console, go to the Config menu option on the left. The top of the configuration listing will display your current version and any upgrades that are available.

We are reworking the upgrade process to make it as painless as possible. Until then here is the recommended update procedure for Bitnami installs. For 1.7.8 and older installs that still offer the Upgrade button in the admin console please use this method rather than clicking the Upgrade button.

Mac OS X

```shell
# change this line to your bitnami dreamfactory installation path
cd /Applications/dreamfactory-1.7.8-0/apps/dreamfactory
cp -r htdocs htdocs.old
cd htdocs
git checkout master
git stash
git pull
cp ../htdocs.old/scripts/installer.sh ./scripts/
cp ../htdocs.old/web/.htaccess ./web/
cp ../htdocs.old/web/themes/classic/views/.htaccess  ./web/themes/classic/views/
../../../php/bin/php ../../../php/bin/composer.phar self-update
../../../php/bin/php ../../../php/bin/composer.phar update
../../../ctlscript.sh restart
```
Problems?

Some upgrades require database schema updates to continue operating correctly. If you run into errors after a software upgrade, log out of your DSP (go to <server>/web/logout), complete any requested schema upgrades, and log back in.

Upgrading from pre-1.5.x releases? 

There were a lot of structural changes between 1.4.0 to 1.5.x releases. Unfortunately, the upgrade from the DSP Admin Console doesn't work as well as it should. To get back up and running, please try the following...

* Restarting Apache and MySQL via the Bitnami management console.
* Go to the following URL... `<your_server_name>/web/logout`
* You may need to clear your browser cache due to css and javascript changes in the admin panel.


If you still encounter problems, please contact our [support](Contact-DreamFactory-Support) for help.

## From a Github clone install

Use your favorite git commands to pull the latest code from the dsp-core repo. Then run the installer script from the scripts directory. 