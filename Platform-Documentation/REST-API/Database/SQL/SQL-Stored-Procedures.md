Stored procedure and function support via the DSP API is currently just for calling the stored procedures and functions that you have already created on your database, not for managing the stored procedures and functions themselves. Stored procedures were supported for MySQL and MS SQL Server (via dblib and sqlsrv drivers) starting with release 1.7.8. Support for procedures and functions were added for all supported database types, including Oracle and PostgreSQL in release 1.8.1. 

They can be called in two ways, 
  * using **GET** when the stored procedure or function does not require parameters to be passed in or out, 
  * and using **POST** when parameters are required.

Stored procedures can be accessed on each database service by the `_proc` resource. Stored functions can be accessed by the `_func` resource. While both are very similar in functionality (actually they are the same thing in PostgreSQL), there are a couple of things that differentiate how they are used in the API. Procedures can use input parameters ('IN') and output parameters ('OUT'), as well as parameters that serve both as input and output ('INOUT'). They can, except in the Oracle case, also return data directly. Functions may only have input parameters, and typically return data directly.

###Listing Available Stored Procedures or Functions
Description:  List the available stored procedures or functions by name, based on role accesses allowed.

URI: **GET** `http[s]://<server_name>/rest/<service_name>/_proc`

####Request
>GET https://demo-dsp.cloud.dreamfactory.com/rest/db/_proc/ HTTP/1.1

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
    ...
  ]
}
```

URI: **GET** `http[s]://<server_name>/rest/<service_name>/_func`

####Request
>GET https://demo-dsp.cloud.dreamfactory.com/rest/db/_func/ HTTP/1.1

####Response
```javascript
{
  "resource": [
    {
      "name": "sum_n_product",
      "access": [
        "GET",
        "POST"
      ]
    },
    {
      "name": "days_until_christmas",
      "access": [
        "GET",
        "POST"
      ]
    },
    ...
  ]
}
```

###Calling a Stored Procedure

Note that without formatting, all data is returned as strings. If the stored procedure returns multiple data sets, typically via multiple "SELECT" statements, then an array of datasets (i.e. array of records) is returned, otherwise a single array of records is returned. Optionally, you can add a URL parameter `wrapper` that will cause the returned data to be wrapped in the requested element.

###Without Parameters or Formatting
Description: Call a stored procedure that doesn't require parameters or formatting, which would require posted data (see POST method below).

URI: **GET** `http[s]://<server_name>/rest/<service_name>/_proc/<procedure_name>[?wrapper=<wrapper_name>]`

####Request
>GET https://demo-dsp.cloud.dreamfactory.com/rest/db/_proc/todos HTTP/1.1

####Response
```javascript
{
  "record": [
    {
      "id": "4",
      "name": "Test the application."
    },
    {
      "id": "5",
      "name": "Demo stored procedures."
    }
  ]
}
```

####Response with Multiple Data Sets
```javascript
{
    "record": [
        [
            {
                "id": "4",
                "name": "Test the application."
            },
            {
                "id": "5",
                "name": "Demo stored procedures."
            }
        ],
        [
            {
                "id": "4",
                "name": "Test the application."
            },
            {
                "id": "5",
                "name": "Demo stored procedures."
            }
        ]
    ]
}
```

###With Parameters and/or Formatting
Description: Call a stored procedure that does require parameters. Parameter settings and schema can be used to make the data more presentable to the client. Posted request can consist of the following elements:

  * `params` - An array of parameters definitions and settings for each parameter required by the stored procedure. Each parameter may consist of the following elements:
    * `name` - String. Required. Name of the parameter as defined in the stored procedure.
    * `param_type` - String. Allowed values of "IN" (input only), "INOUT" (input and returned as output), "OUT" (output only).  Defaults to "IN".
    * `value` - Mixed. Required for "IN" and "INOUT" types. The value to pass into the stored procedure for the parameter.
    * `type` - String. The data type of the value to be returned, defaults to type of passed in data (for INOUT) or string. Other allowed values are...
      * `int` or `integer` - cast the string as an integer. Note: Non-numeric string will be cast as 0.
      * `float` or `double` - cast the string as a float. Note: Non-numeric string will be cast as 0.
      * `bool` or `boolean` - cast the string as a boolean, true or false.
      * `time`, `date`, `datetime` or `timestamp` - cast the string as a reformatted string, using the system config [formatting options](Database-Date-Time-Formats).
    * `length` - Integer. The total length for the returned value.

  * `schema` - When a result set of records is returned from the call, the server will use any name-value pairs, consisting of `"<field_name>": "<desired_type>"`, to format the data to the desired type before returning.
  * `wrapper` - Just like the URL parameter, the wrapper designation can be passed in the posted data.


URI: **POST** `http[s]://<server_name>/rest/<service_name>/_proc/<procedure_name>[?wrapper=<wrapper_name>]`

####Request
>POST https://demo-dsp.cloud.dreamfactory.com/rest/db/_proc/search_todos_by_name

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
            "param_type": "OUT",
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
```javascript
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
```
