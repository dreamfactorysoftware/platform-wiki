<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/3-enrich.png]]

A Snowplow Enrich application processes data from a
[Snowplow Collector](Setting-up-a-Collector),
and [stores enriched data](Setting-up-alternative-data-storage)
in a persistent database.

1. [Choose a Collector](#choose)
2. [Setup your Collector](#setup)

<a name="choose" />
## 1. Choose a Collector

There are currently two collectors available for setup:

| **Collector**                                  | **Description**                                     | **Status**       |
|:-----------------------------------------------|:----------------------------------------------------|:-----------------|
| [EmrEtlRunner](setting-up-EmrEtlRunner)        | An application that parses logs from a Collector and stores enriched events to S3. | Production-ready |
| [Scala Kinesis Enrich](setting-up-scala-kinesis-enrich) | A Scala application that reads Thrift events from a Kinesis stream and outputs back to a Kinesis stream. | Testing |

For other collectors and their approximate timelines, please see the [Product roadmap](Product-roadmap).

<a name="setup" />
## 2. Setup your Collectors

1. [Setup EmrEtlRunner](setting-up-EmrEtlRunner)
2. [Setup Scala Kinesis Enrich](setting-up-scala-kinesis-enrich)

Back to [Snowplow setup](Setting-up-Snowplow).
