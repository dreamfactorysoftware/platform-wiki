Stored Procedure support via the DSP API is currently just for calling the stored procedures that you have already created on your database, not for managing the stored procedures themselves. They can be called in two ways, using **GET** when the stored procedure does not require parameters to be passed in or out, and using **POST** when parameters are required. Stored procedures are currently supported for MySQL and MS SQL Server (via dblib and sqlsrv drivers). 

###List Available Stored Procedures
Description:  List the available stored procedures by name, based on role accesses allowed.

URI: **GET** `http://<server_name>/rest/<service_name>/_proc`

####Response
```javascript
{
  "resource": [
    {
      "name": "search_todos_by_complete",
      "access": [
        "GET",
        "POST"
      ]
    },
    {
      "name": "search_todos_by_name",
      "access": [
        "GET",
        "POST"
      ]
    },
    {
      "name": "todones",
      "access": [
        "GET"
      ]
    },
    {
      "name": "todos",
      "access": [
        "GET"
      ]
    }
  ]
}
```
###Call a Stored Procedure Without Parameters
Description: Call a stored procedure that doesn't require parameters. Optionally, you can add a URL parameter `wrapper` that will cause the returned data to be wrapped in the requested element.

URI: **GET** `http://<server_name>/rest/<service_name>/_proc/<procedure_name>[?wrapper=<wrapper_name>]`

###Call a Stored Procedure With Parameters
Description: Call a stored procedure that does require parameters. By default, all data from stored procedure calls are returned as strings. Parameter settings and schema can be used to make the data more presentable to the client. Posted request can consist of the following elements:

  * `params` - An array of parameters definitions and settings for each parameter required by the stored procedure. Each parameter may consist of the following elements:
    * `name` - String. Required. Name of the parameter as defined in the stored procedure.
    * `param_type` - String. Allowed values of "IN" (input only), "INOUT" (input and returned as output), "OUT" (output only).  Defaults to "IN".
    * `value` - Mixed. Required for "IN" and "INOUT" types. The value to pass into the stored procedure for the parameter.
    * `type` - String. The data type of the value to be returned, defaults to type of passed in data (for INOUT) or string.
    * `length` - Integer. The total length for the returned value.

  * `schema` - When a result set of records is returned from the call, the server will use any name-value pairs, consisting of `"<field_name>": "<desired_type>"`, to format the data to the desired type before returning.
  * `wrapper` - Just like the URL parameter, the wrapper designation can be passed in the posted data.


URI: **POST** `http://<server_name>/rest/<service_name>/_proc/<procedure_name>[?wrapper=<wrapper_name>]`

####Request
```javascript
{
    "params": [
        {
            "name": "search",
            "param_type": "IN",
            "value": "%app%"
        },
        {
            "name": "inc",
            "param_type": "INOUT",
            "value": 5
        },
        {
            "name": "count",
            "param_type": "OUT",
            "type": "integer"
        },
        {
            "name": "total",
            "param_type": "OUt",
            "type": "integer",
            "length": 4
        }
    ],
    "schema": {
        "id": "integer",
        "complete": "boolean"
    },
    "wrapper": "record"
}
```

####Response
{
  "record": [
    {
      "id": 3,
      "name": "Write an app that calls the stored procedure.",
      "complete": true
    },
    {
      "id": 4,
      "name": "Test the application.",
      "complete": false
    }
  ],
  "inc": 6,
  "count": 2,
  "total": 5
}

