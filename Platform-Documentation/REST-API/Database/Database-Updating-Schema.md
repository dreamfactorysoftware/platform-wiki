The following operations are typically available for all DreamFactory Database Services. Refer to the specifics of your database type documented in other pages in this section. 
The **PUT** verb on most points of our API is meant to completely replace an existing resource. The same holds for the schema resource. If you wish to just add new fields or modify existing fields, **PATCH** is a simpler and preferred option, as it will not change anything in the schema except what is requested. 
Updating a table definition with **PUT** allows you to add or modify existing fields, as well as, delete unnecessary fields, but requires you to post all of the fields that you wish to remain in the schema. Any fields that are left out, will be deleted from the schema.


  * [Multiple Tables](#put-tables)
  * [Single Table](#put-table)
  * [Single Field](#put-field)

###Multiple Tables
Description: Update multiple tables in the database by replacing the schema with updated schema. 

URI: [**PUT**] `http://<server_name>/rest/<service_name>/_schema/`

####Request
```javascript
{
    "table": [
        {
            "name": "account",
            "label": "Account",
            "plural": "Accounts",
            "field": [
                {
                    "name": "new_field",
                    "label": "My New Field",
                    "type": "string"
                },
                …
            ]
        },
        {
            "name": "contact",
            "field": [
                {
                    "name": "old_field",
                    "label": "New Type",
                    "type": "integer"
                },
                …
            ]
        }
    ]
}
```

####Response
>HTTP/1.1 200 OK
Content-Length: 30
Content-Type: application/json

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

###Single Table
Description: Update a table in the database by replacing.

URI: [**PUT**] `http://<server_name>/rest/<service_name>/_schema/<table_name>`

####Request
```javascript
{
    "name": "contact",
    "label": "Contact",
    "field": [
        {
            "name": "new_field",
            "label": "My New Field",
            "type": "string"
        },
        …
    ]
}
```

####Response
```javascript
{
  "name": "contact"
}
```

###Single Field
Description: Update a single field in a db table. Here for completeness, this call behaves the same as using **PATCH** on a single field. For updating multiple fields at once, see [Patching Schema](Database-Patching-Schema).

URI: [**PUT**] `http://<server_name>/rest/<service_name>/_schema/<table_name>/<field_name>`

####Request
```javascript
{
  "label": "My New Label",
  "default": ""
}
```

####Response
```javascript
{
  "name": "contact"
}
```
