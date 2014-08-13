Most of the common REST API options can be passed via HTTP headers or URL parameters. While these are "commonly" used, they may not be required or allowed in all scenarios, see each listing for more detail.

### <a name="api-key"></a>API Key (currently also referred to as 'Application Name')

Your **API key** is required in most REST calls to your DSP (except session management and some system calls), and is used as part of the system authentication process. It is chosen by you when you create each application. It defaults to the **App Name** (referenced in the admin console) or the **api_name** field (referenced in the REST API) of your application.

* **URL Parameter** - Add ```?app_name=**api_key**``` to the end of each endpoint request URL sent to the DSP.
* **HTTP Header** - Add **X-DreamFactory-Application-Name**: <your_api_key_here> header to each request sent to the DSP.


### <a name="session"></a>Session Token

For all authenticated requests made (outside of the browser session control) after logging in, to the API, you’ll need to pass the ```session_id``` received in the login response along with each call to authenticate the request. This can currently only be done in the following way...

* **HTTP Header** - Add **X-DreamFactory-Session-Token**```: <your_session_id_here>``` header to each request sent to the DSP.


### <a name="format"></a>Data Format

For request and response data formats, where applicable, the default is JSON. This can be overwritten by using the following options...

* **URL Parameter** - Add ```?format=<format_option>```, where currently the _format_option_ can be "json" or "xml".
* **HTTP Header** - Set **Accept**```: <format_option>``` header, where _format_option_ can be "application/json" or "application/xml".


### <a name="tunnelling"></a>HTTP Verb Tunnelling

In some scenarios, like web-servers or routers not supporting the 'DELETE' HTTP verb, or complicated filter requests for databases that require posting data instead or URL parameters, tunnelling the actual request verb inside a POST may be required. To accomplish this use the following options on POST requests, where _verb_ can be "GET", "PUT", "PATCH", "MERGE", or "DELETE"...

* **URL Parameter** - Add ```?method=<verb>```.
* **HTTP Header** - Add **X-HTTP-METHOD**```: <verb>```.


