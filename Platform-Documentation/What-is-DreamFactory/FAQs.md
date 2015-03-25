## Frequently Asked Questions

###**What is DreamFactory?**

DreamFactory is an open source mobile backend that provides RESTful services for building modern applications.

<br>

![](http://www.dreamfactory.com/sites/default/files/short_stack.png) 

<br>

DreamFactory automatically generates a comprehensive, customizable, and secure REST API for any backend data resource, including SQL, NoSQL, file storage, email, and push notifications. 

Other important features include server-side scripting and customization, single sign-on, user management, record-level access control, interactive API docs, and client SDKs.

In technical terms, DreamFactory is a LAMP / WAMP / MAMP stack that runs on Linux (Ubuntu, Red Hat, CentOS, Debian), Windows, and Mac OS X. As such, DreamFactory scales horizontally and vertically based on the number and size of servers. [Installation options](Usage-Options) are highly flexible. You can install DreamFactory on your IaaS cloud, PaaS provider, on premises server, or laptop. 

DreamFactory is “runtime” software, which is to say that your application makes API calls to DreamFactory and DreamFactory returns JSON (or XML) at runtime back to your application over SSL. 

###**What are some benefits of using DreamFactory?**

DreamFactory provides many benefits, depending on your role.

DreamFactory helps front-end developers 

* Focus on front-end development rather than working on (or waiting on) server-side software
* Connect to new data sources in minutes with just a few clicks
* Access multiple data sources with RESTful ease and automatic security
* Deliver projects much faster via instant, robust RESTful services

DreamFactory helps back-end / API developers

* Automatically generate and document secure, reliable, and reusable RESTful APIs
* Customize auto-generated APIs with pre- and post-processing scripting logic
* Integrate with existing security controls so you don’t have to re-implement and test for each API
* Move applications between clouds or between your cloud and data center

DreamFactory helps enterprise architects

* Govern security with your own data access platform running in the cloud or on premises
* Accelerate innovation with secure, scalable, reusable REST APIs to enterprise data sources
* Enable standardized services abstraction layer for modern apps
* Improve application reliability and security enterprise-wide with managed RESTful services

###**What hard technical problems does DreamFactory solve?**

The biggest technical problem that DreamFactory solves is providing a comprehensive, automatically generated, documented, and secure REST API for every popular backend data source. Without DreamFactory, developers have to manually create, document, maintain, and securely expose custom REST APIs to disparate data sources, and repeat that exercise for each new development project. DreamFactory automatically REST-enables all these data sources with a standard interface, so it becomes really easy to use any popular SQL database, NoSQL database, and file storage system for any application project, and re-use the REST API across a portfolio of application projects.

Any non-trivial application necessitates server-side business logic. For this purpose, DreamFactory allows you to easily customize any API call with server-side scripting. Event scripts can be used to pre-process any API request and post-process any API response. DreamFactory also supports custom scripting which can be called directly from your client application or from a server. 

DreamFactory also addresses the big and important challenge of backend data security. DreamFactory provides a user management system with role-based access control access to your backend data, including table-level and record-level access to SQL and NoSQL, BLOB storage, email, and push notifications. The security system also governs access to any remote REST service you add. For example, you can easily connect to a custom REST API with DreamFactory and use the role system to control end user access to your custom-built API. The user management system includes an administrative application to manage end users, user roles, OAuth, LDAP, and Active Directory integration. Under the hood, DreamFactory handles secure password hashing, authentication, and session handling for you and protects against SQL injection attacks. 

Another problem DreamFactory solves is the generation of client SDKs for every major front-end development platform. Once you hook up the backend data sources, you can immediately use DreamFactory JavaScript SDK from any HTML5 or PhoneGap application. Code libraries are generated for native developers using Xcode, Visual Studio, Eclipse, and Titanium. This vastly simplifies calling the DreamFactory REST API from your client application.

###**What types of apps are well suited for DreamFactory?**

Any data-driven application that would benefit from a REST API is a great fit for DreamFactory. This includes mobile apps, web apps, and IoT apps.

Native mobile, hybrid mobile, and pure HTML5 mobile applications are extremely well suited for DreamFactory, particularly enterprise mobile apps that need a secure REST API to return data stored in legacy SQL databases. DreamFactory provides client SDKs and sample applications for every major client-side technology ([iOS](https://github.com/dreamfactorysoftware/ios-sdk), [Android](https://github.com/dreamfactorysoftware/android-sdk), [Titanium](https://github.com/dreamfactorysoftware/titanium-dreamfactory), [Javascript](https://github.com/dreamfactorysoftware/javascript-sdk), [jQuery](https://github.com/dreamfactorysoftware/app-todo-jquery), [AngularJS](https://github.com/dreamfactorysoftware/angular-dreamfactory), and [Sencha](https://github.com/dreamfactorysoftware/app-todo-sencha)).
 
Web apps that rely on REST and JSON for data exchange are well suited to DreamFactory. Building AngularJS applications with DreamFactory is a popular choice for many developers. DreamFactory has several AngularJS modules for [user management](https://github.com/dreamfactorysoftware/angular_dreamfactory_user_management_module), [API calls](https://github.com/dreamfactorysoftware/angular-dreamfactory), and [data management](https://github.com/dreamfactorysoftware/angular-data-manager). 

DreamFactory is also a good fit for server-to-server API calls. For example, you can easily call DreamFactory from a .Net application running on a server.

Lastly, DreamFactory is becoming a popular technology for IoT (Internet of Things) applications. Device sensors can easily transmit data RESTfully to DreamFactory and human end users (or machines) can access the transmitted data via REST calls.

###**Who is using DreamFactory?**

Because DreamFactory is open source and REST APIs are very flexible, usage is diverse. 

The most common use case is mobile app development that requires connections to data sources on the backend. DreamFactory is used by large enterprise companies for both internal and customer-facing applications, systems integrators and mobile app development companies building apps for their enterprise clients, freelance developers, students, and hobbyists.

DreamFactory is also used by ISVs (independent software vendors) as the run-time API server that connects frontend apps to backend data using REST. ISVs include companies that sell mobile applications, SaaS web application companies, and IoT vendors (Internet of Things).

###**How would I explain the business benefits of DreamFactory to my manager?**

From a business perspective, DreamFactory helps companies in a few ways.

First, DreamFactory solves the backend API integration and security requirements that data-driven mobile applications require. DreamFactory automates both REST API creation and server-side security controls on your backend data. This means that apps are faster to build with smaller teams, and projects are less expensive to build and maintain. 

Second, DreamFactory prevents lock-in to infrastructure and database vendors. DreamFactory is open source and server-agnostic. It runs the same way on different clouds (e.g. AWS and Azure) and server operating systems (e.g. Linux and Windows). DreamFactory is database-agnostic too. The REST API and JSON structure are identical for every supported SQL and NoSQL vendor. This provides portability. You can install DreamFactory in the cloud or on premises. And you can change databases anytime without changing your front-end application source code. Choose your preferred infrastructure and database stack, and simply swap it out if something better emerges.

Third, DreamFactory centralizes control for IT departments. A typical Fortune 500 company is planning to build thousands of mobile applications. All these applications need to be secured. Securing backend data is extremely challenging in this context. DreamFactory provides a centralized set of reusable REST APIs that can be shared enterprise- or department-wide and governed centrally by the IT department. When an end user loses a device or leaves a company, it’s important to lock down the device itself (e.g. MDM) AND the backend data. DreamFactory addresses the latter use case, specifically the ability to manage access control to sensitive backend data in real time.

###**How does DreamFactory handle security?**

DreamFactory provides a user management system that controls end user access to your backend data. The user management system uses the MySQL database that comes installed with DreamFactory. The user management system itself has a REST API, so you can mirror an existing user management system, but users and roles must also be stored in DreamFactory. Active Directory (LDAP) integration will be supported in Q2 2015, with the 2.0 release of DreamFactory.

An administrator configures roles in the DreamFactory Admin Console. You add as many roles as you need. Each end user is associated with one role. Each role has a specific set of data permissions. For example, in the DreamFactory Admin Console, an Admin could set up a “Sales Rep One” role and specify that the “Sales Rep One” role be limited to read-only access to a particular set of tables and records in the Oracle database via the REST API. In the DreamFactory Admin Console, the Admin would simply add a REST API for this Oracle database, say “/oracle”, and then grant read-only access to a specific set of tables and records (again, in the DreamFactory Admin Console). All security is enforced server-side in DreamFactory when each API call to /oracle/{table_name} is made by each end user, each of whom is associated with single role.

This principle applies to each and every API call made to DreamFactory: 1) the client application asks the end user to authenticate; 2) if authentication succeeds, the client receives a session token; 3) DreamFactory is aware of this user’s role on the server and governs backend data access via role permissions for the duration of that session.

It’s also important to understand that apps and services are completely decoupled. In other words, there’s no association between apps and REST services in DreamFactory. Apps use REST services based on your application code. Roles independently govern access to apps (i.e. this role can access this app) and services (this role can perform CRUD operations on this table). This is useful because multiple apps can share a common RESTful interface to the same backend resources, and roles can have different data access permissions (even for the same app used by end users with different roles). 

DreamFactory supports a number of access control features:

* Table-level CRUD access to SQL and NoSQL at the role level
* Record-level CRUD access to SQL and NoSQL at the role level (called server-side filters)
* Ability to inherit existing CRUD permissions for SQL and NoSQL at the system, role, and user level (called lookup keys)
* Custom CRUD security to SQL and NoSQL at the role level (called server-side scripting, particularly useful for defining permissions based on data state)
* Bucket-level CRUD access for file storage (more granular file permissions are definable with database pointers)
* Custom access control to any remote web service (governed server-side via JSON definition) 

###**How do I scale DreamFactory to handle a large volume of API calls and data?**

DreamFactory is installed as a Linux LAMP stack, Windows WAMP stack or Mac MAMP stack. Web servers route the API requests to DreamFactory, and DreamFactory returns JSON (or XML) back to your client applications. DreamFactory supports Apache, NGINX, and IIS web servers. 

DreamFactory scales horizontally. To handle your API throughput requirements (i.e. the API calls coming from client applications), you can deploy and load balance as many web servers as you need. 

DreamFactory also scales vertically. You need to install DreamFactory on servers with sufficient memory, disk space, and processing speed to handle your loads.

DreamFactory has its own MySQL database, which stores users and roles (i.e. end users of your client applications). You can customize the MySQL schema and use the MySQL database for application data (there’s an API called ‘/db’ for the MySQL database). You can deploy DreamFactory on an any server (on premises, cloud IaaS, and PaaS) and the MySQL database can handle millions of end users. You can also use the same database management tools you use today for backing up and replicating data in the MySQL database.

###**How can I learn to build an app using DreamFactory?**

Before building your first application, it’s important to understand how REST APIs work. If you don’t understand REST APIs, read up on REST first. In a nutshell, each API call you make to DreamFactory is simply requesting a resource with a specific URL path. You can pass parameters in your API calls, such as a sort order and filter string, and these parameters are part of the URL path (appended as parameters in the URL). In effect, querying backend data with the API is asking DreamFactory to return data from a specific URL endpoint. This is a different paradigm than writing a SQL query or a stored procedure to return data from the server.

The easiest way to start using DreamFactory is to sign up for a free hosted developer environment on [www.dreamfactory.com](http://www.dreamfactory.com) or install DreamFactory on your local machine or server with one of the [Bitnami installers](https://bitnami.com/stack/dreamfactory). The best way to create your first app is to follow the steps in the Quickstart tab of the DreamFactory Admin Console. You should also browse the API docs tab to try out some of the API calls to the ‘/db’ API which returns data from the MySQL database that comes installed with DreamFactory.

After that, you should follow the [tutorials](Tutorials) and [screencasts](Screencasts) to build a simple application using your favorite front-end framework. If you still need help, check out the [community forum](http://community.dreamfactory.com/) or send an email to support@dreamfactory.com.

###**Is there a product roadmap?**

There’s a high-level roadmap published [here](Upcoming-Features). If you have a specific feature request or find a bug, please [file a ticket on GitHub](https://github.com/dreamfactorysoftware/dsp-core/issues) or post it on the [community forum](http://community.dreamfactory.com/).

###**How is DreamFactory different than API Management software?**

API management requires you to build REST APIs yourself and helps you manage your custom APIs. 

DreamFactory, on the other hand, is a *run-time* server that 1) automatically generates REST APIs for you; 2) enables you to customize API behavior with server-side scripts; 3) manages all the backend security for those APIs; and 4) returns JSON / XML from REST API calls at *run time*.

