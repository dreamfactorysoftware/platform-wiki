<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](SnowPlow setup guide) > [**Trackers**](choosing-a-tracker) > [**Javascript tracker**](Javascript-tracker-setup)

This setup guide is divided into two sections:

1. [Setting up QuBit OpenTag](#setup-opentag)
2. [Integrating SnowPlow Javascript tracking tags with OpenTag](#snowplow-setup)

<a name="setup-opentag" />
## 1. Setting up QuBit OpenTag

The following steps are required to setup OpenTag on your website:

1. [Create an OpenTag account](#create-account)
2. [Expose the data required by OpenTag and SnowPlow to OpenTag via the OpenTag Universal Variable](#expose-data)
3. [Integrate the container tag on your website](#container)

The steps are reasonably straight forward, especially for anyone familiar with tag management or Open Tag in particular. The only step with some elements that deviate from common setup instructions (e.g. provided by OpenTag) is exposing event data to OpenTag to drive SnowPlow custom event tracking. This is covered in step 2.

<a name="create-account" />
### 1.1 Create an OpenTag account

You can create an OpenTag account for free by signing up on the [QuBit website] (https://opentag.qubitproducts.com/QDashboard/register.html)

[[/setup-guide/images/opentag/1.png]]

[Back to top] (#top)

### 1.2 Expose the data required by OpenTag and SnowPlow to OpenTag via the OpenTag Universal Variable

OpenTag manages the firing of all the different tags on your site: that includes web analytics tags like SnowPlow and Google Analytics, as well as other sorts of tags e.g. tags from affiliate networks, audience management platforms etc.) In order to pass the relevant data to these services in their tags, you need to pass that data from your website into OpenTag in the first place.

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

For SnowPlow, the detailed object model provided by OpenTag is great, because it means there's a rich set of data that can be passed into SnowPlow so that users can analyse e.g. conversion rates by product, or assess the effectiveness of different recommendation algorithms with different customer segments, to take just two examples.

However, implementing the `Universal Variable` as documented often is not enough for SnowPlow users. That is because we are not just intested in the contents of web pages when they are loaded, we are typically also interested in capturing events that occur on a web page between page loads (i.e. AJAX events), generally using [event tracking tags](#event-tracking). Examples of types of events we might track in this way are:

* Playing rich media (e.g. videos) 
* Zoom in on product images
* User logins
* Add-to-baskets

When these events occur, we need to update the `Universal Variable` so that these events are recorded as they happen, and the relevant data associated with each event, that we want to pass to SnowPlow, is attached to the event. In order to accommodate this, we have extended the `Universal Variable` [event](https://github.com/QubitProducts/UniversalVariable#event) object to include a number of new fields:

| ** Property** | **JSON key** | **Type** | **Description**                                         |
|:--------------|:-------------|:---------|:--------------------------------------------------------|
| Event type    | type         | String   | This should be set to `struct` to indicate that the event is a structured event. (We are in the process of building out SnowPlow to accommodate unstructured event types) |
| Event category| category     | String   | A category e.g. 'video' or 'ecomm', that groups actions together by theme |
| Event action  | action       | String   | The actual action performed by the user e.g. `add-to-basket` or `play-video` |
| Event label   | label        | String   | An optional string describing the object or action performed on it. This might be the quantity of an item added to basket, or the id of the video just played |
| Event property | property    | String   | An optional string describing the object or the action performed on it. This might be the quantity of the item added to basket, or the resolution of the video just played |
| Event value   | value        | Number   | A value associated with the action. This might be the value of item added-to-basket, for example |

When an AJAX event occurs, then, we need to update the `Universal Variable` to insert a new event with the relevant fields attached. We've developed a handy API to make this easy. (Our approach is modelled on that taken by Google Tag Manager with their `dataLayer` equivalent of the OpenTag `Unviersal Variable`.)

```javascript
window.universal_variable.pushEvent({
	'type': 'struct',
	'category': 'video',
	'action': 'play',
	'label': 'skateboarding-dog-00123'
	'property': 'hd'
	'value': 0.0
})

[Back to top] (#top)

<a name="container" />
### 1.3 Integrate the container tag on your website 

Text here

[Back to top] (#top)

<a name="snowplow-setup" />
## 2. Integrating SnowPlow Javascript tracking tags with OpenTag

1. [Integrating SnowPlow page tracking tags] (#page-tracking)
2. [Integrating SnowPlow event tracking tags] (#event-tracking)
3. [Integrating SnowPlow ecommerce tracking tags] (#ecomm-tracking)
4. [Publishing changes in Open Tag] (#publish)

<a name="page-tracking" />
### 2.1 Integrating SnowPlow page tracking tags in OpenTag

Text here

[Back to top] (#top)

<a name="event-tracking" />
### 2.2 Integrating SnowPlow event tracking tags in OpenTag

Text here

[Back to top] (#top)

<a name="ecomm-tracking" />
### 2.3 Integrating SnowPlow ecommerce tracking tags

Text here

[Back to top] (#top)

<a name="publish" />
### 2.4 Publishing your changes in OpenTag

Text here

[Back to top] (#top)