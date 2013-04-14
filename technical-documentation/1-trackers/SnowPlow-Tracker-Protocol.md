<a name="top" />
[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Trackers**](trackers)

<a name="overview" />
## Overview

SnowPlow trackers fire _events_, which are `GET` requests of a [SnowPlow collector](collectors), whenever an event on a website or application takes place. By appending parameters and values to the end of those `GET`  requests, trackers can pass data into the collectors, for processing by SnowPlow. 

The SnowPlow Tracker Protocol is the list of all the parameters that SnowPlow trackers use when firing events to push data into the [SnowPlow collectors] (collectors). Each parameter maps onto one or more fields in the [SnowPlow events table] (canonical-event-model) employed in storage. Here we document which field in the [SnowPlow events table] (canonical-event-model) each parameter added to the query string maps onto. 

SnowPlow has been architected to be as easy as possible for developers to create their own alternative subsystems. This documentation should be used by anyone who would like to build their own tracker: by utilising the parameters documented here, the author of a new tracker can be confident that his / her tracker will work with the rest of the SnowPlow stack, and be confident where the values associated with each parameter on every call will be available to query in SnowPlow, whether that's in Hive or Infobright or another database.

Please note that the end point where the `GET` request should be made depends on which [collector](collectors) is used. Refer to the [collectors](collectors) documentation for more information.

