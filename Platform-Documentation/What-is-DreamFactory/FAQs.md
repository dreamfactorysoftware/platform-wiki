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

**How would I explain the business benefits of DreamFactory to my manager?**

From a business perspective, DreamFactory helps companies in a few ways.

First, DreamFactory solves many of the difficult backend integration and security components that most any data-driven mobile application requires. From a technical perspective, DreamFactory automates 1) REST API creation; 2) security that governs the data that those REST APIs expose. As such, most of the heavy server-side coding is not required anymore. From a business perspective, this means that you can ship your apps much faster with smaller teams and less interference. 

Second, DreamFactory provides prevents vendor lock-in to both cloud infrastructure vendors and database vendors. From a technical perspective, you can think of DreamFactory as a company that does “REST service virtualization”. This means a couple of things: 1) the software is open source and server-agnostic - it runs the same way on different clouds (e.g. AWS and Azure) and server operating systems (e.g. Linux and Windows); 2) the software is database-agnostic - the REST APIs and JSON returned are the same, regardless of which SQL or NoSQL vendor you prefer. This means that you can move DreamFactory itself to any cloud or on premises server and you can change data sources at will without changing your frontend apps. From a business perspective, this means that you can choose the server infrastructure and databases that best meet your business, cost, and scale requirements, without being locked into one particular cloud and database vendor. 

Third, DreamFactory centralizes control for IT departments. A typical Fortune 500 company literally has thousands of mobile applications that need to be secured. Securing backend data is extremely challenging in this context. DreamFactory provides a centralized set of REST APIs that can be shared by mobile applications across the enterprise and governed centrally by the IT department. When an end user loses a device or leaves a company, it’s important to both lock down the device (e.g. using MDM) AND the backend data. DreamFactory address the second security use case, namely the ability to control backend data access in real time.
