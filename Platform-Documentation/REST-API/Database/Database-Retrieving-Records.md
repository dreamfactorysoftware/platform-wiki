The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [by Old or Partial Records](#get-records)
* [by Filter](#get-filter)
* [by List of Identifiers](#get-ids)
* [by a Single Identifier](#get-id)


## <a name="get-records"></a>By Old or Partial Records

Description: Filter records for a db table.

#### Request

HTTP Method: **GET**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?filter=<filter_string>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`filter` | No | URL-encoded filter string. If this parameter is empty or missing all records will be returned, subject to the 'limit' and 'offset' parameters, or the maximum allowed by the system settings.
`fields` | No | Comma-delimited list of fields to return in response, must be url-encoded. If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`limit` | No | Max number of records to return. If this parameter is empty or missing all matching records will be returned, subject to the 'offset' parameter.
`order` | No | Field to order results by. Also supports sort direction ASC or DESC such as 'Name ASC'. Default direction is ASC.
`offset` | No | Index of first record to return, e.g., to get records 91-100 set offset to 90 and limit to 10.
`include_count` | No | Set to true for the meta information containing count value for the filter given.
`related` | No | Comma-delimited list of relations to return in response. By default, all fields of the related record(s) are returned. Optional fields, limit, and order can be sent for each relation.
`<relation_name>.fields` | No | When ‘related’ parameter given,  comma-delimited list of fields to return in the response for the related record(s). If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`<relation_name>.limit` | No | When ‘related’ parameter given, integer count value of number of related records to limit the response to. Default is unlimited until max response size met.
`<relation_name>.order` | No | When ‘related’ parameter given, declares the ‘order by’ field and direction for sorting the related results.

Filter String Examples:


FirstName='John'

LastName='Doe'

FirstName like 'J%'

LastName like 'D%'

FirstName!='John'

Age > 30


Sample JSON Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact?filter=LastName%3D%27Blow%27&fields=Id HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: Admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response

Sample JSON Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": "1"
    }
  ]
}
```

## <a name="get-filter"></a>By Filter

Description: Filter records for a db table.

#### Request

HTTP Method: **GET**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?filter=<filter_string>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`filter` | No | URL-encoded filter string. If this parameter is empty or missing all records will be returned, subject to the 'limit' and 'offset' parameters, or the maximum allowed by the system settings.
`fields` | No | Comma-delimited list of fields to return in response, must be url-encoded. If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`limit` | No | Max number of records to return. If this parameter is empty or missing all matching records will be returned, subject to the 'offset' parameter.
`order` | No | Field to order results by. Also supports sort direction ASC or DESC such as 'Name ASC'. Default direction is ASC.
`offset` | No | Index of first record to return, e.g., to get records 91-100 set offset to 90 and limit to 10.
`include_count` | No | Set to true for the meta information containing count value for the filter given.
`related` | No | Comma-delimited list of relations to return in response. By default, all fields of the related record(s) are returned. Optional fields, limit, and order can be sent for each relation.
`<relation_name>.fields` | No | When ‘related’ parameter given,  comma-delimited list of fields to return in the response for the related record(s). If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`<relation_name>.limit` | No | When ‘related’ parameter given, integer count value of number of related records to limit the response to. Default is unlimited until max response size met.
`<relation_name>.order` | No | When ‘related’ parameter given, declares the ‘order by’ field and direction for sorting the related results.

Filter String Examples:


FirstName='John'

LastName='Doe'

FirstName like 'J%'

LastName like 'D%'

FirstName!='John'

Age > 30


Sample JSON Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact?filter=LastName%3D%27Blow%27&fields=Id HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: Admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response

Sample JSON Response


> HTTP/1.1 200 OK

> Content-Length: 34

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": "1"
    }
  ]
}
```

## <a name="get-ids"></a>By a List of Identifiers

Description: Retrieve one or more records for a db table by id.

#### Request

HTTP Method: **GET**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?ids=<id_list>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`ids` | Yes unless included in POST data | Comma-delimited list of ids to retrieve. Results will be returned in order of ids listed.
`id_field` | No | The field that this identifier applies to. This is primarily used in the case where a table has no well-defined primary key, but could be used to identify any record by a unique field value. If this parameter is not present, then the primary key of the table is used, or an error is returned if there is no primary key.
`fields` | No | Comma-delimited list of fields to return in response. If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`related` | No | Comma-delimited list of relations to return in response. By default, all fields of the related record(s) are returned. Optional fields, limit, and order can be sent for each relation.
`<relation_name>.fields` | Optional when ‘related’ parameter given. Comma-delimited list of fields to return in the response for the related record(s). If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`<relation_name>.limit` | Optional when ‘related’ parameter given. Integer count value of number of related records to limit the response to. Default is unlimited until max response size met.
`<relation_name>.order` | Optional when ‘related’ parameter given. Declares the ‘order by’ field and direction for sorting the related results.


Sample JSON Request

> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact/1?fields=FirstName%2CLastName HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response

Sample JSON Response


> HTTP/1.1 200 OK

> Content-Length: 61

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "FirstName": "Joe",
      "LastName": "Blow"
    }
  ]
}
```

## <a name="get-id"></a>By a Single Identifier

Description: Retrieve one record for a db table by id.

#### Request

HTTP Method: **GET**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/<id>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`id_field` | No | The field that this identifier applies to. This is primarily used in the case where a table has no well-defined primary key, but could be used to identify any record by a unique field value. If this parameter is not present, then the primary key of the table is used, or an error is returned if there is no primary key.
`fields` | No | Comma-delimited list of fields to return in response. If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`related` | No | Comma-delimited list of relations to return in response. By default, no relations are returned. Optional fields, limit, and order parameters can be sent for each relation.
`<relation_name>.fields` | No | When ‘related’ parameter given, comma-delimited list of fields to return in the response for the related record(s). If this parameter is ‘*’ or missing all fields will be returned. Setting it to empty (‘’) will result in just the primary key field(s) and value(s) being returned.
`<relation_name>.limit` | No | When ‘related’ parameter given, integer count value of number of related records to limit the response to. Default is unlimited until max response size met.
`<relation_name>.order` | No | When ‘related’ parameter given, declares the ‘order by’ field and direction for sorting the related results.

Sample JSON Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/account/2

> HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response

Sample JSON Response


> HTTP/1.1 200 OK

> Content-Length: 61

> Content-Type: application/json

```javascript
{
  "id": "2",
  "name": "DreamFactory Software",
  "email": "sales@dreamfactory.com",
  "phone": "650-641-1800",
  "website": "http://www.dreamfactory.com",
  "partner_id": null,
  "created_date": "2013-02-28 15:22:42",
  "last_modified_date": "2013-02-28 15:25:29",
  "created_by_id": "1",
  "last_modified_by_id": "1"
}
```
