The Admin Console is a browser-based user interface for configuring backend assets in DreamFactory. "Backend assets" comprise everything a software developer must configure on the backend within DreamFactory in order for a frontend application to properly function. 

A frontend application simply makes REST API calls (or SOAP calls) to DreamFactory. DreamFactory then returns JSON documents (or XML documents) to the frontend application. All of the APIs are defined, documented, and viewed interactively inside the Admin Console. 

The Admin Console is also important for securing your applications. Each end user of an application is associated with a single role. Each role governs the set of applications, REST APIs, and data that users of the role can access. When a user authenticates, the user gets a session token, and can only access those backend assets granted by the assigned role. 

Some examples of backend configuration include:

* Registering applications (app name is your API key)
* Adding user roles
* Configuring role permissions for apps and REST APIs
* Specifying record-level CRUD permissions by user role
* Enabling user self-registration
* Configuring OAuth
* Defining CORs permissions
* Specifying security credentials for a SQL database
* Specifying security credentials for a NoSQL database
* Specifying security credentials for remote file storage
* Specifying security credentials for a remote REST API 
* Defining a JSON file that defines a remote REST API
* Viewing each REST API with live interactive API documentation (Swagger)
* Specifying server-side events
* Writing server-side scripts

Detailed information for each module of the Admin Console is available in the [Admin Console](Admin-Console-Overview) documentation section.
  