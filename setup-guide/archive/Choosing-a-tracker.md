[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Snowplow setup guide) > [**Trackers**](choosing-a-tracker)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/1-trackers.png]] 

## Available trackers

| **Tracker**                                    | **Description**                                     | **Status**       |
|:-----------------------------------------------|:----------------------------------------------------|:-----------------|
| [Javascript tracker](javascript-tracker-setup) | A client-side Javascript tracker fo web browser use | Production-ready |
| [No-JS tracker](no-js-tracker-setup)           | A wizard for generating HTML-only Snowplow tracking tags to enable tracking of pageviews where Javascript cannot be used e.g. HTML emails | Production-ready |
| [iOS tracker](ios-tracker-setup)               | An iOS tracker for iPhone / iPad application tracking | Pre-alpha      |


## Trackers on the Snowplow roadmap

As well as the iOS tracker in development, Android and Windows trackers are on our product roadmap. If you are interested in working with us to develop them, [[talk to us]] and refer to the [[Snowplow Tracker Protocol]] for technical specifications.


## Making a selection

Currently, all Snowplow users use the [Javascript tracker](javascript-tracker-setup). This is ideal for tracking user behaviour across websites, and functions in much the same way as equivalent Javascript trackers for other web analytics products including Google Analytics and Omniture. 

Businesses that wish to track user behaviour on the web but not on their own websites (e.g. the opening of HTML emails, or views of products on 3rd party marketplaces) may use the [No-JS tracker](no-js-tracker-setup) alongside their Javascript tracker, to track these additional events.