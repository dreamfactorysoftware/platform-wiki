# Database Services Updating Record Operations

The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

  * [Multiple Tables](Database-Updating-Schema#put-tables)
  * [Single Table](Database-Updating-Schema#put-table)
  * [Single Field](Database-Updating-Schema#put-field)

* [by Updated Records](#put-records)
* [by Filter](#put-filter)
* [by List of Identifiers](#put-ids)
* [by a Single Identifier](#put-id)


### <a name="put-id"></a>A single record

Description: Delete one or more existing records for a db or system table.

#### Request

HTTP Method: **POST** (requires additional header, see Request Headers below)

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: http://<server_name>/rest/db/<tablename>/<Id>


POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact/2 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175
Content-Length: 0

Request Body: None


#### Response


HTTP/1.1 200 OK
Content-Length: 34
Content-Type: application/json

```javascript
{
"record": [
{
"id": "2"
}
]
}
```


### A single record given an identifier

Description: Delete one or more existing records for a db or system table.

#### Request

HTTP Method: POST (requires additional header, see Request Headers below)

Headers: No additional headers required, See Section 1 – REST Services.

URI: http://<server_name>/rest/db/<tablename>/<Id>

URI Parameters:



Parameter Name
Description
format
Optional. xml or json, default is json.
ids
Required when no id specified in base url. Comma-delimited list of ids to delete, must be url-encoded. If this parameter is required and is empty or missing an error will be returned.
fields
Optional. Comma-delimited list of fields to return in response, must be url-encoded. Empty or missing returns the primary key(s). ‘*’ returns all viewable fields.


Request Body: None



Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact/2 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175
Content-Length: 0




Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 34
Content-Type: application/json

{
"record": [
{
"id": "2"
}
]
}



### Multiple records
Description: Delete one or more existing records for a db or system table.

Request HTTP Method: POST (requires additional header, see Request Headers below)

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/<Id>

URI Parameters:



Parameter Name
Description
format
Optional. xml or json, default is json.
ids
Required when no id specified in base url. Comma-delimited list of ids to delete, must be url-encoded. If this parameter is required and is empty or missing an error will be returned.
fields
Optional. Comma-delimited list of fields to return in response, must be url-encoded. Empty or missing returns the primary key(s). ‘*’ returns all viewable fields.


Request Body: None



Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact/2 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175
Content-Length: 0




Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 34
Content-Type: application/json

{
"record": [
{
"fields": {
"id": "2"
}
}
]
}



### <a name="put-ids"></a>Multiple records given identifier list
Description: Delete one or more existing records for a db or system table.

Request HTTP Method: POST (requires additional header, see Request Headers below)

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>/<Id>

URI Parameters:



Parameter Name
Description
format
Optional. xml or json, default is json.
ids
Required when no id specified in base url. Comma-delimited list of ids to delete, must be url-encoded. If this parameter is required and is empty or missing an error will be returned.
fields
Optional. Comma-delimited list of fields to return in response, must be url-encoded. Empty or missing returns the primary key(s). ‘*’ returns all viewable fields.


Request Body: None



Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact/2 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175
Content-Length: 0




Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 34
Content-Type: application/json

{
"record": [
{
"fields": {
"id": "2"
}
}
]
}



### <a name="put-filter"></a>Multiple records given a filter
Description: Update one or more existing records for a db or system table.

Request HTTP Method: POST (requires additional header, see Request Headers below)

Headers: No additional headers required, See [Common Headers and Parameters](Common-Headers-Parameters).

URI: `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>



URI Parameters:



Parameter Name
Description
format
Optional. xml or json, default is json.
fields
Optional. Comma-delimited list of fields to return in response, must be url-encoded. Empty or missing returns the primary key(s). ‘*’ returns all viewable fields.


Request Body: See sample request. Multiple records can be updated in a single request . Id field is required for each record.



Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/Contact?fields=FirstName HTTP/1.1
Host: demo-dsp.cloud.dreamfactory.com
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-HTTP-Method: MERGE
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Referer: http://demo-dsp.cloud.dreamfactory.com/test_rest.html
Content-Length: 67
Cookie: __utma=266480603.1816165661.1350406266.1354720865.1355498741.19; __utmz=266480603.1354720865.18.5.utmcsr=ec2-23-20-28-223.compute-1.amazonaws.com|utmccn=(referral)|utmcmd=referral|utmcct=/; PHPSESSID=as6klno8t5cd5i2o49n2nci175
Pragma: no-cache
Cache-Control: no-cache

{
"records": {
"record": [
{
"fields": {
"Id": "1",
"FirstName": "Joseph"
}
}
]
}
}


Sample JSON Response



HTTP/1.1 200 OK
Date: Wed, 26 Dec 2012 21:19:06 GMT
Server: Apache
X-Powered-By: PHP/5.3.10-1ubuntu3.4
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 55
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json

{
"record": [
{
"fields": {
"FirstName": "Joseph",
"id": "1"
}
}
]
}

