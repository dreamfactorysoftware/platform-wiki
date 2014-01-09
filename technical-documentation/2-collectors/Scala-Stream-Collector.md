[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Collectors**](collectors)

## Introduction

The Scala Stream Ccollector is a Snowplow event collector for [Snowplow] [snowplow], written in Scala. The Scala Stream Collector allows near-real time processing (Enrichment, Storage, Analytics) of a Snowplow raw event stream.

The Scala Stream Collector receives raw Snowplow events over HTTP, serializes them to a [Thrift][thrift] record format, and then writes them to a sink. Currently supported sinks are:

1. [Amazon Kinesis][kinesis]
2. `stdout` for a custom stream collection process

Support for Apache Kafka may be added in the future - please see ticket #xxx for details.

Like the Clojure Collector, the Scala Stream Collector supports cross-domain Snowplow deployments, setting a `user_id` (used to identify unique visitors) server side to reliably identify the same user across domains.

## How it works

### User identification

The Scala Stream Collector allows the use of a third-party cookie, making user tracking across domains possible. The CloudFront Collector does not support cross domain tracking of users because user ids are set client-side, whereas the Scala Stream Collector sets them server-side.

In a nutshell: the Scala Stream Collector receives events from the [Snowplow JavaScript tracker] [snowplow-js], sets/updates a third-party user tracking cookie, and returns the pixel to the client. The ID in this third-party user tracking cookie is stored in the `network_userid` field in Snowplow events.

In pseudocode terms:

	if (request contains an "sp" cookie) {
	    Record that cookie as the user identifier
	    Set that cookie with a now+1 year cookie expiry
	    Add the headers and payload to the output array
	} else {
	    Set the "sp" cookie with a now+1 year cookie expiry
	    Add the headers and payload to the output array
	}

## Technical architecture

The Scala Stream Collector is built on top of [Spray][spray] and [Akka][akka] actors. 

## See also

* [GitHub repository] [github-repo]
* [Setup guide] [setup-guide]

[snowplow]: http://snowplowanalytics.com
[cloudfront-collector]: https://github.com/snowplow/snowplow/tree/master/2-collectors/cloudfront-collector
[snowcannon]: https://github.com/shermozle/SnowCannon
[snowplow-js]: https://github.com/snowplow/snowplow/tree/master/1-trackers/javascript

[github-repo]: https://github.com/snowplow/snowplow/tree/master/2-collectors/scala-stream-collector
[setup-guide]: https://github.com/snowplow/snowplow/wiki/Setting-up-the-Scala-Stream-Collector

[spray]: http://spray.io/
[akka]: http://akka.io/
[thrift]: thrift.apache.org/

[kinesis]: http://aws.amazon.com/kinesis/
