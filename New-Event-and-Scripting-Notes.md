## Script Context and the "event" Object
Previously, the event object only contained the contents of the original event's data element. That made it necessary to test if event.record or event.records etc.

This new event structure normalized the data into a consistent format allowing scripts to consume the information as efficiently as possible.

Now the event object has a dedicated record array (read-write) that contains the payload from the request that triggered the event. In addition, I've added the following new features and information (read-only):

Object	Property	Description
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
```
/**
 *  array(
 *      //  This contains information about the event itself (READ-ONLY)
 *      'event' => array(
 *          'id'                => 'A unique ID assigned to this event',
 *          'name'              => 'event.name',
 *          'trigger'           => '{api_name}/{resource}',
 *          'stop_propagation'  => [true|false],
 *          'dispatcher'        => array(
 *              'id'            => 'A unique ID assigned to the dispatcher of this event',
 *          ),
 *          //  Information about the triggering request
 *          'request'           => array(
 *              'timestamp'     => 'timestamp of the initial request',
 *              'api_name'      =>'The api_name of the called service',
 *              'resource'      => 'The name of the resource requested',
 *              'path'          => '/full/path/that/triggered/event',
 *          ),
 *      ),
 *      //  This contains the static configuration of the entire platform (READ-ONLY)
 *      'platform' => array(
 *          'api'               => [wormhole to inline-REST API],
 *          'config'            => [standard DSP configuration update],
 *      ),
 *      //  This contains any additional information the event sender wanted to convey (READ-ONLY)
 *      'details' => array(),
 *      //  THE MEAT! This contains the ACTUAL data received from the client, or what's being sent back to the client (READ-WRITE).
 *      'record' => array(
 *          //  See recap above for formats
 *      ),
 *  );
 *
 * Please note that the format of the "record" differs slightly on multi-row result sets. In the v1.0 REST API, if a single row of data
 * is to be returned from a request, it is merged into the root of the resultant array. If there are multiple rows, they are placed into
 * n key called 'record'. To make matter worse, if you make a multi-row request via XML, and wrap your input "record" in a
 * <records><record></record>...</records> type wrapper, the resultant array will be placed a level deeper ($payload['records']['record'] = $results).
 *
 * Therefore the data exposed by the event system has been "normalized" to provide a reliable and consistent manner in which to process said data.
 * There should be no need for wasting time trying to determine if your data is "maybe here, or maybe there, or maybe over there even" when received by
 * your event handlers. If your payload contains record data, you will always receive it in an array container. Even for single rows.
 *
 * IMPORTANT: Don't expect this for ALL results. For non-record-like resultant data and/or result sets (i.e. NoSQL, other stuff), the data
 * may be placed in the payload verbatim.
 *
 * IMPORTANTER: The representation of the data will be placed back into the original location/position in the $record from which it was "normalized".
 * This means that any client-side handlers will have to deal with the bogus determinations. Just be aware.
 *
 * To recap, below is a side-by-side comparison of record data as shown returned to the caller, and sent to an event handler.
 *
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
 * @param string          $eventName        The event name
 * @param PlatformEvent   $event            The event
 * @param EventDispatcher $dispatcher       The dispatcher of the event
 * @param array           $extra            Any additional data to put into the event structure
 * @param bool            $includeDspConfig If true, the current DSP config is added to container
 * @param bool            $returnJson       If true, the event will be returned as a JSON string, otherwise an array.
 *
 * @return array|string
 */
```