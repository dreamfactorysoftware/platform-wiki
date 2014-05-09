# Database Services Creating Records Operations

The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

## Single Record

Description: Create one or more new records for a db table.

#### Request 

HTTP Method: POST

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: http://<server_name>/rest/db/<tablename>

URI Parameters:

Name | Required | Description
:--- | :------: | :----------
`fields` | No | Comma-delimited list of fields to return in response. If this parameter is empty or missing, only the primary key(s) are returned. ‘*’ returns all viewable fields.

Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact?fields=FirstName%2CLastName HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Application-Name: Admin
Content-Length: 72
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

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


#### Response




Sample JSON Response



HTTP/1.1 200 OK
Date: Wed, 26 Dec 2012 20:49:11 GMT
Server: Apache
X-Powered-By: PHP/5.3.10-1ubuntu3.4
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 69
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json

```javascript
{
  "record": [
    {
      "FirstName": "Joe",
      "LastName": "Blow",
      "Id": "1"
    }
  ]
}
```

## Multiple Records for the Same Table


Description: Create one or more new records for a db table.

#### Request

HTTP Method: **POST**

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: http://<server_name>/rest/db/<tablename>

URI Parameters:

Parameter Name
Description
fields
Optional. Comma-delimited list of fields to return in response. If this parameter is empty or missing, only the primary key(s) are returned. ‘*’ returns all viewable fields.

Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact?fields=FirstName%2CLastName HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Application-Name: Admin
Content-Length: 72
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

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

#### Response

Sample JSON Response



HTTP/1.1 200 OK
Date: Wed, 26 Dec 2012 20:49:11 GMT
Server: Apache
X-Powered-By: PHP/5.3.10-1ubuntu3.4
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 69
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json

```javascript
{
  "record": [
    {
      "FirstName": "Joe",
      "LastName": "Blow",
      "Id": "1"
    }
  ]
}
```

