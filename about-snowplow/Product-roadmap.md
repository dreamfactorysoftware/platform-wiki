## Overview

The current release of SnowPlow is **0.7.2**. The planned roadmap for SnowPlow is divided in two:

1. **Short term: a series of planned point releases** - adding specific, mostly incremental features, tweaks and bug fixes to the core platform
2. **Longer term: an approximate schedule for new components and capabilities** - setting out priorities and approximate timings for all-new SnowPlow components and other ambitious new developments

We discuss each of these in turn below.

## Short-term: planned releases

In this section we list out the series of 'point' releases (0.7.x, 0.7.y etc) that we have planned. This list is accurate as of early February 2013 - but we always recommend browsing the list of [Open Milestones] [milestones] on our main GitHub repository.

**Warning:** we may change this schedule as new priorities are identified and the community feeds back on our current plans. If you are particularly interested in a given task being completed per schedule (or even accelerated), please 'vote' for the ticket by leaving a "+1" comment or similar on the relevant ticket.

The planned releases are as follows:

| Release   | Tickets                   | Objective(s)                                                                                           |
|-----------|---------------------------|--------------------------------------------------------------------------------------------------------|
| **0.7.3** | [See GitHub] [issues-073] | Clean up JavaScript Tracker, track additional data (e.g. page characterset, viewport), make page pings richer, extract page URI into component pieces, add an event_vendor field |
| **0.7.4** | [See GitHub] [issues-074] | Add support for Amazon Redshift                                                                        |
| **0.7.5** | [See GitHub] [issues-075] | Make it easier to monitor the EmrEtlRunner and StorageLoader and investigate any errors                |
| **0.7.6** | [See GitHub] [issues-076] | Add support for ad impression tracking, ad click tracking, link click tracking and tracking item views |
| **0.7.7** | [See GitHub] [issues-077] | Add support for unstructured events and loading into Postgres                                          |

## Longer-term: approximate schedule

In this section we set out an approximate map of the new components and capabilities we want to add to SnowPlow, segmented by sub-system and by time (aka priority).

**Warning:** this schedule is approximate, and the items on it are subject to change. If you are interested in a specific functionality listed here, feel free to [Contact us](Talk-to-us) to find out more about its likely path-to-release.

The longer-term schedule of major developments is approximately as follows:

| Time   | Trackers        | Collectors | Enrichment                                           | Storage              | Analytics |
|--------|-----------------|------------|------------------------------------------------------|----------------------|-----------|
| **Q1** | Arduino Tracker | -          | New Scalding-based ETL process                       | -                    | -         | 
| **Q2** | Android Tracker<br>Lua Tracker | -          | Geo-IP lookup<br>Referer URI parsing                                | SkyDB support        | -         | 
| **Q3** | iOS Tracker     | -          | Move to Avro for SnowPlow event files<br>ETL to transform Avro to our other storage targets | MySQL support        | -         |
| **Q4** | Python Tracker  | Scala Spray collector          | Host business lookup                                 | MongoDB support      | Machine-learning using Mahout | 

[milestones]: https://github.com/snowplow/snowplow/issues/milestones

[issues-073]: https://github.com/snowplow/snowplow/issues?milestone=8&state=open
[issues-074]: https://github.com/snowplow/snowplow/issues?milestone=10&state=open
[issues-075]: https://github.com/snowplow/snowplow/issues?milestone=11&state=open
[issues-076]: https://github.com/snowplow/snowplow/issues?milestone=12&state=open
[issues-077]: https://github.com/snowplow/snowplow/issues?milestone=13&state=open

[scalding]: https://github.com/twitter/scalding
