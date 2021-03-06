## The `platform` Object
Access to your DSP's API and scripts are exposed to your server-side scripts via the `platform` object. This object contains methods to facilitate the access and is passed to your scripts as a global. 

### The `platform.api` Object
These methods for DSP access are all contained inside the `platform.api` object. This object contains a method for each type of REST verb:

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
	_.each( _records.record, function( record ) {
		record.name = record.name.toUpperCase();
	});
```

Data returned from external and internal calls will return the results as they are received. No additional processing is provided for this data.

Of course, any changes to the `event.record` or `event.payload` elements will be reflected back to the original client call.

### Adding headers or other cURL options to platform.api calls

You can include an optional third argument to add cURL options to the request. For example to add headers

```
var options = {
    "CURLOPT_HTTPHEADER": ["Content-type: application/json", "Some-Other-Header: blah"]
};

result = platform.api.post("http://localhost/rest/db/todo", JSON.stringify({"name":"test"}), options);

```

> Please note the double quotation marks around the `CURLOPT_*` constant names. Unlike PHP, this is required in Javascript. 

You can also add multiple cURL options like this.

```
var options = {
    "CURLOPT_HTTPHEADER": ["Content-type: application/json", "Some-Other-Header: blah"],
    "CURLOPT_SOMEOTHEROPTION": "someothervalue"
};

result = platform.api.post("http://localhost/rest/db/todo", JSON.stringify({"name":"test"}), options);

```

For GET you can set the second argument, payload, to null to include the optional third argument for the cURL options.

```
var options = {
    "CURLOPT_HTTPHEADER": ["Content-type: application/json", "Some-Other-Header: blah"]
};

result = platform.api.get("http://localhost/rest/db/todo", null, options);

```

### platform.api.includeUserScript()
One additional method is available in the `platform.api` object. This is the `includeUserScript()` method. This allows you to include your own library or libraries of scripts into your server-side scripts.

> For security purposes, the includeUserScript() function, and the include() convenience function *only* load scripts from your DSP's private user script storage area. If you wish to load a remote library or from a CDN, you must download a copy of the library and create a user script with the contents.

This method only loads scripts that are stored in the user script area of the DSP: `[install]/storage/.private/scripts.user`. In addition, this method merely reads the file and returns the contents. If you wish to make the objects in the included script, you must `eval` the returned data in your own script.

To make this a simpler process, we've created a global function called `include()`. This will make the call and return the contents.

#### Including Scripts Example
Here's a very short example you can try on your own DSP. We're going to create a user script called `test-include`. In the admin console, go ahead and create a user script with the ID of `test-include`. In the source area, place the following:

```
function includeAvailable() {
  return true;
}
```

Now pick an event you can easily fire via the console (like **db.todo.get.pre_process**) and create a script with the following code:

```
try {
  eval( include( 'test-include.js' ) );
  print( 'Including "test-include" worked: ' + includeAvailable() );
} catch ( _ex ) { 
  print( 'Failed to include "test-include.js" file:' + _ex.message );
}
```

The file name passed to the `include()` function is relative to your DSP's user script area as outlined above. 

So the `test-include.js` user script adds a function called `includeAvailable()` to your script's context. The statement following then prints the result of calling that function, which should be "true". Unless there is an error.

Fire your event and then check the log file for the result of the `print` commands in your scripts. You should see that it worked.

