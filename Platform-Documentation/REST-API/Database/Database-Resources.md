## Database Resource Operations

Most native services of the DSP will return a list of resources if a REST GET request is sent to the root url of that service. Database services are no different. This list of resources for database services is the list of tables (at a minimum), restricted by user role if applicable.

These operations are done on the root path of the service itself, like so...

GET `http[s]://<dsp-server-name>/rest/<service-api-name>/`

All returned data will be wrapped in a `resource` element. Additional url parameter options are also available to change the output format of the resource list returned to the caller.


### <a name="get-resources"></a>Retrieving Resources

Giving no additional url parameters, a GET will return resources in the following format, where `label` and `plural` are DreamFactory extensions, and `access` defines the current role access for this service resource.

```javascript
{
  "resource": [
    {
      "name": "<table_name>",
      "label": "<table_label>",
      "plural": "<table_plural_label>",
      "access": [
        "<access_verb>",
        ...
      ]
    },
    ...
  ]
}
```

Other db-specific resources available for use on the service may be accessed by additional options.

* `include_schemas=true` will include the table names that are available for access via the schema control (`_schema`) resource. See [Schema Operations](Database-Schema) for more information.
* `include_procs=true` (SQL DB only) will include the stored procedure names that are available for access via the stored procedure control (`_proc`) resource. See [SQL DB Services] for more information.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getResources) to see this in action in our [Live API](Admin-Console-api-sdk).

### <a name="get-tables"></a>Retrieving Resource Names Only

GET `http[s]://<dsp-server-name>/rest/<service-api-name>/?names_only=true`

Adding this optional parameter will retrieve a simple list (array) consisting of the API name of each resource only.

```javascript
{
  "resource": [
    "<table_name>",
    ...
  ]
}
```

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getTables) to see this in action in our [Live API](Admin-Console-api-sdk).

### <a name="get-access-components"></a>Retrieving Resources as Access Components

GET `http[s]://<dsp-server-name>/rest/<service-api-name>/?as_access_components=true`

Adding this operational parameter will retrieve all of the database resources as a list of all role accessible components. This will include the "None" (a blank after the parent resource, `_schema\`) and the "All" (a star after the parent resource, `_schema\*` options. This view is useful for clients when manipulating the Role Service Access capabilities, like on our Admin Panel Role tab. In SQL databases, this will also include a schema resource (table name) listing for each table and any stored procedures available. For other databases, the resources are database type dependent and vary.

```javascript
{
  "resource": [
    "",
    "*",
    "<table_name>",
    "_schema/",
    "_schema/*",
    "_schema/<table_name>",
    ...
  ]
}
```

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getAccessComponents) to see this in action in our [Live API](Admin-Console-api-sdk).

