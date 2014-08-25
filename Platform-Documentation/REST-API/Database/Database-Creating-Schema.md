The following operations are typically available for creating tables on all DreamFactory Database Services. However, these operations may vary significantly in the properties that are necessary to actually create a table entity for each specific database vendor. For instance, some tables may automatically create the identifier field(s) with no input from the client, like in the case of MongoDB. Be sure to check the specific database service type for any differences documented in other pages in this section.

  * [Multiple Tables](#post-tables)
  * [Single Table](#post-table)
  * [Single Field](#post-field)

##Multiple Tables
Description: Create one or more tables in the database. Note that the request and response should be an array of table-defining property sets wrapped with a `table` element.

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/_schema/`

#### Request
> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema HTTP/1.1
> Accept: application/json, text/javascript, */*; q=0.01
> Accept-Language: en-us,en;q=0.5
> Accept-Encoding: gzip, deflate
> Content-Type: application/json; charset=UTF-8
> X-Dreamfactory-Application-Name: admin
> Content-Length: 72
> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "table": [
    {
      "name": "account",
      "label": "Account",
      "plural": "Accounts",
      "field": [
        {
          "name": "id",
          "label": "Account ID",
          "type": "id"
        },
        …
      ]
    },
    {
      "name": "contact",
      "label": "Contact",
      "plural": "Contacts",
      "field": [
        {
          "name": "id",
          "label": "Contact ID",
          "type": "id"
        },
        …
      ]
    }
  ]
}
```

#### Response
> HTTP/1.1 200 OK
> Content-Length: 30
> Content-Type: application/json

```javascript
{
   "table": [
     {
       "name": "account"
     },
     {
       "name": "contact"
     }
   ]
}
```

##Single Table
Description: Create a single table in the database. Note that the table name is part of the URL and must be properly encoded. Posted data must for a single table and not wrapped with the `table` wrapper, like above.

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/_schema/<table_name>`

#### Request
> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/todo HTTP/1.1
> Accept: application/json, text/javascript, */*; q=0.01
> Accept-Language: en-us,en;q=0.5
> Accept-Encoding: gzip, deflate
> Content-Type: application/json; charset=UTF-8
> X-Dreamfactory-Application-Name: admin
> Content-Length: 72
> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "name": "todo",
  "label": "Todo",
  "plural": "Todos",
  "field": [
    {
      "name": "id",
      "label": "Todo ID",
      "type": "id"
    },
    {
      "name": "name",
      "label": "Title",
      "type": "string"
    },
    {
      "name": "complete",
      "label": "Completed?",
      "type": "boolean",
      "allow_null": false,
      "default": false
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
  "name": "todo"
}
```

###Adding a Single Field
Description: Create a single field in a db table. The table and field name are part of the URL and must be properly encoded. For adding multiple fields at once, see [Updating Schema](Database-Updating-Schema) or [Patching Schema](Database-Patching-Schema).

URI: **POST** `http://<server_name>/rest/<service_name>/_schema/<table_name>/<field_name>`

#### Request
> POST http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/todo/created_date HTTP/1.1
> Accept: application/json, text/javascript, */*; q=0.01
> Accept-Language: en-us,en;q=0.5
> Accept-Encoding: gzip, deflate
> Content-Type: application/json; charset=UTF-8
> X-Dreamfactory-Application-Name: admin
> Content-Length: 72
> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

```javascript
{
  "name": "created_date",
  "label": "Created Date",
  "type": "timestamp_on_create"
}
```

#### Response
> HTTP/1.1 200 OK
> Content-Length: 69
> Content-Type: application/json

```javascript
{
  "name": "created_date"
}
```
