<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Trackers**](trackers)

## Contents

- 1. [Overview](#overview)  

- 2. [General configuration and parameters](#general)
  - 2.1 [Initialization and configuration](#init-and-config)  
    - 2.1.1 [Requiring the module](#requiring)
    - 2.1.2 [Creating a tracker](#create-tracker)  
      - 2.1.2.1 [`newTrackerForCf`](#create-cf)  
      - 2.1.2.2 [`newTrackerForUri`](#create-uri)
    - 2.1.3 [Creating multiple trackers](#multi-tracker)
    - 2.1.4 [Configuring your tracker](#configure-tracker)
      - 2.1.4.1 [`platform`](#platform)
      - 2.1.4.2 [`encodeBase64`](#encode-base64)

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

<a name="create-cf" />
#### 2.1.2.1 Create a tracker logging to Cloudfront with `newTrackerForCf()`

You can initialize a tracker instance for a Cloudfront collector with:

```lua
local t = snowplow.newTrackerForCf( "{{CLOUDFRONT-SUBDOMAIN}}" )
```

So if your Cloudfront subdomain is `d3rkrsqld9gmqf`, you would write:

```lua
local t = snowplow.newTrackerForCf( "d3rkrsqld9gmqf" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="create-uri" />
#### 2.1.2.2 Create a tracker logging to a non-CloudFront collector using `newTrackerForUri()`

You can initialize a tracker instance for a non-Cloudfront collector with:

```lua
local t = snowplow.newTrackerForUri( "{{COLLECTOR-URI}}" )
```

So if your collector is available at 'my-company.c.snplow.com', you would write:

```lua
local t = snowplow.newTrackerForUri( "my-company.c.snplow.com" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)

### 2.1.3 Creating multiple trackers

Each tracker instance is completely sandboxed, so you can create multiple trackers as you see fit.

Here is an example of instantiating two separate trackers:

```lua
local t1 = snowplow.newTrackerForCf( "d3rkrsqld9gmqf" )
t1:platform( "cnsl" )
t1:trackUnstructEvent( "save-game", { save_id = 23 }, 1369330092 )

local t2 = snowplow.newTrackerForUri( "cc-endpoint.mysite.com" )
t2:platform( "cnsl" )
t2:trackScreenView( "Game HUD", "23" )

t1:trackScreenView( "Test", "23" ) -- Back to first tracker 
```

[Back to top](#top)

<a name="configure-tracker" />
### 2.1.4 Configuring your tracker

Each tracker instance is initialized with sensible defaults:

* The platform the tracker is running on is set to "pc"
* Property data for unstructured events is sent Base64-encoded

However you can change either of these defaults:

<a name="platform" />
#### 2.1.4.1 Change the tracker's platform with `platform()`

You can change the platform the tracker is running on by calling:

```lua
t:platform( "{{PLATFORM CODE}}" )
```

For example:

```lua
t:platform( "tv" ) -- Running on a Connected TV
```

For a full list of supported platforms, please see the [[Snowplow Tracker Protocol]].

[Back to top](#top)

<a name="encode-base64" />
#### 2.1.4.1 Disable Base64-encoding with `encodeBase64()`

You can set whether or not to Base64-encode property data for unstructured events by calling:

```lua
t:encodeBase64( {{true OR false}} )
```

So to disable it (and send the data URI-encoded instead):

```lua
t:encodeBase64( false )
```

[Back to top](#top)