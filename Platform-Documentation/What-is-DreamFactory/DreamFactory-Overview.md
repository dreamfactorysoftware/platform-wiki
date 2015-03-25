### Introduction

DreamFactory is an open source mobile backend that provides RESTful services for building modern applications. 

DreamFactory automatically generates a comprehensive, customizable, and secure REST API for any backend data resource, including SQL, NoSQL, file storage, email, and push notifications. 

Other important features include server-side scripting, API customization, single sign-on, user management, record-level access control, interactive API docs, and client SDKs.

In technical terms, DreamFactory is a LAMP stack (Linux, Apache, MySQL, PHP) that runs on Linux (Ubuntu, Red Hat, CentOS, Debian), Windows, and Mac OS X. You can install DreamFactory on your IaaS cloud, PaaS provider, on premises server, or laptop. 

DreamFactory is “runtime” software, which is to say that your application makes API calls to DreamFactory and DreamFactory returns JSON (or XML) at runtime back to your application over SSL. 

![](http://www.dreamfactory.com/sites/default/files/marchitecture-1.png)


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

As each new service is hooked up, DreamFactory automatically produces written documentation on the service interface, creates an interactive API browser for exploring the service manually, and generates a dynamic software development kit (SDK) for calling the service from [JavaScript](javascript-sdk), [AngularJS](angular-dreamfactory), [iOS](ios-sdk), [Android](android-sdk), [Windows Mobile](Windows-Mobile-SDK), and [Titanium](Titanium-SDK).

### Installation Options

On the server side, you can sign up for a free developer account at www.dreamfactory.com or install the DreamFactory open source software package (Apache license) on an IaaS Cloud, PaaS Cloud, Linux, Mac OS X, and Windows.

Head on over to [Usage Options](Usage-Options) for installation instructions.