Server-side filters allow you to limit what records are accessible via the REST API based on some criteria that you define. The blog posts below provide a good high-level overview of server-side filters and what they can do.

* [DreamFactory 1.5 Introduces Server-Side Filters](http://blog.dreamfactory.com/dreamfactory-introduces-server-side-filters)
* [Data Segmentation with Server-Side Filtering and Lookup Keys](http://blog.dreamfactory.com/data-segmentation-with-server-side-filtering-and-lookup-keys)

# Filter by Record Owner

In some cases you want to only allow the owner of a record to have access to it. This can be easily implemented using a server-side filter. When creating a record you set an OwnerId field or similar to the id of the creating user. The filter is created from the Service Access section of the roles tab. {user.id} is a built-in lookup key that will always be resolved to the id of the user making the API call.

![Filter by OwnerId](http://www.dreamfactory.net/dsp/images/1.png)




