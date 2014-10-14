You can add as many remote services as you like to your DSP. These can be SQL or NoSQL databases, file/blob storage, or any service that has a REST API.  For databases and file storage DreamFactory provides a translation layer such that all of those services look the same from the client. This makes it easy to swap from one database type to another at any time with minimal changes to your application's code.

We have a [blog post](http://blog.dreamfactory.com/blog/bid/326051/Adding-a-Remote-Web-Service-to-Your-DSP) that details how to add a remote web service to your DSP. It also explains how the DSP acts as a proxy to that remote service using the base URL, headers, and query params that you provide when you create the service on your DSP.

Here's a [quick primer] (http://community.dreamfactory.com/t/examples-on-connecting-to-web-services/71) on services.

The configuration for services varies some based on the service type.

### All Types

API Name - Required. The name used in the REST calls. If API Name is mydb you would make API requests to  /rest/mydb to access that service.

Name - Required. This is the display name or label for the service which is used in the services list of the admin console.

Description - Optional.

### Remote SQL (MySQL, Microsoft SQL Server, PostgreSQL, Oracle)

User Name - Required. Can be a private [lookup key](Lookups-and-System-Variables).

Password - Required. Can be a private lookup key.

Connection String - Required. Here is an example string **dblib:host=mssql.dfsql.co;dbname=DFDW2008R2**  You can use the connection string helper in the ui to help build this string, or enter it manually.

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

### Local File Storage

This type of service will allow you to access folders and files in the /storage directory of your DSP installation. Each DSP comes with a service named 'Local File Storage' with an API Name of 'files'.  There are two ways to access these files. You can access them directly using a URL like https://dsp-test.cloud.dreamfactory.com/files/testfolder/P1020353.JPG. This would allow your browser to display that image. 'files' in this URL is the API name of the local file service. You can make a folder or file private by entering the names under Private Folders and Files in the service config.

To make a folder private (not accessible directly by URL):

![Private Folder](htttp://ww.dreamfactory.net/dsp/images/9.png)

To make a single file private (not accessible directly by URL):

![Private File](htttp://ww.dreamfactory.net/dsp/images/10.png)

The second way to access files is through the REST API, in which case you can allow access to one or more top level folders using the Role Service Access settings. This also gives you control over HTTP verbs for that resource.

![Role Service Access](htttp://ww.dreamfactory.net/dsp/images/8.png)