<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Javascript tracker**](Javascript-tracker-setup) > [Setting up the Javascript Tracker with QuBit OpenTag](Integrating-Javascript-tags-with-QuBit-OpenTag)

This setup guide is divided into two sections:

1. [Setting up QuBit OpenTag](#setup-opentag)
2. [Integrating Snowplow Javascript tracking tags with OpenTag](#snowplow-setup)
3. [Next steps](#next-steps)

<a name="setup-opentag" />
## 1. Setting up QuBit OpenTag

The following steps are required to setup OpenTag on your website:

1. [Create an OpenTag account](#create-account)
2. [Expose the data required by OpenTag and Snowplow Universal Variable](#expose-data)
3. [Create a container tag in OpenTag, and integrate it into your website](#container)

The steps are reasonably straight forward, especially for anyone familiar with tag management or OpenTag in particular. The only step with some elements that deviate from common setup instructions (e.g. provided by OpenTag) is exposing event data to OpenTag to drive Snowplow custom event tracking. This is covered in [step 2] (#expose-data).

<a name="create-account" />
### 1.1 Create an OpenTag account

You can create an OpenTag account for free by signing up on the [QuBit website] (https://opentag.qubitproducts.com/QDashboard/register.html).

[[/setup-guide/images/opentag/1.png]]

[Back to top] (#top)

### 1.2 Expose the data required by OpenTag and Snowplow to OpenTag via the OpenTag Universal Variable

OpenTag manages the firing of all the different tags on your site: that includes web analytics tags like Snowplow and Google Analytics, as well as other sorts of tags e.g. tags from affiliate networks, audience management platforms etc.) In order to pass the relevant data to these services in their tags, you need to pass that data from your website into OpenTag in the first place.

The primary way of passing data into OpenTag is using the [`window.universal_variable`] (https://github.com/QubitProducts/UniversalVariable) object. The `Universal Variable` is a JSON that is declared on page load. (As high up the page source code as possible.) You populate the it with data about the relevant entities that make up your web pages for this user on this particular web journey. Those entities can include:

* Who the user is (e.g. name, address etc.)
* Information about the web page (e.g. page category, variation if doing A/B testing)
* Product (if we are on an ecomm site). This would include e.g. SKU, name, description, unit price etc.
* Basket (again if we are on an ecomm site). This would include information on the complete contents of the shopping basket at this point in time.
* Transaction (again if we are on an ecomm site). This would include the complete set of information associated with a particular transaction, including the address, total cost, number of itmes, and details on the individual products in the transaction.
* Listing (again if we are on an ecomm site). This would include a list of all the products in a listing.
* Recommendations (if the site recommends products). This would include the list of recommended products
* Events. A list of events that have just occured.

There is detailed readme on the OpenTag [`Universal Variable` Github page](https://github.com/QubitProducts/UniversalVariable) detailing all the relevant fields for each object and giving practical advice on implementing the `Universal Variable` on your website.

For Snowplow, the detailed object model provided by OpenTag is great, because it means there's a rich set of page-level data that can be passed into Snowplow so that users can analyse e.g. conversion rates by product, or the effectiveness of different recommendation algorithms with different customer segments, to take just two examples.

However, implementing the `Universal Variable` as documented often is not enough for Snowplow users. That is because we are not just intested in the contents of web pages when they are loaded, and the specific object and actions identified by OpenTag (e.g. baskets and transactions): we are typically also interested in capturing all interesting events that occur on a web page between page loads (i.e. AJAX events), generally using [event tracking tags](#event-tracking). Examples of types of events we might track in this way are:

* Playing rich media (e.g. videos) 
* Zoom in on product images
* User logins
* Add-to-baskets

When these events occur, we need to update the `Universal Variable` so that these events are recorded as they happen, and the relevant data associated with each event, that we want to pass to Snowplow, is attached to the event. 

OpenTag's Universal Variable has an [`EventList`] (https://github.com/QubitProducts/UniversalVariable#eventlist) object, which stores an array of [`Event`] (https://github.com/QubitProducts/UniversalVariable#event) objects. To meet Snowplow's needs, we've added a number of fields to the Event object, and implemented an interface to make it straightforward for companies implementing OpenTag to push event data into the `Universal Variable` as / when they occur.

The additional fields are:

| **Property**  | **JSON key** | **Type** | **Description**                                         |
|:--------------|:-------------|:---------|:--------------------------------------------------------|
| Event category| category     | String   | A category e.g. 'video' or 'ecomm', that groups actions together by theme |
| Event action  | action       | String   | The actual action performed by the user e.g. `add-to-basket` or `play-video` |
| Event label   | label        | String   | An optional string describing the object or action performed on it. This might be the quantity of an item added to basket, or the id of the video just played |
| Event property | property    | String   | An optional string describing the object or the action performed on it. This might be the quantity of the item added to basket, or the resolution of the video just played |
| Event value   | value        | Number   | A value associated with the action. This might be the value of item added-to-basket, for example |

When an AJAX event occurs on your webpage, you can push the required event data into the `Universal Variable` using the `trackStructEvent` method:

```javascript
uvHelpers.trackStructEvent(category, action, label, property, value);
```

When calling it, you need to set the `category`, `action`, `label`, `property` and `value` fields to the ones you want passed to the Snowplow event tracker, as documented in the table above.

As well as enabling easy updating of the `Universal Variable`, the above method also triggers an `OpenTagEvent` in the DOM. We can use this, when configuring Snowplow event tracking tags in the OpenTag UI to create a [custom starter] (http://opentagsupport.qubitproducts.com/help/kb/technical/implementing-intelligent-tag-based-filtering) to trigger the firing of the Snowplow event tracking tags.

Note: in order to use the above method, you need to include the `opentag-event-extension.js.` This is covered below.

Once you have integrated the `Universal Variable` on your website, you can use OpenTag to test that data is successfully being passed into it. Instructions on doing so can be found [here] (http://opentagsupport.qubitproducts.com/help/kb/technical/testing-universal-variables).

[Back to top] (#top)

<a name="container" />
### 1.3 Create a container tag in OpenTag, and integrate it into your website

We need to create a container tag: this will be placed on every page on your website. This is what calls OpenTag, which then ensures that all the relevant tags that you want to fire from each web page are, indeed, fired.

Log into OpenTag, and click the **+ CREATE A CONTAINER** button.

[[/setup-guide/images/opentag/2.png]]

Give your container a name and then save it. (We're going to call ours `test`.)

Now we need to grab the embed code: this is what we'll insert on every page on our website. Click on the **`</> EMBED`** link on the container:

[[/setup-guide/images/opentag/3.png]]

The code appears in a popup. You can copy it to your clipboard directly.

[[/setup-guide/images/opentag/4.png]]

You need to implement this tag on every page of your website, *with* the `opentag-event-extension.js` file. This file is [hosted] (Hosted-assets) on [[https://s3-eu-west-1.amazonaws.com/snowplow-hosted-assets/1-trackers/javascript-tracker/tag-management/opentag/opentag-event-extension.js]].

As a result, the code you insert onto every page (the container tag and include for the above Javascript file) will look something this:

```html
<script src='//d1fc8wv8zag5ca.cloudfront.net/opentag/opentag-event-extension.js'></script>
<script src='//d3c3cq33003psk.cloudfront.net/opentag-67699-450363.js' async defer></script> 
```

[Back to top] (#top)

<a name="snowplow-setup" />
## 2. Integrating Snowplow Javascript tracking tags with OpenTag

Once you've got OpenTag implemented on your website, you're in position to setup the Snowplow tracking tags in OpenTag.

1. [Integrating Snowplow page tracking tags] (#page-tracking)
2. [Integrating Snowplow event tracking tags] (#event-tracking)
3. [Integrating Snowplow ecommerce tracking tags] (#ecomm-tracking)
4. [Integrating other Snowplow tracking tags](#other-tracking-tags)
5. [Committing changes in OpenTag] (#publish)

<a name="page-tracking" />
### 2.1 Integrating Snowplow page tracking tags in OpenTag

The most straight forward Snowplow tags to implement in OpenTag are the page tracking tags.

Go into OpenTag, select your container and click the **`+ ADD NEW SCRIPT`** button. (OpenTag refer to tags in the UI, confusingly, as 'scripts'.):

[[/setup-guide/images/opentag/5.png]]

A new window opens which gives you the opportunity to name the script, and select the type of script.

[[/setup-guide/images/opentag/6.png]]

Give the script a suitable name e.g. 'Snowplow PageTracker' and select the checkbox by 'Custom Script':

[[/setup-guide/images/opentag/7.png]]

Now we need to enter the Snowplow page tracking code:

```html
<!-- Snowplow starts plowing -->
<script type="text/javascript">
var _snaq = _snaq || [];

_snaq.push(['setCollectorCf', '{{CLOUDFRONT-DOMAIN}}']);
_snaq.push(['setAppId', '{{SITE-ID}}']);
_snaq.push(['setCookieDomain', '{{COOKIE-DOMAIN}}'])
_snaq.push(['trackPageView']);

(function() {
var sp = document.createElement('script'); sp.type = 'text/javascript'; sp.async = true; sp.defer = true;
sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://d1fc8wv8zag5ca.cloudfront.net/0.11.2/sp.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sp, s);
})();
 </script>
<!-- Snowplow stops plowing -->
```

#### Setting the {{CLOUDFRONT-DOMAIN}} value

You must update `{{CLOUDFRONT-DOMAIN}}` with the Cloudfront subdomain details you created as part of the [collector setup] (setting up the cloudfront collector). (If you are using a version of Snowplow hosted by the Snowplow team, we will provide you with an Cloudfront domain to enter.) It will look something like `d3rkrsqld9gmqf`. 

If your CloudFront distribution's URL is `http://d1x5tduoxffdr7.cloudfront.net`, then update the appropriate line in your header script to look like this:

	_snaq.push(['setCollectorCf', 'd1x5tduoxffdr7']);

If you are not using the Cloudfront collector (e.g. you are using the Clojure collector), you will need to use the `setCollectorUrl` method instead. Full instructions on doing so can be found in the [technical documentation for the Javascript tracker](Javascript-Tracker).

#### Setting the {{SITE-ID}} and {{COOKIE-DOMAIN}} values

You can optionally use the `setAppId` method to set an application ID for the page that is being tracked: this is useful if you are using Snowplow to track user behaviour across two or more applications, and wish to distinguish them easily in your data. For full instructions on doing so, please refer to the [Javascript tracker technical documentation](Javascript-Tracker).

In addition, you can optionally use the `setCookieDomain` method to change your cookie domain from e.g. 'www.mysite.com' to '.mysite.com'. This is important if you are tracking user behaviour across multiple subdomains e.g. 'mysite.com', 'www.mysite.com', 'application.mysite.com', 'blog.mysite.com' etc. Full instructions on how to use this method can be found in the [technical documentation for the Javascript tracker](Javascript-Tracker).

#### Updating the reference to `sp.js`

The reference to `://d1fc8wv8zag5ca.cloudfront.net/0.9.1/sp.js` loads `sp.js`, the Snowplow Javascript tracker. The version loaded is the version [hosted by the Snowplow team from our own Cloudfront subdomain](https://github.com/snowplow/snowplow/wiki/hosted-assets).

If you are hosting your own Snowplow Javascript file (see the guide to [self-hosting snowplow.js](self hosting snowplow js)), then you need to update the tag above, swapping your own Cloudfront `{{SUBDOMAIN}}` (the one from which you serve `sp.js`) in for ours:

	sp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://{{SUBDOMAIN}}.cloudfront.net/sp.js';

When you've entered the page tracking code, your page will look as follows:

[[/setup-guide/images/opentag/8.png]]

We don't need to change any of the default options: it makes sense, for example, to load the Snowplow page tracking tag at the beginning of the `<head>` section of the web page. (Because it's an async tag, it wont slow down page loads.)

Now click **SAVE SCRIPT**. The changes are ready to be [committed](#publish).

[Back to top] (#top)

<a name="event-tracking" />
### 2.2 Integrating Snowplow event tracking tags in OpenTag

#### 2.2.1 Setting up the event tracking tag to fire at the right time

We recommend tracking every single event that might occur on a user's journey, including all AJAX events between page loads. The Snowplow event tracking tags were built to do this.

Log into OpenTag, open up your container and click **+ADD NEW SCRIPT**. Give your script a sensible name like 'Snowplow EventTracker' and select the checkbox next to **Custom Script**.

[[/setup-guide/images/opentag/9.png]]

We want the `EventTracker` to fire every time the `uvHelpers.trackStructEvent` method is called. The method triggers an `OpenTagEvent` to occur on the DOM: we need to tell OpenTag to trigger the Snowplow EventTracker tag when that event occurs.

To do this, we need to cinfigure what OpenTag calls a `custom starter`. Click on the **+ Advanced Features** link at the bottom of the screen, and then click the **Filter** tab:

[[/setup-guide/images/opentag/10.png]]

This section lets us create a set of rules (which OpenTag calls filters) which determine when the tag fires. Click the **CREATE NEW FILTER** button:

[[/setup-guide/images/opentag/11.png]]

Give the filter a sensible name. Change the option **Filter Based On** from `URL` to `Sesssion Variables`:

[[/setup-guide/images/opentag/12.png]]

Click on the **CUSTOMISE** button. We now have the opportunity to enter our `Custom Starter`. Paste the following text into the `Custom Starter` box. (Leave the `Custom Script` unchanged):

```javascript
function (session, cb) {window.addEventListener('OpenTagEvent', cb)}
```

This tells OpenTag to add a listener to the `OpenTagEvent`, and to fire the call back (`cb`) function when an event occurs. That call back function will be the Snowplow event tracking tag, which we will set now.

Your screen should look like this:

[[/setup-guide/images/opentag/13.png]]

Click the **SAVE FILTER** button. Your new filter should be visible in the list of filters. We can remove the default filter:

[[/setup-guide/images/opentag/14.png]]

#### 2.2.2 Defining the event tracking tag (script) itself. (I.e. what code will fire)

Now we need to enter our script in the `Inline HTML` box. Copy the following code to that box:

```html
<script type="text/javascript">
var i = window.universal_variable.events.length
while (i--) {
  e = window.universal_variable.events[i];
  if (e.type == 'struct') {
    _snaq.push(['trackStructEvent', e.category, e.action, e.label, e.property, e.value]); 
    window.universal_variable.events.splice(i, 1);
  }
}
</script>
```

The above code is  straightforward: it examines the `Events` object in the `Universal Variable` and takes its length. It then cycles through each `Event` in the `Events` object: if the type of event is `struct`, it calls the Snowplow event tracker (using `_snaq.push('trackStructEvent'...)`), passing in the relevant values stored in the `Universal Variable` into Snowplow. Afterwards it removes the reported event from the list: this prevents an event that occured once being reported twice. (If e.g. a number of AJAX events occur on a page in quick succession.)

[[/setup-guide/images/opentag/15.png]]

#### 2.2.3 Ensuring that the event tracking tag only fires _after_ the page tracking tag has fired

The last step in the event tracking setup is optional but recommended: we should tell OpenTag to only fire event tracking tags _after_ the Snowplow PageTracker tag has fired on a page: the reason is that it is this file that loads `sp.js`, which contains the `trackStructEvent` function that is called in the tag.

Declaring the depedency in OpenTag is easy: in the toolbar under **Advanced Features** click on the **Dependencies** Tab. A list of available scripts will be shown on the left: select the Snowplow PageTracker as shown below, and then save the save the changes.

[[/setup-guide/images/opentag/16.png]]

Now click **SAVE SCRIPT**. The changes are ready to be [committed](#publish)

[Back to top] (#top)

<a name="ecomm-tracking" />
### 2.3 Integrating Snowplow ecommerce tracking tags

#### 2.3.1 Creating the ecommerce tracking tag in OpenTag

Go into OpenTag, select your container and click the **`+ ADD NEW SCRIPT`** button. 

[[/setup-guide/images/opentag/5.png]]

A new window opens which gives you the opportunity to name the script, and select the type of script.

[[/setup-guide/images/opentag/6.png]]

Give the script a suitable name e.g. 'Snowplow EcommTracker' and select the checkbox by 'Custom Script'. Now we need to enter the Snowplow ecommerce tracking code into the `Inline HTML` text box:

```html
<script type="text/javascript">
alert('Transaction object present!');

var t=window.universal_variable.transaction;

// First fire the 'addTrans' event for the new transaction
_snaq.push(['addTrans',
	t.order_id || '',		// transactionId
	'',					// transactionAffiliation
	quote(t.total), 		// transactionTotal
	quote(t.tax), 			// transactionTax
	quote(t.shipping_cost), 	// transactionShipping
	t.delivery.city || '', 		// city
	t.delivery.state || '', 	// state
	t.delivery.country || ''	//country
]);

// Second fire the 'addItem' event for each item included in the transaction
for(i=0; i < t.line_items.length; i++){
	_snaq.push(['addItem',
		t.order_id || '', 					// transaction Id
		t.line_items[i].product.id || '', 		// product sku
		t.line_items[i].product.name || '' ,		// product name
		t.line_items[i].product.category || '', 	// product category
		quote(t.line_items[i].product.unit_sale_price), // product price
		quote(t.line_items[i].quantity) 		// product quantity
	]);
}

// Finally fire the 'trackTrans' event to commit the transaction
_snaq.push(['trackTrans']);
</script>
```

Copy the above code into the **Inline HTML** box.

The code works as follows: it takes the contents of the `Transaction` object declared on the `Universal Variable`. First it uses the `_snaq.push(['addTrans',...])` function, to log transaction level details. (E.g. `order_id`, billing address, delivery address, total, postage etc.) It then looks at the `line_items` that make up the transaction, and calls the `_snaq.push(['addItem'...])` function for every product in the transaction, storing relevant product related data (e.g. `sku`, `product_name`, `unit_price`, `quantity`). Finally it calls the `snaq.push([trackTrans]);` method, which triggers the actual tags to fire to Snowplow, passing the data stored into Snowplow proper.

#### 2.3.2 Triggering the code to fire on the order confirmation page

In most cases, you would want the ecommerce tracking to fire on the order confirmation page of your website, once you know that a transaction has been successfully processed. 

If this is the case, we need to tell OpenTag only to fire the EcommTracker on the order confirmation URL. To do so, click on the **Filter** tab under the **Advanced Features** section. You should see the default OpenTag filter present:

[[/setup-guide/images/opentag/17.png]]

Let's edit this filter so we **only** fire the tag on the designated URL. Select to edit the filter by hovering over it, and selecting the **EDIT** button:

[[/setup-guide/images/opentag/18.png]]

Give the filter an appropriate name e.g. "Order confirmation page" and set the options so that the filter correctly matches with the URL on your confirmation page e.g.:

[[/setup-guide/images/opentag/19.png]]

Save the filter.

#### 2.3.3 Ensuring that the EcommTracker fires _after_ the PageTracker

We need to ensure that the `EcommTracker` tag fires _after_ the `PageTracker` tag. That is because it is the `PageTracker` tag that loads the `sp.js` file, with the functions that are called by the `EcommTracker` tag. To do this, we create a dependency.

Declaring the depedency in OpenTag is easy: in the toolbar under **Advanced Features** click on the **Dependencies** Tab. A list of available scripts will be shown on the left: select the Snowplow PageTracker as shown below, and then save the save the changes.

[[/setup-guide/images/opentag/16.png]]

Now click **SAVE SCRIPT**. The changes are ready to be [committed](#publish).

[Back to top] (#top)

<a name="other-tracking-tags" />
### 2.4 Integrating other Snowplow tracking tags

As well as the page view, structured events and ecommerce event tracking tags, Snowplow has specific functionality to enable the capture of other event data including:

1. [Campaign tracking](2-Specific-event-tracking-with-the-Javascript-tracker#wiki-campaign). Use this to identify whether visitors to your website have come from paid ad sources including Adwords, other PPC, display campaigns etc.
2. [Page pings] (2-Specific-event-tracking-with-the-Javascript-tracker#wiki-pagepings). Use this to track how long visitors dwell on each page on your site, and how they scroll of pages over time.

Detailed documentation on how to capture the complete range of events possible with Snowplow can be found in the [[Javascript Tracker]] section of the [Technical Documentation] (snowplow-technical-documentation).

[Back to top] (#top)

<a name="publish" />
### 2.5 Publishing your changes in OpenTag

Once you have saved your changes to OpenTag, OpenTag warns that you have pending changes, and gives you the opportunity to **COMMIT** them:

[[/setup-guide/images/opentag/17.png]]

Click on the **COMMIT** button to push the changes live.

[[/setup-guide/images/opentag/20.png]]

OpenTag asks you to confirm you want to push the changes live. Type "COMMIT" in the box and click the button to do so. It will then take a few minutes (round about 15) for the changes to go live - whilst they're being published, you'll see an alert in the OpenTag UI:

[[/setup-guide/images/opentag/22.png]]

Once the message disappears your tags should be live! 

[Back to top] (#top)

<a name="next-steps" />
## 3. Next steps

Now you have setup the Javascript tracking tags, you are in a position to [test that they fire](testing the javascript tracker is firing).

[Back to top] (#top)

[Return to setup guide](Setting-up-Snowplow).