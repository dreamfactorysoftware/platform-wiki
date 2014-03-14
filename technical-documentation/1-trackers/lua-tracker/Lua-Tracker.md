<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Trackers**](trackers) > Lua Tracker

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
    - 3.2.4 [`setColorDepth()`](#set-color-depth)
- 4. [Tracking specific events](#events)
  - 4.1 [Common](#common)
    - 4.1.1 [Argument validation](#validation)
    - 4.1.2 [Optional timestamp argument](#tstamp-arg)
    - 4.1.3 [Return values](#ret-vals)
  - 4.2 [`trackScreenView()`](#screen-view)
  - 4.3 [`trackStructEvent()`](#struct-event)
  - 4.4 [`trackUnstructEvent()`](#unstruct-event)
    - 4.4.1 [Supported datatypes](#unstruct-datatypes)

<a name="overview" />
## 1. Overview

The [DreamFactory Lua Tracker](https://github.com/dreamfactory/dreamfactory-lua-tracker) allows you to track DreamFactory events from your Lua-based applications, Lua web servers/frameworks, or from the Lua scripting layer within your games or apps.

The tracker should be straightforward to use if you are comfortable with Lua development; any prior experience with DreamFactory"s [[JavaScript Tracker]], Google Analytics or Mixpanel (which have similar APIs to DreamFactory) is helpful but not necessary.

Note that this tracker has access to a more restricted set of DreamFactory events than the [[JavaScript Tracker]].

<a name="init" />
## 2 Initialization

Assuming you have completed the [[Lua Tracker Setup]] for your Lua project, you are now ready to initialize the Lua Tracker.

<a name="requiring" />
### 2.1 Requiring the module

Require the Lua Tracker"s module into your Lua code like so:

```lua
local dreamfactory = require( "dreamfactory" )
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
local t = dreamfactory.newTrackerForCf( "{{CLOUDFRONT-SUBDOMAIN}}" )
```

So if your Cloudfront subdomain is `d3rkrsqld9gmqf`, you would write:

```lua
local t = dreamfactory.newTrackerForCf( "d3rkrsqld9gmqf" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="create-uri" />
#### 2.2.2 Create a tracker logging to a non-CloudFront collector using `newTrackerForUri()`

You can initialize a tracker instance for a non-Cloudfront collector with:

```lua
local t = dreamfactory.newTrackerForUri( "{{COLLECTOR-URI}}" )
```

So if your collector is available at "my-company.c.snplow.com", you would write:

```lua
local t = dreamfactory.newTrackerForUri( "my-company.c.snplow.com" )
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="multi-tracker" />
### 2.3 Creating multiple trackers

Each tracker instance is completely sandboxed, so you can create multiple trackers as you see fit.

Here is an example of instantiating two separate trackers:

```lua
local t1 = dreamfactory.newTrackerForCf( "d3rkrsqld9gmqf" )
t1:platform( "cnsl" )
t1:trackUnstructEvent( "save-game", { save_id = 23 }, 1369330092 )

local t2 = dreamfactory.newTrackerForUri( "cc-endpoint.mysite.com" )
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
#### 3.1.1 Change the tracker"s platform with `platform()`

You can change the platform the tracker is running on by calling:

```lua
t:platform( "{{PLATFORM CODE}}" )
```

For example:

```lua
t:platform( "tv" ) -- Running on a Connected TV
```

For a full list of supported platforms, please see the [[DreamFactory Tracker Protocol]].

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

You may have additional information about your application"s environment, current user and so on, which you want to send to DreamFactory with each event.

The tracker instance has a set of `set...()` methods to attach extra data to all tracked events:

* [`setAppId()`](#set-app-id)
* [`setUserId()`](#set-user-id)
* [`setScreenResolution()`](#set-screen-resolution)
* [`setColorDepth()`](#set-color-depth)

We will discuss each of these in turn below:

<a name="set-app-id" />
### 3.2.1 Set application ID with `setAppId()`

You can set the application ID to any string:

```lua
t:setAppId( "{{APPLICATION ID}}" )
```

Example:

```lua
t:setAppId( "wow-addon-1" )
```

[Back to top](#top)

<a name="set-user-id" />
### 3.2.1 Set user ID with `setUserId()`

You can set the user ID to any string:

```lua
t:setUserId( "{{USER ID}}" )
```

Example:

```lua
t:setUserId( "alexd" )
```

[Back to top](#top)

<a name="set-screen-res" />
### 3.2.1 Set screen resolution with `setScreenResolution()`

If your Lua code has access to the device"s screen resolution, then you can pass this in to DreamFactory too:

```lua
t:setScreenResolution( {{WIDTH}}, {{HEIGHT}} )
```

Both numbers should be positive integers; note the order is height followed by width. Example:

```lua
t:setScreenResolution( 1366, 768 )
```

[Back to top](#top)

<a name="set-color-depth" />
### 3.2.1 Set color depth with `setColorDepth()`

If your Lua code has access to the bit depth of the device"s color palette for displaying images, then you can pass this in to DreamFactory too:

```lua
t:setColorDepth( {{BITS PER PIXEL}} )
```

The number should be a positive integer, in bits per pixel. Example:

```lua
t:setColorDepth( 32 )
```

[Back to top](#top)

<a name="events" />
## 4. Tracking specific events

DreamFactory has been built to enable you to track a wide range of events that occur when users interact with your websites and apps. We are constantly growing the range of functions available in order to capture that data more richly.

Tracking methods supported by the Lua Tracker at a glance:

| **Function**                                  | **Description**                                        |
|----------------------------------------------:|:-------------------------------------------------------|
| [`trackScreenView()`](#trackScreenView)       | Track the user viewing a screen within the application |
| [`trackStructEvent()`](#trackStructEvent)     | Track a DreamFactory custom structured event               |
| [`trackUnstructEvent()`](#trackUnstructEvent) | Track a DreamFactory custom unstructured event             |

<a name="common" />
### 4.1 Common

All events are tracked with specific methods on the tracker instance, of the form `track...()`, where `XXX` is the name of the event to track.

<a name="validation" />
### 4.1.1 Argument validation

Lua is a dynamically typed language, but each of our `track...()` methods expects its arguments to be of specific types and value ranges, and validates that to be the case.

If the validation check fails, then a runtime error is thrown:

```lua
local t = dreamfactory.newTrackerForCf( "d3rkrsqld9gmqf" )
local f = function() t:setColorDepth( "unknown" ) end
assert.has_error( f, "depth is required and must be a positive integer, not [unknown]" ) # Busted assertion passes
```

If your value is of the wrong type, convert it before passing it into the `track...()` method, for example:

```lua
local level_idx = 42
t:trackScreenView( "Game Level", tostring( level_idx ) )
```

We specify the types and value ranges required for each argument below.

[Back to top](#top)

<a name="tstamp-arg" />
### 4.1.2 Optional timestamp argument

Each `track...()` method supports an optional timestamp as its final argument; this allows you to manually override the timestamp attached to this event.

If you do not pass this timestamp in as an argument, then the Lua Tracker will use the current time to be the timestamp for the event.

Here is an example tracking a structured event and supplying the optional timestamp argument. Note that we have to explicitly supply `nil`s for the intervening arguments which are empty:

```lua
t:trackStructEvent( "hud", "save", nil, nil, nil, 1368725287 )
```

Timestamp is counted in seconds since the Unix epoch - the same format as generated by `os.time()` in Lua.

[Back to top](#top)

<a name="ret-vals" />
### 4.1.3 Return values

Each `track...()` method has the same return signature, returning two values:

```lua
local status, msg = t:trackUnstructEvent( "save-game", { save_id = "4321", level = 23 } )
```

These values are as follows:

1. The first value (`status` above) is a boolean, set to `true` if the event was successfully logged to the collector, or `false` if the event was not successfully logged
2. The second value (`msg` above) is a string, which is `nil` if `status` is true, but contains the error message if `status` be `false`

[Back to top](#top)

<a name="screen-view" />
### 4.2 Track screen views with `trackScreenView()`

**Warning:** this feature is implemented in the Lua tracker, but it is **not** currently supported in the Enrichment, Storage or Analytics stages in the DreamFactory data pipeline. As a result, if you use this feature, you will log screen views to your collector logs, but these will not be parsed and loaded into e.g. Redshift to analyse. (Adding this capability is on the roadmap.)

Use `trackScreenView()` to track a user viewing a screen (or equivalent) within your app. Arguments are:

| **Argument** | **Description**                     | **Required?** | **Validation**          |
|-------------:|:------------------------------------|:--------------|:------------------------|
| `name`       | Human-readable name for this screen | Yes           | Non-empty string        |
| `id`         | Unique identifier for this screen   | No            | String or nil           |
| `tstamp`     | When the screen was viewed          | No            | Positive integer or nil |

Example:

```lua
local s, msg = t:trackScreenView( "HUD > Save Game", "screen23", 1368725287 )
```

[Back to top](#top)

<a name="struct-event" />
### 4.3 Track structured events with `trackStructEvent()`

Use `trackStructEvent()` to track a custom event happening in your app which fits the Google Analytics-style structure of having up to five fields (with only the first two required):

| **Argument** | **Description**                                                  | **Required?** | **Validation**          |
|-------------:|:---------------------------------------------------------------  |:--------------|:------------------------|
| `category`   | The grouping of structured events which this `action` belongs to | Yes           | Non-empty string        |
| `action`     | Defines the type of user interaction which this event involves   | Yes           | Non-empty string        |
| `label`      | A string to provide additional dimensions to the event data      | No            | String or nil           |
| `property`   | A string describing the object or the action performed on it     | No            | String or nil           |
| `value`      | A value to provide numerical data about the event                | No            | Number of nil           |
| `tstamp`     | When the structured event occurred                               | No            | Positive integer or nil |

Example:

```lua
local s, msg = t:trackStructEvent( "shop", "add-to-basket", nil, "pcs", 2, 1369330909 )
```

[Back to top](#top)

<a name="unstruct-event" />
### 4.4 Track unstructured events with `trackUnstructEvent()`

**Warning:** this feature is implemented in the Lua tracker, but it is **not** currently supported in the Enrichment, Storage or Analytics stages in the DreamFactory data pipeline. As a result, if you use this feature, you will log unstructured events to your collector logs, but these will not be parsed and loaded into e.g. Redshift to analyse. (Adding this capability is on the roadmap.)

Use `trackUnstructEvent()` to track a custom event which consists of a name and an unstructured set of properties. This is useful when:

* You want to track event types which are proprietary/specific to your business (i.e. not already part of DreamFactory), or
* You want to track events which have unpredictable or frequently changing properties

The arguments are as follows:

| **Argument** | **Description**                     | **Required?** | **Validation**          |
|-------------:|:------------------------------------|:--------------|:------------------------|
| `name`       | The name of the event               | Yes           | Non-empty string        |
| `properties` | The properties of the event         | Yes           | Non-empty table         |
| `tstamp`     | When the screen was viewed          | No            | Positive integer or nil |

Example:

```lua
local s, msg = t:trackUnstructEvent( "save-game", {
                   save_id = "4321",
                   level = 23,
                   difficultyLevel = "HARD",
                   dl_content = true
                 }, 1369330929 )
```

The properties table consists of a set of individual `name = value` pairs. The structure must be flat: properties cannot be nested. Be careful here as this is **not** currently enforced through validation.

[Back to top](#top)

<a name="unstruct-datatypes" />
#### 4.4.1 Supported datatypes

DreamFactory unstructured events support a relatively rich set of datatypes. Because these datatypes do not always map directly onto Lua datatypes, we have introduced some "type suffixes" for the Lua property names, so that DreamFactory knows what DreamFactory data types the Lua data types map onto:

| DreamFactory datatype | Description                  | Lua datatype       | Type suffix(es)      | Supports array? |
|:------------------|:-----------------------------|:-------------------|:---------------------|:----------------|
| Null              | Absence of a value           | N/A                | -                    | No              |
| String            | String of characters         | string             | -                    | Yes             |
| Boolean           | True or false                | boolean            | -                    | Yes             |
| Integer           | Number without decimal       | number             | `_INT`               | Yes             |
| Floating point    | Number with decimal          | number             | `_FLT`               | Yes             |
| Geo-coordinates   | Longitude and latitude       | { number, number } | `_GEO`               | Yes             |
| Date              | Date and time (ms precision) | number             | `_DT`, `_TM`, `_TMS` | Yes             |
| Array             | Array of values              | {x, y, z}          | -                    | -               |

Let"s go through each of these in turn, providing some examples as we go:

###### 4.4.1.1 Null

Tracking a Null value for a given field is currently unsupported in the Lua Tracker. There is a [ticket](https://github.com/dreamfactory/dreamfactory-lua-tracker/issues/7) to fix this.

###### 4.4.1.2 String

Tracking a String is easy:

```lua
{
    product_id = "ASO01043"
}
```

###### 4.4.1.3 Boolean

Tracking a Boolean is also straightforward:

```lua
{
    trial = true
}
```

###### 4.4.1.4 Integer

To track an Integer, use a Lua number but add a type suffix like so:

```lua
{
    in_stock_INT = 23
}
```

**Warning:** if you do not add the `_INT` type suffix, DreamFactory will assume you are tracking a Floating point number.

###### 4.4.1.5 Floating point

To track a Floating point number, use a Lua number; adding a type suffix is optional:

```lua
{
    price_INT = 4.99,
    sales_tax = 49.99 -- Same as sales_tax_FLT = ...
}
```

###### 4.4.1.5 Geo-coordinates

Tracking a pair of Geographic coordinates is done like so:

```lua
{
    check_in_GEO = { 40.11041, -88.21337 } -- Lat, long
}
```

Please note that the datatype takes the format **latitude** followed by **longitude**. That is the same order used by services such as Google Maps.

**Warning:** if you do not add the `_GEO` type suffix, then the value will be incorrectly interpreted by DreamFactory as an Array of Floating points.

###### 4.4.1.6 Date

DreamFactory Dates include the date _and_ the time, with milliseconds precision. There are three type suffixes supported for tracking a Date:

* `_DT` - the Number of days since the epoch
* `_TM` - the Number of seconds since the epoch
* `_TMS` - the Number of milliseconds since the epoch. This precision is hard to access from within Lua

You can track a date by adding a Lua number to your `properties` object. The following are all valid dates:

```lua
{
    birthday2_DT = 3996,
    registered2_TM = 1371129610,
    last_action_TMS = 1368454114215, -- Accurate to milliseconds
}
```

Note that the type prefix only indicates how the Lua number sent to DreamFactory is interpreted - all DreamFactory Dates are stored to milliseconds precision (whether or not they include that level of precision).

**Two warnings:**

1. If you specify a Lua number but do not add a valid Date suffix (`_DT`, `_TM` or `_TMS`), then the value will be incorrectly interpreted by DreamFactory as a Number, not a Date
2. If you specify a Lua number but add the wrong Date suffix, then the Date will be incorrectly interpreted by DreamFactory, for example:

```lua
{
    last_ping_DT = 1371129610 -- Should have been _TM. DreamFactory will interpret this as the year 3756521449
}
```

###### 4.4.1.7 Arrays

You can track an Array of values of any data type other than Null.

Arrays must be homogeneous - in other words, all values within the Array must be of the same datatype. This means that the following is **not** allowed:

```lua
{
    sizes = { "xs", 28, "l", 38, "xxl"] -- NOT allowed
}
```

By contrast, the following are all allowed:

```lua
{
    sizes = { "xs", "s", "l", "xl", "xxl" },
    session_starts_TM = { 1371129610, 1064329730, 1341127611 },
    check_ins_GEO = { { -88.21337, 40.11041 }, { -78.81557, 30.22047 } }
}
```

[Back to top](#top)