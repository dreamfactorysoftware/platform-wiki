[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Javascript tracker**](Javascript-tracker-setup) > [Self-hosting Snowplow.js](Self-hosting-snowplow-js)

## Overview

We recommend self-hosting the Snowplow tracking JavaScript, `snowplow.js` as it does have some definite advantages over using a third-party-hosted JavaScript:

1. Hosting your own JavaScript allows you to use your own JavaScript minification and asset pipelining approach (e.g. bundling all JavaScripts into one minified JavaScript)
2. As [Douglas Crockford] [crockford] put it about third-party JavaScripts: _"it is extremely unwise to load code from servers you do not control."_

The alternative to self-hosting `snowplow.js` is to use the version hosted by **Snowplow Analytics**, which is okay too. (Details of all the assets including `sp.js` that we house on behalf of the community can be found [here](hosted-assets)). But if you want to self-host `snowplow.js`, please read on...

## Contents

1. [Pre-requisites](#prerequisites)
2. [Self-hosting instructions](#self-hosting-instructions)
3. [Advanced options](#advanced-options)
4. [Next steps](#next-steps)

**Note**: We recommend running all Snowplow AWS operations through an IAM user with the bare minimum permissions required to run Snowplow. Please see our [IAM user setup page](IAM-setup) for more information on doing this.

<a name="prerequisites" />
## Pre-requisites

For the purposes of this guide, we are going to assume that you want to serve the standard `snowplow.js` from CloudFront. (We discuss other approaches in the [Advanced options](#advanced-options) section below.). To accomplish this, you will need the following:

* An account with [Amazon Web Services] [aws]
* S3 and CloudFront enabled within your AWS account
* Some technical chops (not too many)

Once you have those ready, please read on...

<a name="self-hosting-instructions" />
## Self-hosting instructions

### 1. Create a bucket for the JavaScript

First create a new bucket within your Amazon S3 account to store the pixel. Call this bucket something like `snowplow-static-js`:

![js-bucket] [js-bucket]

A couple of notes on this:

* Don't enable logging on this bucket
* You won't be able to call this bucket exactly `snowplow-static-js`. This is because Amazon S3 bucket names have to be globally unique, and `snowplow-static-js` is unfortunately taken by us!

### 2. Upload the JavaScript

You want to upload the **minified** version of the Snowplow JavaScript, which is called `sp.js`. You can obtain the latest version of the Javascript from the [[hosted assets]] section or review the [Snowplow Github repo](https://github.com/snowplow/snowplow).

Now you're ready to upload the JavaScript file into S3. Within the S3 pane, hit **Upload** and browse to your file:

![js-select] [js-select]

Then hit **Open** and you will see the following screen:

![js-upload] [js-upload]

Hit **Set Details >**, then hit **Set Permissions >** to set permissions on this file allowing **Everyone** to **Open/Download** it:

![js-permissions] [js-permissions]

Now hit **Start Upload** to upload the JavaScript file into your bucket. When done, you should have something like this:

![js-ready] [js-ready]

Now that `sp.js` has been uploaded, we recommend that you set the `Cache-Control max-age` property on the file. This property determines *both* how long Cloudfront caches `sp.js` in its edge locations, and crucially, how long individual browsers cache `sp.js` before repinging Cloudfront for a fresh copy. By setting a long expiration date, you can  reduce the number of browser requests for `sp.js`, which can significantly decrease your Cloudfront costs. (Especially if you are a large website or network of sites.)

The only disadvantage of a long expiration is that you need to find a way to *force* end users to fetch a fresh copy of `sp.js` when you upgrade to a newer version. This is easily managed by saving your new version to a new folder in your S3 bucket, and updating your Snowplow tags to point to the new version.

To set a long expiration date on `sp.js`, right click on it in the S3 console, and select **Properties**:

![open-permissions] [open-permissions]

Click on the **Metadata** dropdown and then click on the **Add more metadata** button. New drop downs appear to enable you to enter a new key/value pair:

![enter-key-value-pair] [enter-key-value-pair]

In the Key dropdown, select **Cache-Control**. In the value field, enter

	max-age=$value_in_seconds

For example, if you want to set your items to expire in 10 years, enter, that is 10x365x24x60x60 = 315,360,000

	max-age=315360000

![entered-values] [key-value-pair-entered]

Now click save button (bottom right of the screen). You area ready to create your CloudFront distribution!


### 4. Create your CloudFront distribution

Now you are ready to create the CloudFront distribution which will serve your JavaScript. In the CloudFront tab, hit the **Create Distribution** button:

![dist-create] [dist-create]

Select the **Download** option and hit **Continue**:

![dist-origin] [dist-origin]

For the **Origin Domain Name**, choose your S3 bucket (`snowplow-static-js`) from the dropdown, and accept the suggested **Origin ID**. Now hit **Continue**:

![dist-behaviour] [dist-behaviour]

The defaults are fine on this screen, hit **Continue** again:

![dist-details] [dist-details]

On this screen leave Logging as **Off** and hit **Continue** to review a summary of your new distribution:

![dist-review] [dist-review]

Hit **Create Distribution** and then you should see something like this:

![dist-enabled] [dist-enabled]

Write down your CloudFront distribution's **Domain Name** - e.g. `http://d1fc8wv8zag5ca.cloudfront.net`. You will need this later when you integrate Snowplow into your website.

### 5. Testing your JavaScript file on CloudFront

Before testing, take a 10 minute coffee or brandy break (that's how long CloudFront takes to synchronize).

Done? Now just check that you can access your JavaScript file over both HTTP and HTTPS using a browser, `wget` or `curl`:

    http://{{SUBDOMAIN}}.cloudfront.net/sp.js
    https://{{SUBDOMAIN}}.cloudfront.net/sp.js

If you have any problems, then double-check your CloudFront distribution's URL, and check the permissions on your `sp.js` file: it must be Openable by Everyone.

That's it - you now have a CloudFront distribution which will serve your Snowplow JavaScript to anybody anywhere in the world, fast. Now all that remains is to update your Snowplow header tag to fetch your own version of `sp.js`, rather than the version hosted by the Snowplow team.

### 5. Update your tracking tags to use the self-hosted version of `Snowplow.js`

The standard Snowplow tracking tag looks something like:

```html
<!-- Snowplow starts plowing -->
<script type="text/javascript">
var _snaq = _snaq || [];

_snaq.push(['setCollectorCf', '{{YOUR COLLECTOR\'S CF SUBDOMAIN}}']);
_snaq.push(['trackPageView']);
_snaq.push(['enableLinkTracking']);

(function() {
var sp = document.createElement('script'); sp.type = 'text/javascript'; sp.async = true; sp.defer = true;
sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://d1fc8wv8zag5ca.cloudfront.net/0.13.1/sp.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sp, s);
})();
 </script>
<!-- Snowplow stops plowing -->
```

The reference to `'://d1fc8wv8zag5ca.cloudfront.net/0.13.1/sp.js'` loads `sp.js`, the Snowplow JavaScript tracker. The version loaded is the version [hosted by the Snowplow team from our own Cloudfront subdomain](hosted-assets) (and provided free to the community). 

To use the version hosted yourself, update the `sp.src` line to point to your own self-hosted `sp.js`:

```javascript
sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://{{YOUR SP.JS CF SUBDOMAIN}}.cloudfront.net/sp.js';
```

#### A note on `setCollectorCf`

The `setCollectorCf` method is used to determine the Cloudfront subdomain where your tracking pixel is served from. This should **not** be confused with the Cloudfront subdomain used to serve `sp.js`.

This page of documentation relates to self-hosting `sp.js`. You should be using a different Cloudfront distribution for you `setCollectorCf` method in the Snowplow tag. (Or if you're not using the Cloudfront collector, `setCollectorUrl`.) If you are using the Cloudfront collector, see [Cloudfront collector setup](1-Setup-a-bucket-on-S3-for-the-pixel) for details on setting up a Cloudfront distribution for your tracking pixel, and [setting the collector endpoint of your Javascript tracker](javascript-tracker#wiki-endpoint) for details on configuring your Snowplow tags.

<a name="advanced-options" />
## Advanced options

The guide above assumed that you were happy to take the already-minified `sp.js` and host it on CloudFront. In fact, you may prefer to:

* Update the contents of `snowplow.js` and then minify it yourself, _and/or:_
* Add the un-minified `snowplow.js` into your own asset pipelining process and serve it using something other than CloudFront

The first option above is explored in more detail in the guide to [[Modifying snowplow.js|Modifying-snowplow-js]].

The second option is out of the scope of the Snowplow documentation but you should get some ideas as to how the minification should be handled from that same guide, [[Modifying snowplow.js|Modifying-snowplow-js]].

<a name="next-steps" />
## Next steps

You may want to setup [campaign tracking](tracking your marketing campaigns), so that you can tie user behaviour on your website to any paid campaigns that drove those users to your website.

Finished setting up the [Javascript tracker] (javascript-tracker-setup)? Then you are ready to [setup EmrEtlRunner] (Setting-up-Snowplow#wiki-step3).

Return to the [setup guide] (Setting-up-Snowplow).


[aws]: http://aws.amazon.com/
[yuic]: http://developer.yahoo.com/yui/compressor/
[crockford]: https://github.com/douglascrockford
[js]: https://raw.github.com/snowplow/snowplow/master/1-trackers/javascript/js/sp.js
[js-bucket]: setup-guide/images/js_bucket.png
[js-select]: setup-guide/images/js_select.png
[js-upload]: setup-guide/images/js_upload.png
[js-permissions]: setup-guide/images/js_permissions.png
[js-ready]: setup-guide/images/js_ready.png
[dist-create]: setup-guide/images/js_dist_create.png
[dist-origin]: setup-guide/images/js_dist_origin.png
[dist-behaviour]: setup-guide/images/js_dist_behaviour.png
[dist-details]: setup-guide/images/js_dist_details.png
[dist-review]: setup-guide/images/js_dist_review.png
[dist-enabled]: setup-guide/images/js_dist_enabled.png
[open-permissions]: setup-guide/images/js_properties.png
[enter-key-value-pair]: setup-guide/images/js_enter_metadata.png
[key-value-pair-entered]: setup-guide/images/properties-filled-in.png