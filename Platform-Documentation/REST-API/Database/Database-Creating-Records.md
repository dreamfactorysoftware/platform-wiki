The following operations are typically available for creating records on all DreamFactory Database Services. These operations may vary significantly in handling of primary identifiers based on the database service type and sometimes based on the table definition itself. For instance, some tables may automatically create the identifier field(s) with no input from the client, like in the case of MongoDB or SQL databases with tables that have an auto-incrementing primary key. Others may require a single or multiple identifier fields to be sent with the rest of the record upon creation. Be sure to check the specific database service type for any differences documented in other pages in this section.

## Multiple Records


Description: Create one or more new records for a db table.

#### Request

HTTP Method: **POST**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`fields` | No | Comma-delimited list of fields to return in response. If this parameter is empty or missing, only the primary key(s) are returned. ‘*’ returns all viewable fields.
`id_field` | No | Single or comma-delimited list of the fields used as identifiers for the table, used to override defaults or provide identifiers when none are provisioned.
`id_type` | No | Single or comma-delimited list of the field types used as identifiers for the table, used to override defaults or provide identifiers when none are provisioned.
`continue` | No | In batch scenarios, where supported, continue processing even after one record fails. Default behavior is to halt and return results up to the first point of failure.
`rollback` | No | In batch scenarios, where supported, rollback all changes if any record of the batch fails. Default behavior is to halt and return results up to the first point of failure, leaving any changes.


Sample JSON Request

> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/contact?fields=first_name%2Clast_name HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> Content-Type: application/json; charset=UTF-8

> X-Application-Name: Admin

> Content-Length: 72

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "record": [
    {
      "first_name": "Joe",
      "last_name": "Smith"
    }
  ]
}
```


#### Response


Sample JSON Response

> HTTP/1.1 200 OK

> Date: Wed, 26 Dec 2012 20:49:11 GMT

> Server: Apache

> X-Powered-By: PHP/5.3.10-1ubuntu3.4

> Expires: Thu, 19 Nov 1981 08:52:00 GMT

> Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0

> Pragma: no-cache

> Vary: Accept-Encoding

> Content-Length: 69

> Keep-Alive: timeout=5, max=100

> Connection: Keep-Alive

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "first_name": "Joe",
      "last_name": "Smith",
      "id": "1"
    }
  ]
}
```

## Single Record

Description: Create a new record for a db table, without using the batching notation ('record' wrapper).

#### Request 

HTTP Method: **POST**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`fields` | No | Comma-delimited list of fields to return in response. If this parameter is empty or missing, only the primary key(s) are returned. ‘*’ returns all viewable fields.

Sample JSON Request

> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/contact?fields=first_name%2Clast_name HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> Content-Type: application/json; charset=UTF-8

> X-Application-Name: Admin

> Content-Length: 72

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "record": [
    {
      "first_name": "Joe",
      "last_name": "Smith"
    }
  ]
}
```


#### Response


Sample JSON Response

> HTTP/1.1 200 OK

> Date: Wed, 26 Dec 2012 20:49:11 GMT

> Server: Apache

> X-Powered-By: PHP/5.3.10-1ubuntu3.4

> Expires: Thu, 19 Nov 1981 08:52:00 GMT

> Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0

> Pragma: no-cache

> Vary: Accept-Encoding

> Content-Length: 69

> Keep-Alive: timeout=5, max=100

> Connection: Keep-Alive

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "first_name": "Joe",
      "last_name": "Smith",
      "id": "1"
    }
  ]
}
```
