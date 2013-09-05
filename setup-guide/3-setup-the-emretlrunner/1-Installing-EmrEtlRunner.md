<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 3: setting up EmrEtlRunner**](Setting-up-EmrEtlRunner) > [1: Installing EmrEtlRunner](1-Installing-EmrEtlRunner)

1. [Assumptions](#assumptions)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Next steps](#next-steps)

<a name="assumptions"/>
## 1. Assumptions

This guide assumes that you have administrator access to a Unix-based server (e.g. Ubuntu, OS X, Fedora) on which you can install EmrEtlRunner and schedule a regular cronjob.

_In theory EmrEtlRunner can be deployed onto a Windows-based server, using the Windows Task Scheduler instead of cron, but this has not been tested or documented._

<a name="dependencies"/>
## 2. Dependencies

### 2.1 Hardware

You will need to setup EmrEtlRunner on your own server. A number of people choose to do so on an EC2 instance (thereby keeping all of Snowplow in the Amazon Cloud). If you do so, please note that you **must not use a `t1.micro` instance**.  You should at the very least use an `m1.small` instance.

### 2.2 Software

To install EmrEtlRunner, first make sure that your server has **all** of the following installed:

1. **Git** - see the [Git Installation Guide] [git-install]
2. **Ruby and RVM*** - see our [Ruby and RVM setup guide](Ruby-and-RVM-setup)

\* If you prefer, an alternative Ruby manager such as chruby or rbenv should work fine too.

### 2.3 EC2 key

You will also need an **EC2 key pair** setup in your Amazon EMR account.

For details on how to do this, please see the section "Configuring the client" in the [[Setting up EMR command line tools]] wiki page. Make sure that you setup the EC2 key pair inside the region in which you will be running your ETL jobs.

<a name="s3-buckets"/>
### 2.4 S3 buckets

EmrEtlRunner moves the Snowplow event data through four distinct buckets during the ETL process. These buckets are as follows:

1. **In Bucket** - contains the raw Snowplow event logs to process
2. **Processing Bucket** - where EmrEtlRunner moves the raw event logs for processing
3. **Out Bucket** - where EmrEtlRunner stores the processed Snowplow-format event files
4. **Bad Rows Bucket** - Hadoop ETL only. Where EmrEtlRunner stores any raw event lines which fail validation
5. **Errors Bucket** - Hadoop ETL only. Where EmrEtlRunner stores any raw event lines which caused an unexpected error
5. **Archive Bucket** - where EmrEtlRunner moves the raw Snowplow event logs after successful processing

You will have already setup the In Bucket when you were configuring your Snowplow collector - but the other three buckets do not exist yet. 

**Important:** Please note that currently Redshift can only load from buckets in the US region, so you will need to locate your **Out Bucket** in "us-east-1" region if you are using Redshift. (This is because Redshift is only currently available in the 'us-east-1' region, and Redshift only supports bulk loading from S3 in the same region as Redshift is located.)

So, create the other three buckets in the same AWS region as your In Bucket. Take a note of the buckets' names as you will need to use these buckets shortly.

Done? Right, now we can install EmrEtlRunner.

<a name="installation"/>
## 3. Installation

First, checkout the Snowplow repository and navigate to the EmrEtlRunner root:

    $ git clone git://github.com/snowplow/snowplow.git
    $ cd snowplow/3-enrich/emr-etl-runner
    
Next you are ready to install the application on your system:

    $ bundle install --deployment

Check it worked okay:

    $ bundle exec bin/snowplow-emr-etl-runner --version
    snowplow-emr-etl-runner 0.0.8

If you have any problems installing, please double-check that you have successfully completed our [Ruby and RVM setup guide](Ruby-and-RVM-setup).

<a name="configuration"/>
## 4. Configuration

EmrEtlRunner requires a YAML format configuration file to run. There is a configuration file template available in the Snowplow GitHub repository at [`/3-enrich/emr-etl-runner/config/config.yml.sample`] [config-yml]. The template looks like this:

```yaml
:aws:
  :access_key_id: ADD HERE
  :secret_access_key: ADD HERE
:s3:
  :region: ADD HERE
  :buckets:
    :assets: s3://snowplow-hosted-assets # DO NOT CHANGE unless you are hosting the jarfiles etc yourself in your own bucket
    :log: ADD HERE
    :in: ADD HERE
    :processing: ADD HERE
    :out: ADD HERE WITH SUB-FOLDER # e.g. s3://my-out-bucket/events
    :out_bad_rows: ADD HERE        # e.g. s3://my-out-bucket/bad-rows
    :out_errors: ADD HERE # Leave blank unless :continue_on_unexpected_error: set to true below
    :archive: ADD HERE
:emr:
  # Can bump the below as EMR upgrades Hadoop
  :hadoop_version: 1.0.3
  :placement: ADD HERE
  :ec2_key_name: ADD HERE
  # Adjust your Hadoop cluster below
  :jobflow:
    :master_instance_type: m1.small
    :core_instance_count: 2
    :core_instance_type: m1.small
    :task_instance_count: 0 # Increase to use spot instances
    :task_instance_type: m1.small
    :task_instance_bid: 0.015 # In USD. Adjust bid, or leave blank for non-spot-priced (i.e. on-demand) task instances
:etl:
  :job_name: SnowPlow ETL # Give your job a name
  :hadoop_etl_version: 0.3.4 # Version of the Hadoop ETL
  :collector_format: cloudfront # Or 'clj-tomcat' for the Clojure Collector
  :continue_on_unexpected_error: false # You can switch to 'true' (and set :out_errors: above) if you really don't want the ETL throwing exceptions
```

To take each section in turn:

### aws

The `aws` variables should be self-explanatory - enter your AWS access key and secret here.

### s3

The `region` variable should hold the AWS region in which your four data buckets (In Bucket, Processing Bucket etc) are located, e.g. "us-east-1" or "eu-west-1". Please note that Redshift can only load data from S3 buckets located in the same region as the Redshift instance, and Amazon has not to date launched Redshift in *every* region. So make sure that if you're using Redshift, the bucket specified here is in a region that supports Redshift.

Within the `s3` section, the `buckets` variables are as follows:

* `assets` holds the ETL job's static assets (HiveQL script plus Hive deserializer). You can leave this as-is (pointing to Snowplow   Analytics' [own public bucket containing these assets](Hosted-assets)) or replace this with your own private bucket containing the assets
* `log` is the bucket in which Amazon EMR will record processing information for this job run, including logging any errors  
* `in` is where you specify your In Bucket
* `processing` is where you specify your Processing Bucket - **always include a sub-folder on this variable (see below for why)**. 
* `out` is where you specify your Out Bucket - **always include a sub-folder on this variable (see below for why)**. If you are loading data into Redshift, the bucket specified here **must** be located in a region where Amazon has launched Redshift, because Redshift can only bulk load data from S3 that is located in the same region as the Redshift instance, and Redshift has not, to-date, been launched across all Amazon regions.
* `out_bad_rows` is where you specify your Bad Rows Bucket. This will store any raw Snowplow log lines which did not pass the ETL’s validation, along with their validation errors. This is only required for the 'hadoop' ETL implementation (our latest version). It should be left blank if you are running the legacy 'hive' implementation
* `out_errors` is where you specify your Errors Bucket. If you set continue_on_unexpected_error to true (see below), then this bucket will contain any raw Snowplow log lines which caused an unexpected error
* `archive` is where you specify your Archive Bucket

