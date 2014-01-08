## Overview

The current release of Snowplow is **0.8.13**. The planned roadmap for Snowplow is divided in two:

1. **Short term: a series of planned point releases** - adding specific, mostly incremental features, tweaks and bug fixes to the core platform
2. **Longer term: an approximate schedule for new components and capabilities** - setting out priorities and approximate timings for all-new Snowplow components and other ambitious new developments

We discuss each of these in turn below.

## Short-term: planned releases

In this section we list out the series of 'point' releases (0.8.x, 0.8.y etc) that we have planned. This list is accurate as of early January 2014 - but we always recommend browsing the list of [Open Milestones] [milestones] on our main GitHub repository.

**Warning:** we may change this schedule as new priorities are identified and the community feeds back on our current plans. If you are particularly interested in a given task being completed per schedule (or even accelerated), please 'vote' for the ticket by leaving a "+1" comment or similar on the relevant ticket.

The planned releases are as follows:

| Release   | Tickets                   | Objective(s)                                                                                           |
|-----------|---------------------------|--------------------------------------------------------------------------------------------------------|
| **0.8.14** | [See GitHub] [issues-0814] | Adding initial support for Kinesis |
| **0.8.15** | [See GitHub] [issues-0815] | Making ETL more robust             |
| **0.8.16** | [See GitHub] [issues-0816] | New enrichments                    |

## Longer-term: approximate schedule

In this section we set out an approximate map of the new components and capabilities we want to add to Snowplow, segmented by sub-system and by time (aka priority).

**Warning:** this schedule is approximate, and the items on it are subject to change. If you are interested in a specific functionality listed here, feel free to [Contact us](Talk-to-us) to find out more about its likely path-to-release.

The longer-term schedule of major developments is approximately as follows:

| Time   | Trackers        | Collectors | Enrichment | Storage       | Analytics        |
|--------|-----------------|---|---------------------|---------------|------------------|
| **Q2** | Android Tracker | - | Unstructured events | ElasticSearch | -                |
| **Q3** | iOS Tracker     | - | Thrift output       | Neo4j         | Machine learning | 

[milestones]: https://github.com/snowplow/snowplow/issues/milestones

[issues-0814]: https://github.com/snowplow/snowplow/issues?milestone=33&state=open
[issues-0815]: https://github.com/snowplow/snowplow/issues?milestone=29&state=open
[issues-0816]: https://github.com/snowplow/snowplow/issues?milestone=30&state=open

[scalding]: https://github.com/twitter/scalding
[redshift]: http://aws.amazon.com/redshift/