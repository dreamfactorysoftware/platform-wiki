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
10. [What's next on the roadmap?](#roadmap)
11. [When will support for unstructured events be completed?](#unstructtimeline)
12. [How can I contribute to Snowplow?](#contribute)
13. [Any other question?](#otherq)

<a name="rt"/>
## Is Snowplow real-time?

No, currently Snowplow is not a real-time analytics solution. This is for two main reasons:

1. Both of the supported collectors (the CloudFront collector and the Clojure-based collector) feature a lag (typically 20-60 minutes) before events are written to Amazon S3
2. Our ETL process (which takes raw Snowplow events and enriches them) is based on Hadoop/Hive, which are batch-based processing tools. They are not designed for real-time (or near-real-time) data processing

We have adding real-time support to Snowplow on our radar, but this is not a priority currently.

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

* xxx
* yyy
* zzz

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

1. Fire additional custom structured events containing the additional custom context you want to track
2. Load the additional custom context into your event warehouse as a separate table (e.g. a data extract from your CMS). You can then join this context to your Snowplow event data using common IDs (e.g. page URLs)

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

<a name="roadmap"/>
## What's next on the roadmap?

Plenty! Checkout our [[Product roadmap]] for details.

<a name="unstructtimeline"/>
## When will support for unstructured events be completed?

Currently custom unstructured events are supported in our JavaScript and Lua Trackers, but not yet in our ETL process or storage options (Redshift or Postgres).

So, when will support for unstructured events be completed?

The short answer is: this is probably our most complex feature yet, and we expect it will be fully supported in Snowplow in January.

The longer answer is: this feature isn't complicated because of the ETL - in fact we have code written that can handle unstructured events already. The complexity is in storing unstructured events in structured schemas such as Redshift and Postgres. If you are tracking many unstructured events containing different name:value fields, it isn't obvious how those events should be mapped to a pre-defined, generic schema in a relational database.

Thus, adding full support will take time - the solution involves:

1. Making the ETL process generate Avro, and
2. Writing generic code that can shred Avro payloads into multiple Redshift/Postgres tables

However, in the shorter term, there are several potential workarounds:

1. Use custom structured events in place of unstructured events. You may need to send multiple events to transmit all of the data you need
2. Fork the Scalding ETL, fork the Redshift table definition and extract specific, expected unstructured events into the Redshift table definition. This is great if you have a (very) small number of well-defined unstructured events that you can simply append to their Snowplow events table. This solution is in use
3. Fork the Scalding ETL, and add a couple of additional fields (`ue_name` and `ue_properties`) to the Postgres table definition. Properties could be defined either as Postgres HSTORE or JSON. This is a better solution if your event volumes are small enough for Postgres (rather than Redshift), and you have many, unpredictable unstructured events. Both HSTORE and JSON have their limitations in Postgres, although Postgres JSON support in particular is improving all the time

<a name="contribute" />
## How can I contribute to Snowplow?

The Snowplow team welcomes contributions! The core team (Snowplow Analytics Ltd) is small so we would love more people to join in and help realise our objectives of building the world's most powerful analytics platform. Stay tuned for a more detailed update on how best you can contribute to Snowplow. 

<a name="otherq">
## Question not on this list?

Get in touch with us and ask it! See our [[Talk to us]] page for contact details.