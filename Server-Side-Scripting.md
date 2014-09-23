## Blog Posts

See the blog posts below for a high-level overview of server-side scripting.

* [DreamFactory 1.5 Introduces Server-Side Scripting](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-scripting)

* [Build Your Own Web Services Using DreamFactory Custom Scripts](http://blog.dreamfactory.com/build-your-own-web-services-using-dreamfactory-custom-scripts)

## Basic Scripting Examples

Field Validation on Record Creation

```
	// POST /rest/db/account triggers script db.Account.post.pre_process
	// This script runs BEFORE records are written to the db.
	
	if (event.request.body.record) {
    	_.each(event.request.body.record, function(record) {
            	if (!record.hasOwnProperty("AnnualRevenue")) { 
    				throw 'missing field AnnualRevenue';
				}
				if (record.AnnualRevenue <= 0) { 
    				throw 'AnnualRevenue must be > 0';
				}
        	}
    	);
	}

```