To simplify setting up and running Snowplow, the Snowplow Analytics team provide public hosting for some of the Snowplow sub-components. These hosted assets are publically available through Amazon Web Services (CloudFront and S3), and using them is free for Snowplow community members.

As we release new versions of these assets, we will leave old versions unchanged on their existing URLs - so you won't have to upgrade your own Snowplow installation unless you want to.

**Disclaimer: While Snowplow Analytics Ltd will make every reasonable effort to host these assets, we will not be liable for any failure to provide this service. All of the hosted assets listed below are freely available via [our GitHub repository] [snowplow-repo] and you are encouraged to host them yourselves.** 

The **current versions** of the assets hosted by the Snowplow Analytics team are as follows:

## 1. Trackers

### 1.1 JavaScript Tracker resources

The minified JavaScript tracker is hosted on CloudFront against its full semantic version:

    http(s)://d1fc8wv8zag5ca.cloudfront.net/0.14.1/sp.js

It is also available as:

    http(s)://d1fc8wv8zag5ca.cloudfront.net/0/sp.js

where 0 is the semantic MAJOR version. If you prefer, you can use this path and then get new features and bug fixes automatically as we roll-out MINOR and PATCH updates to the tracker.

### 2.1 Clojure Collector resources

The Clojure Collector packaged as a complete WAR file, ready for Amazon Elastic Beanstalk, is here:

    s3://snowplow-hosted-assets/2-collectors/clojure-collector/clojure-collector-0.5.0-standalone.war

Right-click on this [Download link] [cc-download] to save it down locally via CloudFront CDN.

### 2.2 Scala Stream Collector resources

The Scala Stream Collector is packaged as an executable jarfile:

    s3://snowplow-hosted-assets/2-collectors/scala-stream-collector/snowplow-stream-collector-0.1.0

Right-click on this [Download link] [ssc-download] to save it down locally via CloudFront CDN.

## 3. Enrich

### 3.1 Scala Hadoop Enrich resources

The Scala Hadoop Enrich process uses a single jarfile containing the MapReduce job. This is made available in a public Amazon S3 bucket, for Snowplowers who are running their Hadoop Enrich process on Amazon EMR:

    s3://snowplow-hosted-assets/3-enrich/hadoop-etl/snowplow-hadoop-etl-0.3.6.jar

Right-click on this [Download link] [hadoop-enrich-download] to save it down locally via CloudFront CDN.

### 3.2 Scala Kinesis Enrich resources

The Scala Kinesis Enrich process is packaged as an executable jarfile:

    s3://snowplow-hosted-assets/3-enrich/scala-kinesis-enrich/snowplow-kinesis-enrich-0.1.0

Right-click on this [Download link] [kinesis-enrich-download] to save it down locally via CloudFront CDN.

### 3.3 Shared resources

#### 3.31. MaxMind GeoLiteCity

Both Enrichment processes make use of the free [GeoLite City database] [geolite] from [MaxMind, Inc] [maxmind], also stored in this public Amazon S3 bucket:

    s3://snowplow-hosted-assets/third-party/maxmind/GeoLiteCity.dat

This file is updated every month by the Snowplow Analytics team.

If you are running Scala Kinesis Enrich, you will need a local copy of this file. Right-click on this [Download link] [glc-download] to save it down locally via CloudFront CDN.

## 4. Storage

No hosted assets currently.

## 5. Analytics

No hosted assets currently.

## See also

As well as these hosted assets for running Snowplow, the Snowplow Analytics team also make code components and libraries available through Ruby and Java artifact repositories.

Please see the [[Artifact repositories]] wiki page for more information.

[snowplow-repo]: https://github.com/snowplow/snowplow
[cc-download]: http://d2io1hx8u877l0.cloudfront.net/2-collectors/clojure-collector/clojure-collector-0.5.0-standalone.war
[ssc-download]: http://d2io1hx8u877l0.cloudfront.net/2-collectors/scala-stream-collector/snowplow-stream-collector-0.1.0
[hadoop-enrich-download]: http://d2io1hx8u877l0.cloudfront.net/3-enrich/hadoop-etl/snowplow-hadoop-etl-0.3.6.jar
[kinesis-enrich-download]: http://d2io1hx8u877l0.cloudfront.net/3-enrich/scala-kinesis-enrich/snowplow-kinesis-enrich-0.1.0
[glc-download]: http://d2io1hx8u877l0.cloudfront.net/third-party/maxmind/GeoLiteCity.dat
[geolite]: http://dev.maxmind.com/geoip/legacy/geolite
[maxmind]: http://www.maxmind.com/
