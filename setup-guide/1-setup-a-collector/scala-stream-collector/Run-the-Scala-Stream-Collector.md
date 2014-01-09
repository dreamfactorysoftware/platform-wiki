[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream Collector setup**](setting-up-the-Scala-Stream-Collector) > [[Run the Scala Stream Collector]]

`java` is used to invoke the Scala Stream collector, which takes the configuration file as a parameter.

    java -jar snowplow-scala-collector-[version].jar --config my.conf

This will start the collector as a HTTP service and write serialized Thrift records to Kinesis.

## All done?

You have setup the Scala Stream collector! You are now ready to [setup a tracker][Setting-up-a-Tracker].

Return to the [setup guide][Setting-up-Snowplow].
