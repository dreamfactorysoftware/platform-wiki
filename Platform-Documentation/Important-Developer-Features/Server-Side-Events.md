Throughout the lifecycle of a single DSP request, the core fires notification events at key points within that request. These notifications can be consumed by client applications, [[server-side scripts|server-side-scripting]], or remote URLs (ala [WebHooks](http://en.wikipedia.org/wiki/Webhook)).

> We leveraged the [Symfony EventDispatcher](http://symfony.com/doc/current/components/event_dispatcher/introduction.html) component for our event system. Not only is this a tried and true event dispatching component, it is used by many projects in the ecosystem. This makes the server less coupled and integration with other packages easier.

The server also supplies an [[event service|system-event-service]] providing complete event/listener management via REST. The [[event service|system-event-service]] also works in tandem with the [[script service|system-script-service]] service to run any [[server-side scripts|server-side-scripting]] that have been enabled.

We'll walk through some basics and code examples to help you start leveraging events in your apps.

## Important Note

Server-side event scripting require the [V8js](https://github.com/v8/v8) library from [PECL](http://pecl.php.net/package/v8js), and an older version of the library at that.

This can be challenging as it is considered *beta* code. Complete instructions for getting this installed on your development system are on the [[Installing V8js]] page. 

## Event Configuration Options

Event logging can be affected by changing the values in `config/common.config.php`. Available settings are:

| Setting | Values |
|---------|--------|
| `dsp.enable_event_observers` | If **true** (default), event observation is allowed. |
| `dsp.enable_platform_events` | If **true** (default), platform events will be fired. |
| `dsp.enable_rest_events` | If **true** (default), REST events will be fired. |
| `dsp.enable_event_scripts` | If **true** (default), event scripts will be run. |
| `dsp.enable_user_scripts` | If **false** (default), user scripts will **not** be run. |
| `dsp.log_events` | If **true**, only after an event has been *dispatched*, is it logged. |
| `dsp.log_all_events` | If **true**, when an event is triggered, it is written to the DSP log. This trumps the `dsp.log_events` setting. |
| `dsp.log_script_memory_usage` | If **true**, the script engine will report memory usage and other useful debug information. |
        
Logging events should be disabled in production unless you're troubleshooting something. Below is a sampling of the all events logged.

```
 [2014-06-24 10:49:44] app.DEBUG: Triggered: "system.config.get.pre_process" by rest/system/config [] []
 [2014-06-24 10:49:44] app.DEBUG: Triggered: "system.config.read" by rest/system/config [] []
 [2014-06-24 10:49:44] app.DEBUG: Triggered: "system.config.get.post_process" by rest/system/config [] []
 [2014-06-24 10:49:44] app.DEBUG: Triggered: "user.session.get.pre_process" by rest/user/session [] []
 [2014-06-24 10:49:45] app.DEBUG: Triggered: "user.session.read" by rest/user/session [] []
 [2014-06-24 10:49:45] app.DEBUG: Triggered: "user.session.get.post_process" by rest/user/session [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.config.get.pre_process" by rest/system/config [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.config.read" by rest/system/config [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.config.get.post_process" by rest/system/config [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.service.get.pre_process" by rest/system/service [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.services.list" by rest/system/service [] []
 [2014-06-24 10:49:46] app.DEBUG: Triggered: "system.service.get.post_process" by rest/system/service [] []
 [2014-06-24 10:49:50] app.DEBUG: Triggered: "system.app.get.pre_process" by rest/system/app [] []
 [2014-06-24 10:49:50] app.DEBUG: Triggered: "system.apps.list" by rest/system/app [] []
 [2014-06-24 10:49:50] app.DEBUG: Triggered: "system.app.get.post_process" by rest/system/app [] []
 [2014-06-24 10:49:50] app.DEBUG: Triggered: "system.role.get.pre_process" by rest/system/role [] []
 [2014-06-24 10:49:51] app.DEBUG: Triggered: "system.roles.list" by rest/system/role [] []
 [2014-06-24 10:49:51] app.DEBUG: Triggered: "system.role.get.post_process" by rest/system/role [] []
 [2014-06-24 10:49:51] app.DEBUG: Triggered: "system.service.get.pre_process" by rest/system/service [] []
 [2014-06-24 10:49:51] app.DEBUG: Triggered: "system.services.list" by rest/system/service [] []
 [2014-06-24 10:49:51] app.DEBUG: Triggered: "system.service.get.post_process" by rest/system/service [] []
 [2014-06-24 10:49:52] app.DEBUG: Triggered: "system.user.get.pre_process" by rest/system/user [] []
 [2014-06-24 10:49:52] app.DEBUG: Triggered: "system.users.list" by rest/system/user [] []
 [2014-06-24 10:49:52] app.DEBUG: Triggered: "system.user.get.post_process" by rest/system/user [] []
```

## Event Representation

All events are normalized down to a single **container** which is then passed to all the listeners. PHP listeners will receive this as an array. Scripts will receive this as a native object. All others get arrays of data. 

This container properties are defined as follows:

|Property|Type|Description|
|--------|-----------|----|
| `id` | string | A unique event ID |
| `name` |string| The name of the event |
| `timestamp` |string| The time and date of this event |
| `request_path` |string| The inbound HTTP path that triggered this event |
| `trigger` |string| The inbound REST API call that triggered this event |
| `stop_propagation` |boolean| Set this to **true** to halt propagation of the event to downstream listeners |
| `dispatcher_id` | string|The ID of the dispatcher |
| `dispatcher_type` | string|The dispatcher's type |
| `extra` | array|Any extra relevant data sent by the triggerer |
| `request` | object|An object representing the inbound REST API call |
| `response` | object|An object containing the response to an inbound REST API call |
| `platform.api` |object|An object with methods to make in-line REST API calls|
| `platform.config` |array|The configuration of the DSP|
| `platform.session` |array|The session of the current user|

### event.request
In `event.request` you will find all the components of the original HTTP request.

|Property|Type|Description|
|--------|-----------|----|
| `method` | string | The HTTP method of the request (i.e. GET, POST, PUT) |
| `headers` | array | The HTTP headers from the request|
| `cookies` | array | Any cookies sent with the HTTP request|
| `query` | array | An array of query string parameters received with the request|
| `body` | object | The body (POST/PUT body) of the request converted to an object |
| `files` | array | Any file upload information received |

Any changes to this data will overwrite existing data in the response, before further listeners are called and/or the request completes.

### event.response
In `event.response` object contains the data being sent back to the client from the request. This data generally only available/relevant on **post_process** and GET events. Other events may produce a response but you probably won't need to modify it. The layout/format of the response varies by call.
   
Just like `event.request`, any changes to `event.response` will overwrite existing data in the response, before it is sent back to the client. 

### event.platform
This object provides information about the platform configuration, the current session, and access to the REST API via **inline** calls. This make DSP requests directly without requiring an HTTP call. This object is only available in server-side scripts.

| Field | Type | Description |
|-------|------|-------------|
| `platform.api` | object | An object that allows access to the DSP's REST API |
| `platform.config` | object | The current configuration of the DSP |
| `platform.session` | object | The current session information |

More information about `platform.api` is available on the [[Scripting API Access|Scripting-Api-Access]] page.

### Listener Priority

While you are able to prioritize listeners when registering with the dispatcher, scripts do not have priorities. In fact, event scripts run **before** any listeners are called.

#### Scripts and Propagation

Event scripts can halt propagation to future listeners as well. Setting the `event.stop_propagation` property to **true** will halt propagation of the event immediately upon return from the script.

## Event Types
There are three categories of events:

  * REST Events
  * Platform Events
  * User-defined Events

The entire event model is generated dynamically at run time. It is defined in the [Swagger](https://github.com/wordnik/swagger-ui) documentation for our Live API. Since the [Swagger](https://github.com/wordnik/swagger-ui) documentation describes our API in such fine detail, and nearly all REST operations generate an event; this seemed like a logical and efficient place to describe our event model. This allows your apps/services/plugins to generate events simply by supplying the proper Swagger file.

### REST Events

REST events are dynamically generated automatically by inbound REST calls to the server. The format of these event names is `service.method.event` where `service` is the API name of the service called; `method` is the HTTP method to said service; and event is either `pre_process` or `post_process`. It closely maps to the requested URI.

Some examples are:

  * `user.session.get.pre_process`
  * `system.config.post.pre_process`
  * `user.session.read`
  * `db.Contacts.get.post_process`

You saw some others in the log sample above. They're pretty straightforward and you shouldn't have any problems figuring out what they represent.

REST events may also carry data from the source of the event. Data from events can be obtained via the event object passed to your listener. The method of retrieval varies depending on the type of listener you have created. But more on this when we talk about listeners.

### REST Event Data

REST events contain two extra data fields:

| Field | Type | Description |
|-------|------|-------------|
| `api_name` | string | The name of the service/API that was called |
| `resource` | string | The resource type requested |

Depending on the event, more fields may be available. It depends on the service.

### Platform Events

Platform events are a boiled down version of REST events and are mapped to specific service operations. These operations are defined in the [Swagger](https://github.com/wordnik/swagger-ui) documentation for each service.

Platform events are more general to application-level operations. If you're writing a client-side application, *these are the events you're looking for*.

Platform events are more free-form than REST events but adhere to the following constraints:

  * Always begin with the **API name** that was called
  * Multiple levels allowed, but only logically sub-sections (i.e. db.table.row.read)
  * Always end with a standard descriptive term/action/verb (i.e. **list**, **read**, **write**, **create**, **update**, **delete**, etc.).

#### Platform Event Categories

There are currently various platform event categories. These map to CRUD operations for the most part:

| Action | Description |
|--------|-------------|
| `*.list` | GET all resources |
| `*.read` | GET a resource |
| `*.create` | POST a resource |
| `*.update` | PUT a resource |
| `*.delete` | DELETE a resource |

Database calls generate a slightly different set of events. These map to SQL statements:

| Action | Description |
|--------|-------------|
| `*.select` | GET a database resource |
| `*.insert` | POST a database resource |
| `*.update` | PUT a database resource |
| `*.delete` | DELETE a single resource |

The asterisk (*) will be the API name or service that triggered the action. Examples are `system.config.read` for a configuration being read. Or `user.session.delete` for when a user logs out of the DSP. 

To see the currently defined events, read through the [Swagger](https://github.com/wordnik/swagger-ui) files available in our repository. Specifically, have a look at the `*.swagger.php` files in [[Services|https://bitbucket.org/dreamfactory/lib-php-common-platform/src/4e0e6dce1e6f234ed7c7d2372c1582fdc5fde701/src/Services/?at=develop]] and [[Resources|https://bitbucket.org/dreamfactory/lib-php-common-platform/src/4e0e6dce1e6f234ed7c7d2372c1582fdc5fde701/src/Resources/?at=develop]].

#### Bucket Events

In addition, the event system throws what we call **bucket** events. These events are thrown for operations that happen in child paths. An example would be a GET to the local database table called "todo". The request will generate a `db.todo.select` event. However, the event `db.table_selected` will also be generated at the database level. This provides a bit more granularity to the event consumer. 
 
### User-Defined Events

You, the server-side developer, can create and respond to your own events. We are working on a client-side solution as well. But server-side is good to go.

## Listening For Events

In order to find out if an event has occurred, you must deploy an event *listener*. Listeners generally live within the server code itself. Listeners can be used by your plugins to act on platform events.

To register a listener for an event, you must use one of the following methods:
  * Use the `on()` method of the DSP's main application instance:

```php
	Pii::app()->on(
		'user.session.delete',
		function( $event, $eventName, $dispatcher )
		{
			//	Do something very important when a user logs out...
		}
	);

	Pii::app()->on(
		'my.private.event',
		function( $event, $eventName, $dispatcher )
		{
			//	Do something very private...
		}
	);
```

  * Use the `/rest/system/script` endpoint, **PUT**ing an URL to a client-side listener which will be called via HTTP POST
  * Use the `/rest/system/script` endpoint, **PUT**ing Javascript code to be run when the event is triggered. This is run on the server-side.
  * Create an event subscriber class

#### Event Subscribers

Event subscriber classes are PHP classes which listen for, and are called when events are triggered. They can be stand-alone classes which do nothing but handle events or it may be part of a custom service you've created. As long as your class implements the `EventSubscriberInterface` it can subscribe to events.

##### PHP Subscriber Example

Below is a sample class that subscribes to the `session` service events. When these events are triggered, via user login and logout, the two methods `onSessionLogin` and `onSessionLogout` are called respectively.

In the constructor, you'll see that we retrieve the event dispatcher instance from the currently running application and add ourselves as a subscriber.

Far more detailed documentation about event subscribers is available in the [Symfony](http://symfony.com/doc/current/components/event_dispatcher/introduction.html#using-event-subscribers) documentation.

```php
<?php
namespace DreamFactory\Samples\Events;

use Composer\EventDispatcher\EventSubscriberInterface;
use DreamFactory\Platform\Events\EventDispatcher;
use DreamFactory\Platform\Events\RestServiceEvent;
use DreamFactory\Yii\Utility\Pii;

/**
 * SessionEventSubscriber.php
 * An example class that listens for session logouts
 */
class SessionEventSubscriber implements EventSubscriberInterface
{
    /**
     * Constructor
     */
    public function __construct()
    {
        //  Register with the event dispatcher
        Platform::getDispatcher()->addSubscriber( $this );
    }

    /**
     * Return the list of events to which we wish to subscribe
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            'user.session.create'  => array( 'onSessionLogin', 0 ),
            'user.session.delete' => array( 'onSessionLogout', 0 ),
        );
    }

    /**
     * Called on 'session.login'
     *
     * @param RestServiceEvent $event
     * @param string           $eventName
     * @param EventDispatcher  $dispatcher
     */
    public function onSessionLogin( RestServiceEvent $event, $eventName, $dispatcher )
    {
        //  Do something useful
    }

    /**
     * Called on 'session.logout'
     *
     * @param RestServiceEvent $event
     * @param string           $eventName
     * @param EventDispatcher  $dispatcher
     */
    public function onSessionLogout( RestServiceEvent $event, $eventName, $dispatcher )
    {
        //  Do something useful
    }
}
```

### Deploying Your Listener/Subscriber

Because portions of the DSP core update themselves, you should not place any code or change any configuration settings in the core directory structure. Extensions, libraries, etc. should be placed into a directory under `/path/to/root/storage/.private/src`. This area is reserved for customization code and will never be overwritten by the platform.

#### Namespacing Your Code

TBD

#### Autoloading Your Code

You can also place an `autoload.php` file in the `/path/to/root/storage/.private/config` directory. This will be automatically loaded and cached with each session.

### Javascript Handlers

The **Script** tab of the Admin Console provides rudimentary script writing and saving capabilities. Or you can optionally just use the `/rest/system/script` service.

### HTTP Handlers

Use the `/rest/system/event` service.

## Triggering Events

### PHP

```php
	Platform::trigger( 'session.logout' );
	Platform::trigger( 'my.private.event', $_myEventData );
```

### Javascript

POST to the `/rest/system/event` service.

## Unbinding Listeners

### PHP

```php
	Platform::off( 'session.logout', $_callback );
```

### Javascript

Use the `/rest/system/script` service.

### HTTP

Use the `/rest/system/event` service.

Send an HTTP **DELETE** with the event name and callback URL to delete a registered URL.
