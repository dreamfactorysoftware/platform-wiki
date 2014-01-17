[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Enrichment**](Enrichment) > [[Scala Kinesis Enrich]]

The Kinesis enrichment is implemented in Scala and operates
on Streams in real time. 

Kinesis enrichment utilizes the [scala-common-enrich][common-enrich] Scala
project to enrich events and the [SnowplowRawEvent][schema] for
reading Thrift-serialized objects collected with the
[Scala collector](Scala-stream-collector).

# See also
+ [Setup guide][setup]
+ [Repository][kinesis-enrich]

[setup]: https://github.com/snowplow/snowplow/wiki/setting-up-scala-kinesis-enrich
[common-enrich]: https://github.com/snowplow/snowplow/tree/master/3-enrich/scala-common-enrich
[schema]: https://github.com/snowplow/snowplow/blob/feature/scala-rt-coll/2-collectors/thrift-raw-event/src/main/thrift/snowplow-raw-event.thrift
[kinesis-enrich]: https://github.com/snowplow/snowplow/tree/master/3-enrich/scala-kinesis-enrich
