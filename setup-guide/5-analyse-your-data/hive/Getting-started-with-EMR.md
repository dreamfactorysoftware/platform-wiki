[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analysing Snowplow data**](Getting-started-analysing-Snowplow-data) > [**Getting started with EMR and Hive**](Getting-started-with-EMR)

## An overview of Amazon Elastic Mapreduce

Elastic Mapreduce (EMR) is a service provided by Amazon that makes it relatively straight forward to use Hadoop and Hadoop-powered tools (e.g. Hive, Pig, Mahout, Cascading) to process data stored in S3. Amazon has made it easy to spin up clusters of machines of varying sizes to process large volumes of data, and spin them down once querying is complete. 

Because Snowplow data is stored on S3 and Snowplow data volumes are often very large, processing them using Hadoop on EMR is a particularly attractive option for a wealth of analysis. This is especially true for people who wish to run machine learning algorithms on the Snowplow data set using Mahout. (E.g. to develop recommendation engines or segment audience by behaviour.)

More details on EMR can be found on the [Amazon website](http://aws.amazon.com/elasticmapreduce/).

## Getting started with EMR and Hive

In this guide we cover the steps necessary to get up and running with EMR and querying your data using Hive, which is the most straightforward of the Hadoop-powered services listed above. This guide has two parts:

1. [Setting up command line tools](setting-up-emr-command-line-tools). You can use these to fire up analysis clusters and launch jobs
2. [An introduction to using Hive with the command line tools](Running-Hive-using-the-command-line-tools). An example of using the above tools to query your Snowplow data using Hive.

We plan to add a guide to using Mahout to segment users in Snowplow by behaviour in the near future.

## Ready to get started?

Then [set up the command line tools](setting-up-emr-command-line-tools)!

