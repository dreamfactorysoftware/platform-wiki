<a name="top" />
[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Trackers**](trackers)

## Contents

1. [Overview](#overview)
2. [Common field types (across multiple events)](#common)
2. [SnowPlow events](#events)
3. [Complete list of field names and parameters](#allparams)


<a name="overview" />
## 1. Overview

SnowPlow trackers fire _events_, which are `GET` requests of a [SnowPlow collector](collectors), whenever an event on a website or application takes place. By appending parameters and values to the end of those `GET`  requests, trackers can pass data into the collectors, for processing by SnowPlow. 

The SnowPlow Tracker Protocol is the list of all the parameters that SnowPlow trackers use when firing events to push data into the [SnowPlow collectors] (collectors). Each parameter maps onto one or more fields in the [SnowPlow events table] (canonical-data-structure) employed in storage. Here we document which field in the [SnowPlow events table] (canonical-data-structure) each parameter added to the query string maps onto. 

SnowPlow has been architected to be as easy as possible for developers to create their own alternative subsystems. This documentation should be used by anyone who would like to build their own tracker: by utilising the parameters documented here, the author of a new tracker can be confident that his / her tracker will work with the rest of the SnowPlow stack, and be confident where the values associated with each parameter on every call will be available to query in SnowPlow, whether that's in Hive or Infobright or another database.

Please note that the end point where the `GET` request should be made depends on which [collector](collectors) is used. Refer to the [collectors](collectors) documentation for more information.

[Back to top](#top)

<a name="common" />
## 2. Common field types 

2.1 [Common parameters (platform and event independent)](#common-params)  
2.2 [Web-specific parameters (applicable across all events captured on the web)](#web)  

### 2.1. Common parameters (platform and event independent)

There are a set of parameters that make sense to include in query strings regardless of the tracker type, platform or event being tracked:

2.1.1 [Application parameters](#appid)  
2.1.2 [Date / time parameter](#timestamp)  
2.1.3 [Event / transaction parameters](#event2)  
2.1.4 [SnowPlow tracker version](#version)  
2.1.5 [User related parameters](#user)  
2.1.6 [Device related properties](#device)

<a name="appid" />
#### 2.1.1 Application parameters

| **Parameter** | **Maps to**      | **Type** |**Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `aid`         | `app_id`         | text     | Unique identifier for website / application    | Yes | `angry-birds-android` |
| `p`           | `platform`       | text     | The platform the app runs on  | No               | `ios`, `web`, `win-8`     |

The application ID parameter is used to distinguish data from different website and applications.

As a SnowPlow user, you can define application IDs for each of your different ditial products and track behaviour of your users across all of them using the same SnowPlow instance by setting the `app_id` in your tracker of choice.

**Potential platform values**: (to finalise and complete...)

| **Platform**                 | **`pl` value** |
|:-----------------------------|:---------------|
| Web                          | `w`            | 
| iOS                          | `iOS`          |
| Android                      | `a`            |
| Windows                      | `win`          |
| Blackberry                   | `b`            |
| ...                          |                |

<a name="timestamp" />
#### 2.1.2 Date / time parameter

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `tstamp`      | `dt` and `tm`    | timestamp |Timestamp when event occurred | Yes              |                           |
| `tz`          | `os_timezone`    | text     | Operating system time zone    | Yes              | `Europe%2FLondon`

It is possible to record the time that an event occurs on the clients-side (i.e. in the tracker), or server side (i.e. by the collector). When using the Javascript tracker to track web events, it makes sense to rely on the collector logs to identify the time that events occured, as SnowPlow tracking tags are fired as events happen, and so the time they are received server-side should be an accurate representation of the time the event being tracked occured. In other situations (e.g. when using mobile trackers), the time the collector receives the data may be sometime after an event occurred, and so it makes sense to record the timestamp on the client-side, in which case this is handled by the tracker.

The tracker can pass a client-side timestamp to the collector using the above parameters.

<a name="event2" />
#### 2.1.3 Event / transaction parameters

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `e`           | `event`          | text     | Event type                    | Yes              | (See table below)         |
| `tid`         | `txn_id`         | integer  | Unique transaction / event ID. Used to de-dupe records | Yes              | 508780                    |

Every line of data passed from the tracker should contain an event field (`e`) to denote the type of event being tracked. There are several potential values: we are in the process of building out the SnowPlow event model:

**Potential `event` values**

| **Event type**            | **`e` value** |
|:--------------------------|:--------------|
| Page view                 | `pv`          |
| Page ping                 | `pp`          |
| Log link                  | TBD           |
| Custom event              | `ev`          |
| Ad impression             | `ad`          |
| Transaction               | `tr`          |
| Transaction item          | `ti`          |

The transaction ID (`tid`) can be used in situations where there is a risk of duplicate records for the same event. In this case, the transaction ID can be used to aid deduping of records.


<a name="version" />
#### 2.1.4 SnowPlow Tracker Version

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `tv`          | `v_tracker`      | text     | Identifier for SnowPlow tracker | No             | `js-0.5.1`                |

For deployments where multiple trackers are used (e.g. for businesses that use the [Javascript tracker] (javascript-tracker) to track events on their domains alongside the [No-JS tracker] (no-js-tracker) to track events on 3rd party domains), it is useful to be able to distinguish data generated from each tracker. It can also be useful when tracker versions are updated, so that it is easier to see if an update in tracker accounts for a feature of the data at analysis time.

<a name="user" />
#### 2.1.5 User related parameters

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `uid`         | `user_id`        | text     | Unique identifier for user    | Yes              | `aeb1691c5a0ee5a6`        |
| `vid`         | `visit_id`       | int      | Visit / session identifier for this user e.g. `1` is first visit | Yes       | `1`, `2`...|

We recommend **always** setting the `uid` / `user_id` parameter: as this is the cornerstone of all customer-centric analytics.

In contrast, setting `vid` / `visit_id` is optional. It is possible to define when sessions begin and end client-side, in the tracker. But it is equally possible to define session start and stop times at the ETL or analytics phase, in which case it need not be set in the tracker at all. Note: Google Analytics defines sessions server side.

<a name="device" />
#### 2.1.6 Device related properties

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `res`         | `dvce_screenheight` and `dvce_screenwidth` | text | Screen / monitor resolution |  Yes | `1280x1024`   |

We intend to build out the list of device related properties over time.


<a name="web" />
### 2.2. Web-specific parameters

In addition, there is a set of browser-specific parameters that only makes sense to record for events that happen on web platforms (`p=web`). These parameters are relevant across **all** web events, regardless of the event type. (E.g. if it is a pageview, pageping, transaction, media play etc...)


| **Parameter** | **Maps to**      | **Type** |**Description**                                      | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:----------------------------------------------------|:-----------------|:------------------|
| `url`         | `page_url`       | text     | Page URL                                            | Yes              | `http%3A%2F%2Ftest.psybazaar.com%2F2-tarot-cards` |
| `page`        | `page_title`     | text     | Page title                                          | Yes              | `Tarot%20cards`   |
| `refr`        | `page_referrer`  | text     | Referrer URL                                        | Yes              | `http%3A%2F%2Ftest.psybazaar.com%2F` |
| `fp`          | `user_fingerprint`| integer | User identifier based on (hopefully unique) browser features | Yes     |                   |
| `ctype`       | `connection_type`| text     | Type of connection                                  | No               |                   |
| `cookie`      | `br_cookies`     | boolean  | Does the browser permit cookies?                    | Yes              | `1`               |
| `lang`        | `br_lang`        | text     | Language the browser is set to                      | Yes              | `en-US`           |
| `f_pdf`       | `br_features` or `br_features_pdf` | boolean |Adobe PDF plugin installed?         | Yes              | `1`               |
| `f_qt`        | `br_features` or `br_features_quicktime` | boolean | Quicktime plugin installed?  | Yes              | `0`               |
| `f_realp`     | `br_features` or `br_features_realplayer` | boolean   | Realplayer plugin installed?    | Yes        | `0`               |
| `f_wma`       | `br_features` or `br_features_windowsmedia` | boolean | Windows media plugin instlaled? | Yes        | `0`               |
| `f_dir`       | `br_featurse` or `br_features_director` | boolean | Director plugin installed?   | Yes               | `0`               |
| `f_fla`       | `br_featurse` or `br_features_flash`    | boolean | Flash plugin installed?      | Yes               | `1`               |
| `f_java`      | `br_featurse` or `br_features_java`     | boolean | Java plugin installed?       | Yes               | `1`               |
| `f_gears`     | `br_featurse` or `br_features_gears`    | boolean | Google gears installed?      | Yes               | `1`               |
| `f_ag`        | `br_featurse` or `br_features_silverlight` | boolean | Silverlight plugin installed? | Yes           | `1`               |
| `cd`          | `br_colordepth`  | Browser color depth   | integer |                             | Yes               | `24`              |


<a name="events" />
## 3. Event tracking

At it's heart, SnowPlow is a platform for granular tracking of events. Currently, SnowPlow understands the following events

3.1 [Pageview tracking](#pageview)
3.2 [Page pings](#pagepings)
3.3 [Link click](#linkclick)
3.4 [Custom event tracking](#event)
3.5 [Ad impression tracking](#adimp)
3.6 [Ecommerce transaction tracking](#ecomm)
3.7 [Social tracking](#social)
3.8 [Item view](#item)
3.9 [Error tracking](#error)

We are working to make the data model for each of the above events richer, and expand the 'SnowPlow event library' to support a wider selection of events that businesses running SnowPlow wish to track.

In each case, we use the `&e` parameter to indicate the type of event that is being tracked by SnowPlow. For details see [here](#events2).

<a name="pageview" />
### 3.1 Pageview tracking

Pageview tracking is used to record views of web pages. 

Currently, recording a pageview involves recording an event where `e=pv`. All the fields associated with web events can be tracked. There are no other pageview specific fields:

```javascript
// Key common parameters
uid=aeb1691c5a0ee5a6    // User ID
&vid=2                  // Visit ID (i.e. session number for this user_id)
&tid=508780             // Transaction ID
&aid=pbzsite            // App ID
&p=web 					// Platform ID
&tv=js-0.9.1            // Tracker version

// Key data points related to page view
&e=pv                   // event = page view
&url=http%3A%2F%2Ftest.psybazaar.com%2F2-tarot-cards    // Page URL
&page=Tarot%20cards                                     // Page title
&refr=http%3A%2F%2Ftest.psybazaar.com%2F                // Referrer URL

// Other browser-specific parameters
&lang=en-US
&fp=3511643688
&f_pdf=1
&f_qt=0
&f_realp=0
&f_wma=0
&f_dir=0
&f_fla=1
&f_java=1
&f_gears=0
&f_ag=1
&res=1280x1024
&cd=32
&cookie=1
&tz=Europe%2FLondon
```

<a name="pagepings" />
### 3.2 Page pings

Page pings are used to record users engaging with content on a web page after it has originally loaded. It can be used to track e.g. how far down an article a user scrolls. 

If enabled, the page ping function checks for engagement with a page after load. (E.g. mousemovement, scrolling etc...) If there is some sort of engagement in a specified time interval, a page ping is sent.

Like pageviews, the only field that needs to be set to record a pageping is `e=pp`. Otherwise, all the fields that are relevant for *any* web event can be set:

```javascript
// Key common parameters
uid=2bfb7be74df650d7    // User ID
&vid=2                  // Visit ID (i.e. session number for this user_id)
&tid=426432             // Transaction ID
&aid=pbzsite            // App ID
&tv=js-0.9.1            // Tracker version

// Key data points related to the page ping
&e=pp                   // event = page ping
&url=http%3A%2F%2Fwww.psychicbazaar.com%2F  // Page URL
&page=Psychic%20Bazaar                      // Page title

// Other browser-specific parameters
&lang=en-US
&fp=3511643688
&f_pdf=1
&f_qt=0
&f_realp=0
&f_wma=0
&f_dir=0
&f_fla=1
&f_java=1
&f_gears=0
&f_ag=1
&res=1280x1024
&cd=32
&cookie=1
&tz=Europe%2FLondon
```

We do plan to extend pageping to record e.g. any scrolling that a user has done in the last time period. (See [the spec](https://github.com/snowplow/snowplow/issues/127) for details)

<a name="linkclick" />
### 3.3 Link click tracking

This is not currently supported: adding support is on the roadmap (https://github.com/snowplow/snowplow/issues/75). 

<a name="event" />
### 3.3. Custom event tracking

Custom event tracking is used to track events that are not natively supported by SnowPlow. (Like ad impressions, page views, ecomm transactions.)

As well as setting `e=c`, there are five custom event specific parameters that can be set:

| **Parameter** | **Maps to**      | **Type** |**Description**                                     | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------------------------------------|:-----------------|:------------------|
| `ev_ca`       | `ev_category`    | text     | The category of event                              | Yes              | 'Ecomm', 'Media'  |
| `ev_ac`       | `ev_action`      | text     | The action / event itself                          | Yes              | `add-to-basket`, `play-video` |
| `ev_la`       | `ev_label`       | text     | A label often used to refer to the 'object' the action is performed on | Yes | 'dog-skateboarding-video' |
| `ev_pr`       | `ev_property`    | text     | A property associated with either the action or the object | Yes      | 'hd' |
| `ev_va`       | `ev_value`       | decimal  | A value associated with the user action            | Yes              | 13.99 |

_Add-to-basket_ example:

```javascript
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=c                    // event = custom  
&ev_ca=ecomm            // event_category = ecomm  
&ev_ac=add-to-basket    // event_action = add-to-basket  
&ev_la=178              // event_label = 178 (product_id of item added to basket)  
&ev_pr=1                // event_property = 1 (quantity of item added to basket)  
&ev_va=14.99            // event_value = 14.99 (price of item added to basket)  

```

_Watch-video-clip_ example:

```javascript
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=c                    // event = custom  
&ev_ca=video            // event_category = video  
&ev_ac=play             // event_action = play  
&ev_la=291              // event_label = 291 (video_id of video played)  
&ev_pr=13.2             // event_property = 13.2 (number of seconds into video that clip starts playing)  
&ev_va=0.0025           // event_value = 0.0025 (ad revenue associated with view)  

```

<a name="adimp" />
### 3.4 Ad impression tracking

There are four specific parameters that can be set when an ad impression is tracked:

| **Parameter** | **Maps to**      | **Type** |**Description**       | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------|:-----------------|:------------------|
| `ad_ba`       | `adi_bannerid`    | text    | Banner ID            | No               | `126422315640`   |
| `ad_ca`       | `adi_campaignid`  | text    | Campaign ID          | No               | `d-546135`       |
| `ad_ad`       | `adi_advertiserid`| text    | Advertiser ID        | No               | `diageo`         |
| `ad_uid`      | `adi_userid`      | text    | User (viewer) ID     | No               | `0cbffbf8-a9c5-426f-9369-6e53f1677efc` |

Note: if possible, it often makes sense to pass in the `user_id` generated by your ad server into the `ad_uid` field, so that this can be matched with the `user_id` generated by SnowPlow at analysis time.

Example:

```javascript:
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=ad                    // event = ad impression
&ad_ba=126422315640      // banner ID
&ad_ca=d-546135          // campaign ID
&ad_ad=diageo            // advertiser ID
&ad_uid=0cbffbf8-a9c5-426f-9369-6e53f1677efc      // user ID
```
 
<a name="ecomm" />
### 3.5 Ecommerce tracking 

To track an ecommerce transaction, fire a `transaction` event to register the transaction, and then fire `item` events to log specific data about the items that were part of that transaction. The `order_id`, (captured using the `ti` parameter) is used to link the transaction-level and item-level data at analysis time.

#### 3.5.1 Transaction parameters

| **Parameter** | **Maps to**      | **Type** |**Description**       | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------|:-----------------|:------------------|
| `tr_id`       | `tr_orderid`     | text     | Order ID             | Yes              | 12345             |
| `tr_af`       | `tr_affiliation` | text     | Transaction affiliation (e.g. channel) | Yes | Web          |
| `tr_tt`       | `tr_total`       | decimal  | Transaction total value | Yes           | 9.99              |
| `tr_tx`       | `tr_tax`         | decimal  | Transaction tax value (i.e. amount of VAT included) | Yes | 1.98 |
| `tr_sh`       | `tr_shipping`    | decimal  | Delivery cost charged | Yes             | 3.00              |
| `tr_ci`       | `tr_city`        | text     | Delivery address: city | Yes            | 'London'          |
| `tr_st`       | `tr_state`       | text     | Delivery address: state | Yes           | 'Denver'          |
| `tr_co`       | `tr_country`     | text     | Delivery address: country | Yes         | 'United Kingdom'  |

Transaction event example:

```javascript
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=tr            	// Transacton event type.
&tr_id=12345        // Order ID
&tr_af=westernWear 	// Affiliation
&tr_tt=19.99 		// Transaction total value
&tr_tx=4.99 		// Transaction tax value
&tr_sh=2.99 		// Transaction shipping price
&tr_ci=london		// City on customer address
&tr_st=london 		// State on customer address
&tr_co=united kingdom	// Country on customer address
```

#### 3.5.2 Transaction item parameters

| **Parameter** | **Maps to**      | **Type** |**Description**       | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------|:-----------------|:------------------|
| `ti_id`       | `ti_orderid`     | text     | Order ID             | Yes              | '12345'           |
| `ti_sk`       | `ti_sku`         | text     | Item SKU             | Yes              | 'pbz0025'         |
| `ti_nm`       | `ti_name`        | text     | Item name            | Yes              | 'black-tarot'     |
| `ti_ca`       | `ti_category`    | text     | Item category        | Yes              | 'tarot'           |
| `ti_pr`       | `ti_price`       | decimal  | Item price           | Yes              | 7.99              |
| `ti_qu`       | `ti_quantity`    | integer  | Item quantity        | Yes              | 2                 |

Item hit example:

```javascript
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=ti 				// Transaction item event type
&ti_id=12345 		// Order ID
&ti_sk=pbz0025 		// Item SKU
&ti_nm=black-tarot 	// Item name
&ti_ca=tarot 		// Item category
&ti_pr=7.99 		// Item price
&ti_qu=1 			// Item quantity
```

Back to [common event types](#common)

<a name="social" />
### 3.6 Social tracking

**Note!** This has not been implemented yet.

| **Parameter** | **Maps to**      | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:------------------------------|:-----------------|:--------------------------|
| `sa`          | `social_action`  | Social action performed       | No               | `like`, `tweet`           |
| `sn`          | `social_network` | Social network involved       | No               | `facebook`, `twitter`     |
| `st`          | `social_target`  | Social action target e.g. object _liked_, article _tweeted_ | No | `like`, `tweet` |
| `sp`          | `social_pagepath`| Page path action was performed on | No           |         |


```javascript
uid=aeb1691c5a0ee5a6    // User ID  
&vid=2                  // Visit ID (i.e. session number for this user_id)  
&tid=508780             // Transaction ID  
&aid=1                  // App ID
&tv=js-0.5.2            // Tracker version

&e=s            // Social event type
&sa=like        // Social Action
&sn=facebook    // Social Network
&st=/home       // Social Target
```

<a name="item" />
### 3.7 Item views

Pageviews track page load events. Itemviews track views of specific items e.g. articles on a content site, videos on a video site, or products on an online retail site.

This functionality has not been developed yet. When it is, it will be documented here.

<a name="error" />
### 3.8 Error tracking

This functionality has not been developed yet. When it is, it will be documented here.


<a name="page" />
### 3.6 Page-level parameters

| **Parameter** | **Maps to**      | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:------------------------------|:-----------------|:--------------------------|

For website tracking, page-level parameters are essential for pageview events. However, they may also be set on other events (e.g. add-to-baskets, or social interactions) so that an analyst can explore to what extent those actions are more prevalant on some pages than others.

These fields do not make sense in a mobile application or other non-web environment.

Back to [complete list of parameters](#allparams).

<a name="events3" />
### 3.7 Custom event tracking parameters

| **Parameter** | **Maps to**      | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:------------------------------|:-----------------|:--------------------------|
| `ev_ca`       | `ev_category`    | Category of event             | Yes              | `ecomm`, `media`          |
| `ev_ac`       | `ev_action`      | The action performed          | Yes              | `add-to-basket`, `play-video` |
| `ev_la`       | `ev_label`       | A label associated with the event. Often the object (e.g. `product_id`, `video_id` acted on | Yes | `pbz00123` |
| `ev_pr`       | `ev_property`    | A property value associated with the action / event e.g. quantity of an item added to basket | `1`, `large` |
| `ev_va`       | `ev_value`       | A value associatd with the action / event. This may be the monetary value associated with it e.g. the value of the item added to basket | '12.99' |

Custom event tracking is at the heart of the SnowPlow approach to 'track everything'. We recommend tracking all events that are not tracked as part of pageviews as custom events. For people using SnowPlow to track web behaviour, that means all AJAX events. 

Our hope is that the above fields are enough in most cases to capture all the relevant data points associated with a specific event. In the event that they are not, we plan to extend SnowPlow shortly to include 10 [custom variables](#custom_variables) that can be associated with specific events, and an 11th that can be stuffed with an JSON, if there is a need to pass more structured data into SnowPlow for the events that the 5 fields above and the 10 custom variables can hold.

Back to [complete list of parameters](#allparams).

<a name="social2" />
### 3.8 Social parameters

| **Parameter** | **Maps to**      | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:------------------------------|:-----------------|:--------------------------|
| `sa`          | `social_action`  | Social action performed       | No               | `like`, `tweet`           |
| `sn`          | `social_network` | Social network involved       | No               | `facebook`, `twitter`     |
| `st`          | `social_target`  | Social action target e.g. object _liked_, article _tweeted_ | No | `like`, `tweet` |
| `sp`          | `social_pagepath`| Page path action was performed on | No           |         |

Note: these have not been implemented yet. However, the planned implementation is closely modelled on the Google Analytics Measurement Protocol for tracking social interactions.



<a name="ecomm2" />
### 3.9 Ecommerce parameters

| **Parameter** | **Maps to**      | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:------------------------------|:-----------------|:--------------------------|
| `ti`          | `tr_orderid`     | Unique ID for transaction     | Yes              | `0015313`                 |
| `ta`          | `tr_affiliation` | Store name or affiliation     | Yes              | `Member`                  |
| `tr`          | `tr_total`       | Total value (revenue) of transaction | Yes       | `24.99`                   |
| `ts`          | `tr_shipping`    | The shipping cost             | Yes              | `3.00`                    |
| `tt`          | `tr_tax`         | The tax (VAT) total for the transaction | Yes    | `2.75`                    |
| `ip`          | `ti_price`       | The price of the item         | Yes              | `12.99`                   |
| `iq`          | `ti_quantity`    | The quantity of the item bought | Yes            | `1`                       |
| `ic`          | `ti_sku`         | Item SKU or product code      | Yes              | `pbz00123`                |
| `in`          | `ti_name`        | Item name                     | Yes              | `The Hezicos Tarot`       |
| `ic`          | `ti_category`    | Item category                 | Yes              | `Tarot decks`             |

Ecommerce tracking has been implemented in a way that closely models Ecommerce tracking in Google Analytics.

Back to [complete list of parameters](#allparams).

<a name="custom_variables" />
### 3.10 Custom variables

In situations where you want to pass data into SnowPlow that can not be accommodated in the above parameters / fields, SnowPlow provides 41 custom variables fields that can be populated with data that you want to pass in. There are four main types of custom variable, each defined by different scope:

**`cv_user` fields (`cvu` parameters)**

`cv_user` custom variables are used to store data associated with this particular user. These variables are perfect for storing data points like name, email address, date of birth, membership type etc., that you are likely to reference with respect to the user in future.

**`cv_session` fields (`cvs` parameters)**

`cv_session` are custom variables that are used to store data associated with this particular session. These variables are useful e.g. to game state for a mobile game.

**`cv_event` fields (`cve` parameters)** 

`cv_event` are custom variables that are used to store data associated with a particular event. They can often be used as additional locations to store data associated with custom events that cannot be accommodated in the five standard [custom event fields / parameters](#event2).

**`cv_context` fields (`cvc` parameters)**

`cv_context` are custom variables that are used to associate data related to the context an action of event takes place in. These variables can be used to differentiate two versions of a particular web page that is being A/B tested, for example.

**`cv_json` field (`cvj` parameter)**

In the event that you want to pass data associated with an action, event, context, session, user or anything else, that is not easily accommodated in any of the other fields / parameters, you can stuff them into a JSON and pass them into SnowPlow to be stored in the `cv_json` field.

| **Parameters**         | **Maps to**                     | **Implemented?** |
|:-----------------------|:--------------------------------|:-----------------|
| `cvu1` -> `cvu10`      | `cv_user1` -> `cv_user10`       | No               |
| `cvs1` -> `cvs10`      | `cv_session1` -> `cv_session10` | No               |
| `cve1` -> `cve10`      | `cv_event1` -> `cv_event10`     | No               |
| `cvc1` -> `cvc10`      | `cv_context1` -> `cv_context10` | No               |

Back to [complete list of parameters](#allparams).

<a name="browserandos" />
### 3.11 Browser and OS fields

Most browser and OS fields in SnowPlow are inferred from the user agent string (captured by the collector) rather than computed by the tracker. However, a handful of fields are captured by the tracker:



Back to [complete list of parameters](#allparams).

Back to [top](#top).


