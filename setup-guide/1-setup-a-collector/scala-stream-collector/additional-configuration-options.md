[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Scala Stream collector setup**](setting-up-the-Scala-Stream-collector) > [[Additional configuration options]]

#### 1. Setting the environment to develop or production

`collector.production` is a boolean that enables or disables production mode.
Production mode disables additional services helpful for configuring and
initializing the collector, such as a path '/dump' to view all
records stored in the current stream.

#### 2. Setting the P3P policy header

The P3P policy header is set in `collector.p3p`, and
if not set, the P3P policy header defaults to:

	policyref="/w3c/p3p.xml", CP="NOI DSP COR NID PSA OUR IND COM NAV STA"

#### 3. Setting the domain name

Setting the domain name in `collector.cookie.domain` can be useful if you want to make the cookie accessible to other applications on your domain. In our example above, for example, we've setup the collector on `collector.snplow.com`. If we do not set a domain name, the cookie will default to this domain. However, if we set it to `.snplow.com`, that cookie will be accessible to other applications running on `*.snplow.com`.

#### 4. Setting the cookie duration

The cookie expiration duration is set in `collector.cookie.expiration`.
If no value is provided, cookies set default to expiring after one year (i.e. 365 days).

#### 5. Backends

Backends currently configured in `collector.backend.enabled` are:
+ kinesis' for writing Thrift-serialized records to a Kinesis stream
+ 'stdout' for writing Base64-encoded Thrift-serialized records to stdout

Recommended settings for 'stdout' so each line printed to stdout
is a serialized record are:

1. Setting 'akka.loglevel = OFF' and 'akka.loggers = []'
  to disable all logging.
2. Using 'sbt assembly' and 'java -jar ...' to disable
  sbt logging.

## All done?

You have setup the Scala Stream collector! You are now ready to [setup a tracker][tracker-setup].

Return to the [setup guide][setup-guide].

[setup-guide]: Setting-up-Snowplow
[tracker-setup]: Setting-up-Snowplow#wiki-step2
