The following features are typically available for all DreamFactory Database Services. Refer to the specifics of your database type documented in other pages in this section for additional features or restrictions or behavioral differences in these features.

## Database Operations

### <a name="get-resources"></a>Retrieving Database Resources

Most native services of the DSP will return a list of resources if a REST GET request is sent to the root url of that service. Database services are no different. This list of resources for database services is the list of tables (at a minimum), each including labels and access capabilities, restricted by user role if applicable.

These operations are done on the root path of the service itself, like so...

GET `http[s]://<dsp-server-name>/rest/<service-api-name>/`

All returned data will be wrapped in a `resource` element.

```javascript
{
  "resource": [
    {
      "name": "table_name",
      ...
    },
    ...
  ]
}
```

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getResources) to see this in action in our [Live API](Admin-Console-api-sdk).

Other db-specific resources available for use on the service may be accessed by additional options.

* `include_schemas=true` will include the table names that are available for access via the schema control (`_schema`) resource. See [Schema Operations](#schema-operations) for more information.
* `include_procs=true` will include the stored procedure names that are available for access via the stored procedure control (`_proc`) resource. See [SQL DB Services] for more information.

Two additional url parameter options are also available to change the output format of the resource list returned to the caller.

* `names_only=true` will retrieve a simple list (array) consisting of the API name of each resource only. Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getTables) to see this in action in our [Live API](Admin-Console-api-sdk).
* `as_access_components=true` will retrieve all of the database resources as a list of all role accessible components. This will include the "None" (a blank after the parent resource, `_schema\`) and the "All" (a star after the parent resource, `_schema\*` options. This view is useful for clients when manipulating the Role Service Access capabilities, like on our Admin Panel Role tab. In SQL databases, this will also include a schema resource (table name) listing for each table and any stored procedures available. For other databases, the resources are database type dependent and vary. Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getAccessComponents) to see this in action in our [Live API](Admin-Console-api-sdk).

```javascript
{
  "resource": [
    "name",
    ...
  ]
}
```

## <a name="schema-operations"></a>Schema Operations

By "schema", we mean in its traditional SQL database sense, i.e. a set of properties that define the layout of tables and their fields including relationships between them. However, we have extended this meaning to also encompass the properties that define tables on NoSQL database, i.e. any table key configuration, etc., some of which are database-type dependent. We have also added consolidated simplified data types, a familiar json format, table and field labels, and additional "helper" functions to aid client side usage of the schema, as it pertains to managing table records.

All calls to this resource take the form of...

`http[s]://<dsp-server-name>/rest/<service-api-name>/_schema/[<table_name>/[<field_name>]]`

where `table_name` and `field_name` are optional and control what level of resource the client is acting on.
All posted and returned data, when not using the `table_name` or `field_name` parameter or otherwise noted, must be an array of records wrapped with an `record` element.

```javascript
{
  "table": [
    {
      "name": "table_name",
      ...
    },
    ...
  ]
}
```

See the following sections for more detail...

* [Retrieving Schema](Database-Retrieving-Schema)
* [Creating Schema](Database-Creating-Schema)
* [Updating or Replacing Schema](Database-Updating-Schema)
* [Patching or Merging Schema](Database-Patching-Schema)
* [Deleting Schema](Database-Deleting-Schema)


## Record Operations

All calls to this resource take the form of...

`http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/[<id>]`

where `id` is optional and controls whether the client is acting on a single record or an array of records.
All posted and returned data, when not using the `id` parameter or otherwise noted, must be an array of records wrapped with an `record` element.

```javascript
{
  "record": [
    {
      "name": "value",
      ...
    },
    ...
  ]
}
```


### <a name="common-params"></a>Common Parameters

In addition to the [Common Headers and Parameters](Common-Headers-Parameters), many of the database services' record API operations support the following parameters. To make things more flexible, most parameters can be passed as URI parameters in the form of `name=value` or included in the posted data itself. If passed as a URI parameter, the values **_must be encoded_** accordingly. If it is included in the posted data, and the parameter supports a list (i.e. comma-separated values) as a value, like the `ids` parameter, then it could also even be sent as an array of items.

For example, using the `ids` parameter as a URI parameter would look like...

`http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?ids=1,2,3`

and is equivalent to the following posted JSON data...

```javascript
{
  "ids": "1,2,3",
  ...
}
```

or this...

```javascript
{
  "ids": [ 1, 2, 3 ],
  ...
}
```


####  <a name="fields"></a>Selecting Returned Fields

* `fields`
The list of fields to return in response. If this parameter is ‘*’, or missing on a retrieve (GET) request, all field values will be returned. If it is missing or set to empty (‘’), just the primary key field(s) values will be returned. It can be used on all record operations to return the latest field values. When used on a DELETE request, it returns the values from the record before the deletion.


#### <a name="identifiers"></a>Identifying Records

* `ids`
The list of identifier values to operate on, matching the default primary key or the identifier defined by the `id_field` parameter.

* `id_field`
A single or list of field(s) used as identifiers for the table, used to override defaults or provide identifiers when none are provisioned. In some scenarios, this parameter may be used to retrieve records using secondary indexes.

* `id_type`
Requires `id_field`. A single or list of field type(s) for the identifiers of the table, used to override defaults, i.e. using numbers for MongoDB.


#### <a name="filters"></a>Using Filters

* `filter`
URL-encoded filter string. If this parameter is empty or missing all records will be returned, subject to the 'limit' and 'offset' parameters, or the maximum allowed by the system settings.
Filter String Examples:

  * first_name='John' AND last_name='Smith'
  * first_name='John' OR first_name='Jane'
  * first_name!='John'
  * first_name like 'J%'
  * email like '%@mycompany.com'
  * Age >= 30 AND Age < 40


* `params`
An array of name-value pairs used as filter replacement parameters. To use with GET requests, use [tunnelling](Common-Headers-Parameters#tunnelling) via POST.

* `limit`
Max number of records to return. If this parameter is empty or missing all matching records will be returned, subject to the 'offset' parameter.

* `order`
Field to order results by. Also supports sort direction ASC or DESC such as 'Name ASC'. Default direction is ASC.

* `offset`
Index of first record to return, e.g., to get records 91-100 set offset to 90 and limit to 10.

* `include_count`
Set to true for the meta information containing count value for the filter given.


#### <a name="batching"></a>Batching Records

* `continue`
In batch scenarios, where supported, continue processing even after one record fails. Default behavior is to halt and return results up to the first point of failure.

* `rollback`
In batch scenarios, where supported, rollback all changes if any record of the batch fails. Default behavior is to halt and return results up to the first point of failure, leaving any changes.


See the following sections for more detail...

* [Retrieving Records](Database-Retrieving-Records)
* [Creating Records](Database-Creating-Records)
* [Updating or Replacing Records](Database-Updating-Records)
* [Patching or Merging Records](Database-Patching-Records)
* [Deleting Records](Database-Deleting-Records)

