<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Trackers**](trackers) > [**Javascript Tracker**](Javascript-Tracker)

## Contents

- 1. [Overview](#overview)  
- 2. [General parameters](1-General-paramaters-for-the-Javascript-tracker#wiki-general)  
  - 2.1 [Setting the endpoint](1-General-paramaters-for-the-Javascript-tracker#wiki-endpoint)  
    - 2.1.1 [`setCollectorCf`](1-General-paramaters-for-the-Javascript-tracker#wiki-setCollectorCf)  
    - 2.1.2 [`setCollectorUrl`](1-General-paramaters-for-the-Javascript-tracker#wiki-setCollectorUrl)
  - 2.2 [Setting the application ID](1-General-paramaters-for-the-Javascript-tracker#wiki-app-id)
    - 2.2.1 [`setAppId`](1-General-paramaters-for-the-Javascript-tracker#wiki-setAppId)  
  - 2.3 [Setting the cookie domain](1-General-paramaters-for-the-Javascript-tracker#wiki-cookiedomain)
    - 2.3.1 [`setCookieDomain](1-General-paramaters-for-the-Javascript-tracker#wiki-setCookieDomain) 
  - 2.4 [Setting the user ID](1-General-paramaters-for-the-Javascript-tracker#wiki-user-id)  
    - 2.4.1 [`setUserId`](1-General-paramaters-for-the-Javascript-tracker#wiki-setUserId)
- 3. [Tracking specific events](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-tracking-specific-events)  
  - 3.1 [Pageviews](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-page)  
    - 3.1.1 [`trackPageView`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackPageView)  
  - 3.2 [Pagepings](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-pagepings)  
    - 3.2.1 [`enableActivityTracking`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-enableActivityTracking)  
  - 3.3 [Ecommerce transaction tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-ecommerce)  
    - 3.3.1 [`addTrans`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-addTrans)  
    - 3.3.2 [`addItem`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-addItem)  
    - 3.3.3 [`trackTrans`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackTrans)  
    - 3.3.4 [Pulling it all together: an example](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-ecomm-example)
  - 3.4 [Social tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-social) 
    - 3.4.1 [`trackSocial`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackSocial) 
  - 3.5 [Campaign tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-campaign)  
    - 3.5.1 [Identifying paid sources](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-identifying-paid-sources)  
    - 3.5.2 [Anatomy of the query parameter](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-anatomy-of-the-query-parameter)
  - 3.6 [Ad impression tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-adimps) 
    - 3.6.1 [`trackImpression`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackImpression)
  - 3.7 [Tracking custom structured events](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-custom-structured-events)  
    - 3.7.1 [`trackStructEvent`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackStructEvent)
  - 3.8 [Tracking custom unstructured events](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-custom-unstructured-events)
    - 3.8.1 [`trackUnstructEvent`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-trackUnstructEvent)   
  - 3.9 [Link click tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-link-click-track)
    - 3.9.1 [`enableLinkTracking`](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-enableLinkTracking)


<a name="overview" />
## 1. Overview

The [SnowPlow Javascript tracker](https://github.com/snowplow/snowplow/tree/master/1-trackers/javascript-tracker/) works in much the same way as Javascript trackers for other major web analytics solutions including Google Analytics and Omniture. We have tried, as far as possible, to keep the API very close to that used by Google Analytics, so that users who have implemented Google Analytics Javascript tags have no difficulty also implementing the SnowPlow Javascript tags.

Tracking is done by inserting Javascript tags onto pages. These tags run functions defined in [snowplow.js](https://github.com/snowplow/snowplow/blob/master/1-trackers/javascript-tracker/js/snowplow.js), that trigger GET requests of the SnowPlow pixel. The Javascript functions append data points to be passed into SnowPlow onto the query string for the GET requests. These then get logged by the SnowPlow [collector](collectors). For a full list of data points that can be passed into SnowPlow in this way, please refer to the [SnowPlow tracker protocol](snowplow-tracker-protocol) documentation.

The Javascript tracker supports both syncronous and asyncronous tags. We recommend the asyncronous tags in nearly all instances, as these do not slow down page load times. 

[Back to top](#top)  
[2. General parameters](1-General-paramaters-for-the-Javascript-tracker#wiki-general)  
[3. Tracking specific events](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-tracking-specific-events)  
