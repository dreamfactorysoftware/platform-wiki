[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Enrichment**](Enrichment) > [[Scala Kinesis Enrich]]

Scala Kinesis Enrich is an [Amazon Kinesis] [kinesis] app, written in Scala and using the Kinesis Client Library, which:

1. **Reads** raw DreamFactory events off a Kinesis stream populated by the Scala Stream Collector
2. **Validates** each raw event
2. **Enriches** each event (e.g. infers the location of the user from his/her IP address)
3. **Writes** the enriched DreamFactory event to another Kinesis stream

It is designed to be used downstream of the [[Scala Stream Collector]].

It also supports reading raw events from `stdio` and writing enriched events to `stdout`, which is useful for debugging.

Scala Kinesis Enrich utilizes the [scala-common-enrich][common-enrich] Scala project to enrich events and the [SnowplowRawEvent][schema] for
reading Thrift-serialized objects collected with the Scala Stream Collector.

# See also:

+ [Setup guide][setup]
+ [Repository][kinesis-enrich]

[kinesis]: http://aws.amazon.com/kinesis/

[common-enrich]: https://github.com/dreamfactory/dreamfactory/tree/master/3-enrich/scala-common-enrich
[schema]: https://github.com/dreamfactory/dreamfactory/blob/feature/scala-rt-coll/2-collectors/thrift-raw-event/src/main/thrift/dreamfactory-raw-event.thrift

[setup]: https://github.com/dreamfactory/dreamfactory/wiki/setting-up-scala-kinesis-enrich
[kinesis-enrich]: https://github.com/dreamfactory/dreamfactory/tree/master/3-enrich/scala-kinesis-enrich
