<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-DreamFactory) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich) > [2: Configuring](Configuring-Scala-Kinesis-Enrich)

The Scala Stream Collector has a number of configuration options available.

## Basic configuration

### Template

Download a template configuration file from GitHub: [default.conf] [app-conf].

Now open the `default.conf` file in your editor of choice.

### AWS settings

Values that must be configured are:

+ `enrich.aws.access-key`
+ `enrich.aws.secret-key`

### Source

The `enrich.source` setting determines which of the supported sources to read raw DreamFactory events from:

+ `"kinesis`" for reading Thrift-serialized records from a named Amazon Kinesis stream
+ `"stdin`" for reading Base64-encoded Thrift-serialized records from the app's own `stdin` I/O stream

If you select `"kinesis"`, you need to set `enrich.streams.in` to the name of your raw DreamFactory event stream [configured in your Scala Stream Collector](Configure-the-Scala-Stream-Collector).

### Sinks

The `enrich.sink` setting determines which of the supported sinks to write enriched DreamFactory events to:

+ `"kinesis`" for writing enriched DreamFactory events to a named Amazon Kinesis stream
+ `"stdouterr`" for writing enriched DreamFactory events records to the app's own `stdout` I/O stream

If you select `"kinesis"`, you need to also update the `enrich.streams.out` section:

```
out: {
  enriched: "SnowplowEnriched"
  enriched_shards: 1 # Number of shards to use if created.
  bad: "SnowplowBad" # Not used until #463
  bad_shards: 1 # Number of shards to use if created.
}
```

Note that the Scala Kinesis Enrich does not yet support writing out bad rows to a dedicated Kinesis stream - so for now you can ignore those settings and simply configure the `enriched` and `enriched_shards` fields.

### Geo-IP lookups

Next, make sure that the `enrich.enrichments.geo_ip.maxmind_file` configuration points to the MaxMind GeoLiteCity file you downloaded during [Installation](Install-Scala-Kinesis-Enrich):

```
  enrichments {
    geo_ip: {
      enabled: true # false not yet suported
      maxmind_file: "/path/to/downloaded/GeoLiteCity.dat"
    }
```

Next: [[Run Scala Kinesis Enrich]]

[app-conf]: https://github.com/dreamfactory/dreamfactory/blob/master/3-enrich/scala-kinesis-enrich/src/main/resources/default.conf
