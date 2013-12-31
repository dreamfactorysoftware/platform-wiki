[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](setting-up-the-Scala-Stream-collector) > [[Running the Scala Stream collector]]

`java` is used to invoke the Scala Stream collector,
which takes the configuration file as a parameter.

    java -jar snowplow-scala-collector-[version].jar --config my.conf

This will start the collector as a HTTP service and write serialized
Thrift records to Kinesis.

Next: review the [[additional configuration options]]
