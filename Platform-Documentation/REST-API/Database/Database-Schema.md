The DSP database schema resource provides a way of managing the database table layout, usable fields, their storage types and requirements.
By "schema", we mean in its traditional SQL database sense, i.e. a set of properties that define the layout of tables and their fields including relationships between them, not the [schema namespaces](http://msdn.microsoft.com/en-us/library/ms176011.aspx) used by Microsoft and other database vendors. However, we have extended this meaning to also encompass the properties that define tables on NoSQL database, i.e. any table key configuration, etc., some of which are database-type dependent.

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

The REST API supports a hierarchy of resources of which to manage the database schema, centered around the table and field levels. For more detail see the [Schema Operations](#operations) section below.

We have also added what we call [Schema Extensions](#extensions), including the following...

  * a client-friendly **JSON** input and output [format](#format)
  * consolidated simplified data [types](#types)
  * table and field [labels](#labels)
  * and server-side [validations](#validations) for helping clients control data sent to the database.

###<a name="extensions"></a>Schema Extensions

While there are plenty of "standard" elements that you can expect to be present in most databases, particularly SQL-based ones, there are also plenty of vendor-specific types, commands, formats, etc. that make it bothersome, and sometimes difficult for client application development. After dealing with that for several years, we decided to try to make things easier by providing the following extensions. 

If you know your favorite database flavored SQL, or NoSQL, like the back of your hand, we will not hinder you (though you might find some of this useful), but if you are like most application developers, the last thing you want to do is go find your database documentation, load up some workbench environment, and/or beg a friend or a perfect stranger for help just to define a table to store your application's data.

#### <a name="format"></a>Layout Format

Below is a JSON schema layout we came up with (pooled from various other platforms and environments over the years) to help define your table configuration, including our extensions, with each element defined below. All elements may not be available for all database, table, or field types.
```javascript
{
  "table": [
    {
      "name": "<table_name>",
      "label": "<table_label>",
      "plural": "<table_plural_label>",
      "field": [
        "name": "<field_name>",
        "label": "<field_label>",
        "type": "<dreamfactory_type>",
        "db_type": "<database_specific_type>",
        "length": <max_length>,
        "precision": <decimal_precision>,
        "scale": <decimal_scale>,
        "default": <default_value>,
        "required": false,
        "allow_null": false,
        "fixed_length": false,
        "supports_multibyte": false,
        "auto_increment": true,
        "is_index": true,
        "is_unique": true,
        "is_primary_key": true,
        "is_foreign_key": false,
        "ref_table": "<foreign_key_referenced_table>",
        "ref_fields": "<foreign_key_referenced_fields>",
        "validation": {
          "<validation_name>" : { <validation_info> },
          ...
        },
        "value": [
          <value>,
          ...
        ],
       ...
      ],
      "related": [
        "<relationship_info>",
        ...
      ],
      "options": "<SQL_fragments_etc>",
      "access": [
        "<access_verb>",
        ...
      ]
    },
    ...
  ]
}
```

* `table`: The wrapper for the array of table schema designations, necessary when requesting or receiving multiple table definitions at once.

* `name`: String. Required. The database-type compatible table or field name used to designate a table or field via the database connection. DreamFactory prefers alpha-numeric, lowercase singular nouns, using underscore for separating words, but should support most vendor-allowed formats. Check with your database vendor documentation for allowed table or field names. If [schema namespaces](http://msdn.microsoft.com/en-us/library/ms176011.aspx) are used for tables, then the names must use the `<schema_name>.<table_name>` convention commonly used by those vendors.

* `label`, `plural`: String. Optional. See [labels](#labels) section.

* `options`: String. Optional. Request Only. These are database-specific create or alter fragments for things not generally supported otherwise when defining the table or fields, such as defining complicated multi-field keys, or the MySQL engine version, i.e. "ENGINE=InnoDB".

* `field`: A wrapper for an array of fields, each with defining properties. See below for definition specifics. Currently only supported on SQL DB service types. Each field consists of properties defining that field and its usage. The properties may be of the following db-agnostic layout, which support some additional non-SQL features (labels, picklist values, validation, etc), or direct SQL-defining strings supported by the underlying db.

The following are details about each of the properties supported.

  * `sql`: String. Optional. Allows a pure SQL-compatible definition for a field. If this property is defined, no other properties besides the name and label are looked at. SQL types in the definition must be supported directly by the underlying database as no translations are done, i.e. "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY".

  * `type`: String. Required if "sql” property is not defined. In server responses, the value for this element is closest derived DreamFactory simplified type, if none apply, then it will be set to "string". In requests to the server, the value can be one of the simplified types (i.e. "string”, see the [simplified types](#types) section for more info), or other types supported directly by the underlying database. If using the latter (db-specific types), make sure you include any additional parameters in the type string, such as length, i.e. "nvarchar(128)", as the `length`, `precision`, `scale`, `fixed_length` and `supports_multibyte` parameters are not considered in this case. 

  * `fixed_length`: Boolean. Optional for `string` type. Set to true to represent string types as fixed length (i.e. ‘char’), false for variable length (i.e. ‘varchar’) which is the default.

  * `supports_multibyte`: Boolean. Optional for `string` type. Set to true to represent string types that support multibyte characters, i.e. "national" in most database vernacular, (i.e. "utf8"); use false for single byte character support only (i.e. ‘ascii’) which is the default.

  * `length`: Integer. Optional. Used to define the max length of strings and number fields. For strings, if length is not defined, the default is 255.

  * `precision`: Integer. Optional. Used by the "decimal" and "money", and in some cases the "double" and "float", types. It represents the total length of the number allowed minus the ‘.’, and can be set either by the `length` property or the `precision` property, `length` takes precedence.

  * `scale`: Integer. Optional. Used by the "decimal" and "money" types, where it defines the number of decimal places to the right of the decimal. Only applies if the `length` or `precision` property is given. If scale is not given, the default is 0, i.e. no decimal places.

  * `default`: Mixed. Optional. Use to define the SQL DEFAULT parameter of a field, supported values are dependent on the "type" designation, but may include null, strings, numbers, and SQL expressions, i.e. "NOW()" for datetime, etc.

  * `allow_null`: Boolean. Optional. Defines whether or not the NULL value is allowed to be set for the field, ie. false = "NOT NULL". If not defined, the default is allow NULL (true).

  * `auto_increment`: Boolean. Optional. Set to true to allow auto-incrementing of an integer or primary key. If not defined, the default is false.

  * `is_primary_key`: Boolean. Optional. Set to true to define non-trivial primary keys, use once per table definition. If not defined, the default is false, except for the "id” type, see below.

  * `is_foreign_key`: Boolean. Optional. Set to true to define references or foreign keys that are not stored as integers or point to multiple primary keys. If not defined, the default is false, except for the "reference" type, see below.

  * `ref_table`: String. Required when `type` is "reference" or when `is_foreign_key` is true. Defines the table name that a reference field points to.

  * `ref_fields`: String. Required when `type` is "reference" or when `is_foreign_key` is true. Defines the field(s) of the referenced table defined by `ref_table` property that the field is referencing. If multiple fields are part of the key, separate the fields by a comma.

  * `ref_on_delete`: String. Optional when `type` is "reference" or when `is_foreign_key` is true. Defines the operation to take when the referenced record is deleted. Options are typically "RESTRICT","CASCADE", "SET NULL", "NO ACTION", but may be database dependent. Default is database dependent.

  * `ref_on_update`: String. Optional when `type` is "reference" or when `is_foreign_key` is true. defines the operation to take when the referenced record is updated. May not be supported by all database types, see `ref_on_delete`.

  * `is_unique`: Boolean. Optional. Set to true to require that each row has a unique value for this field. This is typically implemented as a unique index on the table.

  * `is_index`: Boolean. Optional. Set to true to set the field as a table index to speed up common searches that use this field. Typically this isn't supported for large fields, like "text".

  * `values`: Array of strings or integers. Optional. Designates values allowed for the field defined, type of the field must match the values given, i.e. string for an array of string values. Use the "picklist" and "multi_picklist" validations to restrict changes to this field's value via the API to only these values, otherwise these serve as suggestions to the client.

  * `validation`: Array of settings. Optional. See [validations](#validations) for more info. 

###<a name="labels"></a>Labels
Labels in singular and plural form are tracked in a system table and are relayed to the client along with the schema. They are not used in API calls. They can contain UTF-8 characters, including spaces, but no other whitespace characters. These are useful in client applications so that form labels don't have to be hard coded, see our admin applications, like the Data Manager, for example. Labels are available for table and field names. Plural labels are only available for table names. Labels can be sent and saved on the server along with other properties when creating or updating table schema. When none are specified, labels are auto-generated based on commonly used techniques, i.e. -y becomes -ies, etc.

###<a name="types"></a>Simplified Types
The supported simple types are defined as follows.

  * **id** or **pk**: defines a typical table identifier, translates to ```"INT NOT NULL AUTO_INCREMENT PRIMARY KEY"```. This type requires no other properties to define the field. It presumes a `type` of int with `allow_null` set to false, the `auto_increment` and `is_primary_key` are set to true. It can only be used once in a table definition.

  * **reference**: defines a typical foreign key, presumes the `type` of int and requires the `ref_table` and `ref_fields` properties to be defined as well. Optional defining properties are `ref_on_delete`, `ref_on_update`, `allow_null` and `default`. Similar to SQL fragment ```"FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE”```.

  * **string**: defines a string field (i.e. varchar or char), length defaults to 255, but can be set using the `length` property. Set the `fixed_length` property to true for fixed length (i.e. char) behavior. Set `supports_multibyte` for multi-byte, national (i.e. nvarchar) behavior. Other optional properties are `allow_null`, `default`, `values`, and `validation`.

  * **text**: defines a large string field (i.e. MySQL's text or MSSQL's varchar[max]), defaults to the largest length string allowed by the underlying database. Optional properties are `allow_null` and `default`.

  * **binary**: defines a binary string field (i.e. varbinary or binary), defaults to a length of 255, but can be set using the `length` property. Set the `fixed_length` property to true for fixed length (i.e. binary) behavior. Optional properties are `allow_null` and `default`.

  * **boolean**: defines a boolean field, which may be represented by int of length 1, using 0 and 1 values, if a true and false boolean type is not supported by the underlying database. Optional properties are `allow_null` and `default`.

  * **integer**: defines an integer field. Use `length` to set the displayable length of the integer, i.e. int(11) in MySQL. Optional properties are `allow_null`, `default`, `values`, and `validation`.

  * **float**: defines a standard single-precision float field. Some databases (i.e. MySQL) allow `length` or `precision` settings. Optional properties are `allow_null` and `default`.

  * **double**: defines a standard double-precision float field. Some databases (i.e. MySQL) allow `length` or `precision` settings. Optional properties are `allow_null` and `default`.

  * **decimal**: defines a standard decimal field. Use `scale` to set the number of desired decimal places to the right of the decimal point. Use `length` or `precision` to set the total number of digit positions. Optional properties are `allow_null` and `default`.

  * **datetime**: a datetime field. Optional properties are `allow_null`, `default`, `values`, and `validation`.

  * **date**: a date field. Optional properties are `allow_null`, `default`, `values`, and `validation`.

  * **time**: a time field. Optional properties are `allow_null`, `default`, `values`, and `validation`.

  * **timestamp**: a date and time stamp with timezone awareness where applicable, i.e. MySQL’s `timestamp not null default 0` or MSSQL’s `datetimeoffset`.

  * **timestamp_on_create**: a `timestamp` as documented above that will be automatically set on record creation and not updated again unless set by the client via the API. See "api_read_only" validation for keeping this from being set by API.

  * **timestamp_on_update**: a `timestamp` as documented above that will be automatically set on record creation and again on every update. See "api_read_only" validation for keeping this from being set by API.

  * **user_id**: a reference to the current user, assuming a valid session has been established. On the native database, this is implemented as a reference field pointing to the system's user table, on other databases, it is implemented as an integer. Optional properties are `allow_null` and `default`.

  * **user_id_on_create**: a `user_id` as documented above that will be automatically set on record creation and not updated again unless set by the client via the API. See "api_read_only" validation for keeping this from being set by API.

  * **user_id_on_update**: a `user_id` as documented above that will be automatically set on record creation and again on every update. See "api_read_only" validation for keeping this from being set by API.

###<a name="validations"></a>Validations
Some server-side validation can be defined for each field by setting this property to one or more of the following options in the given format below. Note that additional validation will result in additional processing which may slow response times. Validations are configured in the following format...

```javascript
{
  "validation":
    {
      "<validation_name>":
        {
          "on_fail" : "[ignore_field | <error_msg>]"
          <other_config>,
          ...
        },
      ...
    }
}
```

where `on_fail` is a configuration option that takes either the value `ignore_field`, dictating if the field should be ignored if it does not pass validation, or a specified error message to overwrite the generic exception thrown. If this configuration is missing, a generic exception will be thrown stating the validation has failed.

Other validation configuration options are documented below for each validation type.

Possible validations settings are as follows...

  * **picklist** - Supported for string type only. It requires the field value to be set to one of the values listed in the `values` property. Any error is returned if the `values` property is empty or does not contain the value being set. Values are checked only on create and update record API calls; data integrity is kept for existing values even when the picklist value list is modified. Behaves similar to MySQL "enum" type.

  * **multi_picklist** - similar to picklist but allows multiple values to be selected and stored. Behaves similar to MySQL "set" type.
    * `delimiter` - Optional. Defaults to comma, ",". Parameter allows setting the delimiter character used to separate each value being set from what is being stored in the field value.
    * `min` - Optional. Integer. Defaults to 1. Number of minimum required selections from the list.
    * `max` - Optional. Integer. If set, it designates the maximum required selections from the list.

  * **api_read_only** - sets this field as read only through the API. Use "default” property to set values, i.e. useful for creating timestamps, etc. Supported for all types.

  * **create_only** - sets this field to only allow values to be set on record creation. Supported for all types.

  * **not_null** - validates that the field value to be set is not null. Supported for all types,

  * **not_empty** - validates that the field value to be set is not empty string. Supported for string and text types. Null is not checked.

  * **not_zero** - validates that the field value to be set is not zero (0). Supported for integers, decimals and floats. Null is not checked.

  * **int** - validates that the value to be set is between the min and max integer values designated. Supported for integers.
    * `range` - Optional. Defines the min and max range allowed for the integer.
      * `min` - Optional. If set, it designates the minimum value allowed.
      * `max` - Optional. If set, it designates the maximum value allowed.
    * `formats` - Optional. Selects other allowable formats for the integers, "hex" and "octal" currently available.

  * **float** - validates that the value to be set is a valid float.
    * `decimal` - Optional. Defaults to '.'. Designates the character used as the decimal separator, which is sometimes ','.

  * **boolean** - validates that the value to be set is one of the generally accepted values for true or false, i.e.  true = 1, "1", "true", "on" and "yes". false = 0, "0", "false", "off", "no", and "".

  * **email** - validates that this field is an email, i.e. "name@company.com”. Supported for string type only. See FILTER_VALIDATE_EMAIL.

  * **url** - validates that this field is a url, i.e. starts with "http(s)://”. Supported for string type only.
    * `sections` - Optional. Array of Strings. Designates required sections of the URL, "path" and "query" currently available.

  * **match** - for strings matching a regular expression designated by `regex`. Supported for string type only.
    * `regex` - Required. String. Exception thrown if not defined or empty. Due to special characters in regular expressions, the `regex` value must be encoded as base64 before being provisioned.


###<a name="examples"></a>Example field declarations
Example field schema declarations...
```javascript
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
        "default": "",
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
        "validation": {"not_empty": {"on_fail": "Display name must not be empty."}}
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
        "validation": {"email": {"on_fail": "Please enter a valid email address."}}
    },
    {
        "name": "phone",
        "label": "Phone",
        "type": "string",
        "length": 12,
        "default": "",
        "allow_null": false,
        "fixed_length": true
        "validation": "match(nnn-nnn-nnnn)"
    },
    {
        "name": "Rating",
        "label": "Rating",
        "type": "string",
        "length": 40,
        "values": [ "Unknown","Cold","Warm","Hot" ],
        "default": "Unknown",
        "allow_null": false,
        "validation": {"picklist: {"on_fail": "Please select one of the valid options."}}
    },
    {
        "name": "website",
        "label": "Website",
        "type": "string",
        "validation": {"url": {"on_fail": "Invalid URL given."}}
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
        "validation": {"api_read_only": {"on_fail": "ignore_field"}}
    },
    {
        "name": "last_modified_date",
        "label": "Last Modified Date",
        "type": "timestamp_on_update",
        "validation": {"api_read_only": {"on_fail": "ignore_field"}}
    },
    {
        "name": "created_by_id",
        "label": "Created By Id",
        "type": "user_id_on_create",
        "validation": {"api_read_only": {"on_fail": "ignore_field"}}
    },
    {
        "name": "last_modified_by_id",
        "label": "Last Modified By Id",
        "type": "user_id_on_update",
        "validation": {"api_read_only": {"on_fail": "ignore_field"}}
    }
```

##<a name="operations"></a>Schema Operations

See the following sections for more detail on CRUD operations for database schema...

* [Retrieving Schema](Database-Retrieving-Schema)
* [Creating Schema](Database-Creating-Schema)
* [Updating or Replacing Schema](Database-Updating-Schema)
* [Patching or Merging Schema](Database-Patching-Schema)
* [Deleting Schema](Database-Deleting-Schema)
