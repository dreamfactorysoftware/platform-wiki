To simplify setting up and running Snowplow, the Snowplow Analytics team provide public hosting for some of the Snowplow sub-components. These hosted assets are publically available through Amazon Web Services (CloudFront and S3), and using them is free for Snowplow community members.

As we release new versions of these assets, we will leave old versions unchanged on their existing URLs - so you won't have to upgrade your own Snowplow installation unless you want to.

**Disclaimer: While Snowplow Analytics Ltd will make every reasonable effort to host these assets, we will not be liable for any failure to provide this service. All of the hosted assets listed below are freely available via [our GitHub repository] [snowplow-repo] and you are encouraged to host them yourselves.** 

The **current versions** of the assets hosted by the Snowplow Analytics team are as follows:

## 1. Trackers

### 1.1 JavaScript tracker resources

The minified JavaScript tracker is hosted on CloudFront:

    http(s)://d1fc8wv8zag5ca.cloudfront.net/0.13.1/sp.js

## 2. Collectors

### 2.1 Clojure Collector resources

The Clojure Collector packaged as a complete WAR file, ready for Amazon Elastic Beanstalk, is here:

    s3://snowplow-hosted-assets/2-collectors/clojure-collector/clojure-collector-0.5.0-standalone.war

Right-click on this [Download link] [war-download] to save it down locally.

### 2.2 Scala Stream Collector resources

The Scala Stream Collector is packaged as an executable jarfile:

    s3://snowplow-hosted-assets/2-collectors/scala-stream-collector/snowplow-stream-collector-0.1.0

Right-click on this [Download link] [ssc-download] to save it down locally.

## 3. Enrich

### 3.1 Scala Hadoop Enrich resources

The Scala Hadoop Enrich process uses a single jarfile containing the MapReduce job. This is made available in a public Amazon S3 bucket, for Snowplowers who are running their Hive ETL process on Amazon EMR:

    s3://snowplow-hosted-assets/3-enrich/hadoop-etl/snowplow-hadoop-etl-0.3.6.jar

Right-click on this [Download link] [jar-download] to save it down locally.

The Hadoop ETL process itself makes use of the free [GeoLite City database] [geolite] from [MaxMind, Inc] [maxmind], also stored in this public Amazon S3 bucket:

    s3://snowplow-hosted-assets/third-party/maxmind/GeoLiteCity.dat

Right-click on this [Download link] [glc-download] to save it down locally.

This file is updated every month by the Snowplow Analytics team.

### 3.2 Scala Kinesis Enrich resources

The Scala Kinesis Enrich process is packaged as an executable jarfile:

    s3://snowplow-hosted-assets/3-enrich/scala-kinesis-enrich/snowplow-kinesis-enrich-0.1.0

## 4. Storage

No hosted assets currently.

## 5. Analytics

No hosted assets currently.

## See also

As well as these hosted assets for running Snowplow, the Snowplow Analytics team also make code components and libraries available through Ruby and Java artifact repositories.

Please see the [[Artifact repositories]] wiki page for more information.

[snowplow-repo]: https://github.com/snowplow/snowplow
[war-download]: http://s3-eu-west-1.amazonaws.com/snowplow-hosted-assets/2-collectors/clojure-collector/clojure-collector-0.5.0-standalone.war
[jar-download]: http://s3-eu-west-1.amazonaws.com/snowplow-hosted-assets/3-enrich/hadoop-etl/snowplow-hadoop-etl-0.3.2.jar
[geolite]: http://dev.maxmind.com/geoip/legacy/geolite
[maxmind]: http://www.maxmind.com/