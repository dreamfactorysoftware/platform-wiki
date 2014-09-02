The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is, in this case, an auto-incrementing primary key.
This may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [List of Tables](#list)
* [Multiple Tables By Name](#multiple-tables)
* [Single Table](#single-table)
* [Single Field](#single-field)

##<a name="list"></a>List of Tables
Description: Return schema data for the database, listing all accessible tables based on role access.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/ HTTP/1.1

>Accept: application/json, text/javascript, */*; q=0.01

>Accept-Language: en-us,en;q=0.5

>Accept-Encoding: gzip, deflate

>X-Application-Name: Admin

>Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK

>Content-Length: 307

>Connection: Keep-Alive

>Content-Type: application/json

```javascript
{
    "resource": [
        {
            "name": "account",
            "label": "Account",
            "plural": "Accounts",
			"access": [
				"GET",
				...
			]
        },
        {
            "name": "contact",
            "label": "Contact",
            "plural": "Contacts",
			"access": [
				"GET",
				...
			]
        },
		...
    ]
}
```

##<a name="multiple-tables"></a>Multiple Tables By Name
Description: Retrieve all available properties of one or more tables by name.

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>/_schema/?names=<table_names>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getTables_get_1) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request
> GET http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema?names=account%2Ccontact HTTP/1.1

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
  "table": [
    {
      "name": "account",
      "label": "Account",
      "plural": "Accounts",
      "primary_key": "id",
      "name_field": null,
      "field": [
        {
          "name": "id",
          "label": "Id",
          "type": "id",
          "db_type": "int(11)",
          ...
        },
        ...
      ],
      "access": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    },
    {
      "name": "contact",
      "label": "Contact",
      "plural": "Contacts",
      "primary_key": "id",
      "name_field": null,
      "field": [
        {
          "name": "id",
          "label": "Id",
          "type": "id",
          "db_type": "int(11)",
          ...
        },
        ...
      ],
      "access": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    }
  ]
}
```

##<a name="single-table"></a>Single Table
Description: Return all schema data for a single db table.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema/<table_name>`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/account HTTP/1.1

>Accept: application/json, text/javascript, */*; q=0.01

>Accept-Language: en-us,en;q=0.5

>Accept-Encoding: gzip, deflate

>X-Application-Name: Admin

>X-Requested-With: XMLHttpRequest

>Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK

>Content-Length: 6290

>Content-Type: application/json

```javascript
{
    "name": "account",
    "label": "Account",
    "plural": "Accounts",
    "primary_key": "id",
    "name_field": "",
    "field": [
        {
            "name": "id",
            "label": "Account ID",
            "type": "id",
            "db_type": "int(11)",
            ...
        },
        ...
    ],
    "related": [
        {
            "name": "Contacts_by_AccountId",
            "type": "has_many",
            "ref_table": "Contact",
            "ref_field": "AccountId",
            "field": "Id"
        },
        ...
    ],
    "access": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "MERGE",
        "DELETE",
        "ADMIN"
    ]
}
```

##<a name="single-field"></a>Single Field
Description: Return schema data for a single field of a db table, including the name, label, and defining properties.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema/<table_name>/<field_name>`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/account/name HTTP/1.1

>Accept: application/json, text/javascript, */*; q=0.01

>Accept-Language: en-us,en;q=0.5

>Accept-Encoding: gzip, deflate

>X-Application-Name: Admin

>X-Requested-With: XMLHttpRequest

>Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK

>Content-Length: 6290

>Content-Type: application/json

```javascript
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
```

