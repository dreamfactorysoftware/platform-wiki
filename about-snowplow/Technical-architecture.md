Snowplow has a very different architecture from conventional open-source web analytics packages such as [Piwik] [piwik] or [Open Web Analytics] [owa]. Where those packages are built on a tightly-coupled LAMP stack, Snowplow has a loosely-coupled architecture which consists of five sub-systems:

![architecture] [conceptual-architecture]

To briefly explain these five sub-systems:

* **Trackers** fire Snowplow events. Currently we have a JavaScript tracker; no-JS tracker, Arduino and Lua trackers. (For more information see the [trackers section](https://github.com/snowplow/snowplow/tree/master/1-trackers) of the repository. Python, Ruby, Java, iOS and Android trackers are on the roadmap
* **Collectors** receive Snowplow events from trackers. Currently we have a simple CDN-based collector on [Amazon CloudFront] [cloudfront], and a collector that sets a third party pixel for cross-domain tracking called the [Clojure Collector](https://github.com/snowplow/snowplow/tree/master/2-collectors/clojure-collector). 
* **Enrichment** cleans up the raw Snowplow events, enriches them and puts them into storage. Currently we have an ETL process using [Scalding] (https://github.com/twitter/scalding)
* **Storage** is where the Snowplow events live. Currently we store the Snowplow events in an S3, Amazon Redshift and PostgreSQL
* **Analytics** are performed on the Snowplow events

In the rest of this page we explain our rationale for this architecture, map out the specific technical components and finally flag up the strengths and limitations of this architecture.

## Rationale for architecture

Snowplow's distinctive architecture has been informed by a set of key design principles:

1. **Extreme scalability** - Snowplow should be able to scale to tracking billions of customer events without affecting the performance of your client (e.g. website) or making it difficult to subsequently analyse all of those events
2. **Permanent event history** - Snowplow events should be stored in a simple, non-relational, immutable data store
3. **Direct access to individual events** - you should have direct access to your raw Snowplow event data at the atomic level
4. **Separation of concerns** - event tracking and event analysis should be two separate systems, only loosely-coupled
5. **Support any analysis** - Snowplow should make it easy for business analysts, data scientists and engineers to answer any business question they want, using as wide a range of analytical tools as possible

## Architectural diagram

The current technical architecture for Snowplow looks like this:

![Snowplow Technical Architecture] [tech-architecture]

This architecture diagram will be updated shortly with the new ETL control tool, written in Ruby.

## Technical strengths

The Snowplow approach has several technical advantages over more
conventional web analytics approaches. In no particular order, these
advantages are:

* **Scalable, fast tracking** - using CloudFront for event tracking
    reduces complexity and minimizes client slowdown worldwide
* **Never lose your raw data** - your raw event data is never
    compacted, overwritten or otherwise corrupted by Snowplow
* **Direct access to events** - not intermediated by a third-party
    vendor, or a slow API, or an interface offering aggregates only
* **Analysis tool agnostic** - Snowplow can be used to feed whatever
    analytics process you want (e.g. Hive, R, Pig, Sky EQL)  
* **Integrable with other data sources** - join Snowplow data into
    your other data sources (e.g. ecommerce, CRM) at the event level
* **Clean separation of tracking and analysis** - new analyses will not
    require re-tagging of your site or app

## Technical limitations

The current Snowplow architecture, tightly coupled as it is to Amazon
CloudFront and S3, has some specific limitations to consider:

* **Not real-time** - CloudFront takes 20-60 minutes to collate logs from its edge nodes, so real-time analytics are not feasible. In addition the enrichment process is batch-based, rather than stream-based
* **Data payload limited by querystring length** - Snowplow data is logged via a GET querystring - which of course could potentially hit the de facto [2000 character] [2000char] URL length limit

For more information on these limitations, please see the [[Technical FAQ|Developer-FAQ]].

[conceptual-architecture]: https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/conceptual-architecture.png
[tech-architecture]: https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/technical-architecture.png
[piwik]: http://piwik.org/
[owa]: http://www.openwebanalytics.com/
[cloudfront]: http://aws.amazon.com/cloudfront/
[s3]: http://aws.amazon.com/s3/
[hadoop]: http://hadoop.apache.org/
[hive]: http://hive.apache.org/
[2000char]: http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url