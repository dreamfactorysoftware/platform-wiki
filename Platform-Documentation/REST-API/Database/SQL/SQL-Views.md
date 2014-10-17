Database view support via the DSP API is currently just for calling the table view that you have already created on your database, not for managing the views themselves. They are returned as resources just like tables, and can be retrieved from just like tables. Views can not currently be created, altered, or deleted from the API. Records may be retrieved from views just like from tables, but they can not be created, altered, or deleted via views, unless there is direct support for that, like the case of some views in [MySQL](http://dev.mysql.com/doc/refman/5.7/en/view-updatability.html). Views are currently available on all supported SQL database types.

###List Available Views
Description:  List the available views by name, based on role accesses allowed.

URI: **GET** `http[s]://<server_name>/rest/<service_name>/`

####Request
>GET https://demo-dsp.cloud.dreamfactory.com/rest/db/ HTTP/1.1

####Response
```javascript
{
  "resource": [
    {
      "name": "<view_name>",
      "access": [
        "GET",
        "POST"
      ]
    },
    ...
  ]
}
```
