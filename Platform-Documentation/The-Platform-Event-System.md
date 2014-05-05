Once a DSP (the **server**) is up and running, it throws a variety of events. These events can be listened for, and acted upon; on the server or the client; in real-time or via HTTP POST. We tried to make it as flexible and light-weight as possible.

> We leveraged the [Symfony EventDispatcher](http://symfony.com/doc/current/components/event_dispatcher/introduction.html) component for our event system. Not only is this a tried and true event dispatching component, it is used by many projects in the ecosystem. This makes the server less coupled and integration with other packages easier.

The server also supplies an [[event service|system-event-service]] which provides complete event/listener management via REST. The [[event service|system-event-service]] also works in tandem with the [[script service|system-script-service]] service to run any [[server-side scripts|server-side-scripting]] that have been enabled.

That's a lot to absorb so we'll break it down for you.

## Important Note

Server-side event scripting require the [V8js](https://github.com/v8/v8) library from [PECL](http://pecl.php.net/package/v8js), and an older version of the library at that.

This can be challenging as it is considered *beta* code. Complete instructions for getting this installed on your development system are on the [[Installing V8js]] page.

## Event Configuration Options

Event logging can be affected by changing the values in `config/common.config.php`. Available options are below.

| Setting | Values |
|---------|--------|
| `dsp.enable_event_scripts` | If **false**, event scripts will **not** be run. |
| `dsp.enable_rest_events` | If **false**, REST events will **not** be generated. |
| `dsp.enable_platform_events` | If **false**, Platform events will **not** be generated. |
| `dsp.log_events` | If **true**, only after an event has been *dispatched*, is it written to the DSP log. |
| `dsp.log_all_events` | If **true**, when an event is triggered, it is written to the DSP log. This trumps the ```dsp.log_events``` setting. |

Logging events should be disabled in production unless you're troubleshooting something. Below is a sampling of the all events logged.

```
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "config.get.pre_process" triggered by /system/config [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "config.read" triggered by /system/config [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "config.get.post_process" triggered by /system/config [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "config.get.after_data_format" triggered by /system/config [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "session.get.pre_process" triggered by /user/session [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "session.read" triggered by /user/session [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "session.get.post_process" triggered by /user/session [] []
[2014-03-14 11:17:32] app.DEBUG: Triggered: event "session.get.after_data_format" triggered by /user/session [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "service.get.pre_process" triggered by /system/service/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "services.list" triggered by /system/service/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "service.get.post_process" triggered by /system/service/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "service.get.after_data_format" triggered by /system/service/ [] []
```

## Listener Priority

While you are able to prioritize listeners when registering with the dispatcher, scripts do not have priorities. In fact, event scripts run **before** any listeners are called.

### Scripts and Propagation

Event scripts can halt propagation like a listener as well. Setting the "event.stop_propagation" property to **true** will halt propagation of the event immediately upon return from the script.

## Event Types

There are three categories of events:

  * REST Events
  * Platform Events
  * User-defined Events

The entire event model is generated dynamically at run time. It is defined in the [[Swagger|https://github.com/wordnik/swagger-ui]] documentation for our Live API. Since the [[Swagger|https://github.com/wordnik/swagger-ui]] documentation describes our API in such fine detail, and nearly all REST operations generate an event; this seemed like a logical and efficient place to describe our event model. This allows your apps/services/plugins to generate events simply by supplying the proper Swagger file. More to come on this.

All event types contain the following data fields.

| Field | Type | Description |
|-------|------|-------------|
| data | array/hash | Optional data sent by the source. For REST events, this contains the request/response body |
| event_name | string | The name of the event that was triggered |
| dispatcher_id | string | The ID of the event dispatcher instance that triggered this event |
| trigger | string | The request URI that triggered this event |

> This is **beta documentation**. More (or less) events may be available in the future. For instance, we may do away with `after_data_format` before release. Be aware.

### REST Events

REST events are dynamically generated automatically by inbound REST calls to the server. The format of these event names is `service.method.event` where `service` is the API name of the service called; `method` is the HTTP method to said service; and event is either `pre_process`, `post_process`, and `after_data_format`. It closely maps to the requested URI.

Some examples are:

  * user.get.pre_process
  * config.post.after_data_format
  * service.get.post_process

You saw some others in the log sample above. They're pretty straightforward and you shouldn't have any problems figuring out what they represent.

REST events may also carry data from the source of the event. Data from events can be obtained via the event object passed to your listener. The method of retrieval varies depending on the type of listener you have created. But more on this when we talk about listeners.

### REST Event Data

REST events contain two extra data fields:

| Field | Type | Description |
|-------|------|-------------|
| api_name | string | The name of the service/API that was called |
| resource | string | The resource type requested |

### Platform Events

Platform events are a boiled down version of REST events and are mapped to specific server operations. These operations are defined in the [[Swagger|https://github.com/wordnik/swagger-ui]] documentation for each service.

Platform events are more general to application-level operations. If you're writing a client-side application, *these are the events you're looking for*.

Platform events are more free-form than REST events but adhere to the following constraints:

  * Always begin with the **API name** that was called
  * Multiple levels allowed, but only logically sub-sections (i.e. db.table.row.read)
  * Always end with a standard descriptive term/action/verb (i.e. **list**, **read**, **write**, **create**, **update**, **delete**, etc.).

#### Platform Event Categories

There are currently eight platform event categories. These map as follows:

| Action | Description |
|--------|-------------|
| `*.list` | GET all resources |
| `*.read` | GET a single resource |
| `*.write` | POST a single resource |
| `*.create` | POST a single resource |
| `*.update` | PUT a single resource |
| `*.delete` | DELETE a single resource |
| `session.login` | A session has been created |
| `session.logout` | A session has been ended |

The asterisk (*) will be the API name or service that triggered the action. Examples are `config.read` for a configuration being read. Or `session.login` for when a user log's into the DSP. `login` and `logout` are triggered only by the `session` service at this time.

To see the currently defined events, read through the [[Swagger|https://github.com/wordnik/swagger-ui]] files available in our repository. Specifically, have a look at the `*.swagger.php` files in [[Services|https://bitbucket.org/dreamfactory/lib-php-common-platform/src/4e0e6dce1e6f234ed7c7d2372c1582fdc5fde701/src/Services/?at=develop]] and [[Resources|https://bitbucket.org/dreamfactory/lib-php-common-platform/src/4e0e6dce1e6f234ed7c7d2372c1582fdc5fde701/src/Resources/?at=develop]].

### User-Defined Events

You, the server-side developer, can create and respond to your own events. We are working on a client-side solution as well. But server-side is good to go.

## Listening For Events

In order to find out if an event has occurred, you must deploy an event *listener*. Listeners generally live within the server code itself. Listeners can be used by your plugins to act on platform events.

To register a listener for an event, you must use one of the following methods:
  * Use the `on()` method of the DSP's main application instance:

```php
	Pii::app()->on(
		'session.logout',
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

  * Use the `/rest/system/script` endpoint, *PUT*ing an URL to a client-side listener which will be called via HTTP POST
  * Use the `/rest/system/script` endpoint, *PUT*ing Javascript code to be run when the event is triggered. This is run on the server-side.
  * Create an event subscriber class

#### Event Subscribers

Event subscriber classes are PHP classes which listen for, and are called when events are triggered. They can be stand-alone classes which do nothing but handle events or it may be part of a custom service you've created. As long as your class implements the `EventSubscriberInterface` it can subscribe to events.

##### PHP Subscriber Example

Below is a sample class that subscribes to the `session` service events. When these events are triggered, via user login and logout, the two methods `onSessionLogin` and `onSessionLogout` are called respectively.

In the constructor, you'll see that we retrieve the event dispatcher instance from the currently running application and add ourselves as a subscriber.

Far more detailed documentation about event subscribers is available in the [[Symfony|http://symfony.com/doc/current/components/event_dispatcher/introduction.html#using-event-subscribers]] documentation.

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
        Pii::app()->getDispatcher()->addSubscriber( $this );
    }

    /**
     * Return the list of events to which we wish to subscribe
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            'session.login'  => array( 'onSessionLogin', 0 ),
            'session.logout' => array( 'onSessionLogout', 0 ),
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

You can also place an `autoload.php` file in the `/path/to/root/storage/.private/src` directory. This will be automatically loaded and cached with each session.

### Javascript Handlers

Use the `/rest/system/script` service.

### HTTP Handlers

Use the `/rest/system/event` service.

## Triggering Events

### PHP

```php
	Pii::app()->trigger( 'session.logout' );
	Pii::app()->trigger( 'my.private.event', $_myEventData );
```

### Javascript

POST to the `/rest/system/event` service.

## Unbinding Listeners

### PHP

```php
	Pii::app()->off( 'session.logout', $_callback );
```

### Javascript

Use the `/rest/system/script` service.

### HTTP

Use the `/rest/system/event` service.

Send an HTTP **DELETE** with the event name and callback URL to delete a registered URL.