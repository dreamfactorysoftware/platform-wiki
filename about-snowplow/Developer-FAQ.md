## Frequently Asked Questions

1. [Is Snowplow real-time?](#rt)
2. [Does implementing Snowplow impact the performance of my site?](#performance)
3. [Does Snowplow have a graphical user interface?](#gui)
4. [Does Snowplow use first- or third-party cookies?](#cookies)
5. [Does Snowplow scale?](#scalability)
6. [Does Snowplow support custom variables/properties for events?](#customcontext)
7. [How reliable is the CloudFront collector?](#cfreliability)
8. [How long do CloudFront access logs take to arrive in S3?](#cfs3lag)
9. [Is Snowplow IPv6 compliant?](#ipv6)
10. [How often can I run the Enrichment process?](#enrichmentfreq)
11. [What data recency is Snowplow capable of?](#recency)
12. [What's next on the roadmap?](#roadmap)
13. [When will support for unstructured events be completed?](#unstructtimeline)
14. [How can I contribute to Snowplow?](#contribute)
15. [Any other question?](#otherq)

<a name="rt"/>
## Is Snowplow real-time?

There is nothing inherently high-latency or batch-based about the Snowplow architecture. However, the production-ready end-to-end implementation currently available for Snowplow **is** a high-latency, batch-based architecture, being dependent on:

1. Either of the currently supported collectors (the CloudFront collector and the Clojure-based collector), which feature a lag (typically 20-60 minutes) before events are written to Amazon S3
2. Our ETL process (which takes raw Snowplow events and enriches them) is based on Hadoop, a batch-based processing tool, not designed for real-time (or near-real-time) data processing
3. Our database load process is also batch-based - we do not yet have a drip-feed solution for Postgres or Redshift

However, real-time support is a priority for Snowplow in 2014 - starting with the release of our new [[Scala Stream Collector]] and [[Scala Kinesis Enrich]], both of which are Amazon Kinesis-based, in February.

<a name="performance"/>
## Does implementing Snowplow on my site effect site performance e.g. page load times?

Snowplow will have an impact on site performance, just as implementing any JavaScript-based tracking will impact site performance.

However, we have done everything we can to minimise the effect on site performance: by default the Snowplow JavaScript tracker is minified, and hosted on Amazon CloudFront. We also recommend using the JavaScript tracker's asynchronous tags to minimize impact on page load.

<a name="gui"/>
## Does Snowplow have a graphical user interface?

No, currently Snowplow does not have a GUI. Analysts who want to query data collected by Snowplow can use any third-party tool, such as Tableau, Chartio or PowerPivot.

We have written tutorials on using Tableau and Chartio to analyze Snowplow data.

<a name="cookies"/>
## Does Snowplow use first- or third-party cookies?

The Snowplow JavaScript tracker uses first-party cookies to track a unique user ID and the user's session information. The CloudFront collector simply logs this data.

However, if you use the Clojure-based collector then this first-party user ID is overwritten with a unique user ID which is set server-side by the collector (i.e. a third-party cookie on the collector's own domain). This is extremely useful for tracking users across multiple domains.

<a name="scalability"/>
## Does Snowplow scale?

Yes! In fact we designed Snowplow primarily with extreme scalability in mind. In particular:

* All Snowplow components are designed to be horizontally scalable - e.g. to Enrich more events, just add more instances to your Elastic MapReduce cluster
* Snowplow is architected as a loosely coupled system, to minimize the chance of performance bottlenecks
* Snowplow is a protocol-first solution - meaning that an under-performing implementation of any component can be replaced by a more-performant version, as long as it respects Snowplow's input/output protocols

<a name="customcontext"/>
## Does Snowplow support custom variables/properties for events?

In Snowplow language, we refer to this as adding "custom context" to events (see [this blog post](http://snowplowanalytics.com/blog/2013/08/12/towards-universal-event-analytics-building-an-event-grammar/) for details).

This has not yet been implemented; our current thinking is that we will re-use our unstructured event support to allow custom context to be added to all event types in the form of arbitrary name:value properties. We are still exploring how scoping for custom context should work - for example, for the JavaScript Tracker we have identified three scopes of interest:

1. Session-common context - context shared by all events in a session
2. Page-common context - context shared by all events on a page (e.g. the title and URL of that page)
3. Event-specific context - context specific to one event (e.g. time of that event)

For other trackers, there will be other scopes of interest (e.g. for a mobile app tracker, install-common context).

Because our ideas for custom context are dependent on unstructured event support, it only makes sense to add this to Snowplow after unstructured event support is finalized. Please see the related answer [When will support for unstructured events be completed?](#unstructtimeline) for information on timings here.

In the meantime, two successful workarounds for the lack of custom context support are:

1. Fire additional custom structured events containing the custom context you want to track
2. Load the custom context into your event warehouse as a separate table (e.g. a data extract from your CMS). You can then `JOIN` this context to your Snowplow event data using common IDs (e.g. page URLs)

<a name="cfreliability"/>
## How reliable is the CloudFront collector?

To write.

<a name="cfs3lag"/>
## How long do CloudFront access logs take to arrive in S3?

_Thanks to [Gabor Ratky](https://github.com/rgabo) for this answer:_

CloudFront logs arrive with varying times and it is normal for them to arrive with delays.

As a rule of thumb that others have stated as well, 95% of the logs arrive within 3 hours and ~100% of the logs arrive within 24 hours so you should take that into consideration when you schedule your ETL process and query the resulting data. 

Running daily ETL's at 6am UTC, you will have near 100% of the events for the previous day (UTC). It is recommended that you do not query or use data from the same day unless it is for investigation purposes.

<a name="ipv6"/>
## Is Snowplow IPv6 compliant?

IPv6 (Internet Protocol version 6) is a revision of the Internet Protocol (IP) which allows for far more addresses to be assigned than with the current IPv4.

At the moment, the CloudFront-based collector is not IPv6 compliant - because Amazon CloudFront is not yet IPv6 compliant - however the Clojure-based collector running on Elastic Beanstalk is IPv6 compliant.

<a name="enrichmentfreq">
## How often can I run the Enrichment process?

Many Snowplow users simply schedule the Enrichment process to run overnight, so that they have yesterday's latest data ready for them when they get to the office.

However, if you require better data recency, you can run the Enrichment process more often. Some users run the job every 4 or 6 hours, and we know of at least one company running the process every hour.

As you increase run frequency towards the every-hour mark, there are some important things to bear in mind:

* Do make sure that your Enrichment process can happily finish within the 1 hour period. The next Enrichment process starting before the last one has finished will break things currently (see [#195](https://github.com/snowplow/snowplow/issues/195) for details)
* Be aware that more frequent runs increases the chance of you running into Elastic MapReduce "failing to launch" every few days, which is not yet resolved (see [#195](https://github.com/snowplow/snowplow/issues/195) for details)

<a name="recency"/>
## What data recency is Snowplow capable of?

As discussed in the [Is Snowplow real-time?](#rt) answer above, the data recency of Snowplow is impacted by:

1. Both of our supported collectors having a lag before events are written to Amazon S3
2. Our Enrichment process running on top of Hadoop, a batch-based ETL tool

Given these, the minimum achievable data recency is around 2 hours.

To find our more about the lag before events are logged to S3, please read the answer [How long do CloudFront access logs take to arrive in S3?](#cfs3lag)

To find out more about how often you can safely run the Enrichment process, please check out the previous question, [How often can I run the Enrichment process?](#enrichmentfreq).

<a name="roadmap"/>
## What's next on the roadmap?

Plenty! Checkout our [[Product roadmap]] for details.

<a name="unstructtimeline"/>
## When will support for unstructured events be completed?

Currently custom unstructured events are supported in our JavaScript and Lua Trackers (see [this guide](http://snowplowanalytics.com/blog/2013/05/14/snowplow-unstructured-events-guide/) for details), but not yet in our ETL process or storage options (Redshift or Postgres).

Because Postgres has recently added a [JSON datatype](http://wiki.postgresql.org/wiki/What's_new_in_PostgreSQL_9.2#JSON_datatype), it should be relatively straightforward to add unstructured event support for Snowplow Postgres users. For Snowplow Redshift users, we can store the unstructured event properties in a varchar field which users can query (somewhat inefficiently) using Redshift's [JSON functions](http://docs.aws.amazon.com/redshift/latest/dg/json-functions.html). Finally, S3/Hive users can write Hive queries using the JSON Serde (we recommend using [Qubole](http://www.qubole.com/) here) to work with their unstructured events. 

This initial support for unstructured events will be rolled out as part of Snowplow [0.8.13](https://github.com/snowplow/snowplow/issues?milestone=29&page=1&state=open), which should be released by mid-December.

Beyond that, we are exploring creating a configuration language to make it possible for Snowplow users to load their proprietary unstructured events into custom tables.

If you need support for unstructured events today with Redshift, you can:

1. Fork the Scalding ETL
2. Fork the Redshift table definition
3. Extract specific, expected unstructured events into your new Redshift table definition

This is great if you have a (very) small number of well-defined unstructured events that you can simply append to their Snowplow events table. This solution is in use by Snowplow users, and we offer this as part of [Snowplow Professional Services](http://snowplowanalytics.com/services/pipelines.html).

<a name="contribute" />
## How can I contribute to Snowplow?

The Snowplow team welcomes contributions! The core team (Snowplow Analytics Ltd) is small so we would love more people to join in and help realise our objectives of building the world's most powerful analytics platform. Stay tuned for a more detailed update on how best you can contribute to Snowplow. 

<a name="otherq">
## Question not on this list?

Get in touch with us and ask it! See our [[Talk to us]] page for contact details.