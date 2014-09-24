### Frequently Asked Questions

**What is DreamFactory?**

DreamFactory is an open source REST API server (software). DreamFactory is installed middleware software that sits between client applications and backend data sources. 

At its core, DreamFactory provides all the run-time REST APIs you need in one place for every major SQL database, NoSQL database, and file storage system. DreamFactory also makes it easy to securely consume remote web services, including custom web services you’ve written yourself. 

Instead of having to write your own REST APIs and backend security from scratch, DreamFactory does it all for you (i.e., DreamFactory auto-generates REST APIs for every popular data source), so you can focus on building your apps and simply call the REST APIs in DreamFactory, which returns JSON (or XML) back to your client apps. 

**What hard technical problems does DreamFactory solve?**

The biggest technical problem that DreamFactory solves is providing a comprehensive REST API for every major SQL and NoSQL database. Without DreamFactory, developers have to write their own REST APIs. With DreamFactory, developers do not have to write their own REST API for databases. Moreover, we’ve “virtualized” the backend databases with the REST API, so developers can switch between SQL vendors (e.g. Oracle to PostgreSQL and vice versa), NoSQL vendors (e.g. MongoDB to CouchDB and vice versa), and SQL to NoSQL and vice versa (e.g. MySQL to MongoDB and vice versa) without rewriting their frontend applications.

The second hard technical problem that DreamFactory solves is data security from a backend perspective. DreamFactory provides an entire user management system with role-based control over database tables and records. DreamFactory also enables developers to inherit existing database security with lookup keys. For more complex scenarios, such as stateful record access control, DreamFactory provides server-side scripting in Javascript.

Lastly, the vast majority of mobile applications need some business logic implemented on the server. For that purpose, DreamFactory supports event scripting (aka web hooks), which can be attached to every API call. Event scripts are useful for pre-processing data going to a data source in a request, or to post-process data returning from a data source in a response. DreamFactory also supports custom scripting which can be called RESTfully from your client app. Custom scripts are useful for performing business logic that is not dependent on API calls to a specific data source.

**What types of apps are well suited for DreamFactory?**

At the highest level of abstraction, any data-driven application that would benefit from a REST API is a great fit for DreamFactory. Static apps or websites that do not depend on backend data are not a good fit.

Native, hybrid, and HTML5 mobile applications are extremely well suited for DreamFactory, particularly enterprise mobile apps that need a secure REST API to return data stored in legacy SQL databases. We provide client SDKs for every major client-side technology (iOS, Android, Windows Phone, Titanium, Javascript, AngularJS).
 
Web apps (commonly “single page apps”) that use REST and JSON for data exchange are well suited to DreamFactory. Building AngularJS applications with DreamFactory is a popular choice for many developers. We provide several popular AngularJS modules for user management, API calls, and data management. 

DreamFactory is also a good fit for server-to-server API calls. For example, you can easily call DreamFactory from a .Net application running on a server or in the cloud.

Lastly, DreamFactory is becoming a popular technology for IoT (Internet of Things) applications. Device sensors can easily transmit data RESTfully to DreamFactory and human end users (or machines) can access the transmitted data via REST calls.

**Who is using DreamFactory**

Because DreamFactory is open source and REST APIs are very flexible, usage is diverse. 

The most common use case is mobile app development that requires connections to data sources on the backend. DreamFactory is used by large enterprise companies for both internal and customer-facing applications, systems integrators and mobile app development companies building apps for their enterprise clients, freelance developers, students, and hobbyists.

DreamFactory is also used by ISVs (independent software vendors) as the run-time API server that connects frontend apps to backend data using REST. ISVs include companies that sell mobile applications, SaaS web application companies, and IoT vendors (Internet of Things).
