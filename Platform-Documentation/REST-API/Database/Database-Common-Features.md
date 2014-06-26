The following features are typically available for all DreamFactory Database Services. Refer to the specifics of your database type documented in other pages in this section for additional features or restrictions or behavioral differences in these features.

## Table Operations

### <a name="get-tables"></a>Retrieving Table Information

Most native services of the DSP will return a list of resources if a REST GET request is sent to the root url of that service. Database services are no different. This list of resources for database services is the list of tables available for use on the service, restricted by user role if applicable.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getResources) to see this in action in our [Live API](Admin-Console-api-sdk).

An additional operation is also provided to retrieve specific details about a requested set of tables. In SQL databases, this will also include our schema listing for each table. For other databases, the properties are database type dependent and vary.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getTables) to see this in action in our [Live API](Admin-Console-api-sdk).


## Record Operations

### <a name="common-params"></a>Common Parameters

In addition to the [Common Headers and Parameters](Common-Headers-Parameters), many of the database services' API operations support the following parameters. To make things more flexible, most parameters can be passed as URI parameters in the form of `name=value` or included in the posted data itself. If passed as a URI parameter, the values **_must be encoded_** accordingly. If it is included in the posted data, and the parameter supports a list (i.e. comma-separated values) as a value, like the `ids` parameter, then it could also even be sent as an array of items.

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


### [Retrieving Records](Database-Retrieving-Records)
  * [by Filter](Database-Retrieving-Records#get-filter)
  * [by List of Identifiers](Database-Retrieving-Records#get-ids)
  * [by a Single Identifier](Database-Retrieving-Records#get-id)
  * [by Posting Partial Records](Database-Retrieving-Records#get-records)
  * [by Posting a Filter with Replacement Parameters](Database-Retrieving-Records#get-post-filter)
  * [by Posting Ids](Database-Retrieving-Records#get-post-ids)


### [Creating Records](Database-Creating-Records)
  * [by Multiple Records](Database-Creating-Records#post-records)
  * [by a Single Record](Database-Creating-Records#post-record)


### [Updating or Replacing Records](Database-Updating-Records)
  * [by Updated Records](Database-Updating-Records#put-records)
  * [by Filter](Database-Updating-Records#put-filter)
  * [by List of Identifiers](Database-Updating-Records#put-ids)
  * [by a Single Identifier](Database-Updating-Records#put-id)


### [Patching or Merging Records](Database-Patching-Records)
  * [by Updated Records](Database-Patching-Records#patch-records)
  * [by Filter](Database-Patching-Records#patch-filter)
  * [by List of Identifiers](Database-Patching-Records#patch-ids)
  * [by a Single Identifier](Database-Patching-Records#patch-id)


### [Deleting Records](Database-Deleting-Records)
  * [by List of Records](Database-Deleting-Records#delete-records)
  * [by Filter](Database-Deleting-Records#delete-filter)
  * [by List of Identifiers](Database-Deleting-Records#delete-ids)
  * [by a Single Identifier](Database-Deleting-Records#delete-id)

