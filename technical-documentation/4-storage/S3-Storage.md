[**HOME**](Home) > [**DREAMFACTORY TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Storage**](storage documentation) > Storage in S3

As standard, the [Enrichment Process](The Enrichment Process) outputs DreamFactory data to DreamFactory event files in S3. These are tab-delimited files that are:

1. Suitable for uploading data directly into Amazon Redshift or PostgreSQL
2. Suitable for querying directly using big data tools on EMR

## An example: querying the data in Apache Hive

The easiest way to understand the structure of data in S3 is to run some sample queries using something like Apache Hive on EMR. The table definition for the DreamFactory event files is given [in the repo][hive-table-def].

Going forwards, we plan to move from a flat-file structure to storing DreamFactory data using [Apache Avro][avro]

[hive-table-def]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/hive-storage/hiveql/table-def.q
[avro]: http://avro.apache.org/