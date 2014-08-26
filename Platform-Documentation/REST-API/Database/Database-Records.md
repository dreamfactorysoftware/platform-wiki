## Database Table Record Operations

For database clients, the primary database operations involve managing database table records. The database table resource, signified by `table_name` below, allows for CRUD operations of various permutations on table records. All calls to this resource take the form of...

`http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/[<id>]`

where `id`, representing the value of a primary key field (or other fields in some circumstances), is optional and controls whether the client is acting on a single record, when `id` is used, or an array of records when it is not. All posted and returned data, when not using the `id` parameter or where otherwise noted, must be an array of records wrapped with a `record` element.

```javascript
{
  "record": [
    {
      "<field_name>": "value",
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

