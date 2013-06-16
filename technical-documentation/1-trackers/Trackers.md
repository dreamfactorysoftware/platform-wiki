[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Trackers**](trackers)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/1-trackers.png]] 

## Overview

**Trackers** are client- or server-side libraries which track customer behaviour by sending Snowplow events to a [Collector](collectors).

## Tracker documentation

### Trackers

* [JavaScript Tracker](Javascript-Tracker) - for tracking user activity on websites and webapps
* [No-JS Tracker](No-JS-Tracker) - a pixel tracker for web environments where JavaScript is not available
* [Lua Tracker](Lua-Tracker) - track events in your Lua-based applications, Lua web servers/frameworks, or from the Lua scripting layer within your games or apps
* [Arduino Tracker](Arduino-Tracker) - for tracking events from an IP-connected Arduino board

For other trackers (e.g. iOS, Android) and their approximate timelines, please see the [Product roadmap](Product-roadmap).

### Protocol

* [Snowplow Tracker Protocol](snowplow-tracker-protocol) - the protocol implemented by all trackers
