## Introduction

DreamFactory is an open source mobile backend that provides RESTful services for building modern applications. 

DreamFactory automatically generates a comprehensive, customizable, and secure REST API for any backend data resource, including SQL, NoSQL, file storage, email, and push notifications. 

Other important features include server-side scripting, API customization, single sign-on, user management, record-level access control, interactive API docs, and client SDKs.

In technical terms, DreamFactory is a LAMP / WAMP / MAMP stack that runs on Linux (Ubuntu, Red Hat, CentOS, Debian), Windows, and Mac OS X. As such, DreamFactory scales horizontally and vertically based on the number and size of servers. Installation options are highly flexible. You can install DreamFactory on your IaaS cloud, PaaS provider, on premises server, or laptop. 

DreamFactory is “runtime” software, which is to say that your application makes API calls to DreamFactory and DreamFactory returns JSON (or XML) at runtime back to your application over SSL. 

## Features

![](http://www.dreamfactory.com/sites/default/files/marchitecture-2.png)

### Automatically Generated REST APIs 

DreamFactory automatically generates a comprehensive REST API for SQL databases, NoSQL document stores, file storage, email, and push notifications. You can also use DreamFactory to securely call any RESTful web service, including custom-built REST APIs. DreamFactory securely stores the credentials of backend data sources and exposes these data sources as a standard REST interface. The REST API includes live API documentation and client SDKs for iOS, Android, Titanium, Javascript, and AngularJS.

### Server-Side Scripting & Customization

Any non-trivial application requires server-side logic. To handle server-side logic, DreamFactory provides server-side scripting with the V8 Javascript Engine. DreamFactory makes it easy to write server-side scripts with Javascript and attach your scripts to any API request and response event. DreamFactory also provides the flexibility to implement business logic as custom scripts, which can be invoked as simple REST API calls. 

### Security Controls

DreamFactory’s user management system provides runtime security on all API calls and server-side scripts. The user management system includes an administrative application to manage end users, user roles, OAuth, LDAP, and Active Directory integration.

Under the hood, DreamFactory handles secure password hashing, authentication, and session handling for you. You can easily configure explicit role-based access control to every backend resource, for both the REST API and server-side scripts, including configurable access control to SQL tables, NoSQL collections, SQL and NoSQL record sets, BLOB storage, email, and push notifications. 

The security system also governs access to any remote REST service you add. For example, you can easily connect to a custom REST API with DreamFactory and use the role system to control end user access to your custom-built API.

## Benefits

### Front-end Developers

* Focus on front-end development rather than working on (or waiting on) server-side software
* Connect to new data sources in minutes with just a few clicks
* Access multiple data sources with RESTful ease and automatic security
* Faster, less costly projects via instant, robust RESTful services

### Back-end / API Developers

* Automatically generate and document secure, reliable, and reusable RESTful APIs
* Customize auto-generated APIs with pre- and post-processing scripting logic
* Integrated with existing security controls so you don’t have to re-implement and test for each API
* Move applications between clouds or between your cloud and data center

### Enterprise Architects

* Govern security with your own data access platform running in the cloud or on premises
* Accelerate innovation with secure, scalable, reusable REST APIs to enterprise data sources
* Enable standardized services abstraction layer for modern apps
* Improve application reliability and security enterprise-wide with managed RESTful services

## Try DreamFactory Out

To install the DreamFactory open source package on a server or laptop, head on over to [Usage Options](Usage-Options) for instructions.

To try out DreamFactory without installing it, sign up for a free hosted developer environment at www.dreamfactory.com.