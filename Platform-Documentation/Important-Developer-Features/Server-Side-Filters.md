Server-side filters allow you to limit what database records are accessible via the REST API based on some criteria that you define. The blog posts below provide a good high-level overview of server-side filters and what they can do. These filters do not apply to DSP admin users, only to users that are assigned to a role on the DSP.

* [DreamFactory 1.5 Introduces Server-Side Filters](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-filters)
* [Data Segmentation with Server-Side Filtering and Lookup Keys](http://blog.dreamfactory.com/data-segmentation-with-server-side-filtering-and-lookup-keys)

### Filter by Record Owner

In some cases you want to only allow the owner of a record to have access to it. This can be easily implemented using a server-side filter. When creating a record you set an OwnerId field or similar to the id of the creating user. The filter is created from the Service Access section of the Roles tab. You have to select a database service from the Services menu to get the filters ui. {user.id} is a built-in lookup key that will always be resolved to the id of the user making the API call.

![Filter by OwnerId](http://www.dreamfactory.net/dsp/images/1.png)

When the Account table is accessed from the API, only the Account records owned by the person making the API call will be accessible.

### Filter by Field Values

You can set up filters to restrict access based on the value of one or more fields. Just like the previous example this is done from the Service Access section of the Roles tab. Click the AND/OR to toggle the logical operator for multi-line filters.

![Filter by Field Values](http://www.dreamfactory.net/dsp/images/2.png)

In this example only the Account records with AnnualRevenue < 1000000 and State = 'CA' will be accessible via the REST API.

### Lookup Keys in Filters

You can set up lookup keys at the user, role, or global level to give some users different values for filters. Going back to the previous example on the Account table, user A might have a lookup key named {MAX_REVENUE} set to 1000000. User B could have the same lookup key name but with a value of 2000000. The filter just uses {MAX_REVENUE} so each user can have their own value. This can be done for groups of users using role lookup keys.

![Filter by Field Values with Lookups](http://www.dreamfactory.net/dsp/images/3.png)




