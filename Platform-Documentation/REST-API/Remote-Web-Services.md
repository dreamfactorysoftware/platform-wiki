You can add as many remote services as you like to your DSP. These can be SQL or NoSQL databases, file/blob storage, or any service that has a REST API.  For databases and file storage DreamFactory provides a translation layer such that all of those services look the same from the client. This makes it easy to swap from one database type to another at any time with minimal changes to your application's code.

Here are some things you must configure for each type of service.

### All Types

API Name - Required. The name used in the REST calls. If API Name is mydb you would issue calls to /rest/mydb to access that service.

Name - Required. This is the display name or label for the service which is used in the services list of the admin console.

Description - Optional.

### Remote SQL (MySQL, Microsoft SQL Server, PostgreSQL, Oracle)

User Name - Required. Can be a private [lookup key](Lookups-and-System-Variables).

Password - Required. Can be a private lookup key.

Connection String - Required. Here is an example string **dblib:host=mssql.df.co;dbname=DFDW2008R2**  You can use the connection string helper in the ui to help build this string, or enter it manually.

### Remote NoSQL (Amazon DynamoDB and Amazon SimpleDB)

Access Key - Required. The access key for your AWS account. Can be a private lookup key.

Secret Key - Required. The secret key for your AWS account. Can be a private lookup key.

Region - The region for your AWS service.

### Remote NoSQL (Windows Azure Tables)

Account Name - Required. The account name for your Azure service.

Account Key - Required. The account key for your Azure service.

Default Partition Key - Required. What you want to be your 'id' field, e.g., 'RowKey'

### Remote NoSQL (CouchDB and MongoDB)

Connection String - Required. The connection string for your database such as **mongodb://test.dreamfactory.com**  For MongoDB you can append the database name to the connection string, or specify it separately in the service creation form.

User Name - Required. Can be a private lookup key.

Password - Required. Can be a private lookup key.

We have a [blog post](http://blog.dreamfactory.com/blog/bid/326051/Adding-a-Remote-Web-Service-to-Your-DSP) that details how to add a remote service to your DSP. It also explains how the DSP acts as a proxy to that remote service using the base URL, headers, and query params that you provide when you create the service on your DSP.

Here's a [quick primer](http://community.dreamfactory.com/t/examples-on-connecting-to-web-services/71).