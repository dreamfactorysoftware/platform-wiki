The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is, in this case, an auto-incrementing primary key.
This may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

* [as Resources](Database-Retrieving-Resources#get-resources)
* [as List of Resource Names](Database-Retrieving-Resource-List#get-names-only)
* [as Access Components](Database-Retrieving-Components#get-access-components)

##List of Tables
Description: Return schema data for the database, listing all tables.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/system/schema/ HTTP/1.1
>Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK
Content-Length: 307
Connection: Keep-Alive
Content-Type: application/json

```javascript
{
    "resource": [
        {
            "name": "account",
            "label": "Account",
            "plural": "Accounts"
        },
        {
            "name": "contact",
            "label": "Contact",
            "plural": "Contacts"
        },
        {
            "name": "opportunity",
            "label": "Opportunity",
            "plural": "Opportunities"
        }
    ]
}
```

##Single Table
Description: Return schema data for a single db table, including table name and labels as well as field and related schema.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema/<tablename>`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/schema/App HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

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
            "name": "Description",
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
        },
        {
            "name": "Industry",
            "label": "Industry",
            "type": "string",
            "db_type": "varchar(255)",
            "length": 255,
            "precision": 255,
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
            "value": [
                "Agriculture",
                "Apparel",
                "Banking",
                "Biotechnology",
                "Chemicals",
                "Communications",
                "Construction",
                "Consulting",
                "Education",
                "Electronics",
                "Energy",
                "Engineering",
                "Entertainment",
                "Environmental",
                "Finance",
                "Food & Beverage",
                "Government",
                "Healthcare",
                "Hospitality",
                "Insurance",
                "Machinery",
                "Manufacturing",
                "Media",
                "Not For Profit",
                "Recreation",
                "Retail",
                "Shipping",
                "Software",
                "Technology",
                "Telecommunications",
                "Transportation",
                "Utilities",
                "Other"
            ]
        },
        {
            "name": "IsPartner",
            "label": "Partner Account",
            "type": "boolean",
            "db_type": "tinyint(1)",
            "length": 1,
            "precision": 1,
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
            "name": "Name",
            "label": "Account Name",
            "type": "string",
            "db_type": "varchar(255)",
            "length": 255,
            "precision": 255,
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
            "validation": null,
            "value": []
        },
        {
            "name": "NumberOfEmployees",
            "label": "Employees",
            "type": "integer",
            "db_type": "int(11)",
            "length": 11,
            "precision": 11,
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
            "name": "Phone",
            "label": "Phone",
            "type": "string",
            "db_type": "varchar(255)",
            "length": 255,
            "precision": 255,
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
            "name": "CreatedById",
            "label": "Created By ID",
            "type": "user_id_on_create",
            "db_type": "int(11)",
            "length": 11,
            "precision": 11,
            "scale": 0,
            "default": null,
            "required": true,
            "allow_null": false,
            "fixed_length": false,
            "supports_multibyte": false,
            "auto_increment": false,
            "is_primary_key": false,
            "is_foreign_key": true,
            "ref_table": "df_sys_user",
            "ref_fields": "id",
            "validation": {
                "api_read_only": {
                    "on_fail": "ignore_field"
                }
            },
            "value": []
        },
        {
            "name": "CreatedDate",
            "label": "Created Date",
            "type": "timestamp_on_create",
            "db_type": "timestamp",
            "length": 0,
            "precision": 0,
            "scale": 0,
            "default": "0000-00-00 00:00:00",
            "required": false,
            "allow_null": false,
            "fixed_length": false,
            "supports_multibyte": false,
            "auto_increment": false,
            "is_primary_key": false,
            "is_foreign_key": false,
            "ref_table": "",
            "ref_fields": "",
            "validation": {
                "api_read_only": {
                    "on_fail": "ignore_field"
                }
            },
            "value": []
        },
        {
            "name": "LastModifiedById",
            "label": "Last Modified By ID",
            "type": "user_id_on_update",
            "db_type": "int(11)",
            "length": 11,
            "precision": 11,
            "scale": 0,
            "default": null,
            "required": true,
            "allow_null": false,
            "fixed_length": false,
            "supports_multibyte": false,
            "auto_increment": false,
            "is_primary_key": false,
            "is_foreign_key": true,
            "ref_table": "df_sys_user",
            "ref_fields": "id",
            "validation": {
                "api_read_only": {
                    "on_fail": "ignore_field"
                }
            },
            "value": []
        },
        {
            "name": "LastModifiedDate",
            "label": "Last Modified Date",
            "type": "timestamp_on_update",
            "db_type": "timestamp",
            "length": 0,
            "precision": 0,
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
            "validation": {
                "api_read_only": {
                    "on_fail": "ignore_field"
                }
            },
            "value": []
        },
        {
            "name": "OwnerId",
            "label": "Owner ID",
            "type": "user_id",
            "db_type": "int(11)",
            "length": 11,
            "precision": 11,
            "scale": 0,
            "default": null,
            "required": true,
            "allow_null": false,
            "fixed_length": false,
            "supports_multibyte": false,
            "auto_increment": false,
            "is_primary_key": false,
            "is_foreign_key": true,
            "ref_table": "df_sys_user",
            "ref_fields": "id",
            "validation": null,
            "value": []
        }
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
####Single Field
Description: Return schema data for a single field of a db table, including the name, label, and defining properties.

URI: **GET** `http://<server_name>/rest/<service_name>/_schema/<table_name>/<field_name>`

####Request
>GET http://demo-dsp.cloud.dreamfactory.com/rest/db/_schema/account/name HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

####Response
>HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

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

