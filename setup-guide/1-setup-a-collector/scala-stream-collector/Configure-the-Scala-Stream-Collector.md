[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream Collector setup**](setting-up-the-Scala-Stream-Collector) > [[Configure the Scala Stream Collector]]

The Scala Stream Collector has a number of configuration options available.

## Basic configuration

To start configuring, clone the Snowplow repo if you haven't built from source:

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

## Additional configuration options

### 1. Setting the environment to develop or production

`collector.production` is a boolean that enables or disables production mode.
Production mode disables additional services helpful for configuring and
initializing the collector.

### 2. Sinks

The `collector.backend.enabled` setting determines which of the supported sinks to write raw events to:
+ 'kinesis' for writing Thrift-serialized records to a Kinesis stream
+ 'stdout' for writing Base64-encoded Thrift-serialized records to stdout

The default setting is 'kinesis'. If you switch to 'stdout', we recommend making some further configuration changes to prevent Akka/Spray debug information from polluting your event stream on stdout:

1. Setting 'akka.loglevel = OFF' and 'akka.loggers = []' to disable all logging
2. Using 'sbt assembly' and 'java -jar ...' to disable sbt logging

### 3. Setting the P3P policy header

The P3P policy header is set in `collector.p3p`, and
if not set, the P3P policy header defaults to:

	policyref="/w3c/p3p.xml", CP="NOI DSP COR NID PSA OUR IND COM NAV STA"

### 4. Setting the domain name

Setting the domain name in `collector.cookie.domain` can be useful if you want to make the cookie accessible to other applications on your domain. In our example above, for example, we've setup the collector on `collector.snplow.com`. If we do not set a domain name, the cookie will default to this domain. However, if we set it to `.snplow.com`, that cookie will be accessible to other applications running on `*.snplow.com`.

### 5. Setting the cookie duration

The cookie expiration duration is set in `collector.cookie.expiration`.
If no value is provided, cookies set default to expiring after one year (i.e. 365 days).

Next: [[Run the Scala Stream collector|Run-the-Scala-Stream-collector]]
