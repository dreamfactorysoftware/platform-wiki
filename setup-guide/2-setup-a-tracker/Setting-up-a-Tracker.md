<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 1: setup a Collector**](Setting-up-a-tracker)

[[/images/1-trackers.png]]

SnowPlow Trackers generate event-data and send that data to [SnowPlow Collectors] (Setting-up-a-Collector) to log to S3.

1. [Choose one (or more) Trackers](#choose)
2. [Setup your Tracker(s)](#setup)

## 1. Choose a Tracker

There are currently two trackers available:

| **Tracker**                                    | **Description**                                     | **Status**       |
|:-----------------------------------------------|:----------------------------------------------------|:-----------------|
| [Javascript tracker](javascript-tracker-setup) | A client-side Javascript tracker fo web browser use | Production-ready |
| [No-JS tracker](no-js-tracker-setup)           | A wizard for generating HTML-only SnowPlow tracking tags to enable tracking of pageviews where Javascript cannot be used e.g. HTML emails | Production-ready |

An iOS and Android tracker are on the development roadmap.

The [Javascript tracker](javascript-tracker-setup) is used to track the behaviour of users who visit your website / webapp. In addition, the [No-JS tracker](no-js-tracker-setup) is used to provide additional tracking of users in HTML environments that do not support Javascript, e.g. HTML emails, or content that you serve on 3rd party domains. (E.g. 3rd party marketplaces or services like Github.)

## Setting up your tracker(s)

1. [Setup the Javascript tracker](javascript-tracker-setup)
2. [Setup the No-JS tracker](no-js-tracker-setup)

Setting up the Javascript tracker involves integrating SnowPlow tags on your website(s). It is an analogous process to integrating Google Analytics or SiteCatalyst tags on your website.

In contrast, the [No-JS tracker](no-js-tracker-setup) is really a wizard that generates tags to embed in your content that are HTML-only.

Back to [SnowPlow setup](Setting-up-SnowPlow).