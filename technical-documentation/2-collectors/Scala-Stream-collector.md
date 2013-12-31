[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Collectors**](collectors)

## Introduction

The Scala Stream collector is a Snowplow event collector for [Snowplow] [snowplow], written in Scala.

It is designed to store [Thrift][thrift] Snowplow events
to [Amazon Kinesis][kinesis].

## How it works

<!--
There are two key aspects to the Scala Stream Collector:

1. **User identification** - how users are uniquely identified across domains
-->

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

The Scala Stream Collector is built on top of [spray][spray] and
[akka][akka] Actors. 

To run it locally:

    $ sbt run

## See also

* [GitHub repository] [github-repo]
* [Setup guide] [setup-guide]

[snowplow]: http://snowplowanalytics.com
[cloudfront-collector]: https://github.com/snowplow/snowplow/tree/master/2-collectors/cloudfront-collector
[snowcannon]: https://github.com/shermozle/SnowCannon
[snowplow-js]: https://github.com/snowplow/snowplow/tree/master/1-trackers/javascript

[github-repo]: https://github.com/snowplow/snowplow/tree/master/2-collectors/scala-stream-collector
[setup-guide]: https://github.com/snowplow/snowplow/wiki/Setting-up-the-Scala-Stream-collector

[spray]: http://spray.io/
[akka]: http://akka.io/
[thrift]: thrift.apache.org/

[kinesis]: http://aws.amazon.com/kinesis/
