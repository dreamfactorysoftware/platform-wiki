<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Trackers**](trackers) > Python Tracker

## Contents

- 1. [Overview](#overview)  
- 2. [Initialization](#init)  
  - 2.1 [Importing the module](#importing)
  - 2.2 [Creating a tracker](#create-tracker)  
    - 2.2.1 [`cloudfront()`](#create-cf)  
    - 2.2.2 [`hostname()`](#create-uri)
  - 2.3 [Creating multiple trackers](#multi-tracker)
- 3. [Configuration](#config)  
  - 3.1 [Configuring your tracker](#configure-tracker)
    - 3.1.1 [`set_platform()`](#platform)
    - 3.1.2 [`set_base64_to()`](#encode-base64)
  - 3.2 [Adding extra data](#add-data)
    - 3.2.1 [`set_app_id()`](#set-app-id)
    - 3.2.2 [`set_user_id()`](#set-user-id)
    - 3.2.3 [`set_screen_resolution()`](#set-screen-resolution)
    - 3.2.4 [`set_color_depth()`](#set-color-depth)
- 4. [Tracking specific events](#events)
  - 4.1 [Common](#common)
    - 4.1.1 [Argument validation](#validation)
    - 4.1.2 [Optional timestamp argument](#tstamp-arg)
    - 4.1.3 [Return values](#ret-vals)
  - 4.2 [`track_screen_view()`](#screen-view)
  - 4.3 
  - 4.4 
  - 4.5 [`track_struct_event()`](#struct-event)
  - 4.6 [`track_unstruct_event()`](#unstruct-event)
    - 4.6.1 [Supported datatypes](#unstruct-datatypes)

<a name="overview" />
## 1. Overview

The [Snowplow Python Tracker](https://github.com/snowplow/snowplow-python-tracker) allows you to track Snowplow events from your Python apps and games.

The tracker should be straightforward to use if you are comfortable with Python development; any prior experience with Snowplow"s [[JavaScript Tracker]] or [[Lua Tracker]], Google Analytics or Mixpanel (which have similar APIs to Snowplow) is helpful but not necessary.

Note that this tracker has access to a more restricted set of Snowplow events than the [[JavaScript Tracker]] and covers almost all the events from the [[Lua Tracker]].

<a name="init" />
## 2 Initialization

Assuming you have completed the [[Python Tracker Setup]] for your Python project, you are now ready to initialize the Python Tracker.

<a name="importing" />
### 2.1 Importing the module

Require the Python Tracker"s module into your Python code like so:

```python
from snowplowtracker import tracker
```

or

```python
from snowplowtracker.tracker import Tracker
```

That's it - you are now ready to initialize a tracker instance. 

[Back to top](#top)

<a name="create-tracker" />
### 2.2 Creating a tracker

There are two different versions of the tracker constructor, depending on which type of collector you want to log events to.

If you are using a Cloudfront collector, use [Tracker.cloudfront()](#create-cf) to initialize your tracker instance. If you are using any other collector (e.g. the Clojure collector, or SnowCannon), then you should use [Tracker.hostname()](#create-uri).

<a name="create-cf" />
#### 2.2.1 Create a tracker logging to Cloudfront with `Tracker.cloudfront()`

You can initialize a tracker instance for a Cloudfront collector with:

```python
tracker = Tracker.cloudfront(cf_subdomain)
```
So if your Cloudfront subdomain is `d3rkrsqld9gmqf`, you would write:

```python
tracker = Tracker.cloudfront("d3rkrsqld9gmqf")
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="create-uri" />
#### 2.2.2 Create a tracker logging to a non-CloudFront collector using `newTrackerForUri()`

You can initialize a tracker instance for a non-Cloudfront collector with:

```python
tracker = Tracker.hostname(host)
```

So if your collector is available at "my-company.c.snplow.com", you would write:

```python
tracker = Tracker.hostname("my-company.c.snplow.com")
```

This completes the initialization of your tracker instance.

[Back to top](#top)

<a name="multi-tracker" />
### 2.3 Creating multiple trackers

Each tracker instance is completely sandboxed, so you can create multiple trackers as you see fit.

Here is an example of instantiating two separate trackers:

```python
t1 = Tracker.cloudfront("d3rkrsqld9gmqf")
t1.set_platform("cnsl")
t1.track_unstruct_event("save-game", { save_id = 23 }, 1369330092)

t2 = Tracker.hostname("my-company.c.snplow.com")
t2.set_platform("cnsl")
t2.track_screen_view("Game HUD", "23")

t1.track_screen_view("Test", "23") # Back to first tracker 
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
#### 3.1.1 Change the tracker"s platform with `set_platform()`

You can change the platform the tracker is running on by calling:

```python
t.set_platform(platform_code)
```

For example:

```python
t.set_platform("tv") # Running on a Connected TV
```

For a full list of supported platforms, please see the [[Snowplow Tracker Protocol]].

[Back to top](#top)

<a name="encode-base64" />
#### 3.1.2 Disable Base64-encoding with `set_base64_to()`

You can set whether or not to Base64-encode property data for unstructured events by calling:

```python
t.set_base64_to( {{True OR False}} )
```

So to disable it and send the data URI-encoded instead:

```python
t.set_base64_to(False)
```

[Back to top](#top)

<a name="add-data" />
## 3.2 Adding extra data

You may have additional information about your application"s environment, current user and so on, which you want to send to Snowplow with each event.

The tracker instance has a set of `set...()` methods to attach extra data to all tracked events:

* [`setAppId()`](#set-app-id)
* [`setUserId()`](#set-user-id)
* [`setScreenResolution()`](#set-screen-resolution)
* [`setColorDepth()`](#set-color-depth)

We will discuss each of these in turn below:

<a name="set-app-id" />
### 3.2.1 Set application ID with `setAppId()`

You can set the application ID to any string:

```python
t.set_app_id( "{{APPLICATION ID}}" )
```

Example:

```python
t.set_app_id("wow-addon-1")
```

[Back to top](#top)

<a name="set-user-id" />
### 3.2.1 Set user ID with `set_user_id()`

You can set the user ID to any string:

```python
t.set_user_id( "{{USER ID}}" )
```

Example:

```python
t.set_user_id("alexd")
```

[Back to top](#top)

<a name="set-screen-res" />
### 3.2.1 Set screen resolution with `set_screen_resolution()`

If your Python code has access to the device"s screen resolution, then you can pass this in to Snowplow too:

```python
t.set_screen_resolution( {{WIDTH}}, {{HEIGHT}} )
```

Both numbers should be positive integers; note the order is height followed by width. Example:

```python
t.set_screen_resolution(1366, 768)
```

[Back to top](#top)

<a name="set-color-depth" />
### 3.2.1 Set color depth with `set_color_depth()`

If your Python code has access to the bit depth of the device"s color palette for displaying images, then you can pass this in to Snowplow too:

```python
t.set_color_depth( {{BITS PER PIXEL}} )
```

The number should be a positive integer, in bits per pixel. Example:

```python
t.set_color_depth(32)
```

[Back to top](#top)

<a name="events" />
## 4. Tracking specific events

Snowplow has been built to enable you to track a wide range of events that occur when users interact with your websites and apps. We are constantly growing the range of functions available in order to capture that data more richly.

Tracking methods supported by the Python Tracker at a glance:

| **Function**                                  | **Description**                                        |
|----------------------------------------------:|:-------------------------------------------------------|
| [`track_page_view()`]                           | Track and record views of web pages. |
| [`track__ecommerce_transaction()`]              | Track an ecommerce transaction on transcation level. |
| [`track_ecommerce_transaction_item()`]          | Track an ecommerce transaction on item level. 
| [`track_screen_view()`](#trackScreenView)       | Track the user viewing a screen within the application |
| [`track_struct_event()`](#trackStructEvent)     | Track a Snowplow custom structured event               |
| [`track_unstruct_event()`](#trackUnstructEvent) | Track a Snowplow custom unstructured event             |

<a name="common" />
### 4.1 Common

All events are tracked with specific methods on the tracker instance, of the form `track_XXX()`, where `XXX` is the name of the event to track.

<a name="validation" />
### 4.1.1 Argument validation

Python is a dynamically typed language, but each of our `track...()` methods expects its arguments to be of specific types and value ranges, and validates that to be the case. These checks are done using the PyContracts library.

If the validation check fails, then a runtime error is thrown:

```python
t = Tracker.hostname("localhost")
t.set_color_depth("walrus")

contracts.interface.ContractNotRespected: Breach for argument 'depth' to Tracker:set_color_depth().
Expected type 'int', got 'str'.
checking: Int      for value: Instance of str: 'walrus'   
checking: $(Int)   for value: Instance of str: 'walrus'   
checking: int      for value: Instance of str: 'walrus'   
Variables bound in inner context:
- self: Instance of Tracker: <snowplowtracker.tracker.Tracker object... [clip]

```

If your value is of the wrong type, convert it before passing it into the `track...()` method, for example:

```python
level_idx = 42
t.track_screen_view("Game Level", str(level_idx))
```

We specify the types and value ranges required for each argument below.

[Back to top](#top)

<a name="tstamp-arg" />
### 4.1.2 Optional timestamp argument

Each `track...()` method supports an optional timestamp as its final argument; this allows you to manually override the timestamp attached to this event.

If you do not pass this timestamp in as an argument, then the Python Tracker will use the current time to be the timestamp for the event.

Here is an example tracking a structured event and supplying the optional timestamp argument. Note that we have to explicitly supply `None`s for the intervening arguments which are empty:

```python
t.track_struct_event("some cat", "save action", None, None, None, 1368725287)
```

Timestamp is counted in seconds since the Unix epoch - the same format as generated by `time.time()` in Python.

[Back to top](#top)

<a name="ret-vals" />
### 4.1.3 Return values

Each `track...()` method has the same return signature, returning two values:

```python
return_string = t.track_unstruct_event("save-game", { "save_id" = "4321", "level" = 23 })
```
<!--
Not figured out yet

These values are as follows:

1. The first value (`status` above) is a boolean, set to `true` if the event was successfully logged to the collector, or `false` if the event was not successfully logged
2. The second value (`msg` above) is a string, which is `None` if `status` is true, but contains the error message if `status` be `false`

-->

[Back to top](#top)

<a name="screen-view" />
### 4.2 Track screen views with `track_screen_view()`

**Warning:** this feature is implemented in the Lua and Python tracker, but it is **not** currently supported in the Enrichment, Storage or Analytics stages in the Snowplow data pipeline. As a result, if you use this feature, you will log screen views to your collector logs, but these will not be parsed and loaded into e.g. Redshift to analyse. (Adding this capability is on the roadmap.)

Use `track_screen_view()` to track a user viewing a screen (or equivalent) within your app. Arguments are:

| **Argument** | **Description**                     | **Required?** | **Validation**          |
|-------------:|:------------------------------------|:--------------|:------------------------|
| `name`       | Human-readable name for this screen | Yes           | Non-empty string        |
| `id`         | Unique identifier for this screen   | No            | String or None           |
| `tstamp`     | When the screen was viewed          | No            | Positive integer or None |

Example:

```python
t.trackScreenView("HUD > Save Game", "screen23", 1368725287)
```

[Back to top](#top)

<a name="struct-event" />
### 4.3

### 4.4

### 4.5 Track structured events with `track_struct_event()`

Use `track_struct_event()` to track a custom event happening in your app which fits the Google Analytics-style structure of having up to five fields (with only the first two required):

| **Argument** | **Description**                                                  | **Required?** | **Validation**          |
|-------------:|:---------------------------------------------------------------  |:--------------|:------------------------|
| `category`   | The grouping of structured events which this `action` belongs to | Yes           | Non-empty string        |
| `action`     | Defines the type of user interaction which this event involves   | Yes           | Non-empty string        |
| `label`      | A string to provide additional dimensions to the event data      | No            | String or None           |
| `property`   | A string describing the object or the action performed on it     | No            | String or None           |
| `value`      | A value to provide numerical data about the event                | No            | Number of None           |
| `tstamp`     | When the structured event occurred                               | No            | Positive integer or None |

Example:

```python
t.track_struct_event("shop", "add-to-basket", None, "pcs", 2, 1369330909)
```

[Back to top](#top)

<a name="unstruct-event" />
### 4.6 Track unstructured events with `track_unstruct_event()`

**Warning:** this feature is implemented in the Python tracker, but it is **not** currently supported in the Enrichment, Storage or Analytics stages in the Snowplow data pipeline. As a result, if you use this feature, you will log unstructured events to your collector logs, but these will not be parsed and loaded into e.g. Redshift to analyse. (Adding this capability is on the roadmap.)

Use `track_unstruct_event()` to track a custom event which consists of a name and an unstructured set of properties. This is useful when:

* You want to track event types which are proprietary/specific to your business (i.e. not already part of Snowplow), or
* You want to track events which have unpredictable or frequently changing properties

The arguments are as follows:

| **Argument** | **Description**                     | **Required?** | **Validation**          |
|-------------:|:------------------------------------|:--------------|:------------------------|
| `name`       | The name of the event               | Yes           | Non-empty string        |
| `properties` | The properties of the event         | Yes           | Non-empty table         |
| `tstamp`     | When the screen was viewed          | No            | Positive integer or None |

Example:

```python
t.track_unstruct_event("save-game", {
    "save_id" = "4321",
    "level" = 23,
    "difficultyLevel" = "HARD",
    "dl_content" = true 
    }, 1369330929 )
```

The properties table consists of a set of individual `name = value` pairs. The structure must be flat: properties cannot be nested. Be careful here as this is **not** currently enforced through validation.

[Back to top](#top)

<a name="unstruct-datatypes" />
#### 4.6.1 Supported datatypes

Snowplow unstructured events support a relatively rich set of datatypes. Because these datatypes do not always map directly onto Python datatypes, we have introduced some "type suffixes" for the Python property names, so that Snowplow knows what Snowplow data types the Python data types map onto:

| Snowplow datatype | Description                  | Python datatype       | Type suffix(es)      | Supports array? |
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

###### 4.6.1.1 Null

Tracking a Null value for a given field is currently untested in the Python Tracker. TODO.

###### 4.6.1.2 String

Tracking a String is easy:

```python
{
    "product_id" = "ASO01043"
}
```

###### 4.6.1.3 Boolean

Tracking a Boolean is also straightforward:

```python
{
    "trial" = True
}
```

###### 4.6.1.4 Integer

To track an Integer, use a Python number but add a type suffix like so:

```python
{
    "in_stock_INT" = 23
}
```

**Warning:** if you do not add the `_INT` type suffix, Snowplow will assume you are tracking a Floating point number.

###### 4.6.1.5 Floating point

To track a Floating point number, use a Python number; adding a type suffix is optional:

```python
{
    "price_INT" = 4.99, 
    "sales_tax" = 49.99 # Same as sales_tax_FLT = ...
}
```

###### 4.6.1.5 Geo-coordinates

Tracking a pair of Geographic coordinates is done like so:

```python
{
    "check_in_GEO" = (40.11041, -88.21337) # NOT IMPLEMENTED Lat, long
}
```

Please note that the datatype takes the format **latitude** followed by **longitude**. That is the same order used by services such as Google Maps.

**Warning:** if you do not add the `_GEO` type suffix, then the value will be incorrectly interpreted by Snowplow as an Array of Floating points.

###### 4.6.1.6 Date

Snowplow Dates include the date _and_ the time, with milliseconds precision. There are three type suffixes supported for tracking a Date:

* `_DT` - the Number of days since the epoch
* `_TM` - the Number of seconds since the epoch
* `_TMS` - the Number of milliseconds since the epoch. This precision is hard to access from within Python

You can track a date by adding a Python number to your `properties` object. The following are all valid dates:

```python
{
    "birthday2_DT" = 3996,
    "registered2_TM" = 1371129610,
    "last_action_TMS" = 1368454114215, # Accurate to milliseconds
}
```

Note that the type prefix only indicates how the Python number sent to Snowplow is interpreted - all Snowplow Dates are stored to milliseconds precision (whether or not they include that level of precision).

**Two warnings:**

1. If you specify a Python number but do not add a valid Date suffix (`_DT`, `_TM` or `_TMS`), then the value will be incorrectly interpreted by Snowplow as a Number, not a Date
2. If you specify a Python number but add the wrong Date suffix, then the Date will be incorrectly interpreted by Snowplow, for example:

```python
{
    "last_ping_DT" = 1371129610 # Should have been _TM. Snowplow will interpret this as the year 3756521449
}
```

<!--
###### 4.6.1.7 Arrays

You can track an Array of values of any data type other than Null.

Arrays must be homogeneous - in other words, all values within the Array must be of the same datatype. This means that the following is **not** allowed:

```python
{
    "sizes" = { "xs", 28, "l", 38, "xxl"] # NOT allowed
}
```

By contrast, the following are all allowed:

```python
{
    "sizes" = ["xs", "s", "l", "xl", "xxl"],
    "session_starts_TM" = [1371129610, 1064329730, 1341127611],
    "check_ins_GEO" = [(-88.21337, 40.11041), (-78.81557, 30.22047)]
}
```
-->

[Back to top](#top)