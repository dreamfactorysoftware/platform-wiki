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


 Retrieving the Schema
 List of Tables


Description: Return schema data for the database, listing all tables.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/system/schema/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 307
Connection: Keep-Alive
Content-Type: application/json

{
"resource": [
{
"name": "app",
"label": "Application",
"plural": "Applications"
},
{
"name": "app_group",
"label": "Application Group",
"plural": "Application Groups"
},
{
"name": "role",
"label": "Role",
"plural": "Roles"
}, {
"name": "service",
"label": "Service",
"plural": "Services"
}, {
"name": "user",
"label": "User",
"plural": "Users"
}
]
}

Sample XML Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/system/schema/?format=xml HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
X-Application-Name: Admin
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 610
Connection: Keep-Alive
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<resources>
<resource>
<name>app</name>
<label>Application</label>
<plural>Applications</plural>
</resource>
<resource>
<name>app_group</name>
<label>Application Group</label>
<plural>Application Groups</plural>
</resource>
<resource>
<name>role</name>
<label>Role</label>
<plural>Roles</plural>
</resource>
<resource>
<name>service</name>
<label>Service</label>
<plural>Services</plural>
</resource>
<resource>
<name>user</name>
<label>User</label>
<plural>Users</plural>
</resource>
</resources>
</dfapi>

 Table Schema
Description: Return schema data for a single db table, including table name and labels as well as field and related schema.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<tablename>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/schema/App HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

{
"table": {
"name": "app",
"label": "App",
"plural": "Apps",
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
"validation": "",
"values": []
},
{
"name": "api_name",
"label": "Api Name",
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
"validation": "",
"values": []
},
{
"name": "is_active",
"label": "Is Active",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 1,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "url",
"label": "Url",
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
"validation": "",
"values": []
},
{
"name": "is_url_external",
"label": "Is Url External",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "schemas",
"label": "Schemas",
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
"validation": "",
"values": []
},
{
"name": "filter_by_device",
"label": "Filter By Device",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_phone",
"label": "Filter Phone",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_tablet",
"label": "Filter Tablet",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "filter_desktop",
"label": "Filter Desktop",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "requires_plugin",
"label": "Requires Plugin",
"type": "boolean",
"db_type": "tinyint(1)",
"length": 1,
"precision": 1,
"scale": 0,
"default": 0,
"required": false,
"allow_null": false,
"fixed_length": false,
"supports_multibyte": false,
"auto_increment": false,
"is_primary_key": false,
"is_foreign_key": false,
"ref_table": "",
"ref_fields": "",
"validation": "",
"values": []
},
{
"name": "import_url",
"label": "Import Url",
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
"validation": "url",
"values": []
},
{
"name": "created_date",
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
"validation": "api_read_only",
"values": []
},
{
"name": "last_modified_date",
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
"validation": "api_read_only",
"values": []
},
{
"name": "created_by_id",
"label": "Created By Id",
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
"ref_table": "user",
"ref_fields": "id",
"validation": "api_read_only",
"values": []
},
{
"name": "last_modified_by_id",
"label": "Last Modified By Id",
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
"ref_table": "user",
"ref_fields": "id",
"validation": "api_read_only",
"values": []
}
],
"related": [
{
"name": "user_by_created_by_id",
"type": "belongs_to",
"ref_table": "user",
"ref_field": "id",
"field": "created_by_id"
},
{
"name": "user_by_last_modified_by_id",
"type": "belongs_to",
"ref_table": "user",
"ref_field": "id",
"field": "last_modified_by_id"
},
{
"name": "app_to_app_groups_by_app_id",
"type": "has_many",
"ref_table": "app_to_app_group",
"ref_field": "app_id",
"field": "id"
},
{
"name": "app_groups_by_app_to_app_group",
"type": "many_many",
"ref_table": "app_group",
"ref_field": "id",
"join": "app_to_app_group(app_id,app_group_id)",
"field": "id"
},
{
"name": "app_to_roles_by_app_id",
"type": "has_many",
"ref_table": "app_to_role",
"ref_field": "app_id",
"field": "id"
},
{
"name": "roles_by_app_to_role",
"type": "many_many",
"ref_table": "role",
"ref_field": "id",
"join": "app_to_role(app_id,role_id)",
"field": "id"
},
{
"name": "app_to_services_by_app_id",
"type": "has_many",
"ref_table": "app_to_service",
"ref_field": "app_id",
"field": "id"
},
{
"name": "services_by_app_to_service",
"type": "many_many",
"ref_table": "service",
"ref_field": "id",
"join": "app_to_service(app_id,service_id)",
"field": "id"
},
{
"name": "roles_by_default_app_id",
"type": "has_many",
"ref_table": "role",
"ref_field": "default_app_id",
"field": "id"
},
{
"name": "users_by_role",
"type": "many_many",
"ref_table": "user",
"ref_field": "id",
"join": "role(default_app_id,created_by_id)",
"field": "id"
},
{
"name": "users_by_role",
"type": "many_many",
"ref_table": "user",
"ref_field": "id",
"join": "role(default_app_id,last_modified_by_id)",
"field": "id"
},
{
"name": "users_by_default_app_id",
"type": "has_many",
"ref_table": "user",
"ref_field": "default_app_id",
"field": "id"
},
{
"name": "roles_by_user",
"type": "many_many",
"ref_table": "role",
"ref_field": "id",
"join": "user(default_app_id,role_id)",
"field": "id"
}
]
}
}

 Field Schema
