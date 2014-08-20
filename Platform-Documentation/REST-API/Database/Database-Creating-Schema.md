The following operations are typically available for creating records on all DreamFactory Database Services. These operations may vary significantly in handling of primary identifiers based on the database service type and sometimes based on the table definition itself. For instance, some tables may automatically create the identifier field(s) with no input from the client, like in the case of MongoDB or SQL databases with tables that have an auto-incrementing primary key. Others may require a single or multiple identifier fields to be sent with the rest of the record upon creation. Be sure to check the specific database service type for any differences documented in other pages in this section.

  * [Multiple Tables](Database-Creating-Schema#post-tables)
  * [Single Table](Database-Creating-Schema#post-table)
  * [Single Field](Database-Creating-Schema#post-field)

## Multiple Records


Description: Create one or more new records for a db table. Server-side lookups may be used as field values, and will be replaced on the server with the correct lookup value.

* without lookups => { "name": "my new task", "complete": false }
* with lookups => { "name": "my new task", "complete": "{lookup_name}" }


URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

#### Request


> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/todo HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> Content-Type: application/json; charset=UTF-8

> X-Dreamfactory-Application-Name: admin

> Content-Length: 72

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "record": [
    {
      "name": "Test my cool app",
      "complete": "{lookup_name}"
    }
  ]
}
```


#### Response


> HTTP/1.1 200 OK

> Content-Length: 69

> Content-Type: application/json

```javascript
{
  "record": [
    {
      "id": "3"
    }
  ]
}
```

## Single Record

Description: Create a new record for a db table, without using the batching notation ('record' wrapper).
Notice that if no wrapper is used in the request, only a single record is allowed, and only a single record response will be returned without a wrapper.

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

#### Request


> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/todo HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> Content-Type: application/json; charset=UTF-8

> X-Dreamfactory-Application-Name: admin

> Content-Length: 72

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "name": "Test my cool app",
  "complete": false
}
```


#### Response


> HTTP/1.1 200 OK

> Content-Length: 69

> Content-Type: application/json

```javascript
{
  "id": "1"
}
```

