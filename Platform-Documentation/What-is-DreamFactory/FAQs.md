### Frequently Asked Questions

**What is DreamFactory?**

DreamFactory is an open source REST API platform for enterprise mobile application development. We provide a turnkey middleware solution that connects any client application to any backend data source. You can install the DreamFactory software package on any cloud or server. You can also run DreamFactory on your local desktop during development.

DreamFactory automatically generates all of the RESTful services that you need for modern application development. This allows developers to focus on application design and user experience instead of server-side software. You simply call the RESTful services and DreamFactory returns a JSON or XML document with the requested data.

DreamFactory supports every major SQL database, NoSQL document store, and file storage system. We also make it easy to securely consume any remote web services, including custom services you’ve written yourself. We provide other advanced features such as user management and server-side scripting.

**What hard technical problems does DreamFactory solve?**

The biggest technical problem that DreamFactory solves is providing a comprehensive REST API for all of your backend data sources. Without DreamFactory, developers have to write all of this server-side software themselves. DreamFactory virtualizes each data source with a generic REST API, so developers can switch between SQL databases, NoSQL document stores, and file storage systems without rewriting their frontend application.

The second hard technical problem DreamFactory solves is data security from a backend perspective. DreamFactory provides a complete user management system with role-based permissions that control all access to the backend data. We support record-level access control for any SQL or NoSQL data source. We also provide a complete set of services for session and password management.

The third hard problem DreamFactory solves is the generation of Client SDKs for every major development environment. Once you hook up the backend data sources, you can immediately use our JavaScript SDK from any HTML5, Titanium, or PhoneGap application. Code libraries are generated for native developers using Xcode, Visual Studio, and Eclipse. This vastly simplifies calling our REST API from any popular developer tool or framework.

Lastly, some mobile applications need business logic implemented on the server. For this purpose, DreamFactory allows any API call to be customized with server-side scripting. Event scripts can be used to pre-process any request or post-process any response. DreamFactory also supports custom scripting which can be called directly from your client application. Custom scripts are useful for performing business logic that is not dependent on API calls to a specific data source.

**What types of apps are well suited for DreamFactory?**

At the highest level of abstraction, any data-driven application that would benefit from a REST API is a great fit for DreamFactory. Static apps or websites that do not depend on backend data are not a good fit.

Native, hybrid, and HTML5 mobile applications are extremely well suited for DreamFactory, particularly enterprise mobile apps that need a secure REST API to return data stored in legacy SQL databases. We provide client SDKs for every major client-side technology (iOS, Android, Windows Phone, Titanium, Javascript, AngularJS).
 
Web apps (commonly “single page apps”) that use REST and JSON for data exchange are well suited to DreamFactory. Building AngularJS applications with DreamFactory is a popular choice for many developers. We provide several popular AngularJS modules for user management, API calls, and data management. 

DreamFactory is also a good fit for server-to-server API calls. For example, you can easily call DreamFactory from a .Net application running on a server or in the cloud.

Lastly, DreamFactory is becoming a popular technology for IoT (Internet of Things) applications. Device sensors can easily transmit data RESTfully to DreamFactory and human end users (or machines) can access the transmitted data via REST calls.

**Who is using DreamFactory?**

Because DreamFactory is open source and REST APIs are very flexible, usage is diverse. 

The most common use case is mobile app development that requires connections to data sources on the backend. DreamFactory is used by large enterprise companies for both internal and customer-facing applications, systems integrators and mobile app development companies building apps for their enterprise clients, freelance developers, students, and hobbyists.

DreamFactory is also used by ISVs (independent software vendors) as the run-time API server that connects frontend apps to backend data using REST. ISVs include companies that sell mobile applications, SaaS web application companies, and IoT vendors (Internet of Things).

**How would I explain the business benefits of DreamFactory to my manager?**

From a business perspective, DreamFactory helps companies in a few ways.

First, DreamFactory solves many of the difficult backend integration and security components that most any data-driven mobile application requires. From a technical perspective, DreamFactory automates 1) REST API creation; 2) security that governs the data that those REST APIs expose. As such, most of the heavy server-side coding is not required anymore. From a business perspective, this means that you can ship your apps much faster with smaller teams and less interference. 