Each of the bucket variables must start with an S3 protocol - either `s3://` or `s3n://`. Each variable can include a sub-folder within the bucket as required, and a trailing slash is optional.

**Important 1:** there is a bug in Hive on Amazon EMR where Hive dies if you attempt to read or write data to the root of an S3 bucket. **Therefore always specify a sub-folder (e.g. `/events/`) for the `processing` and all three `out` bucket variables.**

**Important 2:** do not put your Processing Bucket location inside your In Bucket, or your Out Bucket inside your Processing Bucket, or you will create circular references which EmrEtlRunner cannot resolve when moving files.

**Important 3:** if you are using the **Clojure collector**, the path to your `in` bucket will be of the format: 

	s3://elasticbeanstalk-{{REGION NAME}}-{{UUID}}/resources/environments/logs/publish/{{SECURITY GROUP IDENTIFIER}}

Replace all of these `{{x}}` variables with the appropriate ones for your environment (which you should have written down in the [Enable logging to S3](Enable-logging-to-S3) stage of the Clojure Collector setup).

Also - Clojure collector uses should be sure not include an `{{INSTANCE IDENTIFIER}}` at the end of your path. This is because your Clojure Collector may end up logging into multiple `{{INSTANCE IDENTIFIER}}` folders. (If e.g. Elastic Beanstalk spins up more instances to run the Clojure collector, to cope with a spike in traffic.) By specifying your In Bucket only to the level of the Security Group identifier, you make sure that Snowplow can process all logs from all instances. (Because the EmrEtlRunner will process all logs in all subfolders.)

