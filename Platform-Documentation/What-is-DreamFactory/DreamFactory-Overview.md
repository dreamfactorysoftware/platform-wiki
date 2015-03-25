## Introduction

DreamFactory is an open source mobile backend that provides RESTful services for building modern applications. 

DreamFactory automatically generates a comprehensive, customizable, and secure REST API for any backend data resource, including SQL, NoSQL, file storage, email, and push notifications. 

Other important features include server-side scripting, API customization, single sign-on, user management, record-level access control, interactive API docs, and client SDKs.

In technical terms, DreamFactory is a LAMP stack (Linux, Apache, MySQL, PHP) that runs on Linux (Ubuntu, Red Hat, CentOS, Debian), Windows, and Mac OS X. You can install DreamFactory on your IaaS cloud, PaaS provider, on premises server, or laptop. 

DreamFactory is “runtime” software, which is to say that your application makes API calls to DreamFactory and DreamFactory returns JSON (or XML) at runtime back to your application over SSL. 

## Features

### Automatically Generated REST APIs for Any Backend Data Source 

DreamFactory automatically generates a comprehensive REST API for SQL databases, NoSQL document stores, file storage, email, and push notifications. You can also use DreamFactory to securely call any RESTful web service, including custom-built REST APIs. DreamFactory securely stores the credentials of backend data sources and exposes these data sources as a standard REST interface. The REST API includes live API documentation and client SDKs for iOS, Android, Titanium, Javascript, and AngularJS.

### API Customization with Server-Side Scripting

Any non-trivial application requires server-side logic. To handle server-side logic, DreamFactory provides server-side scripting with the V8 Javascript Engine. DreamFactory makes it easy to write server-side scripts with Javascript and attach your scripts to any API request and response event. DreamFactory also provides the flexibility to implement business logic as custom scripts, which can be invoked as simple REST API calls. 

### API Security with Role-Based Access Control

DreamFactory’s user management system provides runtime security on all API calls and server-side scripts. The user management system includes an administrative application to manage end users, user roles, OAuth, LDAP, and Active Directory integration.

Under the hood, DreamFactory handles secure password hashing, authentication, and session handling for you. You can easily configure explicit role-based access control to every backend resource, for both the REST API and server-side scripts, including configurable access control to SQL tables, NoSQL collections, SQL and NoSQL record sets, BLOB storage, email, and push notifications. 

The security system also governs access to any remote REST service you add. For example, you can easily connect to a custom REST API with DreamFactory and use the role system to control end user access to your custom-built API.

## Installation Options

On the server side, you can sign up for a free developer account at www.dreamfactory.com or install the DreamFactory open source software package (Apache license) on an IaaS Cloud, PaaS Cloud, Linux, Mac OS X, and Windows.

Head on over to [Usage Options](Usage-Options) for installation instructions.