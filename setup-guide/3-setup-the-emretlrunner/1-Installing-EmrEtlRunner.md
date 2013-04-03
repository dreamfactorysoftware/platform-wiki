<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 3: setting up EmrEtlRunner**](Setting-up-EmrEtlRunner) > [1: Installing EmrEtlRunner](1-Installing-EmrEtlRunner)

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

You will need to setup EmrEtlRunner on your own server. A number of people choose to do so on an EC2 instance (thereby keeping all of SnowPlow in the Amazon Cloud). If you do so, please note that you **must not use a `t1.micro` instance**.  You should at the very least use an `m1.small` instance.

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

EmrEtlRunner moves the SnowPlow event data through four distinct buckets during the ETL process. These buckets are as follows:

1. **In Bucket** - contains the raw SnowPlow event logs to process
2. **Processing Bucket** - where EmrEtlRunner moves the raw event logs for processing
3. **Out Bucket** - where EmrEtlRunner stores the processed SnowPlow-format event files
4. **Archive Bucket** - where EmrEtlRunner moves the raw SnowPlow event logs after successful processing

You will have already setup the In Bucket when you were configuring your SnowPlow collector - but the other three buckets do not exist yet. 

**Important:** Please note that currently Redshift can only load from buckets in the US region, so you will need to locate your **Out Bucket** in "us-east-1" region if you are using Redshift. (This is because Redshift is only currently available in the 'us-east-1' region, and Redshift only supports bulk loading from S3 in the same region as Redshift is located.)

So, create the other three buckets in the same AWS region as your In Bucket. Take a note of the buckets' names as you will need to use these buckets shortly.

Done? Right, now we can install EmrEtlRunner.

<a name="installation"/>
## 3. Installation

First, checkout the SnowPlow repository and navigate to the EmrEtlRunner root:

    $ git clone git://github.com/snowplow/snowplow.git
    $ cd snowplow/3-etl/emr-etl-runner
    
If RVM asks you if you want to trust the `.rvmrc` file, type `y`:

    ==============================================================================
    = NOTICE                                                                     =
    ==============================================================================
    = RVM has encountered a new or modified .rvmrc file in the current directory =
    = This is a shell script and therefore may contain any shell commands.       =
    =                                                                            =
    = Examine the contents of this file carefully to be sure the contents are    =
    = safe before trusting it! ( Choose v[iew] below to view the contents )      =
    ==============================================================================
    Do you wish to trust this .rvmrc file? (/home/admin/apps/snowplow/3-etl/emr-etl-runner/.rvmrc)
    y[es], n[o], v[iew], c[ancel]> y 
    Using /home/admin/.rvm/gems/ruby-1.9.3-p374

Next you are ready to install the application on your system:

    $ bundle install --deployment

Check it worked okay:

    $ bundle exec bin/snowplow-emr-etl-runner --version
    snowplow-emr-etl-runner 0.0.8

If you have any problems installing, please double-check that you have successfully completed our [Ruby and RVM setup guide](Ruby-and-RVM-setup).

<a name="configuration"/>
## 4. Configuration

EmrEtlRunner requires a YAML format configuration file to run. There is a configuration file template available in the SnowPlow GitHub repository at [`/3-etl/emr-etl-runner/config/config.yml`] [config-yml]. The template looks like this:

```yaml
:aws:
  :access_key_id: ADD HERE
  :secret_access_key: ADD HERE
:s3:
  :region: ADD HERE
  :buckets:
    # Update assets if you want to host the serde and HiveQL yourself
    :assets: s3://snowplow-emr-assets
    :log: ADD HERE
    :in: ADD HERE
    :processing: ADD HERE
    :out: ADD HERE WITH SUB-FOLDER # If you intend to load data into Redshift, the bucket specified here needs to be located in us-east-1
    :archive: ADD HERE
:emr:
  # Can bump the below as EMR upgrades Hadoop
  :hadoop_version: 1.0.3
  :placement: ADD HERE
  :ec2_key_name: ADD HERE
  # Adjust your Hive cluster below
  :jobflow:
    :instance_count: 2
    :master_instance_type: m1.small
    :slave_instance_type: m1.small
:etl:
  :collector_format: cloudfront 
  :continue_on_unexpected_error: false # You can switch to 'true' if you really don't want the serde throwing exceptions
  :storage_format: redshift # Or 'hive' or 'mysql-infobright'
# Can bump the below as SnowPlow releases new versions
:snowplow:
  :serde_version: 0.5.5
  :hive_hiveql_version: 0.5.7
  :mysql_infobright_hiveql_version: 0.0.8
  :redshift_hiveql_version: 0.0.1
```

To take each section in turn:

### aws

The `aws` variables should be self-explanatory - enter your AWS access key and secret here.

### s3

The `region` variable should hold the AWS region in which your four data buckets (In Bucket, Processing Bucket etc) are located, e.g. "us-east-1" or "eu-west-1". Please note that currently Redshift can only load from buckets in the US region, so you will need to locate your 'out' buckets in "us-east-1" if you are using Redshift.

Within the `s3` section, the `buckets` variables are as follows:

