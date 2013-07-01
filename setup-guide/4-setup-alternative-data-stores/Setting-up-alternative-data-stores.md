<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/4-storage.png]] 

1. [Overview](#overview)
2. [Setting up Snowplow to work with additional data stores](#datastores)

## Overview

Snowplow supports storing your data in two different data stores:

| **Storage**               | **Description**                                     | **Status**       |
|:--------------------------|:----------------------------------------------------|:-----------------|
| S3                        | Data is stored in the S3 file system where it can be analysed using [EMR] [emr] (e.g. Hive, Pig, Mahout) | Production-ready |
| [Redshift] [setup-redshift]| A columnar database offered as a service on EMR. Optimized for performing OLAP analysis. Scales to Petabytes | Production-ready |
| PostgreSQL                | A popular, open source, RDBMS database              | Coming soon      | 

By [setting up the EmrEtlRunner](setting-up-EmrEtlRunner) (in the previous step), you are already successfully loading your Snowplow event data into S3 where it is accessible to EMR for analysis.

If you wish to analyse your data using a wider range of tools (e.g. BI tools like [ChartIO] [chartio] or [Tableau] [tableau], or statistical tools like [R] [r]), you will want to load your data into a database like Amazon's [Redshift] [redshift] or PostgreSQL to support enable use of these tools.

The [StorageLoader] [storage-loader-setup] is an application to make it simple to keep an updated copy of your data in Redshift. Setting up Snowplow so that you can maintain a copy of your data in a database like Redshift is a two step process:

1. [Create a database and table in Amazon Redshift for the data] [setup-redshift]
2. Setup the [StorageLoader] [storage-loader-setup] so that it regularly updates that table with the latest data from S3

<a name="datastores" />
## Setting up Snowplow to work with additional data stores

Currently, the only supported datastore for Snowplow data is Redshift. PostgreSQL support is coming soon. To ensure that your Snowplow data regularly, automatically, populates a database in Redshift, you need to:

1. [Set up Redshift to work with Snowplow] [setup-redshift]
2. [Set up the StorageLoader to regularly transfer Snowplow data into your new store] [storage-loader-setup]

All done? Then [start analysing your data][analyse].

[emr]: http://aws.amazon.com/elasticmapreduce/
[infobright]: http://www.infobright.org/
[redshift]: http://aws.amazon.com/redshift/
[skydb]: http://skydb.io/
[chartio]: http://chartio.com/
[storageloader]: https://github.com/snowplow/snowplow/tree/master/4-storage/storage-loader
[setup-redshift]: setting-up-redshift
[setup-infobright]: Setting-up-Infobright
[storage-loader-setup]: 1-Installing-the-StorageLoader
[tableau]: http://www.tableausoftware.com/
[analyse]: Setting-up-Snowplow#step5
[r]: http://www.r-project.org/