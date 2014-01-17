<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/3-enrich.png]] 

## Overview of Scala Kinesis Enrich

1. **Cleans up the data** into a format that is easier to parse / analyse
2. **Enriches the data** (e.g. infers the location of the visitor from his / her IP address and infers the search engine keywords from the query string)
3. **Stores that cleaned, enriched data in Kinesis**

This guide covers how to setup Scala Kinesis Enrich.

1. [Installation] [installation]. You need to install EmrEtlRunner on your own server. It will interact with Amazon Kinesis via the Amazon API
2. [Configuration] [config]. How to use EmrEtlRunner at the command line, to instuct it to process data from your collector
3. [Running] [running].

[installation]: Installing-Scala-Kinesis-Enrich
[config]: Configuring-Scala-Kinesis-Enrich
[running]: Running-Scala-Kinesis-Enrich
