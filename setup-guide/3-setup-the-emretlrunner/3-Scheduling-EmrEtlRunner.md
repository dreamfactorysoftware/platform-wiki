<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 3: setting up EmrEtlRunner**](Setting-up-EmrEtlRunner) > [3: Scheduling EmrEtlRunner](2-Scheduling-EmrEtlRunner)

1. [Overview](#scheduling-overview)
2. [cron](#cron)
3. [Jenkins](#jenkins)
4. [Windows Task Scheduler](#windows)
5. [Next steps](#next-steps)

<a name="scheduling"/>
## Scheduling

<a name="scheduling-overview"/>
## 1. Overview

Once you have the ETL process working smoothly, you can schedule a daily
(or more frequent) task to automate the daily ETL process.

We run our daily ETL jobs at 3am UTC, so that we are sure that we have
processed all of the events from the day before (CloudFront logs can
take some time to arrive).

To consider your different scheduling options in turn:

<a name="cron"/>
## 2. cron

The recommended way of scheduling the ETL process is as a daily cronjob using the 
shell script available in the SnowPlow GitHub repository at 
[`/3-etl/emr-etl-runner/bin/snowplow-emr-etl-runner.sh`] [bash-script].

You need to edit this script and update the three variables:

    rvm_path=/path/to/.rvm # Typically in the $HOME of the user who installed RVM
    RUNNER_PATH=/path/to/snowplow/3-etl/snowplow-emr-etl-runner
    RUNNER_CONFIG=/path/to/your-config.yml

So for example if you installed RVM as the `admin` user, then you would set:

    rvm_path=/home/admin/.rvm

Now, assuming you're using the excellent [cronic] [cronic] as a wrapper for 
your cronjobs, and that both cronic and Bundler are on your path, you can 
configure your cronjob like so:

    0 4   * * *   root    cronic /path/to/snowplow/3-etl/bin/snowplow-emr-etl-runner.sh

This will run the ETL job daily at 4am, emailing any failures to you via cronic.

<a name="jenkins"/>
## 3. Jenkins

Some developers use the [Jenkins] [jenkins] continuous integration server (or
[Hudson] [hudson], which is very similar) to schedule their Hadoop and Hive jobs.

Describing how to do this is out of scope for this guide, but the blog post
[Lowtech Monitoring with Jenkins] [jenkins-tutorial] is a great tutorial on using
Jenkins for non-CI-related tasks, and could be easily adapted to schedule
EmrEtlRunner.

<a name="windows"/>
## 4. Windows Task Scheduler

For Windows servers, in theory it should be possible to use a Windows PowerShell
script plus [Windows Task Scheduler] [windows-task-scheduler] instead of bash and cron. However, this has not been tested or documented.

If you get this working, please let us know!

<a name="next-steps" />
## 5. Next steps

Now you have installed and scheduled [EmrEtlRunner] [emr-etl-runner], you have all your data ready for analysis in S3. Learn how to [setup the StorageLoader] [storage-loader] to regularly load your data into a database e.g. Infobright or Redshift for e.g. OLAP analysis, or to [analyse it on S3 via Emr] [emr-analysis].


[emr-etl-runner]: https://github.com/snowplow/snowplow/tree/master/3-etl/emr-etl-runner
[hive-etl]: https://github.com/snowplow/snowplow/tree/master/3-etl/hive-etl
[trackers]: https://github.com/snowplow/snowplow/tree/master/1-trackers
[collectors]: https://github.com/snowplow/snowplow/tree/master/2-collectors
[getting-started]: http://snowplowanalytics.com/product/get-started.html

[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git
[ruby-install]: http://www.ruby-lang.org/en/downloads/
[nokogiri-install]: http://nokogiri.org/tutorials/installing_nokogiri.html
[rubygems-install]: http://docs.rubygems.org/read/chapter/3

[config-yml]: https://github.com/snowplow/snowplow/blob/master/3-etl/emr-etl-runner/config/config.yml
[bash-script]: https://github.com/snowplow/snowplow/blob/master/3-etl/emr-etl-runner/bin/snowplow-emr-etl-runner.sh

[cronic]: http://habilis.net/cronic/
[jenkins]: http://jenkins-ci.org/
[hudson]: http://hudson-ci.org/
[jenkins-tutorial]: http://blog.lusis.org/blog/2012/01/23/lowtech-monitoring-with-jenkins/
[windows-task-scheduler]: http://en.wikipedia.org/wiki/Windows_Task_Scheduler#Task_Scheduler_2.0

[storage-loader]: https://github.com/snowplow/snowplow/wiki/Setting-up-SnowPlow#wiki-step4
[emr-analysis]: https://github.com/snowplow/snowplow/wiki/Setting-up-SnowPlow#wiki-step5