### Software Overview

DreamFactory is an open source software package that provides a REST API for mobile enterprise application development. You can think of DreamFactory as server middleware that connects mobile devices, such as phones and tablets, to backend data (SQL, NoSQL, and file storage) with a Representational State Transfer (REST) API.

Client devices that make REST calls to DreamFactory can be phones, tablets, and the "internet of things", such as sensors. Desktop applications and web apps can also make REST API calls to DreamFactory. 

Backend data sources that DreamFactory for which DreamFactory auto-generates REST APIs include every major SQL database, NoSQL database, and file storage system. SQL is probably the most significant and widely implemented by enterprises, based upon recent survey feedback.

DreamFactory also makes it easy to securely consume remote web services, including custom web services you’ve written yourself. 

In a nutshell, DreamFactory enables developers to quickly hook up a wide variety of backend systems, and to expose these assets with a comprehensive palette of RESTful services. The REST API allows client-server separation that simplifies component implementation, reduces the complexity of connectivity, improves performance tuning, and increases the scalability of server-side components.

### Architecture

![DreamFactory Architecture](http://dev.dreamfactory.com/sites/default/files/DF-diagram-alt-3-02.png)

### RESTful Access to Backend Data

DreamFactory provides REST APIs for SQL, NoSQL, file storage, and any REST-accessible web service.

* DreamFactory supports RESTful data and metadata access to any ANSI SQL database including MySQL, SQL Server, Oracle, and PostgreSQL. 
* DreamFactory also provides RESTful access to a wide variety of NoSQL databases including Amazon Web Services DynamoDB and SimpleDB, Microsoft Azure Tables, MongoDB, and CouchDB. 
* For file storage DreamFactory provides RESTful access to Amazon S3, Azure Tables, and OpenStack Objects. 
* DreamFactory supports external service integration manually or automatically with Swagger or RAML (i.e., the ability to securely access any REST API that returns JSON or XML to the client).

### Security and Core Backend Features

DreamFactory provides other services for application development. 

* User management features include password hashing, single sign-on, OAuth, Active Directory, Guest Users, and Open Registration. 
* Security services include the ability to control access to all backend assets through user roles and permissions. 
* Application hosting includes the ability to store and run application files from any cloud storage system. 
* Advanced features include server-side filters, events, and scripting (server-side Javascript is currently supported). 

### Client SDKs for Consuming REST APIs

On the client side, all transactions use either JSON objects or XML documents. DreamFactory is compatible with applications written in either HTML5 or native client technologies such as iOS and Android. We provide HTML5 example projects for [jQuery](http://www.dreamfactory.com/jquery-example), [AngularJS](http://www.dreamfactory.com/angularjs-example), and [Sencha](http://www.dreamfactory.com/sencha-touch-example). 

As each new service is hooked up, DreamFactory automatically produces written documentation on the service interface, creates an interactive API browser for exploring the service manually, and generates a dynamic software development kit (SDK) for calling the service from [JavaScript](javascript-sdk), [AngularJS](angular-dreamfactory),[iOS](ios-sdk), [Android](android-sdk), [Windows Mobile](Windows-Mobile-SDK), and [Titanium](Titanium-SDK).

### Installation Options

On the server side, you can sign up for a free developer account at www.dreamfactory.com or install the DreamFactory open source software package (Apache license) on an IaaS Cloud, PaaS Cloud, Linux, Mac OS X, and Windows.

Head on over to [Usage Options](Usage-Options) for installation instructions.