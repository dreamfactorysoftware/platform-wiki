[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Storage**](storage documentation)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/4-storage.png]] 

## Overview

The Enrichment process (module 3, in the diagram above) takes raw Snowplow collector logs (generated in module 2), tidies them up, enriches them (e.g. by adding Geo-IP data, and performing referer parsing) and then writes the output of that process back to S3 as a cleaned up set of Snowplow event files. 

The data in these files can be analysed directly by any big data tool that runs on EMR. This includes [Hive][hive], [Pig][pig] and [Mahout][mahout].

In addition, the [StorageLoader Ruby app][storage-loader] can be used to copy Snowplow data from those event files into [Amazon Redshift][redshift], where it can be analysed using any tool that talks to PostgreSQL. (This includes just about every analytics tool including [R][r], [Tableau][tableau] and [Excel][excel].)

There are therefore a number of different potential storage modules that Snowplow users can store their data in, for analysis in different tools:

1. [S3][s3], for analysis in EMR
2. [Amazon Redshift][redshift], for analysis using a wide range of analytics tools
3. PostgreSQL (coming soon): a useful alternative for companies that do not require Redshift's ability to scale to handle Petabytes of data
4. Neo4J (coming soon): a graph database that enables more efficient and very detailed path analytics
5. SkyDB (coming soon): an event database
6. [Infobright][infobright]: an open source columnar database. This was supported in earlier versions of Snowplow (pre 0.8.0), but is not supported by the most recent version. We plan to add back support for Infobright at a later date.

In addition, this guide also covers the 

1. [Snowplow Canonical Event Model] [canonical-event-model]. This covers the structure of Snowplow data, as stored in S3, Amazon Redshift and PostgreSQL.
2. [The Storage Loader][storage-loader]. This Ruby application is responsible for instrumenting the regular movement of data from S3 into Redshift. (And eventually, PostgreSQL, SkyDB, Neo4J, Infobright etc.)

[hive]: http://hive.apache.org/
[pig]: http://pig.apache.org/
[mahout]: http://mahout.apache.org/
[storage-loader]: The-Storage-Loader
[redshift]: Amazon-Redshift-storage
[r]: http://cran.r-project.org/
[tableau]: http://www.tableausoftware.com/
[excel]: http://office.microsoft.com/en-gb/excel/
[s3]: s3-storage
[redshift]: Amazon-Redshift-storage
[infobright]: infobright-storage
[canonical-event-model]: Canonical-event-model
[storage-loader]: The-Storage-Loader