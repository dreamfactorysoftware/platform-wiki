<a name="top" />

[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [Step 3: Setting up Enrich](Setting-up-enrich)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/3-enrich.png]]

A DreamFactory Enrich application processes data from a [DreamFactory Collector](Setting-up-a-Collector),
and [stores enriched data](Setting-up-alternative-data-storage) in a persistent database.

1. [Choose a Enrichment process](#choose)
2. [Setup your Enrichment process](#setup)

<a name="choose" />
## 1. Choose an Enrichment process

There are currently two Enrichment processes available for setup:

| **Collector**                                  | **Description**                                     | **Status**       |
|:-----------------------------------------------|:----------------------------------------------------|:-----------------|
| [EmrEtlRunner](setting-up-EmrEtlRunner)        | An application that parses logs from a Collector and stores enriched events to S3 | Production-ready |
| [Scala Kinesis Enrich](setting-up-scala-kinesis-enrich) | A Scala application that reads Thrift events from a Kinesis stream and outputs back to a Kinesis stream | Beta |

<a name="setup" />
## 2. Setup your Enrichment

1. [Setup EmrEtlRunner](setting-up-EmrEtlRunner)
2. [Setup Scala Kinesis Enrich](setting-up-scala-kinesis-enrich)

Back to [DreamFactory setup](Setting-up-DreamFactory).