**Important 4:** if you are loading Snowplow data into Redshift, you need to make sure that the bucket specified in `:out:` is located in a region where Amazon has launched Redshift. That is because currently Redshift is only available in some Regions, and Amazon only supports bulk loading of data from S3 into Redshift from within the same region. 

**Example bucket settings**

Here is an example configuration: 

```yaml
:buckets:
  :assets: s3://snowplow-hosted-assets
  :in: s3n://my-snowplow-logs/
  :log: s3n://my-snowplow-etl/logs/
  :processing: s3n://my-snowplow-etl/processing/
  :out: s3n://my-snowplow-data/events/
  :out_bad_rows: s3n://my-snowplow-data/bad-rows/
  :out_errors: s3n://my-snowplow-data/error-rows/
  :archive: s3n://my-snowplow-archive/raw/
```

Please note that all buckets must exist prior to running EmrEtlRunner; trailing slashes are optional.

### emr

The EmrEtlRunner makes use of Amazon Elastic Mapreduce (EMR) to process the raw log files and output the cleaned, enriched Snowplow events table.

This section of the config file is where we configure the operation of EMR. The variables with defaults can typically be left as-is, but you will need to set:

1. `placement`, which is the Amazon EC2 region **and** availability zone
   in which the job should run, e.g. "us-east-1a" or "eu-west-1b"
2. `ec2_key_name`, which is the name of the Amazon EC2 key that you
   set up in the [Dependencies](#dependencies) above

Make sure that placement and the EC2 key you specify both belong to the same region, or else EMR won't be able to find the key.

It's strongly recommended that you choose the same Amazon EC2 placement as your S3 buckets are located in.

#### etl

This section is where we configure exactly how we want our ETL process to operate:

1. `job_name`, the name to give our ETL job. This makes it easier to identify your ETL job in the Elastic MapReduce console
2. `hadoop_etl_version` is the version of the Hadoop ETL process to run. This variable lets you upgrade the ETL process without having to update the EmrEtlRunner application itself
3. `collector_format`, what format is our collector saving data in? Currently two formats are supported: "cloudfront" (if you are running the Cloudfront collector), or "clj-tomcat" if you are running the Clojure collector
4. `continue_on_unexpected_error`, continue processing even on unexpected row-level errors, e.g. an input file not matching the expected CloudFront format. Off ("false") by default

<a name="next-steps" />
## 5. Next steps

All done installing EmrEtlRunner? Then [learn how to use it] [using-emretlrunner]

[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git
[config-yml]: https://github.com/snowplow/snowplow/blob/master/3-enrich/emr-etl-runner/config/config.yml.sample
[using-emretlrunner]: 2-Using-EmrEtlRunner