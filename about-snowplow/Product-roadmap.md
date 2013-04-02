## Overview

The current release of SnowPlow is **0.7.6**. The planned roadmap for SnowPlow is divided in two:

1. **Short term: a series of planned point releases** - adding specific, mostly incremental features, tweaks and bug fixes to the core platform
2. **Longer term: an approximate schedule for new components and capabilities** - setting out priorities and approximate timings for all-new SnowPlow components and other ambitious new developments

We discuss each of these in turn below.

## Short-term: planned releases

In this section we list out the series of 'point' releases (0.8.x, 0.8.y etc) that we have planned. This list is accurate as of late February 2013 - but we always recommend browsing the list of [Open Milestones] [milestones] on our main GitHub repository.

**Warning:** we may change this schedule as new priorities are identified and the community feeds back on our current plans. If you are particularly interested in a given task being completed per schedule (or even accelerated), please 'vote' for the ticket by leaving a "+1" comment or similar on the relevant ticket.

The planned releases are as follows:

| Release   | Tickets                   | Objective(s)                                                                                           |
|-----------|---------------------------|--------------------------------------------------------------------------------------------------------|
| **0.8.0** | [See GitHub] [issues-080] | Release Hadoop-based ETL (written in [Scalding] [scalding]), targeting Redshift initially              |
| **0.8.1** | [See GitHub] [issues-081] | Add marketing attribution (referer parsing) to Hadoop-based ETL  Handle Hadoop small files problem |
| **0.8.2** | [See GitHub] [issues-082] | Add geo-IP lookup to Hadoop-based ETL                                                                  |
| **0.8.3** | [See GitHub] [issues-083] | Add Postgres as a storage target |

## Longer-term: approximate schedule

In this section we set out an approximate map of the new components and capabilities we want to add to SnowPlow, segmented by sub-system and by time (aka priority).

**Warning:** this schedule is approximate, and the items on it are subject to change. If you are interested in a specific functionality listed here, feel free to [Contact us](Talk-to-us) to find out more about its likely path-to-release.

The longer-term schedule of major developments is approximately as follows:

| Time   | Trackers        | Collectors | Enrichment                                           | Storage              | Analytics |
|--------|-----------------|------------|------------------------------------------------------|----------------------|-----------|
| **Q2** | Android Tracker<br>Lua Tracker | -          | Move to Avro for SnowPlow event files<br>ETL to transform Avro to our other storage targets | -        | -         | 
| **Q3** | iOS Tracker     | -          | Support for unstructured events             | MongoDB support<br>SkyDB support        | Machine-learning using Mahout         |
| **Q4** | Python Tracker  | Scala Collector | Host business lookup                                 | MySQL support      | - | 

[milestones]: https://github.com/snowplow/snowplow/issues/milestones

[issues-080]: https://github.com/snowplow/snowplow/issues?milestone=15&state=open
[issues-081]: https://github.com/snowplow/snowplow/issues?milestone=16&state=open
[issues-082]: https://github.com/snowplow/snowplow/issues?milestone=17&state=open
[issues-083]: https://github.com/snowplow/snowplow/issues?milestone=19&state=open

[scalding]: https://github.com/twitter/scalding
[redshift]: http://aws.amazon.com/redshift/