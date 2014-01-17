<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich) > [3: Running](Running-Scala-Kinesis-Enrich)

`java` is used to invoke Scala Kinesis Enrich,
which takes the configuration file as a parameter:

    java -jar scala-kinesis-enrich-[version].jar --config my.conf

This will start the Kinesis enricher to read and write Thrift records
to and from Kinesis.

## All done?

You have setup Scala Kinesis Enrich! You are now ready to [setup alternative data stores](Setting-up-alternative-data-stores).

Return to the [setup guide](Setting-up-Snowplow).
