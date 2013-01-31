[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Storage**](storage documentation)

<a name="top" />
# Canonical data structure  

1. [Overview](#overview)  
2. [The SnowPlow canonical data structure: understanding the individual fields](#model)  
3. [A note about data storage formats](#note)  

<a name="overview" />
## 1. Overview

In order to analyse SnowPlow data, it is important to understand how it is structured. We have tried to make the structure of SnowPlow data as simple, logical, and easy-to-query as possible.

* **Single table** SnowPlow data is stored in a single, "fat" (many columns) table. We call this the *SnowPlow events table*
* **Each line represents one event**. Each line in the table represents a single *event*, be that a *page view*, *add to basket*, *play video*, *like* etc.
* **Immutable log**. The SnowPlow data table is designed to be immutable: the data in each line should not change over time. Data points that we would expect to change over time (e.g. what cohort a particular user belongs to, how we classify a particular visitor) can be derived from SnowPlow data. However, our recommendation is that these derived fields should be defined and calculated at analysis time, stored in a separate table and joined to the *SnowPlow events table* when performing any analysis
* **Structured events**. SnowPlow explicitly recognises particular events that are common in web analytics (e.g. page views, transactions, ad impressions) as 'first class citizerns'. We have a model for the types of fields that may be captured when those events occur, and specific columns in the database that correspond to those fields
* **Unstructured events**. We intend to build out support for unstructured events. (So that SnowPlow users will be able to construct their own arbritary JSONs of fields for their own event types.) When supported, these JSONs will be stored as-is e.g. in a single 'unstructured event' column in Hive
* Whilst some fields are event specific (e.g. `tr_city` representing the city in a delivery address for an online transaction), others are platform specific (e.g. `page_url` for events that occur on the web) and some are relevant across platforms, devices and events (e.g. `dt` and `tm`, the date and time an event occurs, or `app_id`, the application ID).
* **Evolving over time**. We are building out the canonical data structure to make its understanding of individual event-types richer (more events, more fields per events) and to support more platforms. This needs to be done in a collaborative way with the SnowPlow community, so that the events and fields that you need to track can easily be accommodated in this data structure. Please [get in touch] (Talk-to-us) to discuss your ideas and requirements

<a name="model" />
## 2. The SnowPlow canonical data structure: understanding the individual fields

2.1 [Common fields (platform and event independent)](#common)  
	2.1.1 [Application fields](#application)  
	2.1.2 [Date / time fields](#date-time)  
	2.1.3 [Event / transaction fields](#eventtransaction)  
	2.1.4 [SnowPlow version fields](#version)  
	2.1.5 [User-related fields](#user)  
	2.1.6 [Device-related fields](#device)  
2.2 [Platform-specific fields](#platform)  
	2.2.1 [Web-specific fields](#web)  
2.3 [Event-specific fields](#event)  
	2.3.1 [Page views](#pageview)  
	2.3.2 [Page pings](#pagepings)  
	2.3.3 [Link clicks](#linkclicks)  
	2.3.4 [Ad impressions](#ad-imp)  
	2.3.5 [Ecommerce transations](#ecomm)  
	2.3.6 [Social events](#social)  
	2.3.7 [Item views](#itemview)  
	2.3.8 [Error tracking](#error)  
	2.3.9 [Custom structured events](#customstruct)  
	2.3.10 [Custom unstructured events](#customunstruct)  

<a name="common" />
### 2.1 Common fields (platform and event independent)

Back to [top](#top).

<a name="application" />
#### 2.1.1 Application fields

Back to [top](#top).

<a name="date-time" />
#### 2.1.2 Date / time fields

Back to [top](#top).

<a name="eventtransaction" />
#### 2.1.3 Event / transaction fields

Back to [top](#top).

<a name="version" />
#### 2.1.4 SnowPlow version fields

Back to [top](#top).

<a name="user" />
#### 2.1.5 User-related fields

Back to [top](#top).

<a name="device" />
#### 2.1.6 Device-related fields

Back to [top](#top).

<a name="platform" />
### 2.2 Platform-specific fields

Back to [top](#top).

<a name="web" />
#### 2.2.1 Web-specific fields

Back to [top](#top).

<a name="event" />
### 2.3 Event-specific fields

Back to [top](#top).

<a name="pageview" />
#### 2.3.1 Page views

Back to [top](#top).

<a name="pagepings" />
#### 2.3.2 Page pings

Back to [top](#top).

<a name="linkclicks" />
#### 2.3.3 Link clicks

Back to [top](#top).

<a name="ad-imp" />
#### 2.3.4 Ad impressions

Back to [top](#top).

<a name="ecomm" />
#### 2.3.5 Ecommerce transactions

Back to [top](#top).

<a name="social" />
#### 2.3.6 Social events

Back to [top](#top).

<a name="itemview" />
#### 2.3.7 Item views

Back to [top](#top).

<a name="error" />
#### 2.3.8 Error tracking

Back to [top](#top).

<a name="Custom structured events" />
#### 2.3.9 Custom structured events

Back to [top](#top).

<a name="Custom unstructured events" />
#### 2.3.10 Custom unstructured events

Back to [top](#top).


The fields recorded in the *SnowPlow events table* today:

| **FIELD**            | **DATATYPE**   | **CAN BE EMPTY?** | **DESCRIPTION**            |
|:---------------------|:---------------|:------------------|:---------------------------|
| **App**              |                |                   | _Data related to the specific website / application SnowPlow is tracking behaviour on_ |
| `app_id`             | STRING         | Yes               | Unique identifier for the website or app (useful when SnowPlow is run across several websites / applications) |
| `platform`           | STRING         | Yes               | Can be used to differentiate between data collected from e.g. iOS app vs web app vs XBox app etc. |
| **Date/time**        |                |                   | _The date and time of this page view or event_ |
| `dt`                 | STRING         | No                | Date                       |
| `tm`                 | STRING         | No                | Time                       |
| **Event**            |                |                   | _Identifying this logging event_ |
| `event`              | STRING         | No                | The event type e.g. `page_view`, `ad_impression`, `transaction`, `custom` |
| `event_id`           | STRING         | No                | A unique event ID                |
| `txn_id`             | STRING         | No                | Generated by the Javascript tracker to enable deduplication where 1 event turns up twice by the Cloudfront collector |
| **SnowPlow version** |                |                   | _Identifying what version of SnowPlow generated this line of data. (To allow for schema changes over time.)_ |
| `v_tracker`          | STRING         | No                | Tracker type and version |
| `v_collector`        | STRING         | No                | Collector type and version |
| `v_etl`              | STRING         | No                | ETL type and version       |
| **User and visit**   |                |                   | _Identifying the web user and this specific visit_ |
| `user_id`            | STRING         | No                | A unique ID assigned to each browser and stored on the SnowPlow cookie. |
| `user_ipaddress`     | STRING         | No                | Visitor IP Address         |
| `user_fingerprint`   | STRING         | Yes               | A user fingerprint generated by the Javascript tracker. Used to enable tracking of users across domains when using the Javascript (i.e. client-side) tracker. Note this feature is experimental. |
| `visit_id`           | INT            | No                | A counter that indicates what visit this is for this particular user_id i.e. 1 if this is a user's first visit, 2 if it is his / her 2nd visit |
| **Page**             |                |                   | _Identifying the web page being visited_ |
| `page_url`           | STRING         | No                | The web page URL           |
| `page_title`         | STRING         | Yes               | The web page title         |
| `page_referrer`      | STRING         | No                | The referrer URL. If this is the first page view of a session, it points at the referrering website / search engine if applicable |
| **Marketing**        |                |                   | _Marketing campaign attribution_ |
| `mkt_medium`         | STRING         | Yes               | The type of ad used e.g. cpc, banner, email, affiliate... |
| `mkt_source`         | STRING         | Yes               | The source of the ad: used e.g. Google, MSN, Facebook, TradeDoubler |
| `mkt_term`           | STRING         | Yes               | Any keywords associated with the ad. This is relevant for search ads |
| `mkt_content`        | STRING         | Yes               | The content of the ad, or a reference to the creative ID. Used e.g. to compare the results within a campaign between different creatives. |
| `mkt_campaign`       | STRING         | Yes               | The campaign name. A single campaign may involve ads on multiple sources / mediums, so `mkt_campaign` is often a way of grouping them together into a single marketing initiative |
| **Custom Event**     |                |                   | _If this is an event being logged, its details_ |
| `ev_category`        | STRING         | Yes               | The category of event e.g. 'ecomm', 'media' |
| `ev_action`          | STRING         | Yes               | The action performed e.g. 'play-video', 'add-to-basket' |
| `ev_label`           | STRING         | Yes               | A label associated with the event / action. This is often set to the *object* and action is performed *on* e.g. the product_id of the item added-to-basket, or the ID of the video played |
| `ev_property`        | STRING         | Yes               | A property associated with the event / action. This might be the number of seconds into a video play starts, or the quantity of an item added to basket |
| `ev_value`           | STRING         | Yes               | A value associated with with the action e.g. the value of the items added to basket |
| **Ecommerce**        |                |                   | _Ecomm transaction tracking_        |
| `tr_orderid`         | STRING         | Yes               | Unique ID for the transaction |
| `tr_affiliation`     | STRING         | Yes               |                               |
| `tr_total`           | DECIMAL        | Yes               | Total transaction value |
| `tr_tax`             | DECIMAL        | Yes               | Total sales tax |
| `tr_shipping`        | DECIMAL        | Yes               | Total shipping charged |
| `tr_city`            | STRING         | Yes               | Buyer city location |
| `tr_state`           | STRING         | Yes               | Buyer state location |
| `tr_country`         | STRING         | Yes               | Buyer country location |
| `ti_orderid`         | STRING         | Yes               | Unique ID for the transaction, same as `tr_orderid` |
| `ti_sku`             | STRING         | Yes               | Item SKU |
| `ti_name`            | STRING         | Yes               | Item name |
| `ti_category`        | STRING         | Yes               | Category of item |
| `ti_price`           | DECIMAL        | Yes               | Item price |
| `ti_quantity`        | INT            | Yes               | Quantity of item purchased |
| **User Agent**       |                |                   |            |
| `useragent`          | STRING         | Yes               | Raw useragent string |
| **Browser**          |                |                   | _Information about the web browser_ |
| `br_name`            | STRING         | Yes               | Browser name e.g. Internet Explorer |
| `br_family`          | STRING         | Yes               | Browser family e.g. Chrome          |
| `br_version`         | STRING         | Yes               | Browser version            |
| `br_type`            | STRING         | Yes               | Type of client e.g. Browser, robot|
| `br_renderengine`    | STRING         | Yes               | Browser rendering engine e.g. GECKO, WEBKIT |
| `br_lang`            | STRING         | Yes               | Language that the browser is set to  |
| `br_features`        | ARRAY\[STRING\]| Yes               | Contains a set of all features supported by this browser, e.g. `fla` for Flash, `pdf` for PDF support |
| `br_cookies`         | BOOLEAN        | Yes               | Flag set to 'true' if browser permits cookies |
| `br_colordepth`      | STRING         | Yes               | Browser color depth |
| **Operating System** |                |                   | _Information about the host operating system_ |
| `os_name`            | STRING         | Yes               | Operating system name e.g. Windows            |
| `os_family`          | STRING         | Yes               | Operating system family e.g. Android          |
| `os_manufacturer`    | STRING         | Yes               | Operating system manufacturer e.g. Apple Inc., Google Inc.  |
| `os_timezone`        | STRING         | Yes               | Timezone (as recorded by the operating system) |
| **Device/Hardware**  |                |                   | _Information about the host device/hardware_ |
| `dvce_type`          | STRING         | Yes               | Device type e.g. computer, mobile...         |
| `dvce_ismobile`      | BOOLEAN        | Yes               | Flag set if user is browsing on a mobile device  |
| `dvce_screenwidth`   | INT            | Yes               | Screenwidth in pixels      |
| `dvce_screenheight`  | INT            | Yes               | Screenheight in pixels     |


<a name="future" />
## Future SnowPlow data structure

We are building out the **SnowPlow events table** to incorporate additional fields in the near future. A  list of all the fields we currently plan to implement is given below: (This does **not** include those already implemented)

| **FIELD**            | **DATATYPE**   | **CAN BE EMPTY?** | Implemented?  | **DESCRIPTION**            |
|:---------------------|:---------------|:------------------|:--------------|:---------------------------|
| **User and visit**   |                |                   | Yes           | _Identifying the web user and this specific visit_ |
| `user_domain`        | STRING         | Yes               | No            | User domain (based on IP address) |
| `connection_type`    | STRING         | Yes               | No            | Type of connection |        
| **Marketing**        |                |                   |               | _Marketing campaign attribution_ |
| `mkt_referrerurl`    | STRING         | Yes               | No            | URL of referrer. Same as `page_referrer` but only set where `page_referrer` is not the same domain as the website |
| **Social event**     |                |                   |               | Fields for social event tracking    |
| `social_network`     | STRING         | Yes               | No            | Social network that action relates to e.g. `Facebook`, `Twitter` |
| `social_action`      | STRING         | Yes               | No            | Action that user performed e.g. `like` |
| `social_target`      | STRING         | Yes               | No            | The social object that the action was performed on e.g. the video that was 'liked' |
| `social_pagepath`    | STRING         | Yes               | No            | The page URL the action was committed on |
| **Browser**          |                |                   |               | _Information about the web browser_ |
| `br_jsversion`       | STRING         | Yes               | No            | Version of Javascript that browser is running |
| `br_windowheight`    | INT            | Yes               | No            | Height of browser window in pixels |
| `br_windowwidth`     | INT            | Yes               | No            | Width of browser window in pixels  |
| **Geo / location**   |                |                   |               | _Information on the location of the visitor, derived from IP address_ |
| `geo_country`        | STRING         | Yes               | No            | Country visitor is located in |
| `geo_region`         | STRING         | Yes               | No            | Region visitor is located in, within country |
| `geo_city`           | STRING         | Yes               | No            | City visitor is located in |
| `geo_postcode`       | STRING         | Yes               | No            | Visitor postcode           |
| `geo_latitude`       | STRING         | Yes               | No            | Visitor location latitude  |
| `geo_longitude`      | STRING         | Yes               | No            | Visitor location longitude |
| **Custom variables** |                |                   |               | _Customer variables_       |
| `cv_persist1`           | STRING         | Yes               | No            | Custom variable which will persist across sessions (e.g. relates to the app install or the browser user) |
| `cv_persist2`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist3`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist4`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist5`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist6`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist7`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist8`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist9`           | STRING         | Yes               | No            | _As above_ |
| `cv_persist10`          | STRING         | Yes               | No            | _As above_ |
| `cv_session1`        | STRING         | Yes               | No            | Custom variable with scope set at the session (e.g. `visit_id`) level. (Ie applies to this particular user engaged in this particular workflow.) | 
| `cv_session2`        | STRING         | Yes               | No            | _As above_ |
| `cv_session3`        | STRING         | Yes               | No            | _As above_ |
| `cv_session4`        | STRING         | Yes               | No            | _As above_ |
| `cv_session5`        | STRING         | Yes               | No            | _As above_ |
| `cv_session6`        | STRING         | Yes               | No            | _As above_ |
| `cv_session7`        | STRING         | Yes               | No            | _As above_ |
| `cv_session8`        | STRING         | Yes               | No            | _As above_ |
| `cv_session9`        | STRING         | Yes               | No            | _As above_ |
| `cv_session10`       | STRING         | Yes               | No            | _As above_ |
| `cv_context1`        | STRING         | Yes               | No            | Custom variable with scope set to this particular context e.g. page, screen, widget... |
| `cv_context2`        | STRING         | Yes               | No            | _As above_ |
| `cv_context3`        | STRING         | Yes               | No            | _As above_ |
| `cv_context4`        | STRING         | Yes               | No            | _As above_ |
| `cv_context5`        | STRING         | Yes               | No            | _As above_ |
| `cv_context6`        | STRING         | Yes               | No            | _As above_ |
| `cv_context7`        | STRING         | Yes               | No            | _As above_ |
| `cv_context8`        | STRING         | Yes               | No            | _As above_ |
| `cv_context9`        | STRING         | Yes               | No            | _As above_ |
| `cv_context10`       | STRING         | Yes               | No            | _As above_ |
| `cv_event1`          | STRING         | Yes               | No            | Custom variable with scope set to the event level |
| `cv_event2`          | STRING         | Yes               | No            | _As above_ |
| `cv_event3`          | STRING         | Yes               | No            | _As above_ |
| `cv_event4`          | STRING         | Yes               | No            | _As above_ |
| `cv_event5`          | STRING         | Yes               | No            | _As above_ |
| `cv_event6`          | STRING         | Yes               | No            | _As above_ |
| `cv_event7`          | STRING         | Yes               | No            | _As above_ |
| `cv_event8`          | STRING         | Yes               | No            | _As above_ |
| `cv_event9`          | STRING         | Yes               | No            | _As above_ |
| `cv_event10`         | STRING         | Yes               | No            | _As above_ |
| `cv_json`            | STRING         | Yes               | No            | Field that can be used to stuff any sort of custom event JSON if desired |



## 3. A note about storage data formats

* Currently, SnowPlow data is stored in S3 (for processing in Apache Hive, Pig, and / or Mahout) and Infobright (for processing by any SQL-compatible analytics package).
* There are minor differences between the structure of data in both formats. These relate to data structures that Hive supports (e.g. maps, JSONs) that Infobright does not
* Nevertheless, the structure of both is similar: representing a fat table
* Going forwards our intention is to move the storage format for data on S3 from the current flatfile structure to Avro. **This** will become the 'canonical SnowPlow data structure'. Other formats (e.g. Infobright, Redshift etc.) will simply be 'flattened' versions of the same data
