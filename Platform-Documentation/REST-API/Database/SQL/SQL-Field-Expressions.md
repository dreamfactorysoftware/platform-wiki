When creating or updating records in database tables, the fields are typically set directly with static values, like strings, numbers, etc. However most databases also support assigning values to fields by using certain expressions. 

In 1.9.0, the SQL DB Service API now supports using expressions when setting field values. The expressions available for use are dictated by the support of the underlying database vendor and its configuration (check your database vendor documentation for specifics), but may include things such as formatting, conversions, math, and string manipulations.

There are a couple of ways to declare usage of expressions in field values. Both require the use of an `expression` element, one simply assigning the string expression to the value of that element; the other allows for a `value` and an additional `params` element.

## <a name="simple"></a>Simple Assignment

Use a JSON object with a single element of `expression` with the value set to the qualified database expression in double quotes.


```javascript
{
  "record": [
    {
      "<field_name>": 
        { 
          "expression" : "<expression>"
        }
    }
  ]
}
```


#### Examples

To set the `created_on` field to the current database server timestamp...

**POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

```javascript
{
  "record": [
    {
      "name": "Some Name",
      "created_on": 
        { 
          "expression" : "NOW()"
        },
      "times_updated": 0
    }
  ]
}
```

To set the `times_updated` field to one more than the current value...

**PATCH** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

```javascript
{
  "record": [
    {
      "id": 1,
      "times_updated": 
        { 
          "expression" : "times_updated + 1"
        }
    }
  ]
}
```


## <a name="params"></a>Assignment Requiring Additional Params

Like above, except the value of the `expression` expression is set to a JSON object containing a `value` element set to the actual expression, and a `params` element set to an object of name-value pairs containing parameters required by the expression.


```javascript
{
  "record": [
    {
      "<field_name>": 
        { 
          "expression" : 
            { 
              "value" : "<expression>", 
              "params" : 
                { 
                  "<param_name>" : "<param_value>"
                }
            }
        }
    }
  ]
}
```


#### Examples

To set `name_lower` to the lower case value of the "name" parameter passed in...

**POST** `http[s]://<dsp-server-name>/rest/<service-api-name>/<table_name>`

```javascript
{
  "record": [
    {
      "name": "Barbara",
      "name_lower": 
        { 
          "expression" : 
            {
              "value" : "LOWER(:name)",
              "params" : 
                {
                  ":name" : "Barbara"
                }
            }
        }    
    }
  ]
}
```

