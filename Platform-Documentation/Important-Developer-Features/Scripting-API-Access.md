The DSP's REST API is exposed to scripts via the `platform.api` object. This object contains a method for each type of REST verb:

| Function | Description |
|----------|-------------|
| `platform.api.get` | GET a resource |
| `platform.api.post` | POST a resource |
| `platform.api.put` | PUT a resource |
| `platform.api.delete` | DELETE a resource |
| `platform.api.patch` | PATCH a resource |
| `platform.api.merge` | MERGE a resource |

They all accept the same arguments:

```
	platform.api.get( "service[/resource[/resource_id]]"[, payload] );
```

 * `service` is always required.
 * `resource` and `resource_id` are optional and depend on your call.
 * `payload` is optional, but must contain a valid object for the language of the script. 

You may also pass absolute URLs to these methods to retrieve external resources:

```
	var _page = platform.api.get( "http://www.google.com" );
```

or

```
	var _result = platform.api.get( "https://www.example.com/api/something_cool", {"cool":"very"} );
```


Calling internally however only requires the relative URL sans the `/rest/` portion:

```
	//	Retrieve all contacts from the Contacts database
	var _records = platform.api.get( "db/Contacts" );

	//	Uppercase each name...
	_.each( _records, function( record ) {
		record.name = record.name.toUpperCase();
	});
```

Data returned from external and internal calls will return the results as they are received. No additional processing is provided for this data.

Of course, any changes to the `event.record` or `event.payload` elements will be reflected back to the original client call. 