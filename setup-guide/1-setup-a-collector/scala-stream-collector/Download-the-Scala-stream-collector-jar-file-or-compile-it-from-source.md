[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](setting-up-the-Scala-Stream-collector) > [[Download the Scala Stream collector jar file or compile it from source]]

To get a local copy, you can download the jar file directly from our hosted assets bucket on Amazon S3 - please see our [Hosted assets][s3-download] page for details.

Alternatively, you can build it from the source files. To do so, you will need [scala][scala] and [sbt][sbt] installed. 

To do so, clone the Snowplow repo:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Stream collector folder:

	$ cd 2-collectors/scala-stream-collector

Use `sbt` to resolve dependencies, compile the source, and build an [assembled][assembly] fat JAR file with all dependencies.

	$ sbt assembly

The `jar` file will be saved as `snowplow-scala-collector-[version].jar` in the `target/scala-2.10` subdirectory - it is now ready to be deployed.

Next: [[Configure the Scala Stream collector]]

[s3-download]: https://github.com/snowplow/snowplow/wiki/Hosted-assets
[scala]: http://scala-lang.org/
[sbt]: http://www.scala-sbt.org/
[assembly]: https://github.com/softprops/assembly-sbt
