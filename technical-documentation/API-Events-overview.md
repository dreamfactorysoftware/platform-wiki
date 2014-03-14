# Events

Once a DSP (the **server**) is up and running, it throws a variety of events. These events can be listened for, and acted upon; on the server or the client; in real-time or via HTTP POST. We tried to make it as flexible and light-weight as possible. 

> We leveraged the [Symfony EventDispatcher](http://symfony.com/doc/current/components/event_dispatcher/introduction.html) component for our event system. Not only is this a tried and true event dispatching component, it is used by many projects in the ecosystem. This makes the server less coupled and integration with other packages easier.
 
The server also supplies an [[event service|system-event-service]] which provides complete event/listener management via REST. The [[event service|system-event-service]] also works in tandem with the [[script service|system-script-service]] service to run any [[server-side scripts|server-side-scripting]] that have been enabled.

That's a lot to absorb so we'll break it down for you.

## Event Configuration Options

Event logging can be affected by changing the values in `config/common.config.php`. Available options are below. 

| Setting | Values |
|---------|--------|
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
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "config.get.pre_process" triggered by /system/config/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "config.read" triggered by /system/config/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "config.get.post_process" triggered by /system/config/ [] []
[2014-03-14 11:17:33] app.DEBUG: Triggered: event "config.get.after_data_format" triggered by /system/config/ [] []
```

## Event Types

There are three categories of events:

  * REST Events
  * Platform Events
  * User-defined Events
  
The entire event model is generated dynamically at run time. It is defined in the [[Swagger|https://github.com/wordnik/swagger-ui]] documentation for our Live API. Since the [[Swagger|https://github.com/wordnik/swagger-ui]] documentation describes our API in such fine detail, and nearly all REST operations generate an event; this seemed like a logical and efficient place to describe our event model. This allows your apps/services/plugins to generate events simply by supplying the proper Swagger file. More to come on this.

### REST Events

REST events are dynamically generated automatically by inbound REST calls to the server. The format of these event names is `service.method.event` where event is either `pre_process`, `post_process`, and `after_data_format`. 

Some examples are:

  * user.get.pre_process
  * db.

  
> This is **beta documentation**. More (or less) events may be available in the future. For instance, we may do away with `after_data_format` before release. Be aware.

### Platform Events

REST events are generated automatically by inbound REST calls to the server. The format of these event names is `service.method.event` where event is either `pre_process`, `post_process`, and `after_data_format`. 

> This is **beta documentation**. More (or less) events may be available in the future. For instance, we may do away with `after_data_format` before release. Be aware.


### User-Defined Events

## Throwing Events

## Listening For Events

### Server-Side

### Client

### External Listeners

## Sending Events