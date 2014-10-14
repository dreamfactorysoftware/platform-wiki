When we say "Remote Web Service" we mean a service that doesn't fall into one of the other service categories like database, file storage, or email. Any web service that offers a REST API can be accessed by configuring a remote web service on your DSP.

We have a [blog post](http://blog.dreamfactory.com/blog/bid/326051/Adding-a-Remote-Web-Service-to-Your-DSP) that details how to add a remote web service to your DSP. It also explains how the DSP acts as a proxy to that remote service using the base URL, headers, and query params that you provide when you create the service on your DSP.

The configuration for remote web services is shown below.  The blog post mentioned previously explains how all of these pieces come together when the DSP calls the remote web service on your behalf.

**API Name** - Required. The name used in the REST calls. If API Name is weather you would make API requests to  /rest/weather to access that service.

**Name** - Required. This is the display name or label for the service which is used in the services list of the admin console.

**Description** - Optional.

**Base URL** - Required. The top level URL for the REST API of the remote web service.

**Parameters** - Optional. The query parameters that should be passed on to the service when invoked by the DSP. Common uses include specifying data format like JSON or XML.

**Headers** - Optional. The request headers that should be passed on to the service when invoked by the DSP. Common uses include specifying your API key or other authentication for that service.