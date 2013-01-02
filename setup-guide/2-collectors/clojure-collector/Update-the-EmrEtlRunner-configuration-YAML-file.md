[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](SnowPlow setup guide) > [**Collectors**](choosing-a-collector) > [**Clojure collector setup**](setting-up-the-clojure-collector) > [[Update the EmrEtlRunner configuration YAML file]]

The final step is to update your ETL process to work with the Clojure Collector rather than the default CloudFront Collector.

This is a necessary step because, although the Clojure Collector and the CloudFront Collector log raw SnowPlow events in exactly the same format, they name their files differently. (If we attempt to change the filename formats, then Elastic Beanstalk will cease to store the log files on S3 correctly.)

If you are using EmrEtlRunner, then updating your ETL process to work with the Clojure Collector is a matter of editing your `config.yml` configuration file, and first changing:

    :etl:
      :collector_format: cloudfront

to:

    :etl:
      :collector_format: clj-tomcat

Second, you will need to update the In Bucket specified:

    :s3:
      :region: eu-west-1
      :buckets:
        # ...
        :in: s3://elasticbeanstalk-{{REGION NAME}}-{{UUID}}/resources/environments/logs/publish/{{SECURITY GROUP IDENTIFIER}}

Replace all of the `{{x}}` variables with the appropriate ones for your environment (which you should have written down in the [Enable logging to S3] stage).

**Important**: do not include an `{{INSTANCE IDENTIFIER}}` at the end of your path. This is because your Clojure Collector may end up logging to multiple `{{INSTANCE IDENTIFIER}}` paths. By specifying your In Bucket only to the level of the Security Group identifier, you make sure that SnowPlow can process all logs from all instances.

That's it! Once you have made these two changes, you can start processing your raw log files from the Clojure Collector. The rest of the ETL and storage processes are unchanged.