Second, DreamFactory prevents vendor lock-in to both cloud infrastructure vendors and database vendors. From a technical perspective, you can think of DreamFactory as a company that does “REST service virtualization”. This means a couple of things: 1) the software is open source and server-agnostic - it runs the same way on different clouds (e.g. AWS and Azure) and server operating systems (e.g. Linux and Windows); 2) the software is database-agnostic - the REST APIs and JSON returned are the same, regardless of which SQL or NoSQL vendor you prefer. This means that you can move DreamFactory itself to any cloud or on premises server and you can change data sources at will without changing your frontend apps. From a business perspective, this means that you can choose the server infrastructure and databases that best meet your business, cost, and scale requirements, without being locked into one particular cloud and database vendor. 

Third, DreamFactory centralizes control for IT departments. A typical Fortune 500 company literally has thousands of mobile applications that need to be secured. Securing backend data is extremely challenging in this context. DreamFactory provides a centralized set of REST APIs that can be shared by mobile applications across the enterprise and governed centrally by the IT department. When an end user loses a device or leaves a company, it’s important to both lock down the device (e.g. using MDM) AND the backend data. DreamFactory address the second security use case, namely the ability to control backend data access in real time.

**How does DreamFactory handle security?**

DreamFactory has a user and role management system that controls access to backend data. The user management system uses the MySQL database that comes installed with DreamFactory. The user management system has a REST API, so you can mirror an existing user management system, but users and roles must also be stored in DreamFactory. Active Directory (LDAP) integration will be supported in Q1 2015.

An administrator configures roles in the DreamFactory Admin Console. You add as many roles as you need. Each end user is associated with one role. Each role has a specific set of data permissions. For example, in the DreamFactory Admin Console, an Admin could set up a “Sales Rep One” role and specify that the “Sales Rep One” role be limited to read-only access to a particular set of tables and records in the Oracle database via the REST API. In the DreamFactory Admin Console, the Admin would simply add a REST API for this Oracle database, say “/oracle”, and then grant read-only access to a specific set of tables and records (again, in the DreamFactory Admin Console). All security is enforced server-side in DreamFactory when each API call to /oracle/{table_name} is made by each end user, each of whom has a specific single role.

This principle applies to each and every API call made to DreamFactory: 1) the client application asks the end user to authenticate; 2) if authentication succeeds, the client receives a session token; 3) DreamFactory is aware of this user’s role and governs backend data access via role permissions for the duration of that session.

It’s also important to understand that apps and services are completely decoupled. In other words, there’s no association between apps and REST services in DreamFactory. Apps use REST services based on your application code. Roles independently govern access to apps (i.e. this role can access this app) and services (this role can perform CRUD operations on this table). This is useful because multiple apps can share RESTful access to the same backend resources, and roles can have different data access permissions (even for the same app used by end users with different roles). 

DreamFactory supports a number of access control features:

* Table-level CRUD access to SQL and NoSQL at the role level
* Record-level CRUD access to SQL and NoSQL at the role level (called server-side filters)
* Ability to inherit existing CRUD permissions for SQL and NoSQL at the system, role, and user level (called lookup keys)
* Custom CRUD security to SQL and NoSQL at the role level (called server-side scripting, particularly useful for defining permissions based on data state)
* Bucket-level CRUD access for file storage (more granular file permissions are definable with database pointers)
* Custom access control to any remote web service (governed server-side via JSON definition) 

**How do I scale DreamFactory to handle a large volume of API calls and data?**

DreamFactory is installed as a LAMP stack (or Windows WAMP or Mac MAMP). Web servers route the API requests to DreamFactory, and DreamFactory returns JSON (or XML) back to your client applications. DreamFactory supports Apache, NGINX, and IIS web servers. 

To handle your API throughput requirements (i.e. the API calls coming from client applications), you can deploy and load balance as many web servers as you need. 

DreamFactory has its own MySQL database, which stores users and roles (i.e. end users of your client applications). You can customize the MySQL schema and use the MySQL database for application data (there’s an API called ‘/db’ for the MySQL database). You can deploy DreamFactory on an any server infrastructure (on premises, cloud IaaS, and PaaS) and the MySQL database can handle millions of end users. You can also use the same database management tools you use today for backing up and replicating data in the MySQL database.

**How can I learn to build an app using DreamFactory?**

Before building your first application, it’s important to understand how REST APIs work. If you don’t understand REST APIs, read up on REST first. In a nutshell, each API call you make to DreamFactory is simply requesting a resource with a specific URL path. You can pass parameters in your API calls, such as a sort order or filter string, and these parameters are part of the URL path (appended as parameters in the URL). In effect, querying backend data with the API is asking DreamFactory to return data from a specific URL endpoint. This is a different paradigm than writing a SQL query or a stored procedure to return data from the server.

