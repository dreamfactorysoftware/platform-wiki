Database vendors accept and return date and time values in different formats in some cases. This makes it difficult to get consistent behavior on the client side when dealing with multiple vendors. Here are some of the default formats coming from some of the popular databases...

MySQL

```javascript
{
	"lunch_time": "09:45:00",
	"birth_date": "2003-01-16",
	"last_contact": "2014-03-14 13:34:00",
	"last_modified_date": "2014-12-11 17:20:34"
}
```

PostgreSQL

```javascript
{
	"lunch_time": "09:45:00",
	"birth_date": "2003-01-16",
	"last_contact": "2014-03-14 13:34:00",
	"last_modified_date": "2014-12-11 09:54:19.313871"
}
```

MS SQL Server

```javascript
{
	"lunch_time": "09:45:00.0000000",
	"birth_date": "2003-01-16",
	"last_contact": "2014-03-14 13:34:00.0000000",
	"last_modified_date": "2014-12-11T14:11:27.3012644Z"
}
```

While some of these differences may be configurable on the database itself, or can be modified during database transactions using vendor-specific conversion or casting alterations for each affected field in the SQL calls themselves, this is not simple, nor ideal when you may need different behavior for different clients. 

In version 1.8.3, DreamFactory adds the ability to control the date and time formats for all connected database services through its "blending" API. This allows the clients of the API to utilize one consistent format for each data type across any and all database services accessed. 

### <a name="configuration"></a>Configuration

The configuration settings for the date and time formats can be found in `<dsp-install-directory>/config/common.config.php` and include the following settings...

```
    //-------------------------------------------------------------------------
    //  Date and Time Format Options
    //-------------------------------------------------------------------------
    'dsp.db_time_format' => null,
    'dsp.db_date_format' => null,
    'dsp.db_datetime_format' => null,
    'dsp.db_timestamp_format' => null,
```

The configuration options follow the conventions used in PHP for representing date and time formats. For options, see the following... 
  * 'format' section of http://php.net/manual/en/datetime.createfromformat.php
  * 'format' section of http://php.net/manual/en/function.date.php.
  * 'Predefined Constants' section of http://php.net/manual/en/class.datetime.php#datetime.constants.types

The following are example formats for each of the DreamFactory simple data types...

```
    'dsp.db_date_format' => 'l jS \of F Y',
    'dsp.db_time_format' => 'h:i A',
    'dsp.db_datetime_format' => 'm/d/y h:i:s A',
    'dsp.db_timestamp_format' => 'c',
```
and the same dataset from above reformatted using these settings.

```javascript
{
	"lunch_time": "09:45 AM",
	"birth_date": "Thursday 16th of January 2003",
	"last_contact": "03/14/14 01:34:00 PM",
	"last_modified_date": "2014-12-10T14:42:18-05:00"
}
```
**Note:** When these values are changed, the platform cache must be reset before they will be used by the API, see the Admin panel "Tools" menu.

#### <a name="fields"></a>Client Usage

We have also included these settings in the system configuration API response, making them available to all clients. This makes it simple for clients to ensure a common format is used when displaying and editing date and time field values, whether as a text field or via more complex date or time picker UI components.
 
URI: **GET** `http[s]://<server_name>/rest/system/config`

####Request
>GET https://demo-dsp.cloud.dreamfactory.com/rest/system/config/ HTTP/1.1

####Response
```javascript
{
	...
	"db": {
		"date_format": "l jS \\of F Y",
		"time_format": "h:i A",
		"datetime_format": "m/d/y h:i:s A",
		"timestamp_format": "l, d-M-Y H:i:s T",
		"max_records_returned": 1000
	},
	...
}
```

These format settings are used by database [record retrieval](Database-Retrieving-Records) and for [stored procedure](SQL-Stored-Procedures) call response data when using the schema parameters for data formatting.

**Note:** Date and time field values must use the same format for sending data to the API as was received when retrieving the fields from the API. In other words, the client can not retrieve a date as 'yyyy/mm/dd' and then perform a record update using 'mm/dd/yyyy' format. 