<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 3: Setting up Enrich](Setting-up-enrich) > [**Step 3.2: setting up Scala Kinesis Enrich**](Setting-up-Scala-Kinesis-Enrich) > [1: Installing ](Installing-Scala-Kinesis-Enrich)

You can choose to either:

1. Download the Scala Stream collector jar file, _or:_
2. Compile it from source

## Download the jar file

To get a local copy, you can download the jar file directly from our hosted assets bucket on Amazon S3 - please see our [Hosted assets][s3-download] page for details.

## Compile from source

Alternatively, you can build it from the source files. To do so, you will need [scala][scala] and [sbt][sbt] installed. 

To do so, clone the Snowplow repo:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Kinesis Enrich folder:

	$ cd 3-enrich/scala-kinesis-enrich

Use `sbt` to resolve dependencies, compile the source, and build an [assembled][assembly] fat JAR file with all dependencies.

	$ sbt assembly

The `jar` file will be saved as `snowplow-scala-collector-[version].jar` in the `target/scala-2.10` subdirectory - it is now ready to be deployed.

Next: [[Configuring Scala Kinesis Enrich]]

[scala]: http://scala-lang.org/
[sbt]: http://www.scala-sbt.org/
[assembly]: https://github.com/softprops/assembly-sbt
