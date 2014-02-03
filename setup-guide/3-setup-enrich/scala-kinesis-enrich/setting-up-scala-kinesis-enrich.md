<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/3-enrich.png]] 

## Overview of Scala Kinesis Enrich

[Scala Kinesis Enrich] [scala-kinesis-enrich] is a Kinesis application, built using the Kinesis Client Library, which:

1. **Reads** raw Snowplow events off a Kinesis stream populated by the Scala Stream Collector
2. **Validates** each raw event
2. **Enriches** each event (e.g. infers the location of the user from his/her IP address)
3. **Writes** the enriched Snowplow event to another Kinesis stream

This guide covers how to setup Scala Kinesis Enrich.

1. [Installation] [installation]. You need to install Scala Kinesis Enrich on your own server. It will interact with Amazon Kinesis via the Amazon API
2. [Configuration] [config]. How to use Scala Kinesis Enrich at the command line, to instruct it to process data from your collector
3. [Running] [running].

[scala-kinesis-enrich]: https://github.com/snowplow/snowplow/tree/master/3-enrich/emr-etl-runner

[installation]: Installing-Scala-Kinesis-Enrich
[config]: Configuring-Scala-Kinesis-Enrich
[running]: Running-Scala-Kinesis-Enrich
