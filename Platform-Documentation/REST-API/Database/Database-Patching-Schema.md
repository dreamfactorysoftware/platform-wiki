The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

  * [Multiple Tables](#patch-tables)
  * [Single Table](#patch-table)
  * [Single Field](#patch-field)

###Multiple Tables
Description: Update multiple tables in the database by adding new fields or altering existing fields.

URI: [**PATCH** | **MERGE**] `http://<server_name>/rest/<service_name>/_schema/`

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
Description: Update a table in the database by adding new fields or altering existing fields.

URI: [**PATCH** | **MERGE**] `http://<server_name>/rest/<service_name>/_schema/<table_name>`

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

###Update Field
Description: Update a single field in a db table. For updating multiple fields at once, see [Patching Schema](Database-Patching-Schema).

URI: [**PATCH** | **MERGE**] `http://<server_name>/rest/<service_name>/_schema/<table_name>/<field_name>`

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