* `assets` holds the ETL job's static assets (HiveQL script plus Hive deserializer). You can leave this as-is (pointing to SnowPlow   Analytics' [own public bucket containing these assets](Hosted-assets)) or replace this with your own private bucket containing the assets
* `log` is the bucket in which Amazon EMR will record processing information for this job run, including logging any errors  
* `in` is where you specify your In Bucket
* `processing` is where you specify your Processing Bucket - **always include a sub-folder on this variable (see below for why)**. 
* `out` is where you specify your Out Bucket - **always include a sub-folder on this variable (see below for why)**. If you are loading data into Redshift, the bucket specified here **must** be located in region us-east-1, as currently Amazon only supports Redshift instances in this region. (So data loaded into Redshift from S3 can only be performed using buckets located in in this region.)
* `archive` is where you specify your Archive Bucket

Each of the bucket variables must start with an S3 protocol - either `s3://` or `s3n://`. Each variable can include a sub-folder within the bucket as required, and a trailing slash is optional.

**Important 1:** there is a bug in Hive on Amazon EMR where Hive dies if you attempt to read or write data to the root of an S3 bucket. **Therefore always specify a sub-folder (e.g. `/events/`) for the `processing` and `out` bucket variables.**

**Important 2:** do not put your Processing Bucket location inside your In Bucket, or your Out Bucket inside your Processing Bucket, or you will create circular references which EmrEtlRunner cannot resolve when moving files.

**Important 3:** if you are using the **Clojure collector**, the path to your `in` bucket will be of the format: 

	s3://elasticbeanstalk-{{REGION NAME}}-{{UUID}}/resources/environments/logs/publish/{{SECURITY GROUP IDENTIFIER}}

Replace all of these `{{x}}` variables with the appropriate ones for your environment (which you should have written down in the [Enable logging to S3] (Enable-logging-to-S3) stage of the Clojure Collector setup).

Also - Clojure collector uses should be sure not include an `{{INSTANCE IDENTIFIER}}` at the end of your path. This is because your Clojure Collector may end up logging into multiple `{{INSTANCE IDENTIFIER}}` folders. (If e.g. Elastic Beanstalk spins up more instances to run the Clojure collector, to cope with a spike in traffic.) By specifying your In Bucket only to the level of the Security Group identifier, you make sure that SnowPlow can process all logs from all instances. (Because the EmrEtlRunner will process all logs in all subfolders.)

**Important 4:** if you are loading SnowPlow data into Redshift, you need to make sure that the bucket specified in `:out:` is located in the `us-east-1` region. That is because currently Redshift is only available in this Region, and Amazon only supports bulk loading of data from S3 into Redshift within regions. 

**Example bucket settings**

The following are all valid bucket settings. (For a business running the Cloudfront collector):

    :buckets:
      :assets: s3://my-public-snowplow-assets
      :in: s3n://my-cloudfront-logs/
      :processing: s3n://my-cloudfront-logs/processing
      :out: s3n://my-snowplow-data/events

Please note that all buckets must exist prior to running EmrEtlRunner.

### emr

The EmrEtlRunner makes use of Amazon Elastic Mapreduce (EMR) to process the raw log files and output the cleaned, enriched SnowPlow events table.

This section of the configu file is where we configure the operation of EMR. The variables with defaults can typically be left as-is, but you will need to set:

1. `placement`, which is the Amazon EC2 region and availability zone
   in which the job should run, e.g. "us-east-1a" or "eu-west-1b"
2. `ec2_key_name`, which is the name of the Amazon EC2 key that you
   set up in the [Dependencies](#dependencies) above

Make sure that placement and the EC2 key you specify both belong to the same region, or else EMR won't be able to find the key.

#### etl

This section is where we configure exactly how we want our ETL process to operate:

1. `collector_format`, what format is our collector saving data in? Currently two formats are supported: "cloudfront" (if you are running the Cloudfront collector), or "clj-tomcat" if you are running the Clojure collector
2. `continue_on_unexpected_error`, continue processing even on unexpected row-level errors, e.g. an input file not matching the expected CloudFront format. Off ("false") by default
3. `storage_format`, can be "hive" or "non-hive". We discuss this further below

`storage_format` is an important setting. If you choose "hive", then the SnowPlow event format outputted by EmrEtlRunner will be optimised to only work with Hive - you will **not** be able to load those event files into other database systems, such as Infobright or Redshift. We believe that most people will want to load their SnowPlow events into other systems, so the default setting here is "redshift", but you can also change this to "mysql-infobright".

### snowplow

This section allows you to update the versions of the Hive deserializer (`serde`) and HiveQL scripts (`hive_hiveql`, `mysql_infobright_hiveql` and `redshift_hiveql_hiveql`) run by EmrEtlRunner. These variables let you upgrade the ETL process without having to update the EmrEtlRunner application itself.

<a name="next-steps" />
## 5. Next steps

All done installing EmrEtlRunner? Then [learn how to use it] [using-emretlrunner]


[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git
[config-yml]: https://github.com/snowplow/snowplow/blob/master/3-etl/emr-etl-runner/config/config.yml
[using-emretlrunner]: 2-Using-EmrEtlRunner