[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > [**Using the StorageLoader**](3-Scheduling-the-StorageLoader)

1. [Overview](#scheduling-overview)
2. [Scheduling StorageLoader only](#storage-loader-cron)
3. [Scheduling EmrEtlRunner and StorageLoader](#runner-and-loader-cron)
4. [Alternatives to cron](#cron-alternatives)
5. [Next steps](#next-steps)

<a name="scheduling-overview"/>
## 1. Overview

Once you have the load process working smoothly, you can schedule a daily
(or more frequent) task to automate the storage process.

The standard way of scheduling the load process is as a daily cronjob. We
provide two alternative shell scripts for you to use in your scheduling:

1. [dreamfactory-storage-loader.sh] [loader-bash] - this script just runs the
   StorageLoader
2. [dreamfactory-runner-and-loader.sh] [combo-bash] - this script runs the
   EmrEtlRunner immediately followed by the StorageLoader

The second script is recommended assuming you want to run the StorageLoader
immediately after EmrEtlRunner has completed its work.

To consider each scheduling option in turn:

<a name="storage-loader-cron"/>
## 2. Scheduling StorageLoader only

The shell script [`/4-storage/storage-loader/bin/dreamfactory-runner-and-loader.sh`] [loader-bash]
runs the StorageLoader app only.

You need to edit this script and update the three variables at the top:

    rvm_path=/path/to/.rvm # Typically in the $HOME of the user who installed RVM
    LOADER_PATH=/path/to/dreamfactory/4-storage/dreamfactory-storage-loader
    LOADER_CONFIG=/path/to/your-loader-config.yml

So for example if you installed RVM as the `admin` user, then you would set:

    rvm_path=/home/admin/.rvm

Now, assuming you're using the excellent [cronic] [cronic] as a wrapper for
your cronjobs, and that both cronic and Bundler are on your path, you can
configure your cronjob like so:

    0 6   * * *   root    cronic /path/to/dreamfactory/4-storage/bin/dreamfactory-runner-and-loader.sh

This will run the ETL job daily at 6am, emailing any failures to you via cronic. Please make
sure that your DreamFactory events have been safely generated and stored in your In Bucket prior
to 6am.

<a name="runner-and-loader-cron"/>
## 3. Scheduling EmrEtlRunner and StorageLoader

The shell script [`/4-storage/storage-loader/bin/dreamfactory-storage-loader.sh`] [combo-bash]
runs EmrEtlRunner, immediately followed by StorageLoader - i.e. it chains them together. At
DreamFactory, this is the scheduling option we use.

If you use this script, you can delete any separate cronjob for the EmrEtlRunner alone.

You need to update this script and update the **five** variables at the top:

    rvm_path=/path/to/.rvm # Typically in the $HOME of the user who installed RVM
    RUNNER_PATH=/path/to/dreamfactory/3-enrich/dreamfactory-emr-etl-runner
    LOADER_PATH=/path/to/dreamfactory/4-storage/dreamfactory-storage-loader
    RUNNER_CONFIG=/path/to/your-runner-config.yml
    LOADER_CONFIG=/path/to/your-loader-config.yml

So for example if you installed RVM as the `admin` user, then you would set:

    rvm_path=/home/admin/.rvm

Using [cronic] [cronic] as a wrapper, and with cronic and Bundler on your path, configure
your cronjob like so:

    0 4   * * *   root    cronic /path/to/dreamfactory/4-storage/bin/dreamfactory-runner-and-loader.sh

This will run the ETL job and then the database load daily at 4am, emailing any failures
to you via cronic.

<a name="cron-alternatives"/>
## 4. Alternatives to cron

In place of cron, you could schedule StorageLoader using a continuous integration
server such as [Jenkins] [jenkins], or potentially use the
[Windows Task Scheduler] [windows-task-scheduler].

These options are explored in a little more detail in the [Scheduling EmrEtlRunner] (3-Scheduling-EmrEtlRunner) guide.

## 5. Next steps

Setup the StorageLoader! Now you are ready to [do some analysis!](Setting-up-DreamFactory#step5).


[storage-loader]: https://github.com/dreamfactorysoftware/dsp-core/tree/master/4-storage/storage-loader

[ice]: http://www.infobright.org/
[iee]: http://www.infobright.com/Products/
[irl]: https://github.com/dreamfactory/infobright-ruby-loader

[hive-etl]: https://github.com/dreamfactorysoftware/dsp-core/tree/master/3-enrich/hive-etl
[trackers]: https://github.com/dreamfactorysoftware/dsp-core/tree/master/1-trackers
[collectors]: https://github.com/dreamfactorysoftware/dsp-core/tree/master/2-collectors
[getting-started]: http://dreamfactory.com/product/get-started.html

[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git
[ruby-install]: http://www.ruby-lang.org/en/downloads/
[nokogiri-install]: http://nokogiri.org/tutorials/installing_nokogiri.html
[rubygems-install]: http://docs.rubygems.org/read/chapter/3

[config-yml]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/storage-loader/config/config.yml
[loader-bash]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/storage-loader/bin/dreamfactory-storage-loader.sh
[combo-bash]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/storage-loader/bin/dreamfactory-runner-and-loader.sh

[cronic]: http://habilis.net/cronic/
[jenkins]: http://jenkins-ci.org/
[jenkins-tutorial]: http://blog.lusis.org/blog/2012/01/23/lowtech-monitoring-with-jenkins/
[windows-task-scheduler]: http://en.wikipedia.org/wiki/Windows_Task_Scheduler#Task_Scheduler_2.0