In the [first part of this guide](#common), we cover the parameters in the SnowPlow tracker protocol that are common across different event types. [In the second part](#events), we document the parameters that are relevant for specific events that are recognised in the SnowPlow event model. Please note: this model is evolving over time as we incorporate more events and grow the set of fields associated with each of the standard events. In all cases, we do our best to ensure that any changes are backwards compatible. (So we are happy adding new parameters, but do not remove parameters once they have been incorporated.)

[Back to top](#top)


## The SnowPlow Tracker protocol: individual parameters

- 1. [Common parameters (platform and event independent)](#common)
  - 1.1 [Application parameters](#appid)
  - 1.2 [Date / time parameters](#timestamp)
  - 1.3 [Event / transaction parameters](#event2)
  - 1.4 [SnowPlow tracker version](#version)
  - 1.5 [User parameters](#user)
  - 1.6 [Device parameters](#device)
- 2. [Platform-specific parameters](#platform)
  - 2.1 [Web-specific parameters](#web)
  - 2.2 [Internet of Things-specific parameters](#iot)
- 3. [SnowPlow events](#events)
  - 3.1 [Pageview events](#pageview)
  - 3.2 [Page pings](#pagepings)
  - 3.3 [Link clicks](#linkclick)
  - 3.4 [Ad impressions](#adimp)
  - 3.5 [Ecommerce transactions](#ecomm)
  - 3.6 [Social events](#social)
  - 3.7 [Item views](#item)
  - 3.8 [Error tracking](#error)
  - 3.9 [Custom structured events](#event)
  - 3.10 [Custom unstructured events](#unstructevent)

<a name="common" />
## 1. Common parameters (platform and event independent) 

<a name="appid" />
#### 1.1 Application parameters

| **Parameter** | **Maps to**      | **Type** |**Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `aid`         | `app_id`         | text     | Unique identifier for website / application    | Yes | `angry-birds-android` |
| `p`           | `platform`       | text     | The platform the app runs on  | No               | `web`, `mob`, `app`      |

The application ID parameter is used to distinguish data from different website and applications.

As a SnowPlow user, you can define application IDs for each of your different ditial products and track behaviour of your users across all of them using the same SnowPlow instance by setting the `app_id` in your tracker of choice.

**Potential platform values**: (to finalise and complete...)

| **Platform**               | **`p` value**  |
|:---------------------------|:---------------|
| Web (including Mobile Web) | `web`          | 
| Mobile/Tablet              | `mob`          | 
| Desktop/Laptop/Netbook     | `pc`           |
| Server-Side App            | `srv`          |
| Connected TV               | `tv`           |
| Games Console              | `csl`          |
| Internet of Things         | `iot`          |

Back to [common field types](#common).

<a name="timestamp" />
#### 1.2 Date / time parameter

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `dtm`         | `dvce_dt`, `dvce_tm` and `dvce_epoch` | int |Timestamp when event occurred, as recorded by client device | Yes  | 1361553733313 |                         |
| `tz`          | `os_timezone`    | text     | Operating system time zone    | Yes              | `Europe%2FLondon`

It is possible to record the time that an event occurs on the clients-side (i.e. in the tracker), or server side (i.e. by the collector). When using the Javascript tracker to track web events, it makes sense to rely on the collector logs to identify the time that events occured, as SnowPlow tracking tags are fired as events happen, and so the time they are received server-side should be an accurate representation of the time the event being tracked occured. In other situations (e.g. when using mobile trackers), the time the collector receives the data may be sometime after an event occurred, and so it makes sense to record the timestamp on the client-side, in which case this is handled by the tracker.

The tracker can pass a client-side timestamp to the collector using the above parameters.

Back to [common field types](#common).

<a name="event2" />
#### 1.3 Event / transaction parameters

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `e`           | `event`          | text     | Event type                    | Yes              | (See table [below](#events))|
| `tid`         | `txn_id`         | text     | Transaction ID                | Yes              | 352583                    |

Every line of data passed from the tracker should contain an event field (`e`) to denote the type of event being tracked. For details about the potential values that `e` can take, and the corresponding event types that they refer to, see the section detailing [SnowPlow events](#events).

The transaction ID (`tid`) can be used in situations where there is a risk of duplicate records for the same event. In this case, the transaction ID can be used to aid deduping of records.

Back to [common field types](#common).

<a name="version" />
#### 1.4 SnowPlow Tracker Version

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `tv`          | `v_tracker`      | text     | Identifier for SnowPlow tracker | No             | `js-0.5.1`                |

For deployments where multiple trackers are used (e.g. for businesses that use the [Javascript tracker] (javascript-tracker) to track events on their domains alongside the [No-JS tracker] (no-js-tracker) to track events on 3rd party domains), it is useful to be able to distinguish data generated from each tracker. It can also be useful when tracker versions are updated, so that it is easier to see if an update in tracker accounts for a feature of the data at analysis time.

Back to [common field types](#common).

<a name="user" />
#### 1.5 User related parameters

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `duid`        | `domain_userid`  | text     | Unique identifier for a user, based on a first party cookie (so domain specific) | Yes | `aeb1691c5a0ee5a6` |
| `nuid`        | `network_userid` | text     | Unique identifier for a user, based on a third party cookie (so set at a network level) | Yes | `ecdff4d0-9175-40ac-a8bb-325c49733607` |
| `uid`         | `user_id`        | text     | Unique identifier for user, set by the business using `setUserId`    | Yes              | `jon.doe@email.com`  |
| `vid`         | `domain_sessionidx`| int    | Index of number of visits that this user_id has made to this domain e.g. `1` is first visit | Yes       | `1`, `2`...|

We recommend **always** setting the `uid` / `user_id` parameter: as this is the cornerstone of all customer-centric analytics.

In contrast, setting `vid` / `visit_id` is optional. It is possible to define when sessions begin and end client-side, in the tracker. But it is equally possible to define session start and stop times at the ETL or analytics phase, in which case it need not be set in the tracker at all. Note: Google Analytics defines sessions server side.

Back to [common field types](#common).

<a name="device" />
#### 1.6 Device related properties

| **Parameter** | **Maps to**      | **Type** | **Description**               | **Implemented?** | **Example values**        | 
|:--------------|:-----------------|:---------|:------------------------------|:-----------------|:--------------------------|
| `res`         | `dvce_screenheight` and `dvce_screenwidth` | text | Screen / monitor resolution |  Yes | `1280x1024`   |

We intend to build out the list of device related properties over time.

Back to [common field types](#common).

<a name="platform" />
### 2. Platform specific parameters

<a name="web" />
#### 2.1 Web-specific parameters

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
| `ds`          | `doc_width` and `doc_height` | text | Web page width and height                  | Yes               | `1090x1152`       |
| `cs`          | `doc_charset`    | text      | Web page's character encoding                     | Yes               | `UTF-8`
| `vp`          | `br_viewwidth` and `br_viewheight` | text | Browser viewport width and height    | Yes               | `1105x390`        |

Back to [common field types](#common).

<a name="iot" />
#### 2.2 Internet of Things-specific parameters

In addition, there is a set of device-specific parameters that only makes sense to record for events that happen on the Internet of Things (`p=iot`). These parameters are relevant across **all** Internet of Things events, regardless of the event type:

| **Parameter** | **Maps to**      | **Type** |**Description**                                 | **Implemented?** | **Example values**  | 
|:--------------|:-----------------|:---------|:-----------------------------------------------|:-----------------|:--------------------|
| `mac`         | `mac_address`    | text     | MAC address for the device running the tracker | Yes              | `12:34:56:78:9A:BC` |

Back to [common field types](#common).

<a name="events" />
### 3. SnowPlow events

At its heart, SnowPlow is a platform for granular tracking of events. Currently, SnowPlow understands the following events. In the tracker protocol, each event is denoted by an `e=...` parameter.

|    | **Type of tracking**          | **Event type (value of `e`)** |
|:---|:------------------------------|:--------------------------|
| 3.1| [Pageview tracking](#pageview)| `pv`                      | 
| 3.2| [Page pings](#pagepings)      | `pp`                      |  
| 3.3| [Link click](#linkclick)      | TBD                       | 
| 3.4| [Ad impression tracking](#adimp)| `ad`                    |  
| 3.5| [Ecommerce transaction tracking](#ecomm) | `tr` and `ti`  |  
| 3.6| [Social tracking](#social)    | TBD                       |  
| 3.7| [Item view](#item)            | TBD                       |  
| 3.8| [Error tracking](#error)      | TBD                       |
| 3.9| [Custom structured event](#event)| `se`                   |
| 3.10| [Custom unstructured event](#event)| `ue`               |

We are working to make the data model for each of the above events richer, and expand the 'SnowPlow event library' to support a wider selection of events that businesses running SnowPlow wish to track.

In each case, we use the `&e` parameter to indicate the type of event that is being tracked by SnowPlow to the value indicated in the above table

<a name="pageview" />
#### 3.1 Pageview tracking

Pageview tracking is used to record views of web pages. 

Currently, recording a pageview involves recording an event where `e=pv`. All the fields associated with web events can be tracked. There are no other pageview specific fields:

```javascript
// Key common parameters
duid=aeb1691c5a0ee5a6    // Domain user ID
&vid=2                  // Domain session index
&tid=508780             // Transaction ID
&aid=pbzsite            // App ID
&p=web 				// Platform ID

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
&cd=32
&cookie=1
&tz=Europe%2FLondon

e=pv           // page view
&aid=pbzsite   // app_id
&p=web         // platform
&tid=580794    // transaction ID
&dtm=1361555202287  // client timestamp

&page=Psychic Bazaar                  // Page Title
&url=http=//www.psychicbazaar.com/    // Page URL
&ds=1120x1848                         // Document dimensions
&cs=UTF-8                             // Document character set

&res=1920x976                         // Device monitor dimensions
&vp=873x390                           // Viewport dimensions
&duid=91a88a7ec90ebbb1                // Domain user ID 
&fp=3324966434                        // User fingerprint
&vid=3                                // Domain session ID

&tv=js-0.11.0                         // Tracker version
&lang=en-GB                           // Browser language
&tz=Europe/London                     // Client time zone
```

Back to [event tracking](#events).

<a name="pagepings" />
#### 3.2 Page pings

Page pings are used to record users engaging with content on a web page after it has originally loaded. It can be used to track e.g. how far down an article a user scrolls. 

If enabled, the page ping function checks for engagement with a page after load. (E.g. mousemovement, scrolling etc...) If there is some sort of engagement in a specified time interval, a page ping is sent.

Page pings are identified by `e=pp`. As well as all the standard web fields, there are four additional fields that `pp` includes, which are used to identify how users are scrolling over web pages:

| **Parameter** | **Maps to**      | **Type** |**Description**       | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------|:-----------------|:------------------|
| `pp_mix`      | `pp_xoffset_min` | integer  | Minimum page x offset seen in the last ping period | Yes | `0` |
| `pp_max`      | `pp_xoffset_max` | integer  | Maximum page x offset seen in the last ping period | Yes | `100` |
| `pp_miy`      | `pp_yoffset_min` | integer  | Minimum page y offset seen in the last ping period | Yes | `0` |
| `pp_may`      | `pp_yoffset_max` | integer  | Maximum page y offset seen in the last ping period | Yes | `100` |

Example:

```javascript
e=pp        // Page ping
// Max and min x and y offsets
pp_mix=0    
pp_max=7
pp_miy=0
pp_may=746

// Other relevant fields
duid=91a88a7ec90ebbb1 // Domain user id
vid=1                 // Domain session index
page=Tarot cards - Psychic Bazaar    // Page title
refr=http=//www.psychicbazaar.com/   // Page referrer
url=http://www.psychicbazaar.com/2-tarot-cards // Page URL

tid=344664            // Transaction ID
dtm=1361534887845     // Client timestamp
vp=1105x390           // Viewport dimensions
ds=1097x1413          // Document dimensions
aid=pbzsite           // App ID
lang=en-GB            // Browser language
cs=UTF-8              // Docuemnt characterset
res=1920x976          // Monitor resolution / size
```

Back to [event tracking](#events).

<a name="linkclick" />
#### 3.3 Link click tracking

This is not currently supported: adding support is on the roadmap (https://github.com/snowplow/snowplow/issues/75). 

Back to [event tracking](#events).


<a name="adimp" />
#### 3.4 Ad impression tracking

As well as setting `e=ad`, there are four specific parameters that can be set when an ad impression is tracked:

| **Parameter** | **Maps to**      | **Type** |**Description**       | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------|:-----------------|:------------------|
| `ad_ba`       | `adi_bannerid`    | text    | Banner ID            | No               | `126422315640`   |
| `ad_ca`       | `adi_campaignid`  | text    | Campaign ID          | No               | `d-546135`       |
| `ad_ad`       | `adi_advertiserid`| text    | Advertiser ID        | No               | `diageo`         |
| `ad_uid`      | `adi_userid`      | text    | User (viewer) ID     | No               | `0cbffbf8-a9c5-426f-9369-6e53f1677efc` |

Note: if possible, it often makes sense to pass in the `user_id` generated by your ad server into the `ad_uid` field, so that this can be matched with the `user_id` generated by SnowPlow at analysis time.

Example:

```javascript:
duid=aeb1691c5a0ee5a6   // Domain user ID  
&vid=2                  // Domain session ID
&tid=508780             // Transaction ID  
&aid=1                  // App ID

&e=ad                    // event = ad impression
&ad_ba=126422315640      // banner ID
&ad_ca=d-546135          // campaign ID
&ad_ad=diageo            // advertiser ID
&ad_uid=0cbffbf8-a9c5-426f-9369-6e53f1677efc      // user ID
```

Back to [event tracking](#events).
 
<a name="ecomm" />
#### 3.5 Ecommerce tracking 

To track an ecommerce transaction, fire a `transaction` event (`e=tr`) to register the transaction, and then fire `item` events (`e=ti`) to log specific data about the items that were part of that transaction. The `order_id`, (captured using the `ti` parameter) is used to link the transaction-level and item-level data at analysis time.

##### 3.5.1 Transaction parameters

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
duid=aeb1691c5a0ee5a6   // Domain user ID  
&vid=2                  // Domain session index
&aid=1                  // App ID

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

##### 3.5.2 Transaction item parameters

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

Back to [event tracking](#events).

<a name="social" />
#### 3.6 Social tracking

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

Back to [event tracking](#events).

<a name="item" />
#### 3.7 Item views

Pageviews track page load events. Itemviews track views of specific items e.g. articles on a content site, videos on a video site, or products on an online retail site.

This functionality has not been developed yet. When it is, it will be documented here.

Back to [event tracking](#events).

<a name="error" />
### 3.8 Error tracking

This functionality has not been developed yet. When it is, it will be documented here.

Back to [event tracking](#events).

Back to the [top](#top).

<a name="event" />
#### 3.9. Custom structured event tracking

Custom event tracking is used to track events that are not natively supported by SnowPlow. (Like ad impressions, page views, ecomm transactions.)

As well as setting `e=ue`, there are five custom event specific parameters that can be set:

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

&e=se                    // event = custom  
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

&e=se                    // event = custom  
&ev_ca=video            // event_category = video  
&ev_ac=play             // event_action = play  
&ev_la=291              // event_label = 291 (video_id of video played)  
&ev_pr=13.2             // event_property = 13.2 (number of seconds into video that clip starts playing)  
&ev_va=0.0025           // event_value = 0.0025 (ad revenue associated with view)  

```

Back to [event tracking](#events).


<a name="" />
#### 3.10 Custom unstructured event tracking

Custom unstructured event tracking is used to track events that are not natively supported by SnowPlow and allow arbitrary name: value pairs associated with the event.

As well as setting `e=se`, there are three custom event specific parameters that can be set:

| **Parameter** | **Maps to**      | **Type** |**Description**                                     | **Implemented?** | **Example values**| 
|:--------------|:-----------------|:---------|:---------------------------------------------------|:-----------------|:------------------|
| `ue_na`       | `ue_name`        | text     | The name of the event                              | No               | 'viewed_product', 'added_to_cart'  |
| `ue_pr`       | `ue_json`        | JSON     | The properties of the event                        | No               | `{ "product_id": "ASO01043", "price": 49.95 }` |
| `ue_px`       | `ue_json`        | JSON (Base64 encoded)   | The properties of the event         | No               | `eyAicHJvZHVjdF9pZCI6ICJBU08wMTA0MyIsICJwcmljZSI6IDQ5Ljk1IH0=` |

The tracker can decide to pass the `ue_pr` or the `ue_px` parameter depending on configuration. Encoding properties into Base64 allows for more data while sacrificing readability.

*viewed_product* example (using `ue_pr`):

```javascript
uid=aeb1691c5a0ee5a6   // User ID  
&vid=2                 // Visit ID (i.e. session number for this user_id)  
&tid=508780            // Transaction ID  
&aid=1                 // App ID
&tv=js-0.12.0          // Tracker version

&e=ue                  // event = unstructured  
&ue_na=viewed_product  // event_name = viewed_product  
&ue_pr=%7B+%22product_id%22%3A+%22ASO01043%22%2C+%22price%22%3A+49.95+%7D
                       // event_properties = { "product_id": "ASO01043", "price": 49.95 }

```

*viewed_product* example (using `ue_px`):

```javascript
uid=aeb1691c5a0ee5a6   // User ID  
&vid=2                 // Visit ID (i.e. session number for this user_id)  
&tid=508780            // Transaction ID  
&aid=1                 // App ID
&tv=js-0.12.0          // Tracker version

&e=ue                  // event = unstructured  
&ue_na=viewed_product  // event_name = viewed_product  
&ue_px=eyAicHJvZHVjdF9pZCI6ICJBU08wMTA0MyIsICJwcmljZSI6IDQ5Ljk1IH0=
                       // event_properties = { "product_id": "ASO01043", "price": 49.95 }

```

Back to [event tracking](#events).  
Back to [top](#top).
