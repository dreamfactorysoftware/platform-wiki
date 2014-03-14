[**HOME**](Home) > [**DREAMFACTORY TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Storage**](storage documentation) > Canonical Event Model

<a name="top" />
# Canonical data structure

1. [Overview](#overview)
2. [The DreamFactory canonical data structure: understanding the individual fields](#model)
3. [A note about data storage formats](#note)

<a name="overview" />
## 1. Overview

In order to analyse DreamFactory data, it is important to understand how it is structured. We have tried to make the structure of DreamFactory data as simple, logical, and easy-to-query as possible.

* **Single table** DreamFactory data is stored in a single, "fat" (many columns) table. We call this the *DreamFactory events table*
* **Each line represents one event**. Each line in the table represents a single *event*, be that a *page view*, *add to basket*, *play video*, *like* etc.
* **Immutable log**. The DreamFactory data table is designed to be immutable: the data in each line should not change over time. Data points that we would expect to change over time (e.g. what cohort a particular user belongs to, how we classify a particular visitor) can be derived from DreamFactory data. However, our recommendation is that these derived fields should be defined and calculated at analysis time, stored in a separate table and joined to the *DreamFactory events table* when performing any analysis
* **Structured events**. DreamFactory explicitly recognises particular events that are common in web analytics (e.g. page views, transactions, ad impressions) as 'first class citizerns'. We have a model for the types of fields that may be captured when those events occur, and specific columns in the database that correspond to those fields
* **Unstructured events**. We intend to build out support for unstructured events. (So that DreamFactory users will be able to construct their own arbritary JSONs of fields for their own event types.) When supported, these JSONs will be stored as-is e.g. in a single 'unstructured event' column in Hive
* Whilst some fields are event specific (e.g. `tr_city` representing the city in a delivery address for an online transaction), others are platform specific (e.g. `page_url` for events that occur on the web) and some are relevant across platforms, devices and events (e.g. `dt` and `tm`, the date and time an event occurs, or `app_id`, the application ID).
* **Evolving over time**. We are building out the canonical data structure to make its understanding of individual event-types richer (more events, more fields per events) and to support more platforms. This needs to be done in a collaborative way with the DreamFactory community, so that the events and fields that you need to track can easily be accommodated in this data structure. Please [get in touch] (Talk-to-us) to discuss your ideas and requirements

<a name="model" />
## 2. The DreamFactory canonical data structure: understanding the individual fields

- 2.1 [**Common fields (platform and event independent)**](#common)
  - 2.1.1 [Application fields](#application)
  - 2.1.2 [Date / time fields](#date-time)
  - 2.1.3 [Event / transaction fields](#eventtransaction)
  - 2.1.4 [DreamFactory version fields](#version)
  - 2.1.5 [User-related fields](#user)
  - 2.1.6 [Device and operating system fields](#device)
  - 2.1.7 [Location fields](#location)
- 2.2 [**Platform-specific fields**](#platform)
  - 2.2.1 [Web-specific fields](#web)
- 2.3 [**Event-specific fields**](#event)
  - 2.3.1 [Event vendor](#eventvendor)
  - 2.3.2 [Page views](#pageview)
  - 2.3.3 [Page pings](#pagepings)
  - 2.3.4 [Link clicks](#linkclicks)
  - 2.3.5 [Ad impressions](#ad-imp)
  - 2.3.6 [Ecommerce transations](#ecomm)
  - 2.3.7 [Social events](#social)
  - 2.3.8 [Item views](#itemview)
  - 2.3.9 [Error tracking](#error)
  - 2.3.10 [Custom structured events](#customstruct)
  - 2.3.11 [Custom unstructured events](#customunstruct)

<a name="common" />
### 2.1 Common fields (platform and event independent)

<a name="application" />
#### 2.1.1 Application fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `app_id`        | text     | Application ID  | Yes       | Yes       | 'angry-birds'  |
| `platform`      | text     | Platform        | Yes       | Yes       | 'web'          |

The application ID is used to distinguish different applications that are being tracked by the same DreamFactory stack.

The platform ID is used to distinguish the same app running on different platforms e.g. `iOS` vs `web`.

Back to [top](#top).

<a name="date-time" />
#### 2.1.2 Date / time fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `collector_tstamp`| timestamp | Time stamp for the event recorded by the collector | Yes    | Yes       | '2013-11-26 00:02:05'   |
| `dvce_tstamp`   | timestamp | Timestamp event was recorded on the client device | No | Yes | '2013-11-26 00:03:57.885' |
| `os_timezone`   | text     | Client operating system timezone | No | Yes | 'Europe/London' |

We are currently considering extending the date / time fields to store the date / time as recorded on the client and server in separate fields. See [issue 149](https://github.com/dreamfactorysoftware/dsp-core/issues/149) for details.

Back to [top](#top).

<a name="eventtransaction" />
#### 2.1.3 Event / transaction fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `event`         | text     | The type of event recorded | Yes | Yes  | 'page_view'    |
| `event_id`      | text     | A UUID for each event | Yes | Yes       | 'c6ef3124-b53a-4b13-a233-0088f79dcbcb' |
| `txn_id`        | int      | Transaction ID set client-side, used to de-dupe records | No | Yes | 421828 |

A complete list of event types is given [here] (#event).

Back to [top](#top).

<a name="version" />
#### 2.1.4 DreamFactory version fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `v_tracker`     | text     | Tracker version | Yes       | Yes       | 'no-js-0.1.0'  |
| `v_collector`   | text     | Collector version | Yes     | Yes       | 'clj-tomcat-0.1.0', 'cf' |
| `v_etl`         | text     | ETL version     | Yes       | Yes       | 'serde-0.5.2'  |

Back to [top](#top).

<a name="user" />
#### 2.1.5 User-related fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `user_id`       | text     | Unique ID set by business | No | Yes | 'jon.doe@email.com' |
| `domain_userid` | text     | User ID set by DreamFactory using 1st party cookie | No | Yes | 'bc2e92ec6c204a14' |
| `network_userid`| text     | User ID set by DreamFactory using 3rd party cookie | No | Yes | 'ecdff4d0-9175-40ac-a8bb-325c49733607' |
| `user_ipaddress` | text    | Ueser IP address | No       | Yes       | '92.231.54.234' |
| `domain_sessionidx`      | int      | A visit / session identifier | No | Yes | 3              |

Back to [top](#top).

<a name="device" />
#### 2.1.6 Device and operating system fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `useragent`     | text     | Raw useragent   | Yes       | Yes       |                |
| `dvce_type`     | text     | Type of device  | No        | Yes       | 'Computer'     |
| `dvce_ismobile` | boolean  | Is the device mobile? | No  | Yes       | 1              |
| `dvce_screenheight` | int  | Screen height in pixels | No | Yes      | 1024           |
| `dvce_screenwidth`  | int  | Screen width in pixels  | No |          | 1900           |
| `os_name`       | text     | Name of operating system | No | Yes     | 'Android'      |
| `os_family`     | text     | Operating system family | No | Yes      | 'Linux'        |
| `os_manufacturer` | text   | Company responsible for OS | No | Yes   | 'Apple'        |

Back to [top](#top).

<a name="location" />
#### 2.1.7 Location fields

Note: none of these fields have been implemented yet.

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `geo_country`   | text     | ISO 3166-1 code for the country the visitor is located in | No  | No | 'GB', 'US' |
| `geo_region`    | text     | ISO-3166-2 code for country region the visitor is in | No | No | 'I9', 'TX' |
| `geo_city`      | text     | City the visitor is in | No | No        | 'New York', 'London'       |
| `geo_zipcode`  | text     | Postcode the visitor is in | No | No    | '94109'           |
| `geo_latitude`  | text     | Visitor location latitude | No | No     | 37.443604      |
| `geo_longitude` | text     | Visitor location longitude | No | No    | -122.4124      |

<a name="platform" />
### 2.2 Platform-specific fields

Currently the only platform supported is `web`. However, as we build trackers for more platforms (e.g. iOS, Windows 8) we would expect to add platforms that are specific to each of these platforms.

<a name="web" />
#### 2.2.1 Web-specific fields

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| **Page fields** |          |                 |           |           |                |
| `page_urlscheme`| text     | Scheme aka protocol | Yes   | Yes       | 'https'        |
| `page_urlhost`  | text     | Host aka domain | Yes       | yes       | '“www.dreamfactory.com' |
| `page_urlport`  | int      | Port if specified, 80 if not| Yes       | 80             |
| `page_urlpath`  | text     | Path to page    | No        | Yes       | '/product/index.html' |
| `page_urlquery` | text     | Querystring     | No        | Yes       | 'id=GTM-DLRG'  |
| `page_urlfragment` | text  | Fragment aka anchor | No    | Yes       | '4-conclusion' |
| `page_title`    | text     | Web page title  | No        | Yes       | 'Using ChartIO to visualize and interrogate DreamFactory data - DreamFactory Software' |
| `refr_urlscheme`| text     | Referer scheme  | No        | Yes       | 'http'         |
| `refr_urlhost`  | text     | Referer host    | No        | Yes       | 'www.bing.com' |
| `refr_urlport`  | int      | Referer port    | No        | Yes       | 80 |
| `refr_urlpath`  | text     | Referer page path | No      | Yes       | '/images/search' |
| `refr_urlquery` | text     | Referer URL querystring | No | Yes      | 'q=psychic+oracle+cards' |
| `refr_urlfragment` | text   | Referer URL fragment | No   | Yes       |                |
| `refr_source`   | text     | Name of referer if recognised | No | Yes | 'Bing images' |
| `refr_term`     | text     | Keywords if source is a search engine | No | Yes | 'psychic oracle cards'
| **Document fields** |      |                 |           |           |                |
| `doc_charset`   | text     | The page’s character encoding | No | Yes | , 'UTF-8' |
| `doc_width`     | int      | The page's width in pixels  | No | Yes  | 1024       |
| `doc_height`    | int      | The page's height in pixels | No | Yes  | 3000       |
| `page_type`     | text     | Category of page| No        | No        | 'product', 'catalogue' |
| **Marketing / traffic source fields** |          |                 |           |           |                |
| `mkt_medium`    | text     | Type of traffic source | No | Yes       | 'cpc', 'affiliate', 'organic', 'social' |
| `mkt_source`    | text     | The company / website where the traffic came from | No | Yes | 'Google', 'Facebook' |
| `mkt_term`      | text     | Any keywords associated with the referrer | Yes | No | 'new age tarot decks' |
| `mkt_content`   | text     | The content of the ad. (Or an ID so that it can be looked up.) | No | Yes | 13894723 |
| `mkt_campaign`  | text     | The campaign ID | No        | Yes        | 'diageo-123' |
| `mkt_referrerurl`| text    | The URL that drove the user to the website being tracked at the session start | No | No | 'http://news.ycombinator.com/newest' |
| **Browser fields** |          |                 |           |           |                |
| `user_fingerprint` | int   | A user fingerprint generated by looking at the individual browser features | No | Yes | 2161814971 |
| `connection_type` | text   | Type of internet connection | No | No   | - |
| `cookie`        | boolean  | Does the browser support persistent cookies? | No | Yes | 1 |
| `br_lang`       | text     | Language the browser is set to  | No | Yes   | 'en-GB' |
| `br_features`   | array    | An array of browser features that the browser supports | No | Yes | ['pdf', 'java', 'fla'] |
| `br_colordepth` | int      | Bit depth of the browser color palette  | No | Yes | 24 |
| `br_jsversion`  | text     | Javascript version | No     | No        | - |
| `br_viewheight`| int     | Viewport height    | No     | No         | 1000 |
| `br_viewwidth` | int     | Viewport width     | No     | No         | 1000 |

See [issue 94](https://github.com/dreamfactorysoftware/dsp-core/issues/94) for more details on `br_windowheight` and `br_windowwidth`.

Back to [top](#top).

<a name="event" />
### 2.3 Event-specific fields

DreamFactory includes specific fields to capture data associated with specific events.

#### 2.3.1 Event vendor

Going forwards, we plan to enable users to define their own events and data model associated for each event. When that is enabled, it will be possible to distinguish between events defined by different companies using the `event_vendor` field:

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `event_vendor`  | text     | Company that developed the event model | Yes | Yes | 'com.dreamfactoryanalytics' |

Note that to date, all event types have been defined by DreamFactory. Also note that `event_vendor` values follow the [Java package naming convention](http://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html).

DreamFactory currently supports (or will support in the near future) the following event types:

|        | **Event type**                                              | **Value of `event` field in model**    |
|:-------|:------------------------------------------------------------|:---------------------------------------|
| 2.3.2  | [Page views](#pageview)                                     | 'page_view'                            |
| 2.3.3  | [Page pings](#pageping)                                     | 'page_ping'                            |
| 2.3.4  | [Link clicks](#linkclicks)                                  | 'link_click'                           |
| 2.3.5  | [Ad impressions](#ad-imps)                                  | 'ad_impression'                        |
| 2.3.6  | [Ecommerce transactions](#ecomm)                            | 'transaction' and 'transaction_item'   |
| 2.3.7  | [Social events](#social)                                    | 'social'                               |
| 2.3.8  | [Item views](#items)                                        | 'item_view'                            |
| 2.3.9  | [Errors](#error)                                            | 'error'                                |
| 2.3.10 | [Custom structured events](#customstruct)                   | 'struct'                               |
| 2.3.11 | [Custom unstructured events](#customunstruct)               | 'unstruct'                             |

Details of which fields are available for which events are given below:

<a name="pageview" />
#### 2.3.2 Page views

There are currently fields that are specific to `page_view` events: all the fields that are required are part of the standard fields available for any [web-based event](#web) e.g. `page_urlscheme`, `page_title`.

Back to [top](#top).

<a name="pagepings" />
#### 2.3.3 Page pings

There are four additional fields included with page pings that indicate how a user has scrolled over a web page since the last page ping:

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `pp_xoffset_min`| integer  | Minimum page x offset seen in the last ping period | No | Yes | 0 |
| `pp_xoffset_max`| integer  | Maximum page x offset seen in the last ping period | No | Yes | 100 |
| `pp_yoffset_min`| integer  | Minimum page y offset seen in the last ping period | No | Yes | 0 |
| `pp_yoffset_max`| integer  | Maximum page y offset seen in the last ping period | No | Yes | 200 |

Back to [top](#top).

<a name="linkclicks" />
#### 2.3.3 Link clicks

This is not currently supported: we plan to add support shortly. For details see [issue 75] (https://github.com/dreamfactorysoftware/dsp-core/issues/75).

Back to [top](#top).

<a name="ad-imp" />
#### 2.3.4 Ad impressions

Currently the following ad-impression specific fields are not included in the canonical event model. We need to implement them shortly. (See [issue 129](https://github.com/dreamfactorysoftware/dsp-core/issues/129).)

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `adi_bannerid`  | text     | Banner ID       | No        | No        | -              |
| `adi_campaignid`| text     | Campaign ID     | No        | No        | -              |
| `adi_advertiserid`| text   | Advertiser ID   | No        | No        | -              |
| `adi_userid`    | text     | User ID (as set by the ad server) | No | No | -          |
| `adi_zoneid`    | text     | Publisher / website zone ID | No | No   | -              |

Back to [top](#top).

<a name="ecomm" />
#### 2.3.5 Ecommerce transactions

There are a large number of fields specifically for transaction events.

Fields that start `tr_` relate to the transaction as a whole. Fields that start `ti_` refer to the specific item included in the transaction. (E.g. a product in the basket.) Single transactions typically span multiple lines of data: there will be a single line where `event` = `transaction`, where the `tr_` fields are set, and multiple lines (one for each product included) where `event` = `transaction_item` and the `ti_` fields are set.

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `tr_orderid`    | text     | Order ID        | Yes       | Yes       | '#134'         |
| `tr_affiliation`| text     | Transaction affiliation (e.g. store where sale took place) | No | Yes | 'web' |
| `tr_total`      | decimal  | Total transaction value | Yes | Yes     | 12.99          |
| `tr_tax`        | decimal  | Total tax included in transaction value | No | Yes | 3.00 |
| `tr_shipping`   | decimal  | Delivery cost charged | No  | Yes       | 0.00           |
| `tr_city`       | text     | Delivery address, city | No | Yes       | 'London'       |
| `tr_state`      | text     | Delivery address, state | No| Yes       | 'Washington'   |
| `tr_country`    | text     | Delivery address, country | No| Yes     | 'France'       |
| `ti_orderid`    | text     | Order ID        | Yes       | Yes       | '#134'         |
| `ti_sku`        | text     | Product SKU     | Yes       | Yes       | 'pbz00123'     |
| `ti_name`       | text     | Product name    | No        | Yes       | 'Cone pendulum'|
| `ti_category`   | text     | Product category| No        | Yes       | 'New Age'      |
| `ti_price`      | text     | Product unit price | Yes    | Yes       | 9.99           |
| `ti_quantity`   | text     | Number of product in transaction | Yes | Yes | 2         |

Back to [top](#top).

<a name="social" />
#### 2.3.6 Social events

This has not been developed yet. However, the intention is to build support for the following fields for use recording social events (e.g. *likes*, *+1s*).

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `social_action` | text     | Social action performed | Yes | No      | 'like'         |
| `social_network`| text     | Social network  | Yes       | No        | 'Google+'      |
| `social_target` | text     | The object of the social action e.g. the music track liked, the tweet retweeted | No | No | 'pbz00123' |
| `social_pagepath` | text   | The URL of the page where the action occurred. This is generally the same as `page_url`, so does not need to be set | No | No | - |

Back to [top](#top).

<a name="itemview" />
#### 2.3.7 Item views

This has not been implemented yet. The intention is to implement the following fields:

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `item_id`         | text     | Item ID e.g. SKU if item is a product | Yes       | No        | 'pbz00123' |
| `item_name`       | text     | Item name or title | Yes    | No        | 'Cone pendulum' |
| `item_displayformat`| text   | Type of item listing. Used to distinguish views of a product summary (in a catalogue page) vs a detailed view (on the product page). | No  | 'summary-view' |
| `item_rank`     | integer  | Item rank (position if there is a list of items displayed on the page) | No | No | 3 |
| `item_location` | text     | Location of the item on the web page | No | No | 'div-cat-4' |

For additional details see [this gist](https://gist.github.com/4327909) and [issue 113](https://github.com/dreamfactorysoftware/dsp-core/issues/113)

Back to [top](#top).

<a name="error" />
#### 2.3.8 Error tracking

This has not been implemented yet.

Back to [top](#top).

<a name="customstruct" />
#### 2.3.9 Custom structured events

If you wish to track an event that DreamFactory does not recognise as a first class citizen (i.e. one of the events listed above), then you can track them using the generic 'custom structured events'. Currently there are five fields that are available to store data related to custom events: we plant to increase this to 25 in the near future:

| **Field**       | **Type** | **Description** | **Reqd?** | **Impl?** | **Example**    |
|:----------------|:---------|:----------------|:----------|:----------|:---------------|
| `se_category`   | text     | Category of event | Yes     | Yes       | 'ecomm', 'video' |
| `se_action`     | text     | Action performed / event name | Yes | Yes | 'add-to-basket', 'play-video' |
| `se_label`      | text     | The object of the action e.g. the ID of the video played or SKU of the product added-to-basket | No | Yes | 'pbz00123' |
| `se_property`   | text     | A property associated with the object of the action | No | Yes | 'HD', 'large' |
| `se_value`      | decimal  | A value associated with the event / action e.g. the value of goods added-to-basket | No | Yes | 9.99 |


See [issue 74](https://github.com/dreamfactorysoftware/dsp-core/issues/74) for additional information.

Back to [top](#top).

<a name="customunstruct" />
#### 2.3.10 Custom unstructured events

**NOTE:** This is not currently supported. (See the[ Developer FAQ] (Developer-FAQ#wiki-unstructtimeline) for more details.)

Back to [top](#top).

## 3. A note about storage data formats

* Currently, DreamFactory data is stored in S3 (for processing in Apache Hive, Pig, and / or Mahout), Redshift and PostgreSQL (for processing by any SQL-compatible analytics package).
* There are minor differences between the structure of data in both formats. These relate to data structures that Hive and PostgreSQL support (e.g. JSONs) that Redshift does not
* Nevertheless, the structure of both is similar: representing a fat table
* Going forwards our intention is to move the storage format for data on S3 from the current flatfile structure to Avro. **This** will become the 'canonical DreamFactory data structure'. Other formats (e.g. Redshift, PostgreSQL etc.) will simply be 'flattened' versions of the same data. We have outlined some of our plans in [this blog post][avro-blog-post].

Back to [top](#top).

[avro-blog-post]: http://dreamfactory.com/blog/2013/02/04/help-us-build-out-the-dreamfactory-event-model/