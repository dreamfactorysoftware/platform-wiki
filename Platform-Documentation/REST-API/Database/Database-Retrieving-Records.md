The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is, in this case, an auto-incrementing primary key.
This may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

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

### Examples
**Scenario A:** You have a database on your DSP with a table called Clients with fields ID, Firstname, Surname and want to find all your clients who are called "Smith". 

URI:  **GET** `http[s]://<dsp-server-name>/rest/db/Clients?filter=surname%3D'Smith'`

LIVE API: `http://<dsp-server-name>/swagger/#!/db/getRecordsByFilter`

_Parameters:_
```
table_name: Clients
...
filter: Surname='Smith'
...
```


**Scenario B:** You have a database on your DSP with a table called Clients with fields ID, Firstname, Surname and want to find all you clients with names beginning with Sm

URI: **GET** `http[s]://<dsp-server-name>/rest/db/Clients?filter=surname%20LIKE%20'Sm%25'`

LIVE API: `http://<dsp-server-name>/swagger/#!/db/getRecordsByFilter`

_Parameters:_
```
table_name: Clients
...
filter: Surname LIKE 'Sm%'
...
```

Scenario B is equivalent to SQL: SELECT * FROM Clients WHERE Surname LIKE 'Sm%'
So DreamFactory supports mySQL wildcards. In this case % matches an arbitrary number of characters (including zero characters) See: http://dev.mysql.com/doc/refman/5.5/en/pattern-matching.html 

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

