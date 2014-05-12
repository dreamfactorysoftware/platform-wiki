DreamFactory REST API supports several types of database services. There are SQL database services (supporting the likes of MySQL, PostgreSQL, MS SQL Server, etc.), SQL database schema-editing services, NoSQL database services (supporting the likes of MongoDB, AWS DynamoDB, etc.), and a Salesforce database service.

DreamFactory makes accessing each of these back-end storage databases easy with a common REST interface, while still allowing most of the unique features of each underlying database type to be accessed. Each of these types of services is briefly discussed below. For how to access tables and records via the database services, start with the Common Features section. Follow the links in each section for more detail.

## SQL Database Services

DreamFactory database services give the client a REST access point to your SQL databases, and can support both local and remote databases. By default, each DSP comes with a native SQL database service. In LAMP setups, this is the MySQL database running on the same server as the DSP, although it could use a different SQL database accessible via PHP PDO by changing the DSP [database configuration file](https://github.com/dreamfactorysoftware/dsp-core/blob/master/config/database.config.php-dist). This default service has a type of "Local SQL DB" with a name of "Database" and a API Name of 'db'. Consequently, this is the same physical database used by the [System Configuration](System-Configuration) REST service, but access to system tables is controlled by the server-side software and not allowed via this service.

To access other databases via your DSP, running either on the same server or remotely on another server, you can create a separate SQL DB service, see [System Configuration](System-Configuration) or the [Admin Console](Services) sections on how to accomplish this.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db) to see this service type in action in our [Live API](Admin-Console-api-sdk).

### Schema Services

For each SQL database service, you can also add a schema-editing service to go along with it. It allows the client to create new tables and fields, or retrieve, update, or delete existing tables and fields in the database. By default, each DSP comes with a schema editing service for the native SQL database mentioned above. This service is meant to be used to retrieve and update the (non-system related) schema of the native SQL database. This default service has a type of "Local SQL DB Schema" with a name of "Schema" and a API Name of 'schema'. Access to system tables are not allowed via this service.

To access schema of other databases via your DSP, running either on the same server or remotely on another server, you can create a separate SQL DB Schema service, see [System Configuration](System-Configuration) or the [Admin Console](Services) sections on how to accomplish this.

Go [here](SQL-Schema-Services) for more detail of the REST API for schema editing for SQL databases.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/schema) to see this service type in action in our [Live API](Admin-Console-api-sdk).

## NoSQL Database Services

DreamFactory database services give the client a REST access point for most of the popular NoSQL databases, and can support both local and remote databases. To access these databases via your DSP, running either on the same server or remotely on another server or as a cloud service, you can create a new NoSQL DB service, see [System Configuration](System-Configuration) or the [Admin Console](Services) sections on how to accomplish this. For more details on NoSQL services see the *Common Features* and *Unique Features and Restrictions* sections below.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/nosql) to see this service type in action in our [Live API](Admin-Console-api-sdk).

## Common Features

Database record CRUD (Create, Read, Update and Delete) operations and some table-level operations are available for both SQL and NoSQL database types, as well as our Salesforce, service. This gives the API client the ability to write an application once with very little refactoring required to completely swap out the back-end database. It also makes the learning curve for adopting new databases very small. 

* [Common Features](Database-Common-Features)
  * [Retrieving Table Information](Database-Common-Features#get-tables)
  * [Common Parameters](Database-Common-Features#common-params)
  * [Retrieving Records](Database-Retrieving-Records)
  * [Creating Records](Database-Creating-Records)
  * [Updating or Replacing Records](Database-Updating-Records)
  * [Patching or Merging Records](Database-Patching-Records)
  * [Deleting Records](Database-Deleting-Records)


## Unique Features and Restrictions

There are some features of each of these services that are unique to that service type, for example, relational queries in SQL databases, or using the native filtering language in MongoDB. Those features are documented in the following sections...

* [SQL Services](SQL-Database-Services)
  * Connection Strings for each SQL Database
  * Retrieving Schema Along With Records
  * Retrieving Related Data Along With Records
  * Creating and Updating Related Data With Records


* [NoSQL Services](NoSQL-Database-Services)
  * MongoDB Specifics
  * AWS DynamoDB Specifics
  * Microsoft Azure Tables Specifics
  * CouchDB Specifics


* [Salesforce Services](Salesforce-Services)
