[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](Setting-up-the-Scala-Stream-Collector) > [[Install the Scala Stream Collector]]

## 1. Dependencies

You will need version 7 (aka 1.7) of the Java Runtime Environment installed.

## 2. Installing the executable jarfile

You can choose to either:

1. Download the Scala Stream collector executable jarfile, _or:_
2. Compile it from source

## 2.1 Download the executable jarfile

To get a local copy, you can download the jarfile directly from our hosted assets bucket on Amazon S3 - please see our [[Hosted assets]] page for details.

You will need to add the executable flag onto the file:

    $ chmod +x snowplow-scala-collector-0.1.0

## 2.2 Compile from source

Alternatively, you can build it from the source files. To do so, you will need [scala][scala] and [sbt][sbt] installed. 

To do so, clone the Snowplow repo:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Stream collector folder:

	$ cd 2-collectors/scala-stream-collector

Use `sbt` to resolve dependencies, compile the source, and build an [assembled][assembly] fat JAR file with all dependencies.

	$ sbt assembly

The `jar` file will be saved as `snowplow-scala-collector-0.1.0` in the `target/scala-2.10` subdirectory - it is now ready to be deployed.

Next: [[Configure the Scala Stream Collector]]

[s3-download]: https://github.com/snowplow/snowplow/wiki/Hosted-assets
[scala]: http://scala-lang.org/
[sbt]: http://www.scala-sbt.org/
[thrift]: thrift.apache.org/
[assembly]: https://github.com/softprops/assembly-sbt
