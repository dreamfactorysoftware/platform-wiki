When things happen via the REST API events are triggrred in the system. Each of these events can have an associated server side script that runs when the event is triggered. Common uses for these are taking some action before or after database CRUD operations. If I have a table named Account, the following events are supported.

db.Account.select - event fires and script runs BEFORE retrieving records from database
db.Account.insert - event fires and script runs BEFORE writing records to database
db.Account.update - event fires and script runs BEFORE updating records in database
db.Account.delete - event fires and script runs BEFORE deleting records from database

These four events are generally used for notifications. There are also pre_process and post_process events. In many cases it is preferable to use these since you can control when the script runs, either before or after the associated REST action takes place. For updating records you can have different scripts for PUT, PATCH, and MERGE.

db.Account.get.pre_process
db.Account.get.post_process
db.Account.post.pre_process
db.Account.post.post_process
db.Account.put.pre_process
db.Account.put.post_process
db.Account.patch.pre_process
db.Account.patch.post_process
db.Account.merge.pre_process
db.Account.merge.post_process
db.Account.delete.pre_process
db.Account.delete.post_process

## Blog Posts

See the blog posts below for a high-level overview of server-side scripting.

* [DreamFactory 1.5 Introduces Server-Side Scripting](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-scripting)

* [Build Your Own Web Services Using DreamFactory Custom Scripts](http://blog.dreamfactory.com/build-your-own-web-services-using-dreamfactory-custom-scripts)

## Scripting Examples

**Field validation before record creation**

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
**Modify query results after database GET**

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
**Add library scripts to your server side scripting**

Starting with release 1.8.0 any script can include other custom scripts.  This allows you to use JavaScript libraries or other code in your server side scripts. As an example say my-lib.js is your library script, saved as a custom script on your dsp.
```
    // my-lib.js
    function myFunction() {
        return true;
    }
```

Your script can then include that library.
```
    var result;
    
    try
    {
        eval(include('my-lib.js'));
        result = 'myFunction() available: ' + myFunction();
    } 

    catch (_ex )
    {
        result = 'myFunction() is NOT available: ' + _ex.message;
    }
    
    return result;
```
