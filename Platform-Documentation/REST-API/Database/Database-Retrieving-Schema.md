The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is, in this case, an auto-incrementing primary key.
This may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [as Resources](Database-Retrieving-Resources#get-resources)
* [as List of Resource Names](Database-Retrieving-Resource-List#get-names-only)
* [as Access Components](Database-Retrieving-Components#get-access-components)

* [by Filter](#get-filter)
* [by List of Identifiers](#get-ids)
* [by a Single Identifier](#get-id)
* [by Posting Partial Records](#get-records)
* [by Posting a Filter with Replacement Parameters](#get-post-filter)
* [by Posting Ids](#get-post-ids)


## <a name="get-filter"></a>By Filter

Description: Filter records for a db table using a SQL-like WHERE clause (or native filter or certain NoSQL types).
Server-side replacement lookups are allowed in the filter string.

* without lookups => filter=name%20%3D%20%27value%27  (decoded: name = 'value')
* with lookups => filter=name%20%3D%20%27%7Blookup_name%7D%27 (decoded: name = '{lookup_name}'


URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?filter=<filter_string>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecordsByFilter) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/todo?filter=complete%3Dtrue HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": 1,
      "name": "Check out DF REST API",
      "complete": true
    }
  ]
}
```

## <a name="get-ids"></a>By a List of Identifiers

Description: Retrieve one or more records for a db table by id.

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?ids=<id_list>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecordsByIds) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/todo/?ids=1,2 HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


> HTTP/1.1 200 OK

> Content-Length: 61

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": 1,
      "name": "Check out DF REST API",
      "complete": true
    },
    {
      "id": 2,
      "name": "Create a cool app of my own",
      "complete": false
    }
  ]
}
```

## <a name="get-id"></a>By a Single Identifier

Description: Retrieve one record for a db table by id.

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/<id>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecord) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/todo/2

> HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


> HTTP/1.1 200 OK

> Content-Length: 61

> Content-Type: application/json

```javascript
{
  "id": 2,
  "name": "Create a cool app of my own",
  "complete": false
}
```

## <a name="get-records"></a>by Posting Partial Records

Description: Refresh a client-side copy of old or partial records from a db table. Requires that at a minimum the old or partial records contain the identifying fields for the table.

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecordsByPost) to see this in action in our [Live API](Admin-Console-api-sdk).


#### Request


> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/todo HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> X-Http-Method: GET

> Content-Type: application/json

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "record": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

#### Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": 1,
      "name": "Check out DF REST API",
      "complete": true
    },
    {
      "id": 2,
      "name": "Create a cool app of my own",
      "complete": false
    }
  ]
}
```

## <a name="get-post-filter"></a>by Posting a Filter with Replacement Parameters

Description: Just like using <a name="get-filter">"By Filter"</a> above but this allows placing complex or non-string filters in the payload along with any replacement parameters, including lookups, required for the filter. Note that the filter can still be passed as part of the URL as before. Also note that filter strings passed in the payload MUST NOT be encoded. Also note the quotes around lookup name usage.

* filter => filter=complete%20%3D%20%3Acomplete  (decoded: complete=:my_complete)
* params without lookups => { "params" : { ":my_complete" : false } }
* params with lookups => { "params" : { ":my_complete" : "{lookup_name}" } }

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecordsByPost) to see this in action in our [Live API](Admin-Console-api-sdk).


#### Request


> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/todo HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> X-Http-Method: GET

> Content-Type: application/json

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "filter": "complete=:my_complete",
  "params":
    {
      ":my_complete": "{my_lookup_name}"
    }
  ]
}
```

#### Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": 2,
      "name": "Create a cool app of my own",
      "complete": false
    }
  ]
}
```

## <a name="get-records"></a>by Posting Ids

Description: Just like using <a name="get-ids">"By Ids"</a> above but this allows placing larger or more complex list or arrays of identifiers in the payload

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecordsByPost) to see this in action in our [Live API](Admin-Console-api-sdk).


#### Request


> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/todo HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Dreamfactory-Application-Name: admin

> X-Http-Method: GET

> Content-Type: application/json

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "ids": "1,2"
}
```

or...

```javascript
{
  "ids": [1,2]
}
```

#### Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": 1,
      "name": "Check out DF REST API",
      "complete": true
    },
    {
      "id": 2,
      "name": "Create a cool app of my own",
      "complete": false
    }
  ]
}
```

 Retrieving the Schema
 List of Tables


Description: Return schema data for the database, listing all tables.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/system/schema/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 307
Connection: Keep-Alive
Content-Type: application/json

{
"resource": [
{
"name": "app",
"label": "Application",
"plural": "Applications"
},
{
"name": "app_group",
"label": "Application Group",
"plural": "Application Groups"
},
{
"name": "role",
"label": "Role",
"plural": "Roles"
}, {
"name": "service",
"label": "Service",
"plural": "Services"
}, {
"name": "user",
"label": "User",
"plural": "Users"
}
]
}

Sample XML Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/system/schema/?format=xml HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 610
Connection: Keep-Alive
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<resources>
<resource>
<name>app</name>
<label>Application</label>
<plural>Applications</plural>
</resource>
<resource>
<name>app_group</name>
<label>Application Group</label>
<plural>Application Groups</plural>
</resource>
<resource>
<name>role</name>
<label>Role</label>
<plural>Roles</plural>
</resource>
<resource>
<name>service</name>
<label>Service</label>
<plural>Services</plural>
</resource>
<resource>
<name>user</name>
<label>User</label>
<plural>Users</plural>
</resource>
</resources>
</dfapi>

 Table Schema
Description: Return schema data for a single db table, including table name and labels as well as field and related schema.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<tablename>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/schema/App HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

{
"table": {
"name": "app",
"label": "App",
"plural": "Apps",
"field": [
{
"name": "id",
"label": "Id",
"type": "id",
"db_type": "int(11)",
"length": 11,
"precision": 11,
"scale": 0,
"default": null,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": true,
"is_primary_key": true,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "api_name",
"label": "Api Name",
"type": "string",
"db_type": "varchar(40)",
"length": 40,
"precision": 40,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "not_empty",
"values": []
},
{
"name": "name",
"label": "Name",
"type": "string",
"db_type": "varchar(40)",
"length": 40,
"precision": 40,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "not_empty",
"values": []
},
{
"name": "description",
"label": "Description",
"type": "string",
"db_type": "text",
"length": 0,
"precision": 0,
"scale": 0,
"default": null,
"required": false,
"allow_null": true,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "is_active",
"label": "Is Active",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 1,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "url",
"label": "Url",
"type": "string",
"db_type": "text",
"length": 0,
"precision": 0,
"scale": 0,
"default": null,
"required": false,
"allow_null": true,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "is_url_external",
"label": "Is Url External",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "schemas",
"label": "Schemas",
"type": "string",
"db_type": "text",
"length": 0,
"precision": 0,
"scale": 0,
"default": null,
"required": false,
"allow_null": true,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_by_device",
"label": "Filter By Device",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_phone",
"label": "Filter Phone",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_tablet",
"label": "Filter Tablet",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_desktop",
"label": "Filter Desktop",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "requires_plugin",
"label": "Requires Plugin",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "import_url",
"label": "Import Url",
"type": "string",
"db_type": "text",
"length": 0,
"precision": 0,
"scale": 0,
"default": null,
"required": false,
"allow_null": true,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "url",
"values": []
},
{
"name": "created_date",
"label": "Created Date",
"type": "timestamp_on_create",
"db_type": "timestamp",
"length": 0,
"precision": 0,
"scale": 0,
"default": "0000-00-00 00:00:00",
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "api_read_only",
"values": []
},
{
"name": "last_modified_date",
"label": "Last Modified Date",
"type": "timestamp_on_update",
"db_type": "timestamp",
"length": 0,
"precision": 0,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "api_read_only",
"values": []
},
{
"name": "created_by_id",
"label": "Created By Id",
"type": "user_id_on_create",
"db_type": "int(11)",
"length": 11,
"precision": 11,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": true,
"ref_table": "user",
"ref_fields": "id",
"validation": "api_read_only",
"values": []
},
{
"name": "last_modified_by_id",
"label": "Last Modified By Id",
"type": "user_id_on_update",
"db_type": "int(11)",
"length": 11,
"precision": 11,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": true,
"ref_table": "user",
"ref_fields": "id",
"validation": "api_read_only",
"values": []
}
],
"related": [
{
"name": "user_by_created_by_id",
"type": "belongs_to",
"ref_table": "user",
"ref_field": "id",
"field": "created_by_id"
},
{
"name": "user_by_last_modified_by_id",
"type": "belongs_to",
"ref_table": "user",
"ref_field": "id",
"field": "last_modified_by_id"
},
{
"name": "app_to_app_groups_by_app_id",
"type": "has_many",
"ref_table": "app_to_app_group",
"ref_field": "app_id",
"field": "id"
},
{
"name": "app_groups_by_app_to_app_group",
"type": "many_many",
"ref_table": "app_group",
"ref_field": "id",
"join": "app_to_app_group(app_id,app_group_id)",
"field": "id"
},
{
"name": "app_to_roles_by_app_id",
"type": "has_many",
"ref_table": "app_to_role",
"ref_field": "app_id",
"field": "id"
},
{
"name": "roles_by_app_to_role",
"type": "many_many",
"ref_table": "role",
"ref_field": "id",
"join": "app_to_role(app_id,role_id)",
"field": "id"
},
{
"name": "app_to_services_by_app_id",
"type": "has_many",
"ref_table": "app_to_service",
"ref_field": "app_id",
"field": "id"
},
{
"name": "services_by_app_to_service",
"type": "many_many",
"ref_table": "service",
"ref_field": "id",
"join": "app_to_service(app_id,service_id)",
"field": "id"
},
{
"name": "roles_by_default_app_id",
"type": "has_many",
"ref_table": "role",
"ref_field": "default_app_id",
"field": "id"
},
{
"name": "users_by_role",
"type": "many_many",
"ref_table": "user",
"ref_field": "id",
"join": "role(default_app_id,created_by_id)",
"field": "id"
},
{
"name": "users_by_role",
"type": "many_many",
"ref_table": "user",
"ref_field": "id",
"join": "role(default_app_id,last_modified_by_id)",
"field": "id"
},
{
"name": "users_by_default_app_id",
"type": "has_many",
"ref_table": "user",
"ref_field": "default_app_id",
"field": "id"
},
{
"name": "roles_by_user",
"type": "many_many",
"ref_table": "role",
"ref_field": "id",
"join": "user(default_app_id,role_id)",
"field": "id"
}
]
}
}

 Field Schema
Description: Return schema data for a single field of a db table, including the name, label, and defining properties.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<tablename>/<field_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/schema/app/name HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

{
"name": "name",
"label": "Name",
"type": "string",
"db_type": "varchar(40)",
"length": 40,
"precision": 40,
"scale": 0,
"default": null,
"required": true,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "not_empty",
"values": []
}


