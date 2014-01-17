<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich) > [2: Configuring](Configuring-Scala-Kinesis-Enrich)

The Scala Stream Collector has a number of configuration options available.

## Basic configuration

### Template

Download a template configuration file from GitHub: [default.conf] [app-conf].

Now open the `default.conf` file in your editor of choice.

### AWS settings

Values that must be configured are:

+ `enrich.aws.access-key`
+ `enrich.aws.secret-key`

### GeoLite
Next, download and extract the latest version of the
[GeoLite database][geolite],
and change `enrich.enrichments.geo_ip.maxmind_file` to the location.

```
$ wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz -O ./GeoLiteCity.dat.gz
$ gunzip ./GeoLiteCity.dat.gz
```

### Stream configuration

We also recommend changing the default stream options:

+ `enrich.streams.in.raw`
+ `enrich.streams.out.enriched`
+ `enrich.streams.out.enriched_shards`
+ `enrich.streams.out.bad`
+ `enrich.streams.out.bad_shards`

Next: [Run Scala Kinesis Enrich](Running-scala-kinesis-enrich)

[app-conf]: https://github.com/snowplow/snowplow/blob/master/3-enrich/scala-kinesis-enrich/src/main/resources/default.conf
[geolite]: http://dev.maxmind.com/geoip/legacy/geolite/
