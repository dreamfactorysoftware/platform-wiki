<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Trackers**](trackers)

## Contents

- 1. [Overview](#overview)  

- 2. [General configuration and parameters](#general)
  - 2.1 [Initialization and configuration](#init-and-config)  
    - 2.1.1 [Requiring the module](#requiring)
    - 2.1.2 [Creating a tracker](#create-tracker)  
      - 2.2.1 [`newTrackerForCf`](#create-cf)  
      - 2.2.2 [`newTrackerForUri`](#create-uri)

<a name="overview" />
## 1. Overview

The [Snowplow Lua Tracker](https://github.com/snowplow/snowplow-lua-tracker) allows you to track Snowplow events from your Lua-based applications, Lua web servers/frameworks, or from the Lua scripting layer within your games or apps.

The tracker should be straightforward to use if you are comfortable with Lua development; any prior experience with Snowplow's [[JavaScript Tracker]], Google Analytics or MixPanel (which have similar APIs to Snowplow) is helpful but not necessary.

Note that this tracker has access to a more restricted set of Snowplow events than the [[JavaScript Tracker]].

<a name="init-and-config" />
## 2.1 Initialization and configuration

Assuming you have completed the [[Lua Tracker Setup]] for your Lua project, you are now ready to initialize and configure the Lua Tracker.

<a name="requiring" />
### 2.1.1 Requiring the module

Require the Lua Tracker's module into your Lua code like so:

```lua
local snowplow = require("snowplow")
```

That's it - you are now ready to initialize a tracker instance. 

[Back to top](#top)

<a name="create-tracker" />
### 2.1.2 Creating a tracker

There are two different versions of the tracker constructor, depending on which type of collector you want to log events to.

If you are using a Cloudfront collector, use [newTrackerForCf()](#create-cf) to initialize your tracker instance. If you are using any other collector (e.g. the Clojure collector, or SnowCannon), then you should use [newTrackerForUri()](#create-uri).

<a name="initCf" />
#### 2.1.2.1 Creating a tracker logging to Cloudfront with `newTrackerForCf()`

You can initialize a tracker instance for a Cloudfront collector with:

```lua
local t = snowplow.newTrackerForCf( "{{CLOUDFRONT-SUBDOMAIN}}" )
```

So if your Cloudfront subdomain is `d3rkrsqld9gmqf`, you would include:

```lua
local t = snowplow.newTrackerForCf( "d3rkrsqld9gmqf" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="initUrl" />
#### 2.1.2.2 Creating a tracker logging to a non-CloudFront collector using `newTrackerForUri()`

You can initialize a tracker instance for a non-Cloudfront collector with:

```lua
local t = snowplow.newTrackerForUri( "{{COLLECTOR-URL}}" )
```

So if your collector is available at 'my-company.c.snplow.com' then you would include:

```lua
local t = snowplow.newTrackerForUri( "my-company.c.snplow.com" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)