[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](setting-up-the-Scala-Stream-collector) > [[Configure the Scala Stream collector]]

The Scala Stream collector has a number of configuration options available.

To start configuring, clone the Snowplow repo if you haven't built
from source:

	$ git clone https://github.com/snowplow/snowplow.git

Navigate into the Scala Stream collector folder:

	$ cd 2-collectors/scala-stream-collector


Copy the sample configuration to `my.conf`

    cp src/main/resources/application.conf.example my.conf

Edit `my.conf` to see annotated the configuration options.

Values that must be configured are:

+ `collector.aws.access-key`
+ `collector.aws.secret-key`

We also recommend changing the default stream options:

+ `collector.stream.name`
+ `collector.stream.size`

Also verify the settings of the HTTP service:

+ `collector.interface`
+ `collector.port`

Next: [[Running the Scala Stream collector]]
