[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**ETL**](etl)

## Overview

We are currently developing a pure Hadoop-based ETL process as an alternative to our current Hive serde-based ETL process.

This ETL process is being built in [Scalding] [scalding], which is a Scala API for [Cascading] [cascading], the ETL/analysis framework for Hadoop.

## Rationale

There should be three main advantages to our new Hadoop-based ETL process over our current Hive-based approach:

1. **Simpler to run** - the new ETL process won't require Hive to run, which means fewer moving parts
2. **Allows more complex enrichments** - we have pushed our Hive deserializer a long way, but for more complex enrichments such as referer parsing and geo-IP lookups, we need a more robust Hadoop-based approach
3. **Supports aggregate processing** - our current Hive-based ETL process is row-based - meaning that all processing happens at the level of an individual event. A Hadoop-based approach will support aggregate processing such as de-duping, grouping events and so on

To find out more, please see our blog post, [The SnowPlow development roadmap for the ETL step - from ETL to enrichment] [etl-blog-post].

## Status

We plan to release our first prototype of the new Hadoop-based ETL process in SnowPlow version **0.8.0**, the next major release of SnowPlow. For more information, please see our [Product roadmap] [roadmap].

To see how the Hadoop ETL component is developing, check out the [feature/scalding-etl] [hadoop-branch] branch in our main SnowPlow repository.

[scalding]: https://github.com/twitter/scalding
[cascading]: https://github.com/twitter/scalding

[etl-blog-post]: http://snowplowanalytics.com/blog/2013/01/09/from-etl-to-enrichment/
[roadmap]: https://github.com/snowplow/snowplow/wiki/Product-roadmap
[hadoop-branch]: https://github.com/snowplow/snowplow/tree/feature/scalding-etl