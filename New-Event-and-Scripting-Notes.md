## Script Context and Available Data

intro

### The DSP Object

This was previously accessed as **PHP**. It is the PHP context that owns the V8 instance. There is no data in this object other then the event, which is extracted for you.

### The Event Object

In the initial release of server-side scripting (v1.5), the `event` object only contained the contents of the original event's `data` element. That made it necessary to test if `event.record` or `event.records` etc.

The new event structure to be released exposes a normalized view of the data. It is now in a consistent format allowing scripts to consume the information more efficiently and without confusion. This also allows for far more code reuse between scripts.

The new `event` object has a dedicated `record` array (read-write) that contains the payload from the request that triggered the event. Below is a table of the `event` object properties and descriptions.

| Property | Description | Type |
|:--------:|:-----------:|:----:|
|<code>id</code>||string|
|<code>name</code>||string|
|<code>trigger</code>||string|
|<code>stop_propagation</code>||boolean|
|<code>dispatcher.id</code>||string|
|<code>dispatcher.type</code>||string|
|<code>payload</code>||array|
|<code>request</code>||array|
|<code>request.timestamp</code>||string|
|<code>request.path</code>||string|
|<code>platform.api</code>||callable|
|<code>platform.config</code>||array|
|<code>platform.session</code>||array|

#### Notes

The format of `event.record` differs slightly on multi-row result sets. In the v1.0 REST API, if a single row of data is to be returned from a request, it is merged into the root of the resultant array. If there are multiple rows, they are placed into the the array key `record`. To make matter worse, if you make a multi-row request via XML, and wrap your input `record` in a `<records><record></record>...</records>` type wrapper, the resultant array will be placed a level deeper upon return (`payload['records']['record'] = results`).

Therefore the data exposed by the event system has been "normalized" to provide a reliable and consistent manner in which to process said data. There should be no need for wasting time trying to determine if your data is "maybe here, or maybe there, or maybe over there even" when received by your event handlers. If your payload contains record data, you will always receive it in an array container. Even for single rows.

**IMPORTANT:** Don't expect this for ALL results. For non-record-like resultant data and/or result sets (i.e. NoSQL, other stuff), the data may be placed in the payload verbatim.

**IMPORTANTER:** The representation of the data will be placed back into the original location/position in the `$record` from which it was "normalized". This means that any client-side handlers will have to deal with the bogus determinations. Just be aware.

To recap, below is a side-by-side comparison of record data as shown returned to the caller, and sent to an event handler.

```php
/**
 *  REST API v1.0                           Event Representation
 *  -------------                           --------------------
 *  Single row...                           Add a 'record' key and make it look like a multi-row
 *
 *      array(                              array(
 *          'id' => 1,                          'record' => array(
 *      )                                           0 => array( 'id' => 1, ),
 *                                              ),
 *                                          ),
 *
 * Multi-row...                             Stays the same...
 *
 *      array(                              array(
 *          'record' => array(                  'record' =>  array(
 *              0 => array( 'id' => 1 ),            0 => array( 'id' => 1 ),
 *              1 => array( 'id' => 2 ),            1 => array( 'id' => 2 ),
 *              2 => array( 'id' => 3 ),            2 => array( 'id' => 3 ),
 *          ),                                  ),
 *      )                                   )
 *
 * XML multi-row                            The 'records' key is unwrapped, like regular multi-row
 *
 *  array(                                  array(
 *    'records' => array(                     'record' =>  array(
 *      'record' => array(                        0 => array( 'id' => 1 ),
 *        0 => array( 'id' => 1 ),                1 => array( 'id' => 2 ),
 *        1 => array( 'id' => 2 ),                2 => array( 'id' => 3 ),
 *        2 => array( 'id' => 3 ),            ),
 *      ),                                  )
 *    ),
 *  )
 *
 */
```