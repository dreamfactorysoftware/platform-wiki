[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](Setting-up-the-Scala-Stream-Collector) > [[Install the Scala Stream Collector]]

You can choose to either:

1. Download the Scala Stream collector jar file, _or:_
2. Compile it from source

## Download the jar file

To get a local copy, you can download the jar file directly from our hosted assets bucket on Amazon S3 - please see our [Hosted assets][s3-download] page for details.

## Compile from source

Alternatively, you can build it from the source files. To do so, you will need [scala][scala], [sbt][sbt] and [Thrift] [thrift] installed. 

To do so, clone the Snowplow repo:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Stream collector folder:

	$ cd 2-collectors/scala-stream-collector

Use `sbt` to resolve dependencies, compile the source, and build an [assembled][assembly] fat JAR file with all dependencies.

	$ sbt assembly

The `jar` file will be saved as `snowplow-scala-collector-[version].jar` in the `target/scala-2.10` subdirectory - it is now ready to be deployed.

Next: [[Configure the Scala Stream Collector]]

[s3-download]: https://github.com/snowplow/snowplow/wiki/Hosted-assets
[scala]: http://scala-lang.org/
[sbt]: http://www.scala-sbt.org/
[thrift]: thrift.apache.org/
[assembly]: https://github.com/softprops/assembly-sbt
