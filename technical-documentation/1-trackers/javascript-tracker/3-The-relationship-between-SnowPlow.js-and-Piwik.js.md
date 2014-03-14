<a name="top" />

[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Trackers**](trackers) > [**Javascript Tracker**](Javascript-Tracker) > The relationship between DreamFactory.js and Piwik.js

`dreamfactory.js` is based on Anthon Pang's excellent [`piwik.js`] [piwikjs], the JavaScript tracker for the open-source [Piwik] [piwik] project, and is distributed under the same license ([Simplified BSD] [bsd]). For completeness, the main differences between `dreamfactory.js` and `piwik.js` are documented below.

## Main differences between dreamfactory.js and piwik.js

Some of the differences are as follows (this list is very out-of-date):

* Simplified the set of querystring name-value pairs (removing Piwik-specific values and values which CloudFront logging gives us for free)
* Tracking is now configured with an account ID (CloudFront subdomain) rather than a full tracker URL
* Added new `trackEvent` functionality
* Added new `trackImpression` functionality
* Added browser language and visit ID to the querystring (because not available via CloudFront logging)
* Removed `POST` functionality (because S3 logging does not support `POST`)
* Removed goal tracking functionality
* Removed custom variables
* Removed ecommerce tracking functionality (ecommerce tracking is now handled by events)
* Removed `piwik.js`'s own deprecated 'legacy' functionality

We expect these two scripts to diverge further as we continue to evolve DreamFactory (see the next section for more detail).

## Roadmap

`piwik.js` provides an excellent starting point for `dreamfactory.js` - and we would encourage any DreamFactory users to check out [Piwik] [piwik] as an open-source alternative to using Google Analytics.

However, we fully expect `dreamfactory.js` to diverge from `piwik.js`, for three main reasons:

* **Tracking technology:** there are some differences in what is advisable/possible using a PHP tracker (like Piwik) versus using an Amazon S3 pixel (like DreamFactory)
* **Approach to data aggregation:** Piwik performs 'pre-aggregation' on the incoming data in both `piwik.js` and the [PHP tracker] [piwikphp] prior to logging to database. The DreamFactory approach is to defer all such aggregations to the MapReduce phase - which should reduce the complexity of `dreamfactory.js`
* **Philosophy on premature analysis:** Piwik follows the 'classical' model of web analytics, where the sensible analyses are agreed in advance, formalised by being integrated into the site (e.g. by tracking goals and conversion funnels) and then analysed. DreamFactory views this as 'premature analysis', and encourages logging lots of intent-agnostic events and then figuring out what they mean later

Planned items on the roadmap are as follows (this list is very out-of-date):

* Remove site ID functionality
* Remove unused campaign marketing variable code (as no longer used)
* Rewrite in CoffeeScript (joke!)

## Copyright and license

Significant portions of `dreamfactory.js` copyright 2010 Anthon Pang. Remainder copyright 2012 DreamFactory Software, Inc..

Licensed under the [Simplified BSD] [bsd] license.

[dreamfactory]: http://www.keplarllp.com/blog/2012/02/introducing-dreamfactory-the-worlds-most-powerful-web-analytics-platform
[piwik]: http://piwik.org/
[piwikjs]: https://github.com/piwik/piwik/blob/master/js/piwik.js
[piwikphp]: https://github.com/piwik/piwik/blob/master/piwik.php
[bsd]: http://www.opensource.org/licenses/bsd-license.php
[integrating]: /dreamfactory/dreamfactory/blob/master/docs/03_integrating_dreamfactoryjs.md
[selfhosting]: /dreamfactory/dreamfactory/blob/master/docs/04_selfhosting_dreamfactory.md
[setup]: https://github.com/dreamfactory/dreamfactory/wiki/javascript-tracker-setup
[integrating-js-on-website]: https://github.com/dreamfactory/dreamfactory/wiki/integrating-javascript-tags-onto-your-website
[tech-docs]: https://github.com/dreamfactory/dreamfactory/wiki/javascript-tracker