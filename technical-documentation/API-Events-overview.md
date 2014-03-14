# Events

Once a DSP (the **server**) is up and running, it throws a variety of events. These events can be listened for, and acted upon; on the server or the client; in real-time or via HTTP POST. We tried to make it as flexible and light-weight as possible. 

> We leveraged the [Symfony EventDispatcher](http://symfony.com/doc/current/components/event_dispatcher/introduction.html) component for our event system. Not only is this a tried and true event dispatching component, it is used by many projects in the ecosystem. This makes the server less coupled and integration with other packages easier.
 
The server also supplies an [[event service|system-event-service]] which provides complete event/listener management via REST. The [[event service|system-event-service]] also works in tandem with the [[script service|system-script-service]] service to run any [[server-side scripts|server-side-scripting]] that have been enabled.

That's a lot to absorb so we'll break it down for you.

## Event Configuration Options

Event logging can be affected by changing the values in `config/common.config.php`. Available options are below. 

| Setting | Values |
|---------|--------|
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
  * Always end with a standard event action: **list**, **read**, **write**, **create**, **update**, or **delete**.

#### Standard Event Actions

There are currently six standard event actions. These map as follows:

| Action | Description |
|--------|-------------|
| *.list | GET all resources |
| *.read | GET a single resource |
| *.write | POST a single resource |
| *.create | POST a single resource |
| *.update | PUT a single resource |
| *.delete | DELETE a single resource |

To see the currently defined events, read through the [[Swagger|https://github.com/wordnik/swagger-ui]] for the [[DSP services|https://bitbucket.org/dreamfactory/lib-php-common-platform/src/4e0e6dce1e6f234ed7c7d2372c1582fdc5fde701/src/Services/?at=develop]]. Have a look at the `*.swagger.php` files.

### User-Defined Events

You, the server-side developer, can create and respond to your own events. We are working on a client-side solution as well. But server-side is good to go.  

## Throwing Events

### PHP

### Javascript

## Listening For Events

### PHP/DSP Plugin

### PHP/External Application

### Javascript

### HTTP
