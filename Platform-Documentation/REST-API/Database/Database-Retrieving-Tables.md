The following operations are typically available for retrieving tables on all DreamFactory Database Services.

* [as a Resource List](#get-resources)
* [by Name, Including Available Properties](#get-properties)


## <a name="get-resources"></a>As a Resource List

Description: Retrieve a list of all tables available from the database service.

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getResources_get_0) to see this in action in our [Live API](Admin-Console-api-sdk).


#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db HTTP/1.1

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
  "resource": [
    {
      "name": "account",
      "label": "Account",
      "plural": "Accounts",
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
      "access": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    },
...
  ]
}
```

## <a name="get-properties"></a>By Name Including Available Properties

Description: Retrieve all available properties of one or more tables by name.

URI: **GET** `http[s]://<dsp-server-name>/rest/<service-api-name>?names=<table_names>`

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db/getTables_get_1) to see this in action in our [Live API](Admin-Console-api-sdk).

#### Request


> GET http://demo-dsp.cloud.dreamfactory.com/rest/db?names=Account%2CContact HTTP/1.1

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
          "length": 11,
          "precision": 11,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": false,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": true,
          "is_primary_key": true,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        },
        {
          "name": "name",
          "label": "Name",
          "type": "string",
          "db_type": "varchar(40)",
          "length": 40,
          "precision": 40,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": true,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": false,
          "is_primary_key": false,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        },
        {
          "name": "description",
          "label": "Description",
          "type": "string",
          "db_type": "text",
          "length": 0,
          "precision": 0,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": true,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": false,
          "is_primary_key": false,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        }
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
          "length": 11,
          "precision": 11,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": false,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": true,
          "is_primary_key": true,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        },
        {
          "name": "first_name",
          "label": "First Name",
          "type": "string",
          "db_type": "varchar(40)",
          "length": 40,
          "precision": 40,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": true,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": false,
          "is_primary_key": false,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        },
        {
          "name": "last_name",
          "label": "Last Name",
          "type": "string",
          "db_type": "varchar(40)",
          "length": 40,
          "precision": 40,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": true,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": false,
          "is_primary_key": false,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        },
        {
          "name": "description",
          "label": "Description",
          "type": "string",
          "db_type": "text",
          "length": 0,
          "precision": 0,
          "scale": 0,
          "default": null,
          "required": false,
          "allow_null": true,
          "fixed_length": false,
          "supports_multibyte": false,
          "auto_increment": false,
          "is_primary_key": false,
          "is_foreign_key": false,
          "ref_table": "",
          "ref_fields": "",
          "validation": null,
          "value": []
        }
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
