## Database Schema Operations

By "schema", we mean in its traditional SQL database sense, i.e. a set of properties that define the layout of tables and their fields including relationships between them. However, we have extended this meaning to also encompass the properties that define tables on NoSQL database, i.e. any table key configuration, etc., some of which are database-type dependent.

We have also added what we call [Schema Extensions](#extensions), including a familiar json input and output format, consolidated simplified data types, table and field labels, and additional "helper" functions to aid client side usage of the schema, as it pertains to managing table records.

All calls to this resource take the form of...

`http[s]://<dsp-server-name>/rest/<service-api-name>/_schema/[<table_name>/[<field_name>]]`

where `table_name` and `field_name` are optional and control what level of resource the client is acting on.
All posted and returned data, when not using the `table_name` or `field_name` parameters, or otherwise noted, must be an array of table-defining property sets wrapped with a `table` element.

```javascript
{
  "table": [
    {
      "name": "<table_name>",
      ...
    },
    ...
  ]
}
```
### Schema Extensions

#### Labels

#### Simplified Data Types

#### Validations

 Schema Service
The SQL database schema service provides a way of managing the SQL database, retrieving the viewable fields and their storage types and requirements.

 Defining the Schema
 Defining a Table

You can create or edit tables by sending an array of tables as seen below or as a single table object with the "table" tag. An "allow_alter" url parameter can be sent when POSTing schema for allowing edits to existing tables (upgrading), otherwise, use a PUT/MERGE request to alter tables.

Table Name (name): The SQL compatible table name, prefer alpha-numeric, lowercase singular nouns, using underscore for separating words. Prefixes can be used to group like tables for apps.

Table Labels (label, plural): Labels in singular and plural form are tracked in a system table and used for display only purposes, not used in API calls, can contain utf-8 characters, including spaces, but no other whitespace characters.

Table Options (options): These are SQL fragments for the table, such as defining complicated multi-field keys, or the MySQL engine version, i.e. "ENGINE=InnoDB".

Table Fields (field): An array of fields, each with defining properties. See below for definition specifics.

Example...
{
    "table": [
        {
            "name": "my_table_name",
            "label": "Contact",
            "plural": "Contacts",
            "field": [
                {...},
                {...}
            ],
            "options": "some SQL fragments, etc"
        }
    ]
}

 Defining a Field

Each field consists of properties that define that field and its usage. The properties may be of the following db-agnostic layout, which support some additional non-SQL features (labels, picklist, validation, etc), or direct SQL-defining strings supported by the underlying db, i.e. "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY".

The following are details about each of the properties supported.

Name (name): String. Required. The SQL compatible field name, prefer alpha-numeric, lowercase singular nouns, underscore separating words. This name will be used in the API for requests and responses.

Label (label): String. Optional. Labels in singular form are tracked in a system table and used for display only purposes, not used in API calls, can contain utf-8 characters, including spaces, but no other whitespace characters. If not defined, a label will be generated using the name field.

SQL Definition (sql): String. Optional. Allows a pure SQL-compatible definition for a field. If this property is defined, no other properties besides the name and label are looked at. SQL types in the definition must be supported directly by the underlying database as no translations are done.

Type (type): String. Required if “sql” property is not defined. The field type can be one of the simple types provided by the API defined below (i.e. “string”), or other types supported directly by the underlying database (i.e. "nvarchar"). The supported simple types are defined as follows.

Types

id : defines a typical table identifier, translates to "int not null auto_increment primary key". This type requires no other properties to define the field. It presumes a "type" of int with "allow_null" set to false, the "auto_increment" and "is_primary_key" are set to true. It can only be used once in a table definition.
reference: defines a typical foreign key, presumes the "type" of int and requires the "ref_table" and "ref_fields" properties to be defined as well. Optional defining properties are "ref_on_delete", "ref_on_update", "allow_null" and "default". Similar to SQL fragment "FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE”.
string: defines a string field (i.e. varchar or char), defaults to a length of 255, but can be set using the "length" property. Set the "fixed_length" property to true for fixed length (i.e. char) behavior. Set "supports_multibyte" for multi-byte, national (i.e. nvarchar) behavior. Other optional properties are "allow_null", "default", and "validation".
binary: defines a binary string field (i.e. varbinary or binary), defaults to a length of 255, but can be set using the "length" property. Set the "fixed_length" property to true for fixed length (i.e. binary) behavior. Optional properties are "allow_null", "default", and "validation".
text: defines a large string field (i.e. MySQL's text or MSSQL's varchar[max]), defaults to the largest length string allowed by the underlying database. Optional properties are "allow_null", "default", and "validation".
blob: defines a large binary string field (i.e. MySQL's blob or MSSQL's varbinary[max]), defaults to the largest length binary string allowed by the underlying database. Optional properties are "allow_null", "default", and "validation".
boolean: defines a boolean field, which may be represented by int of length 1, using 0 and 1 values, if a true and false boolean type is not supported by the underlying database. Optional properties are "allow_null", "default".
integer: defines an integer field. Use "length" to set the displayable length of the integer, i.e. int(11) in MySQL. Optional properties are "allow_null", "default", and "validation".
float: defines a standard float field. Use “scale" to set the number of desired decimal places to the right of the decimal point. Use “length” or "precision" to set the total number of digit positions. Optional properties are "allow_null", "default".
decimal: defines a standard decimal field. Use “scale" to set the number of desired decimal places to the right of the decimal point. Use “length” or "precision" to set the total number of digit positions. Optional properties are "allow_null", "default", and "validation".
datetime: a datetime field. Optional properties are "allow_null", "default", and "validation".
date: a date field. Optional properties are "allow_null", "default", and "validation".
time: a time field. Optional properties are "allow_null", "default", and "validation".
timestamp_on_create: a timestamp with timezone awareness, i.e. MySQL’s timestamp not null default 0 or MSSQL’s datetimeoffset. This will be automatically set on record creation and not updated again unless set by the client via the api. See api_read_only validation for keeping this from being set by api.
timestamp_on_update: a timestamp with timezone awareness, i.e. MySQL’s timestamp not null default now() on update now() or MSSQL’s datetimeoffset. This will be automatically set on record creation and again on every update. See api_read_only validation for keeping this from being set by api.
user_id_on_create: a reference to the current user. On the native database, this is implemented as a reference to the user table, on other databases, it is implemented as an  integer. This will be automatically set on record creation and not updated again unless set by the client via the api. See api_read_only validation for keeping this from being set by api.
user_id_on_update: a reference to the current user. On the native database, this is implemented as a reference to the user table, on other databases, it is implemented as an  integer. This will be automatically set on record creation and again on every update. See api_read_only validation for keeping this from being set by api.

Length (length): Integer. Optional. Used to define the max length of strings and number fields. For strings, if length is not defined, the default is 255.

Fixed Length (fixed_length): Boolean. Optional for string types. Set to true to represent string types as fixed length ‘char’, false for variable length ‘varchar’.

Precision and Scale (precision, scale): Integers. Optional. Used by the “decimal” type, where “scale” defines the number of decimal places to the right of the decimal. The total length of the number allowed minus the ‘.’ can be set either by the “length” property or the “precision” property, “length” takes precedence. If scale is not given, the default is 0, i.e. no decimal places.

Default Value (default): Varies. Optional. Use to define the SQL DEFAULT parameter of a field, supported values are dependent on the "type" designation, but may include null, strings, numbers, and SQL expressions, i.e. "NOW()" for datetime, etc.

Allow NULL Values (allow_null): Boolean. Optional. Defines whether or not the NULL value is allowed to be set for the field, ie. false = "NOT NULL". If not defined, the default is allow NULL (true).

Picklist Values (values): Array of Strings. Optional. An array of string values for support of the "picklist" and "multi_picklist" validations.

Auto Increment (auto_increment): Boolean. Optional. Set to true to allow auto-incrementing of an integer or primary key. If not defined, the default is false.

Primary Key (is_primary_key): Boolean. Optional. Set to true to define non-trivial primary keys, use once per table definition. If not defined, the default is false. See the “id” type.

Foreign Key (is_foreign_key): Boolean. Optional. Set to true to define references or foreign keys that are not stored as integers or point to multiple primary keys. If not defined, the default is false. See the “reference” type.

Referenced Table (ref_table): defines the table name of the field of type "reference" or when "is_foreign_key" is true.

Referenced Fields (ref_fields): defines the field(s) of the referenced table defined by “ref_table” property that the field is referencing. If multiple fields are part of the key, separate the fields by a comma. Required for fields of type “reference” or when the “is_foriegn_key” is true.

Referenced Delete Operation (ref_on_delete): defines the operation to take when the referenced record is deleted. Optional for fields of type “reference” or when the “is_foriegn_key” is true.

Referenced Update Operation (ref_on_update): defines the operation to take when the referenced record is updated. Optional for fields of type “reference” or when the “is_foriegn_key” is true.

Unique Index (is_unique): Boolean. Optional. Set to true to require that each row has a unique value for this field.

Index (is_index): Boolean. Optional. Set to true to set the field as a table index to speed up common searches that use this field.

Validation (validation): Some server-side validation can be defined for the field by setting this property to one or more of the following, separated by commas. Note that additional validation will result in additional processing which may slow response times.
Validations
picklist - Supported for string type only. It requires the field value to be set to one of the values listed in the "values" property. Values are checked only at create and update record; data integrity is kept for existing values even when the picklist value list is modified. Behaves similar to MySQL "enum" type.
multi_picklist - similar to picklist but allows multiple values to be selected and stored. Behaves similar to MySQL "set" type.
api_read_only - sets this field as read only through the API. Use “default” property to set values, i.e. useful for creating timestamps, etc. Supported for all types.
create_only - sets this field to only allow values to be set on record creation. Supported for all types.
not_empty - validates that the field value to be set is not empty string. Supported for string and picklist types,
not_zero - validates that the field value to be set is not zero (0). Supported for integers, decimals and floats.
range(min,max) - validates that the numeric value to be set is between the min and max values designated. Supported for integers, decimals and floats.
email - validates that this field is an email, i.e. “name@company.com”. Supported for string type only.
url - validates that this field is a url, i.e. starts with “http(s)://”. Supported for string type only.
match(expression) - for strings matching a reg expression designated by expression. No validation by default if not defined or empty. Supported for string type only.

Examples...
    {
        "name": "id",
        "type": "id"
    },
    {
        "name": "first_name",
        "type": "string",
        "is_index": true
    },
    {
        "name": "last_name",
        "label": "Last Name",
        "type": "string",
        "length": 40,
        "default": “”,
        "allow_null": false,
        "is_index": true
    },
    {
        "name": "display_name",
        "label": "Display Name",
        "type": "string",
        "length": 255,
        "allow_null": false,
        "supports_multibyte": true,
        "is_unique": true,
        “validation”: “not_empty”
    },
    {
        "name": "description",
        "label": "What’s the deal...",
        "type": "text",
    },
    {
        "name": "email",
        "label": "Email",
        "type": "string",
        "length": 320,
        "default": null,
        "allow_null": true,
        “validation”: “email”
    },
    {
        "name": "phone",
        "label": "Phone",
        "type": "string",
        "length": 12,
        "default": “”,
        "allow_null": false,
        "fixed_length": true
        “validation”: “match(nnn-nnn-nnnn)”
    },
    {
        "name": "Rating",
        "label": "Rating",
        "type": "string",
        "length": 40,
        “values”: [ “Unknown”,”Cold”,”Warm”,”Hot” ],
        "default": “Unknown”,
        "allow_null": false,
        “validation”: “picklist,not_empty”
    },
    {
        "name": "website",
        "label": "Website",
        "type": "string",
        “validation”: “url”
    },
    {
        "name": "account_id",
        "label": "Account Id",
        "type": "reference",
        "ref_table": "account",
        "ref_fields": "id"
    },
    {
        "name": "reports_to_id",
        "label": "Reports To Id",
        "type": "reference",
        "ref_table": "contact",
        "ref_fields": "id"
    },
    {
        "name": "created_date",
        "label": "Created Date",
        "type": "timestamp_on_create",
        “validation”: “api_read_only”
    },
    {
        "name": "last_modified_date",
        "label": "Last Modified Date",
        "type": "timestamp_on_update",
        “validation”: “api_read_only”
    },
    {
        "name": "created_by_id",
        "label": "Created By Id",
        "type": "user_id_on_create",
        “validation”: “api_read_only”
    },
    {
        "name": "last_modified_by_id",
        "label": "Last Modified By Id",
        "type": "user_id_on_update",
        “validation”: “api_read_only”
    }



### Schema CRUD

See the following sections for more detail on CRUD operations for database schema...

* [Retrieving Schema](Database-Retrieving-Schema)
* [Creating Schema](Database-Creating-Schema)
* [Updating or Replacing Schema](Database-Updating-Schema)
* [Patching or Merging Schema](Database-Patching-Schema)
* [Deleting Schema](Database-Deleting-Schema)
