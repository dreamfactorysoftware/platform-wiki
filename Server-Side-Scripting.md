## Basic Scripting Examples

### Field Validation on Record Creation

```
	//	Retrieve all contacts from the Contacts database
	var _records = platform.api.get( "db/Contacts" );

	//	Uppercase each name...
	_.each( _records, function( record ) {
		record.name = record.name.toUpperCase();
	});
```

## Blog Posts

See the blog posts below for a high-level overview of server-side scripting.

* [DreamFactory 1.5 Introduces Server-Side Scripting](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-scripting)

* [Build Your Own Web Services Using DreamFactory Custom Scripts](http://blog.dreamfactory.com/build-your-own-web-services-using-dreamfactory-custom-scripts)