## Blog Posts

See the blog posts below for a high-level overview of server-side scripting.

* [DreamFactory 1.5 Introduces Server-Side Scripting](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-scripting)

* [Build Your Own Web Services Using DreamFactory Custom Scripts](http://blog.dreamfactory.com/build-your-own-web-services-using-dreamfactory-custom-scripts)

## Basic Scripting Examples

Field Validation Before Record Creation

```
	// POST /rest/db/Account triggers script db.Account.post.pre_process
	// This script runs BEFORE records are written to the db.
	// records are in array event.request.body.record.
	
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
Modify Query Results After DB GET

```
	// GET /rest/db/Account triggers script db.Account.get.post_process
	// This script runs AFTER records are retrieved from the db.
	// records are in array event.response.record.

	if (event.response.record) {
    	_.each(event.response.record, function(record) {
            	// add a calculated field
            	record.HasRevenue = record.AnnualRevenue > 0;
            	// delete a field so not returned to client
            	delete record.AnnualRevenue;
        	}
    	);
	}

```