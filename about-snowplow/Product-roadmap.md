## Overview

The current release of Snowplow is **0.8.10**. The planned roadmap for Snowplow is divided in two:

1. **Short term: a series of planned point releases** - adding specific, mostly incremental features, tweaks and bug fixes to the core platform
2. **Longer term: an approximate schedule for new components and capabilities** - setting out priorities and approximate timings for all-new Snowplow components and other ambitious new developments

We discuss each of these in turn below.

## Short-term: planned releases

In this section we list out the series of 'point' releases (0.8.x, 0.8.y etc) that we have planned. This list is accurate as of early August 2013 - but we always recommend browsing the list of [Open Milestones] [milestones] on our main GitHub repository.

**Warning:** we may change this schedule as new priorities are identified and the community feeds back on our current plans. If you are particularly interested in a given task being completed per schedule (or even accelerated), please 'vote' for the ticket by leaving a "+1" comment or similar on the relevant ticket.

The planned releases are as follows:

| Release   | Tickets                   | Objective(s)                                                                                           |
|-----------|---------------------------|--------------------------------------------------------------------------------------------------------|
| **0.8.11** | [See GitHub] [issues-0811] | A wide range of ETL improvements   |
| **0.8.12** | [See GitHub] [issues-0812] | Make the ETL process more robust                         |
| **0.8.13** | [See GitHub] [issues-0813] | Add initial ETL and storage support for unstructured events                         |


## Longer-term: approximate schedule

In this section we set out an approximate map of the new components and capabilities we want to add to Snowplow, segmented by sub-system and by time (aka priority).

**Warning:** this schedule is approximate, and the items on it are subject to change. If you are interested in a specific functionality listed here, feel free to [Contact us](Talk-to-us) to find out more about its likely path-to-release.

The longer-term schedule of major developments is approximately as follows:

| Time   | Trackers        | Collectors | Enrichment                                           | Storage              | Analytics |
|--------|-----------------|------------|------------------------------------------------------|----------------------|-----------|
| **Q3** | Android Tracker<br>iOS Tracker     | -          | Move to Avro for Snowplow event files<br>ETL to transform Avro to Redshift             | MongoDB<br>MySQL        | Machine-learning using Mahout         |
| **Q4** | Ruby Tracker  | Scala Collector | Host business lookup                                 | PredictionIO<br>SkyDB      | - | 

[milestones]: https://github.com/snowplow/snowplow/issues/milestones

[issues-0811]: https://github.com/snowplow/snowplow/issues?milestone=25&state=open
[issues-0812]: https://github.com/snowplow/snowplow/issues?milestone=26&state=open
[issues-0813]: https://github.com/snowplow/snowplow/issues?milestone=29&state=open

[scalding]: https://github.com/twitter/scalding
[redshift]: http://aws.amazon.com/redshift/