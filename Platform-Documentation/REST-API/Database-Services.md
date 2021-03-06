DreamFactory REST API supports several types of database services. There are SQL database services (supporting connections to MySQL, PostgreSQL, MS SQL Server, Oracle, DB2, etc.), NoSQL database services (supporting the likes of MongoDB, AWS DynamoDB, Azure Tables, CouchDB, etc.), and a Salesforce database service. DSP database services can connect to databases installed locally along with the DSP or remotely on other servers or cloud architectures.

DreamFactory makes accessing each of these back-end storage databases easy with a common REST interface, while still allowing most of the unique features of each underlying database type to be accessed. Each of these types of services are briefly discussed below.

For how to access tables and records via the database services, start with the [Common Features](#common) section. Follow the links in each section for more detail. There are some features of each of these services that are unique to that service type, for example, relational queries in SQL databases, or using the native filtering language in MongoDB. See the individual type sections below for more specifics.

## <a name="common"></a>Common Features

Database record CRUD (Create, Read, Update and Delete) operations and some table-level operations are available for both SQL and NoSQL, as well as our Salesforce, database service types. This gives the API client the ability to write an application once with very little refactoring required to completely swap out the back-end database. It also makes the learning curve for adopting new databases very short.

The following topics document the common capabilities across all supported database service types, unless otherwise noted.

* Database Resources
  * [Retrieving Resources](Database-Resources)

* Table Schema
  * [Common Parameters & Formatting](Database-Schema)
  * [DreamFactory Extensions](Database-Schema#extensions)
  * [Retrieving Schema](Database-Retrieving-Schema)
  * [Creating Schema](Database-Creating-Schema)
  * [Updating/Replacing Schema](Database-Updating-Schema)
  * [Patching/Merging Schema](Database-Patching-Schema)
  * [Deleting Schema](Database-Deleting-Schema)

* Table Records
  * [Common Parameters & Formatting](Database-Records)
  * [Retrieving Records](Database-Retrieving-Records)
  * [Creating Records](Database-Creating-Records)
  * [Updating/Replacing Records](Database-Updating-Records)
  * [Patching/Merging Records](Database-Patching-Records)
  * [Deleting Records](Database-Deleting-Records)
  * Retrieving Schema Along With Records
  * [Date and Time Field Formats](Database-Date-Time-Formats)


## <a name="sql"></a>SQL Database Services

DreamFactory database services support connections to most of the popular SQL databases. Currently all connections use PHP PDO connection strings and are dependent on the correct PDO drivers being installed for that server. If installing DSP from our pre-built packages, most drivers are already installed.

By default, each DSP package comes with a native, locally installed, SQL database service. In most packaged setups, this is connected to the local MySQL database running on the same server as the DSP, although other connections could be used simply by changing the appropriate DSP database configuration [distribution file](https://github.com/dreamfactorysoftware/dsp-core/blob/master/config/database.config.php-dist). This default service has a type of "Local SQL DB" with a name of "Database" and a API Name of 'db'. Consequently, this is the same physical database used by the [System Configuration](System-Configuration) REST service, but access to system tables is controlled by the server-side software and not allowed via this service.

To access other databases via your DSP, you can create more SQL DB services, see [System Configuration](System-Configuration) or the [Admin Console](Services) sections on how to accomplish this.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/db) to see this service type in action in our [Live API](Admin-Console-api-sdk).

* [SQL DB Service Specifics](SQL-Database-Services)
  * [Connection Strings for each SQL Database](SQL-Connections)
  * [Retrieving Related Data Along With Records](SQL-Related-Data)
  * [Creating and Managing Related Data With Records](SQL-Related-Data)
  * [Accessing Stored Procedures](SQL-Stored-Procedures)
  * [Using Expressions for Field Value](SQL-Field-Expressions)


## <a name="nosql"></a>NoSQL Database Services

DreamFactory database services support connections to most of the popular NoSQL databases. To access these databases via your DSP, you can create a new NoSQL DB service, see [System Configuration](System-Configuration) or the [Admin Console](Services) sections on how to accomplish this. For more details on NoSQL services see the specific sections listed below.

Go [here](https://dsp-sandman1.cloud.dreamfactory.com/swagger/#!/mongodb) to see this service type in action in our [Live API](Admin-Console-api-sdk).

* [NoSQL DB Service Specifics](NoSQL-Database-Services)
  * MongoDB Specifics
  * AWS DynamoDB Specifics
  * Microsoft Azure Tables Specifics
  * CouchDB Specifics


## <a name="others"></a>Other Database Services

Some of database storage types don't fit well into either of the above categories or have unique features that warrant their own service type. The following topics cover the ones we support so far. If you would like to see others, please let us know.

* [Salesforce Services](Salesforce-Services) - a DreamFactory "blended" access to the Salesforce REST API.
