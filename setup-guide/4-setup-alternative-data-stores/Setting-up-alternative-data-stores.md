<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores)

[[/images/4-storage.png]] 

1. [Overview](#overview)
2. [Setting up SnowPlow to work with additional data stores](#datastores)

## Overview

SnowPlow supports storing your data in multiple different data stores:

| **Storage**               | **Description**                                     | **Status**       |
|:--------------------------|:----------------------------------------------------|:-----------------|
| S3                        | Data is stored in the S3 file system where it can be analysed using [EMR] [emr] (e.g. Hive, Pig, Mahout) | Production-ready |
| [Infobright] [infobright] | An open source columnar database accessible via the MySQL JDBC driver. (So compatible with a wide range of analytics tools.) Optimized for performing OLAP analysis. Scales to Terabytes | Production-ready |
| [Redshift] [redshift]     | A columnar database offered as a service on EMR. Optimized for performing OLAP analysis. Scales to Petabytes | Coming-soon |
| [SkyDB] [skydb]           | Open source database for analysis of behavioural / event data | Coming soon |

By [setting up the EmrEtlRunner](setting-up-the-emretlrunner) (in the previous step), you are already successfully loading your data into S3 where it is accessible to EMR for analysis.

If you wish to analyse your data using a wider range of tools (e.g. BI tools like [ChartIO] [chartio]), you will want to load your data into a columnar database like Infobright to support enable use of these tools.

The [StorageLoader] [storageloader] is an application to make it simple to keep an updated copy of your data in multiple data sources including Infobright. Setting up SnowPlow so that you can maintain a copy of your data in a database like Infobright is a two step process:

1. Create a database and table in Infobright for the data
2. Setup the [StorageLoader] [storageloader] so that it regularly updates that table with the latest data from S3

<a name="datastores" />
## Setting up SnowPlow to work with additional data stores

Select the appropriate option below to walk through the steps necessary to setup SnowPlow with the following data stores:

1. [Set up Infobright to work with SnowPlow] [setup-infobright]
2. Setup Redshift to work with SnowPlow (coming soon)
3. Setup SkyDB to work with SnowPlow (coming soon)

**After** you have setup one or more of the above databases, you need to:

* [Set up the StorageLoader to regularly transfer SnowPlow data into your new store] [storage-loader-setup]

[emr]: http://aws.amazon.com/elasticmapreduce/
[infobright]: http://www.infobright.org/
[redshift]: http://aws.amazon.com/redshift/
[skydb]: http://skydb.io/
[chartio]: http://chartio.com/
[storageloader]: https://github.com/snowplow/snowplow/tree/master/4-storage/storage-loader
[setup-infobright]: Setting-up-Infobright
[storage-loader-setup]: StorageLoader-setup