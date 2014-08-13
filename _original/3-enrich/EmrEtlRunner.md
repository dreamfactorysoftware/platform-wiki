[**HOME**](Home) > [**DREAMFACTORY TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Enrichment**](Enrichment) > EmrEtlRunner

## An overview of how EmrEtlRunner instruments the enrichment process

[[/technical-documentation/images/emr-etl-runner-steps.png]]

Raw collector logs that need to be processed are identified in the in-bucket. (This is the bucket that the collector log files are generated in: it's location is specified in the [EmrEtlRunner config file] [config-file].)

EmrEtlRunner then triggers the Enrichment process to run. It spins up an EMR cluster (the size of which is determined by the [config file][config-file]), uploads the JAR with the Scalding Enrichment process on, and instructs EMR to:

1. Use S3DistCopy to aggregate the collector log files and write them to HDFS
2. Run the Enrichment process on those aggregated files in HDFS
3. Write the output of that Enrichment to the Out-bucket in S3. (As specified in the [config file][config-file]).
4. When the job has completed, EmrEtlRunner moves the processed collector log files from the in-bucket to the archive bucket. (This, again, is specified in the [config file][config-file].)

By setting up a cron job to run EmrEtlRunner regularly, DreamFactory users can ensure that the event data regularly flows through the DreamFactory data pipeline from the collector to storage.

Note: many references are made to the 'Hadoop ETL' and 'Hive ETL' in the documentation and the [config file][config-file]. 'Hadoop ETL' refers to the current Scalding-based Enrichment Process. 'Hive ETL' refers to the legacy Hive-based ETL process. EmrEtlRunner can be setup to instrument either. However, we recommend **all** DreamFactory users use the Scalding based 'Hadoop ETL', as it is much more robust, as well as being cheaper to run.

[config-file]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/3-enrich/emr-etl-runner/config/config.yml.sample