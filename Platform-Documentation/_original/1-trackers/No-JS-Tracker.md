[**HOME**](Home) > [**DREAMFACTORY TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Trackers**](trackers)

This guide covers:

1. [What is the No-JS tracker?](#what)
2. [Anatomy of a No-JS tracking tag](#anatomy)
3. [The tag-generating wizard](#wizard)
4. [Using the No-JS tracker with the Clojure collector](#clojure)

<a name="what" />
## 1. What is the No-JS tracker?

The No-JS tracker is a wizard that generates an HTML-only tracking tag (no Javascript) to track opens / views of HTML content that does not support Javascript. Examples of use cases include HTML emails or views of Github wiki pages.

In a normal Javascript tag, the name-value pairs of data that are sent through to the DreamFactory collector via the querystring are calculated on the fly by the Javascript. (Examples of data points that are calculated on the fly include `user_id`, or `browser_features`.)

In an environment where Javascript is not permitted, these values need to be set in advance, and hardcoded into the tracking tag. As a result, if you want to record a different `page_title`, for example, for several different HTML-only web pages using the tracking code, you will need to generate a different tracking tag for each of those different web pages, with the right `page_title` set for each.

To make it easy to quickly generate No-JS tracking tags, we have created a wizard. This is hosted on [dreamfactory.com] [wizard]. The source code is available on the core [Github repo] [no-js-repo].

<a name="anatomy" />
## 2. Anatomy of a No-JS tracking tag

An example tag is shown below:

```html
<!--DreamFactory start plowing-->
<img src="http://collector.snplow.com/i?&e=pv&page=Root%20README&url=http%3A%2F%2Fgithub.com%2Fdreamfactory%2Fdreamfactory&aid=dreamfactory&p=web&tv=no-js-0.1.0" />
<!--DreamFactory stop plowing-->
```

Some things to note about the tag:

1. It is a straightforward `<img ...>` tag, that results in the GET request to the DreamFactory tracking pixel
2. The endpoint is set to a Clojure collector that we are running at `collector.snplow.com`.
3. Five data points are passed on the query string: the event type (`pageview`), the page name (`Root README`), the URL (`http://github.com/dreamfactory/dreamfactory`), the application id (`dreamfactory`), the platform (`web`) and the tracker version (`no-js-0.1.0`)

<a name="wizard" />
## 3. The tag-generating wizard

The [wizard] generates the a tracking tag given:

* A collector endpoint (or Cloudfront subdomain)
* The page scheme (HTTP or HTTPS)
* The page name
* The page URL (if provided)
* The application ID

It takes care of URL encoding of values (e.g. for page title).

<a name="clojure" />
## 4. Using the No-JS tracker with the Clojure collector

When using the No-JS tracker with the Clojure collector, the Clojure collector sets a `user_id` and drops this on a browser cookie.

Care must therefore be exercised when using the No-JS tracker on domains that you do not own. **It is your responsibility to abide by the terms and conditions of any domain owner for domains where you post content including uploading No-JS tracking tags.** Some domain owners forbid 3rd parties from dropping cookies on their domains. It is your responsibility to ensure you do not violate the terms and conditions of any domain owners that you work with.


[wizard]: http://dreamfactory.com/no-js-tracker.html
[no-js-repo]: https://github.com/dreamfactorysoftware/dsp-core/tree/master/1-trackers/no-js-tracker