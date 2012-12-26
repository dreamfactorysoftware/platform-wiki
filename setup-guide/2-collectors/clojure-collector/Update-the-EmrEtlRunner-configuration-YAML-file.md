[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](SnowPlow setup guide) > [**Collectors**](choosing-a-collector) > [**Clojure collector setup**](setting-up-the-clojure-collector) > [[Update the EmrEtlRunner configuration YAML file]]

The final step is to update your ETL process to work with the Clojure Collector rather than the default CloudFront Collector.

This is a necessary step because, although the Clojure Collector and the CloudFront Collector log raw SnowPlow events in exactly the same format, they name their files differently. (If we attempt to change the filename formats, then Elastic Beanstalk will cease to store the log files on S3 correctly.)

If you are using EmrEtlRunner, then updating your ETL process to work with the Clojure Collector is a matter of editing your `config.yml` configuration file, and changing:

    :etl:
      :collector_format: cloudfront

to:

    :etl:
      :collector_format: clj-tomcat

That's it! Once you have made this change, you can start processing your raw log files from the Clojure Collector. The rest of the process is unchanged.
