[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analysing Snowplow data**](Getting-started-analysing-Snowplow-data) > [**Getting started with EMR and Hive**](Getting-started-with-EMR) > [Getting started querying your data with Hive](Running-Hive-using-the-command-line-tools)

Many of the analyses we perform in Snowplow use Hive. We tend to use Hive Interactive Sessions to develop queries and analyses. Once a set of queries has been developed in the interactive sessions, they can be stored as a text file in S3 and run as a batch process directly from the Elastic Mapreduce Command Line tools.

This part of the guide walks through the process of launching and running a Hive Interactive session. The steps involved are:

1. [Starting a job](#startingajob) i.e. firing up a set of instances to run Hive / Hadoop
2. [SSHing in to the instances and launching Hive](#sshin)
3. [Running Hive queries](#runninghivequeries)
4. [Terminating the session](#terminatingthesession)

Most of the analyses we perform are in Hive interactive sessions: because it is in these types of sessions that we can actively query data, explore results and develop more sophisticated analyses.

New sessions can either be initiated at the command-line, or via aws.amazon.com console. 

<a name="startingajob"/>
## 1. Starting a job

There are 2 ways to start a job / fire up instances to run Hive: 

1. [Using the Ruby Client](#usingtherubyclient)
2. [From the Amazon Web UI](#fromtheamazonwebui)

<a name="usingtherubyclient"/>
### 1.1 Starting a job using the Ruby Client

#### 1.1.1 Starting a job using the Ruby Client on Mac / Linux

Note: the command line tools require Ruby 1.8.7 to run, so you may need to execute if you use Ruby 1.9 or later as standard:

	$ rvm use 1.8.7

To initiative a new session on Mac / Linux, navigate to the `elastic-mapreduce-cli` folder (where you saved the command-line tools) and enter

	$ ./elastic-mapreduce --create --alive --name "Hive Job Flow" --hive-interactive

Note: The Ruby command line interface tools uses the security information you provided in the `credentials.json` file and takes a set of default values for e.g. the number of instances that are fired up. For more details, consult the [EMR command line tools documentation](http://aws.amazon.com/developertools/2264).

The command line tools should return the job ID of the job you've just created:

	$ ./elastic-mapreduce --create --alive --name "Hive Job Flow" --hive-interactive
	Created job flow j-2HP3I6BHDI3EB

If rather than run an interactive version, you wanted to execute a script (i.e. file containing multiple Hive commands), you would upload the script to s3 and then run the following command:

	$ ./elastic-mapreduce --create --name "script example" --hive-script s3://{{bucket-name}}/{{path of script file}}

#### 1.1.2 Starting a job using the Ruby Client on PC

TO WRITE: Add instructions to launch a session from the PC command-line, incl. setting up Putty and Pageant to SSH successfully

<a name="fromtheamazonwebui" />
### 1.2 Starting a job using the web UI

TO WRITE: Add instructions on creating jobs via the Amazon web UI. 

### Checking that the job has been setup using the Amazon web UI

Note: this will work however you initiated the job. (Whether you used the Ruby Client or the Web UI.)

Log into the [Amazon Web Console](https://console.aws.amazon.com/console/home) and click on [Elastic MapReduce] in the top menu bar. You should see the job you created listed. (In the screenshot below you'll see that we've initiated 2 Hive sessions.)

![Launch a Hive session from the command-line](setup-guide/images/emr-guide/run-hive-interactive-session-2.jpg)

Note: you can also check on the status of your current jobs via the command-line interface:

	./elastic-mapreduce --list

The above command will list all the current jobs including their statuses.

<a name="sshin"/>
## 2. Establishing an SSH connection

### 2.1 Establishing the SSH connection: Mac / Linux users

Return to the command-line, establish an SSH connection by entering the following

	$ ./elastic-mapreduce --ssh --jobflow {{JobFlowID}}

You can get your jobflowID either from the Amazon web UI or by listing all the jobs using the `./elastic-mapreduce --list` command line tool.

Substituting the JobFlowID generated when you created the session. You should see somethign like this:

	$ ./elastic-mapreduce --ssh --jobflow j-2HP3I6BHDI3EB                                                                                
	ssh -o ServerAliveInterval=10 -o StrictHostKeyChecking=no -i /home/alex/.emr/snplow-nasqueron-3.pem hadoop@ec2-54-216-57-136.eu-west-1.compute.amazonaws.com 
	Warning: Permanently added 'ec2-54-216-57-136.eu-west-1.compute.amazonaws.com,54.216.57.136' (RSA) to the list of known hosts.
	Linux (none) 3.2.30-49.59.amzn1.i686 #1 SMP Wed Oct 3 19:55:00 UTC 2012 i686
	--------------------------------------------------------------------------------

	Welcome to Amazon Elastic MapReduce running Hadoop and Debian/Squeeze.
	 
	Hadoop is installed in /home/hadoop. Log files are in /mnt/var/log/hadoop. Check
	/mnt/var/log/hadoop/steps for diagnosing step failures.

	The Hadoop UI can be accessed via the following commands: 

	  JobTracker    lynx http://localhost:9100/
	  NameNode      lynx http://localhost:9101/
	 
	--------------------------------------------------------------------------------


Now you can launch Hive by typing `Hive` at the command line:

	hadoop@ip-10-48-14-37:~$ hive
	Logging initialized using configuration in file:/home/hadoop/.versions/hive-0.8.1/conf/hive-log4j.properties
	Hive history file=/mnt/var/lib/hive_081/tmp/history/hive_job_log_hadoop_201307011147_320147478.txt
	hive>

### 2.2 Establishing the SSH connection: PC users

TO WRITE

<a name="runninghivequeries"/>
## 3. Running Hive queries

Snowplow data is stored in a table called `events`. Before we can query it, we need to let Hive know about it (define it in Hive). We do so using the `CREATE EXTERNAL TABLE` statement:

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS `events` (
app_id string,
platform string,
collector_tstamp timestamp,
dvce_tstamp timestamp,
event string,
event_vendor string,
event_id string,
txn_id int,
v_tracker string,
v_collector string,
v_etl string,
user_id string,
user_ipaddress string,
user_fingerprint string,
domain_userid string,
domain_sessionidx smallint,
network_userid string,
geo_country string,
geo_region string,
geo_city string,
geo_zipcode string,
geo_latitude double,
geo_longitude double,
page_title string,
page_urlscheme string,
page_urlhost string,
page_urlport int, 
page_urlpath string,
page_urlquery string,
page_urlfragment string,
refr_urlscheme string,
refr_urlhost string,
refr_urlport int,
refr_urlpath string,
refr_urlquery string,
refr_urlfragment string,
refr_medium string,
refr_source string,
refr_term string,
mkt_medium string,
mkt_source string,
mkt_term string,
mkt_content string,
mkt_campaign string,
se_category string,
se_action string,
se_label string,
se_property string,
se_value double,
tr_orderid string,
tr_affiliation string,
tr_total double,
tr_tax double,
tr_shipping double,
tr_city string,
tr_state string,
tr_country string,
ti_orderid string,
ti_sku string,
ti_name string,
ti_category string,
ti_price double,
ti_quantity int,
pp_xoffset_min int,
pp_xoffset_max int,
pp_yoffset_min int,
pp_yoffset_max int,
useragent string,
br_name string,
br_family string,
br_version string,
br_type string,
br_renderengine string,
br_lang string,
br_features_pdf boolean,
br_features_flash boolean,
br_features_java boolean,
br_features_director boolean,
br_features_quicktime boolean,
br_features_realplayer boolean,
br_features_windowsmedia boolean,
br_features_gears boolean ,
br_features_silverlight boolean,
br_cookies boolean,
br_colordepth string,
br_viewwidth int,
br_viewheight int,
os_name string,
os_family string,
os_manufacturer string,
os_timezone string,
dvce_type string,
dvce_ismobile boolean,
dvce_screenwidth int,
dvce_screenheight int,
doc_charset string,
doc_width int,
doc_height int
)
PARTITIONED BY (run string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
STORED AS TEXTFILE
LOCATION '${EVENTS_TABLE}' ;
```
 
#### Notes:

1. If you are running the StorageLoader to push data into e.g. Redshift or PostgreSQL, you will find your data on S3 to analyse in the archive bucket specified in your StorageLoader configuration file. You should specify this folder name in your table definition on the last line (i.e. substitute it for `${EVENTS_TABLE}` e.g. `LOCATION 's3://snowplow-events-archive-abanalytics-eu/' ;`)
2. If you are **not** running the StorageLoader, because you are **only** analysing your Snowplow data using EMR, then you will find your data to analyse in the `out` bucket specified in the EmrEtlRunner config file. You should specify this folder name in your table definition on the last line (i.e. substitutde it for `${EVENTS_TABLE}` e.g. `LOCATION 's3://snowplow-events-archive-abanalytics-eu/' ;`)
3. The table definition is very similar to the [table definition in Redshift] [redshift-table-def]. The data types have been changed to reflect Hive's data types, and the data is partitioned by 'r' i.e. run_id. (The date / time that EmrEtlRunner processed the raw collector logs and wrote the enriched logs back to S3 for processing in EMR / uploading into Redshift / PostgreSQL.)

In S3, Snowplow data is divided into different folders, where each folder represents one "run" of data. That is why in the table definition, `run` is given as a partitioning field.

We need to tell Hive to look at S3 and identify all the partitions of data that have been saved down:

```sql
ALTER TABLE events RECOVER PARTITIONS;
```

We can then view the partitions:

```sql
SHOW PARTITIONS events;
```

We can now try running some simple queries. Remember: these will take some time from large data sets. (Especially if we're using the default cluster size - which is only two small EC2 instances.) To speed up query performance, limit the volume of data by specifying a data range e.g. `WHERE dt >='2012-09-01 AND dt<='2012-09-25'`.

The following query will return the number of unique visitors by day:

	SELECT 
	to_date(collector_tstamp) AS `Date`,
	COUNT(DISTINCT domain_userid) AS `unique_visitors`
	FROM events
	GROUP BY to_date(collector_tstamp) ;

You will see something like this:

	hive> SELECT
	    > to_date(collector_tstamp) as `dt`,
	    > count(distinct(domain_userid)) as `uniques`
	    > from events 
	    > group by to_date(collector_tstamp);
	Total MapReduce jobs = 1
	Launching Job 1 out of 1
	Number of reduce tasks not specified. Estimated from input data size: 1
	In order to change the average load for a reducer (in bytes):
	  set hive.exec.reducers.bytes.per.reducer=<number>
	In order to limit the maximum number of reducers:
	  set hive.exec.reducers.max=<number>
	In order to set a constant number of reducers:
	  set mapred.reduce.tasks=<number>
	Starting Job = job_201307011142_0001, Tracking URL = http://ip-10-48-14-37.eu-west-1.compute.internal:9100/jobdetails.jsp?jobid=job_201307011142_0001
	Kill Command = /home/hadoop/bin/hadoop job  -Dmapred.job.tracker=10.48.14.37:9001 -kill job_201307011142_0001
	Hadoop job information for Stage-1: number of mappers: 1; number of reducers: 1
	2013-07-01 12:44:48,268 Stage-1 map = 0%,  reduce = 0%
	2013-07-01 12:44:58,477 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:44:59,551 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:00,611 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:01,657 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:02,686 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:03,704 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:04,710 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:05,814 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:06,822 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:07,835 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:08,841 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:09,982 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:10,989 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:12,449 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 3.69 sec
	2013-07-01 12:45:13,477 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 4.27 sec
	2013-07-01 12:45:14,496 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 4.27 sec
	2013-07-01 12:45:15,503 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 4.27 sec
	2013-07-01 12:45:16,684 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:17,691 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:18,733 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:19,757 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:20,834 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:21,841 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	2013-07-01 12:45:22,848 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 5.91 sec
	MapReduce Total cumulative CPU time: 5 seconds 910 msec
	Ended Job = job_201307011142_0001
	Counters:
	MapReduce Jobs Launched: 
	Job 0: Map: 1  Reduce: 1   Accumulative CPU: 5.91 sec   HDFS Read: 319 HDFS Write: 27 SUCCESS
	Total MapReduce CPU Time Spent: 5 seconds 910 msec
	OK
	2013-06-16	5
	2013-06-17	14
	Time taken: 61.877 seconds


There are many other querires you can run - we recommend consulting the [Analysts Cookbook] [analysts-cookbook]. Please note: most of the queries written are for Redshift / PostgreSQL. However, in many cases, these can be  modified to work with Hive quite simply. by substituting more MySQL-like SQL for some of the PostgreSQL commands. (E.g. `CONCAT()` for `||`).


<a name="terminatingthesession"/>
## 4. Terminating the session

Interactive sessions have to be terminated manually. (Or else you risk running up high Amazon fees...) Sessions can either be terminated at the command-line, using the Ruby Client, or via the web UI.

### Terminating the session using the web UI

TO WRITE

### Terminating the session at the command-line using the Ruby Client

To terminate the sessions via the command line, simply exit the session (by typing `exit ;` to escape Hive, then `exit` again at the EC2 command line to end the SSH session.) You then use the EMR command line tools to terminate the session:

	./elastic-mapreduce --terminate --jobflow {{JOBFLOW ID}}

## 5. Want to learn more?

Consult the Snowplow [Analytics Cookbook] [analysts-cookbook] for more Hive recipes.

Return to [get started analysing data](Getting-started-analysing-Snowplow-data).

Return to the [setup guide home](Setting-up-Snowplow).

[analysts-cookbook]: http://snowplowanalytics.com/analytics/index.html
[redshift-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/redshift-storage/sql/table-def.sql
[bucketexplorer]: http://www.bucketexplorer.com/
[cloudberry]: http://www.cloudberrylab.com/