The easiest way to start using DreamFactory is to sign up for a free hosted account on [www.dreamfactory.com](http://www.dreamfactory.com) or install DreamFactory on your local machine or server with one of the [Bitnami installers](https://bitnami.com/stack/dreamfactory). The best way to create your first app is to follow the steps in the Quickstart tab of the DreamFactory Admin Console. You should also browse the API docs tab to try out some of the API calls to the ‘/db’ API which returns data from the MySQL database that comes installed with DreamFactory.

After that, you should follow the [blog tutorials](Blogs) and [screencasts](Screencasts) to build a simple application using your favorite frontend technology. If you still need help, you should search the [community forum](http://community.dreamfactory.com/) or send an email to support@dreamfactory.com.

**Is there a product roadmap?**

There’s a high-level roadmap published [here](Upcoming-Features). If you have a specific feature request or find a bug, please [file a ticket on GitHub](https://github.com/dreamfactorysoftware/dsp-core/issues) or post it on the [community forum](http://community.dreamfactory.com/).

**How is DreamFactory different than API Management software?**

DreamFactory is different than API management software in a fundamental way. API management requires you to build REST APIs yourself and helps you manage your custom APIs. DreamFactory, on the other hand, automatically generates REST APIs for you and manages all the backend security for those APIs.

The core principles behind DreamFactory are simple: 1) backend data resides almost exclusively in SQL, NoSQL, and file storage systems; 2) data transport between client and server is best done with REST and JSON (particularly for mobile apps, single page web apps, and IoT apps); 3) REST APIs for SQL, NoSQL, and file storage are well understood and SHOULD BE STANDARD for the vast majority of use cases. 

As such, DreamFactory creates the REST APIs for SQL, NoSQL, and file storage on your behalf, so you don’t have to write your own REST APIs, reinventing the wheel once again. A common question is “how flexible are these auto-generated APIs?” The answer is that CRUD operations on SQL, NoSQL, and file storage share the same common characteristics, so the auto-generated APIs are comprehensive and cover virtually every common use case scenario. 

That said, if you have custom API requirements, you can add any remote web service as a RESTful service inside DreamFactory and leverage DreamFactory’s SSO and role system to govern end user access to your custom APIs. 

**How is DreamFactory different than hosted “backend as a service” (aka BaaS)?**

“BaaS” is an acronym for “backend as a service”. BaaS companies such as Parse and Kinvey host their customer’s backend data and provide a number of beneficial features to reduce the amount of server-side code that developers need to write for their mobile applications.

DreamFactory provides the same simplification benefits of BaaS. However, DreamFactory is a solution that targets enterprises. Therefore, there are some critical differences between BaaS and DreamFactory:

* BaaS products are proprietary. DreamFactory is open source. You can modify the source code if necessary.
* BaaS companies host your data, but they don’t have a world class data center and millions of marketing dollars to gain enterprise trust. In short, enterprises do not trust third-party companies to host their sensitive data. DreamFactory does not host your data. You host DreamFactory on whatever server infrastructure you prefer, often behind a corporate firewall. 
* BaaS products typically use NoSQL to store data. DreamFactory supports every major database vendor, both SQL vendors and NoSQL vendors.
* BaaS products do not integrate well with existing databases and file systems. DreamFactory provides REST APIs for your existing SQL databases, NoSQL databases, and file systems.
* BaaS security features are oriented around consumer mobile app use cases. DreamFactory provides enterprise-grade backend security based on over a decade of enterprise app development experience, largely on the Force.com platform (i.e. Salesforce).

**How is DreamFactory different than “platform as a service” (aka PaaS)?**

“PaaS” is an acronym for “platform as a service”. PaaS products such as Pivotal Web Services, Red Hat OpenShift, IBM Blue Mix, and Heroku run server hardware and software (i.e. “platform”) for you. Think of PaaS as full-service IaaS (Infrastructure as a Service). Instead of having your own Dev Ops team managing AWS provisioning, you can outsource the Dev Ops function to a PaaS company to make sure your servers are humming along smoothly and alert you when they're not.  

DreamFactory partners with PaaS companies. When you sign up for a PaaS product, you can easily deploy DreamFactory in your PaaS environment, and develop applications with DreamFactory that are hosted on your PaaS. 