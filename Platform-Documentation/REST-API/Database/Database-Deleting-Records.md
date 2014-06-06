# Database Services Deleting Records Operations

The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [by List of Records](#delete-records)
* [by Filter](#delete-filter)
* [by List of Identifiers](#delete-ids)
* [by a Single Identifier](#delete-id)


### <a name="delete-id"></a>A single record
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



### A single record given an identifier
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



### <a name="delete-records"></a>Multiple records
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



### <a name="delete-ids"></a>Multiple records given identifier list
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



### <a name="delete-filter"></a>Multiple records given a filter

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