Description: Return schema data for a single field of a db table, including the name, label, and defining properties.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<tablename>/<field_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: See sample response.



Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/schema/app/name HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
X-Requested-With: XMLHttpRequest
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 6290
Content-Type: application/json

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


 Create Table
 Multiple Tables at Once
Description: Create one or more tables in the database.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/schema/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Application-Name: Admin
Content-Length: 971
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

{
"table": [
{
"name": "account",
"label": "Account",
"plural": "Accounts",
"field": [
{
"name": "id",
"label": "Record ID",
"type": "id"
},
…
]
},
{
"name": "contact",
"label": "Contact",
"plural": "Contacts",
"field": [
{
"name": "id",
"label": "Record ID",
"type": "id"
},
…
]
}
]
}

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 30
Content-Type: application/json

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


 Single Table
Description: Create a single table in the database.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.

Response Body: See sample response.



Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/db/schema/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Application-Name: Admin
Content-Length: 971
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175

{
"name": "contact",
"label": "Contact",
"plural": "Contacts",
"field": [
{
"name": "id",
“label": "Record ID",
"type": "id"
},
…
]
}

Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 30
Content-Type: application/json

{
"name": "contact"
}

 Update Table
 Multiple Tables at Once
Description: Update multiple tables in the database by adding new fields or altering existing fields.

Request HTTP Method: PUT/MERGE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



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


Response Body: See sample response.


HTTP/1.1 200 OK
Content-Length: 30
Content-Type: application/json

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


 Single Table
Description: Update a table in the database by adding new fields or altering existing fields.

Request HTTP Method: PUT/MERGE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



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


Response Body: See sample response.

{
"name": "contact"
}


 Delete Table
 Multiple Tables at Once - (TBD)
Description: Delete (aka drop) multiple tables from the database.

Request HTTP Method: DELETE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/?tables=<table_list>

Request URI Parameters:



Parameter Name
Description
tables
Required. Comma-delimited list of table names. Tables will be dropped in the order given.


Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



 Delete a Single Table
Description: Delete (aka drop) a single table from the database.

Request HTTP Method: DELETE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



 Add Field
Description: Create a single field in a db table. For adding multiple fields at once, see Update Table.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



 Update Field
Description: Update a single field in a db table. For updating multiple fields at once, see Update Table.

Request HTTP Method: PUT/MERGE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>/<field_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



 Delete Field
 Delete Multiple Fields - (TBD)
Description: Delete (aka drop) multiple fields from a table.

Request HTTP Method: DELETE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>?fields=<field_list>

Request URI Parameters:



Parameter Name
Description
fields
Required. Comma-delimited list of field names from the given table. Fields will be dropped in the order given.


Request Body: See sample request. Schema for the new table.



Response Body: See sample response.



 Delete a Single Field
Description: Delete (aka drop) a single field on a db table.

Request HTTP Method: DELETE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/schema/<table_name>/<field_name>

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. Schema for the new table.



Response Body: See sample response.


