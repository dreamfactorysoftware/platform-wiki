The DreamFactory REST API is a RESTful implementation of our interface allowing access to the native services available on every DSP, as well as, other remote web services that you make available on your DSP.

A very cool tool to help you with our REST API is the **Live API** module included in the Admin Console of every DSP. More information on using Live API can be found [here](Admin-Console-api-sdk).

The format of the typical DreamFactory REST API calls can best be described as follows...

`<rest-verb> http[s]://<dsp-server-name>/rest/[<service-api-name>]/[<resource-path>][?<param-name>=<param-value>]`

with the following breakdown for each part...

* **_rest-verb_** - The typical REST HTTP verbs like GET, POST, PUT, DELETE. We have also added support for PATCH or MERGE. In certain services, HEAD and OPTIONS verbs may be supported as well.
* **_dsp-server-name_** - Our hosted DSP name, localhost, your specific server name or IP, etc.
* **rest** - This is static name for accessing the REST API. Performing a **GET** here returns an array of available services.
* **_service-api-name_** - The API name (api_name - different than the name used for listing in the admin console) of the service you want to access. Performing a GET here on most of the native services will return an array of available resources.
* **_resource-path_** - The optional resource of the service. This path may include multiple sections divided by '/'.
* **_param-name_** and **_param-value_** - See Common Headers and Parameters or each specific service type for allowed URL parameters for each REST call.

The **REST API** documentation consists of the following sections. Check out the Common Headers and Parameters section and the Authentication section before digging into the other sections.

* [Common Headers and Parameters](Common-Headers-Parameters)
* [Authentication](REST-API-Authentication)
* [System Configuration](System-Configuration)
  * [Common Features](System-Common-Features)
  * [Global Config](System-Config-Resource)
* [User Profile Management](User-Profile-Management)
  * [Common Features](User-Common-Features)
  * [Session](User-Session-Resource)
  * [Password](User-Password-Resource)
  * [Profile](User-Profile-Resource)
  * [Session](User-Session-Resource)
* [Database Services](Database-Services)
  * [Common Features](Database-Common-Features)
  * [SQL Database Services](SQL-Database-Services)
  * [NoSQL Database Services](NoSQL-Database-Services)
* [File Storage Services](File-Storage-Services)
  * [Common Features](File-Storage-Common-Features)
  * [Local Storage](Local-File-Storage)
  * [Remote Storage](Remote-File-Storage)
* [Email Services](Email-Services)
* [Remote Web Services](Remote-Web-Services)

