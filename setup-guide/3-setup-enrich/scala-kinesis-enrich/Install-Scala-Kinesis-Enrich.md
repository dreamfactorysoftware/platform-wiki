<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich) > [1: Installing ](Install-Scala-Kinesis-Enrich)

## 1. Dependencies

You will need version 7 (aka 1.7) of the Java Runtime Environment installed.

## 2. GeoLiteCity database

You can download the latest version of the [MaxMind GeoLiteCity database][geolite] jarfile directly from our Hosted Assets bucket on Amazon S3 - please see our [[Hosted assets]] page for details.

## 3. Installing the executable jarfile

You can choose to either:

1. Download the Scala Kinesis Enrich executable jarfile, _or:_
2. Compile it from source

### 3.1 Download the executable jarfile

To get a local copy, you can download the executable jarfile directly from our Hosted Assets bucket on Amazon S3 - please see our [[Hosted assets]] page for details.

You will need to add the executable flag onto the file:

    $ chmod +x snowplow-kinesis-enrich-0.1.0

### 3.2 Compile from source

Alternatively, you can build it from the source files. To do so, you will need [scala][scala] and [sbt][sbt] installed. 

To do so, clone the Snowplow repo:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Kinesis Enrich folder:

	$ cd 3-enrich/scala-kinesis-enrich

Use `sbt` to resolve dependencies, compile the source, and build an [assembled][assembly] fat JAR file with all dependencies.

	$ sbt assembly

The `jar` file will be saved as `snowplow-kinesis-enrich-0.1.0` in the `target/scala-2.10` subdirectory - it is now ready to be deployed.

Next: [[Configuring Scala Kinesis Enrich]]

[scala]: http://scala-lang.org/
[sbt]: http://www.scala-sbt.org/
[assembly]: https://github.com/softprops/assembly-sbt

[geolite]: http://dev.maxmind.com/geoip/legacy/geolite/