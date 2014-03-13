[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Clojure collector setup**](setting-up-the-clojure-collector) > [[Set your tracker to point at the Clojure collector endpoint]]

Now that you've set up your Clojure collector, you need to configure your tracker to send event data to it.

Assuming you're using the [Javascript tracker][javascript-tracker], you'll need to modify your Javascript tracking tags to set the correct end point. The standard tracking tags look as follows:

```html
<!-- Snowplow starts plowing -->
<script type="text/javascript">
var _snaq = _snaq || [];

_snaq.push(['setCollectorCf', '{{CLOUDFRONT DOMAIN}}']);
_snaq.push(['enableLinkTracking']);
_snaq.push(['trackPageView']);

(function() {
var sp = document.createElement('script'); sp.type = 'text/javascript'; sp.async = true; sp.defer = true;
sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://d1fc8wv8zag5ca.cloudfront.net/0.9.1/sp.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sp, s);
})();
 </script>
<!-- Snowplow stops plowing -->
```

The line...

```javascript
_snaq.push(['setCollectorCf', '{{CLOUDFRONT DOMAIN}}']);
```

...is the one that sets the end point, and assumes that you're using the Cloudfront collector rather than the Clojure collector.

To set your Clojure collector as the end point, remove that line and replace it with:

```javascript
_snaq.push(['setCollectorUrl', '{{COLLECTOR URL}}']);
```

Note that the URL your enter must **exclude** `http://` or `https://`. In our case, the url would be: `collector.snplow.com`.

Also, you need to tell the JavaScript that it doesn't need to send user IDs to the collector - this is because your Clojure collector is now setting user IDs. You do this like so:

```javascript
_snaq.push(['attachUserId', false]);
```

So, the complete tag will look like this:

```html
<!-- Snowplow starts plowing -->
<script type="text/javascript">
var _snaq = _snaq || [];

_snaq.push(['setCollectorUrl', 'collector.snplow.com']);
_snaq.push(['attachUserId', false]);
_snaq.push(['enableLinkTracking']);
_snaq.push(['trackPageView']);

(function() {
var sp = document.createElement('script'); sp.type = 'text/javascript'; sp.async = true; sp.defer = true;
sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://d1fc8wv8zag5ca.cloudfront.net/0.9.1/sp.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sp, s);
})();
 </script>
<!-- Snowplow stops plowing -->
```

Next: [[update the EmrEtlRunner configuration YAML file]]

[javascript-tracker]: javascript-tracker-setup