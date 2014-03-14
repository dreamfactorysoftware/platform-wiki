# Events

Once a DSP (the **server**) is up and running, it throws a variety of events. These events can be listened for, and acted upon; on the server or the client; in real-time or via HTTP POST. We tried to make it as flexible and light-weight as possible. 

> We leveraged the [Symfony EventDispatcher](http://symfony.com/doc/current/components/event_dispatcher/introduction.html) component for our event system. Not only is this a tried and true event dispatching component, it is used by many projects in the ecosystem. This makes the server less coupled and integration with other packages easier.
 
The server also supplies an [[event service|system-event-service]] which provides complete event/listener management via REST. The [[event service|system-event-service]] also works in tandem with the [[script service|system-script-service]] service to run any [[server-side scripts|server-side-scripting]] that have been enabled.

That's a lot to absorb so we'll break it down for you.

## Event Configuration Options

When an event is dispatched, it's identified by a unique name (e.g. kernel.response), which any number of listeners might be listening to. An Event instance is also created and passed to all of the listeners. As you'll see later, the Event object itself often contains data about the event being dispatched.

## Event Types

### REST Events

### Platform Events

### User-Defined Events


## Sending Events