The principles behind DreamFactory are simple: 1) backend data resides almost exclusively in SQL, NoSQL, and file storage systems; 2) data transport between client and server is best done with REST and JSON (particularly for mobile apps, single page web apps, and IoT apps); 3) REST APIs for SQL, NoSQL, and file storage are well understood and benefit from a standardized path structure for the vast majority of use cases. Hence, REST APIs can be automatically generated and ready to use. DreamFactory auto-generates a comprehensive REST API for SQL, NoSQL, and file storage, so you don’t have to write your own APIs.

###**How is DreamFactory different than hosted “mobile backend as a service” (aka MBaaS)?**

“MBaaS” is an acronym for “mobile backend as a service”. MBaaS vendors host their customers' backend data and provide features to reduce the amount of server-side code that developers need to write for their mobile applications.

DreamFactory provides the same simplification benefits of MBaaS. However, DreamFactory is an open source solution that targets enterprises. There are critical differences between MBaaS vendors and DreamFactory:

* MBaaS products are proprietary. DreamFactory is open source. You can modify the source code if necessary to meet your specific requirements.
* MBaaS companies host your data. DreamFactory does not host your data. You host DreamFactory on whatever server infrastructure you prefer, often behind a corporate firewall. 
* MBaaS products typically use NoSQL to store data. DreamFactory supports every major database vendor, both SQL vendors and NoSQL vendors.
* MBaaS products do not specialize in integrating with existing "legacy" databases and file systems inside enterprises. DreamFactory provides REST APIs for your existing SQL databases, NoSQL databases, and file storage systems.
* MBaaS security features are tailored for consumer mobile app use cases. DreamFactory provides enterprise-grade backend security.

###**How is DreamFactory different than “platform as a service” (aka PaaS)?**

“PaaS” is an acronym for “platform as a service”. PaaS products such as Pivotal Web Services and Heroku run server hardware and software (i.e. “platform”) for you. Think of PaaS as full-service IaaS (Infrastructure as a Service). Instead of having your own Dev Ops team managing AWS provisioning, you can outsource the Dev Ops function to a PaaS company to monitor servers and uptime.

DreamFactory partners with PaaS companies. When you sign up for a PaaS product, you can easily deploy DreamFactory in your PaaS environment, and develop applications with DreamFactory that are hosted on your PaaS. 