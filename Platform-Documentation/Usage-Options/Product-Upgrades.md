# DSP Software Upgrades


## From a Bitnami installed package

From the DSP Admin Console, go to the Config menu option on the left. The top of the configuration listing will display your current version and any upgrades that are available.

Problems upgrading to 1.5.x from earlier releases? 

There were a lot of structural changes between 1.4.0 to 1.5.x releases. Unfortunately, the upgrade from the DSP Admin Console doesn't work as well as it should. To get back up and running, please try the following...

* Restarting Apache and MySQL via the Bitnami management console.
* Go to the following URL... `<your_server_name>/web/logout`


If you still encounter problems, please contact our [support](Contact-DreamFactory-Support) for help.

## From a Github clone install

Use your favorite git commands to pull the latest code from the dsp-core repo. Then run the installer script from the scripts directory. 