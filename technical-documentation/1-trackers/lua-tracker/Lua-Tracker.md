<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Trackers**](trackers)

## Contents

- 1. [Overview](#overview)  
- 2. [Initialization](#init)  
  - 2.1 [Requiring the module](#requiring)
  - 2.2 [Creating a tracker](#create-tracker)  
    - 2.2.1 [`newTrackerForCf()`](#create-cf)  
    - 2.2.2 [`newTrackerForUri()`](#create-uri)
  - 2.3 [Creating multiple trackers](#multi-tracker)
- 3. [Configuration](#config)  
  - 3.1 [Configuring your tracker](#configure-tracker)
    - 3.1.1 [`platform()`](#platform)
    - 3.1.2 [`encodeBase64()`](#encode-base64)
  - 3.2 [Adding extra data](#add-data)
    - 3.2.1 [`setAppId()`](#set-app-id)
    - 3.2.2 [`setUserId()`](#set-user-id)
    - 3.2.3 [`setScreenResolution()`](#set-screen-resolution)

<a name="overview" />
## 1. Overview

The [Snowplow Lua Tracker](https://github.com/snowplow/snowplow-lua-tracker) allows you to track Snowplow events from your Lua-based applications, Lua web servers/frameworks, or from the Lua scripting layer within your games or apps.

The tracker should be straightforward to use if you are comfortable with Lua development; any prior experience with Snowplow's [[JavaScript Tracker]], Google Analytics or Mixpanel (which have similar APIs to Snowplow) is helpful but not necessary.

Note that this tracker has access to a more restricted set of Snowplow events than the [[JavaScript Tracker]].

<a name="init" />
## 2 Initialization

Assuming you have completed the [[Lua Tracker Setup]] for your Lua project, you are now ready to initialize the Lua Tracker.

<a name="requiring" />
### 2.1 Requiring the module

Require the Lua Tracker's module into your Lua code like so:

```lua
local snowplow = require("snowplow")
```

That's it - you are now ready to initialize a tracker instance. 

[Back to top](#top)

<a name="create-tracker" />
### 2.2 Creating a tracker

There are two different versions of the tracker constructor, depending on which type of collector you want to log events to.

If you are using a Cloudfront collector, use [newTrackerForCf()](#create-cf) to initialize your tracker instance. If you are using any other collector (e.g. the Clojure collector, or SnowCannon), then you should use [newTrackerForUri()](#create-uri).

<a name="create-cf" />
#### 2.2.1 Create a tracker logging to Cloudfront with `newTrackerForCf()`

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
#### 2.2.2 Create a tracker logging to a non-CloudFront collector using `newTrackerForUri()`

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

### 2.3 Creating multiple trackers

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

<a name="config" />
## 3. Configuration

<a name="configure-tracker" />
### 3.1 Configuring your tracker

Each tracker instance is initialized with sensible defaults:

* The platform the tracker is running on is set to "pc"
* Property data for unstructured events is sent Base64-encoded

However you can change either of these defaults:

<a name="platform" />
#### 3.1.1 Change the tracker's platform with `platform()`

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
#### 3.1.2 Disable Base64-encoding with `encodeBase64()`

You can set whether or not to Base64-encode property data for unstructured events by calling:

```lua
t:encodeBase64( {{true OR false}} )
```

So to disable it and send the data URI-encoded instead:

```lua
t:encodeBase64( false )
```

[Back to top](#top)

<a name="add-data" />
## 3.2 Adding extra data

You may have additional information about your application's environment, current user and so on, which you want to send to Snowplow with each event.

The tracker instance has a set of `set...()` methods to attach extra data to all tracked events:

* [`setAppId()`](#set-app-id)
* [`setUserId()`](#set-user-id)
* [`setScreenResolution()`](#set-screen-resolution)
* `setViewport()`
* `setColorDepth()`

We will discuss each of these in turn below:

<a name="set-app-id" />
### 3.2.1 Set the application's ID with `setAppId()`

<a name="set-user-id" />
### 3.2.1 Set the user's ID with `setUserId()`

<a name="set-screen-res" />
### 3.2.1 Set the screen's resolution with `setScreenResolution()`