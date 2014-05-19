The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [by Old or Partial Records](#get-records)
* [by Filter](#get-filter)
* [by List of Identifiers](#get-ids)
* [by a Single Identifier](#get-id)


## <a name="get-records"></a>By Old or Partial Records

Description: Refresh a client-side copy of old or partial records from a db table. Requires that at a minimum the old or partial records contain the identifying fields for the table.

URI: **POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecords_get_2) to see this in action in our [Live API](Admin-Console-api-sdk).


#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/contact?filter=last_name%3D%27Smith%27&fields=Id HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: Admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


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

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?filter=<filter_string>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecords_get_2) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/contact?filter=last_name%3D%27Smith%27&fields=id HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: Admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


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

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>?ids=<id_list>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecords_get_2) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/contact/1?fields=first_name%2Clast_name HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


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

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/<id>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getRecords_get_2) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/account/2

> HTTP/1.1

> Accept: application/json, text/javascript, */*; q=0.01

> Accept-Language: en-us,en;q=0.5

> Accept-Encoding: gzip, deflate

> X-Application-Name: admin

> Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


#### Response


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
