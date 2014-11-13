The Services tab is where you set up all your REST APIs in DreamFactory, specifically all the information necessary to securely connect to your SQL databases, NoSQL databases, and file storage systems. 

Once you’ve entered all required connection info, DreamFactory automatically generates a REST API for each SQL database, NoSQL database, and file storage system to which you’ve connected. 

You can also use the Services tab to securely call remote web services. For example, you can connect to a third-party web service such as DropBox or a REST API that you wrote yourself. This enables you to call these remote web services using any of the DreamFactory [Client SDKs](Client-SDKs). 

Note that each service you configure in DreamFactory is automatically documented in the [API Docs](API-Docs). The API Docs let you interactively browse each REST API and make live API calls to your data sources before building your application.

To learn more about each type of Service connection, read on below.

## Remote SQL DB

A remote SQL DB is a SQL database running outside of DreamFactory (note that DreamFactory includes a default MySQL database and a REST API called ‘db’; a “remote” SQL DB just means any other SQL database outside of DreamFactory, as opposed to the default MySQL database installed as part of the DreamFactory open source package). 

DreamFactory provides a comprehensive and secure connection to your remote SQL database and auto-generates a REST API for Create, Read, Update and Delete, complex filtering, and a complete set of metadata services. The REST API can also deliver an array of objects along with related objects in a sub-array. This is a very powerful feature for applications because large database documents can be downloaded as a native JSON object and used immediately without any additional processing. Any changes made to the array can be committed back to the database with a single transaction. All parent-child relationships, and many-to-many junction relationships are automatically updated.

DreamFactory currently provides a run-time REST API for these SQL vendors:

* MySQL
* Microsoft SQL Server
* PostgreSQL
* Oracle
* IBM DB2

To set up a remote SQL DB connection, select “Remote SQL DB” for Type and enter information about the service, including database name, username, password, host, and connection string.

A good way to learn about setting up a remote SQL database connection is to follow [this tutorial](http://blog.dreamfactory.com/add-a-rest-api-to-any-sql-db-in-minutes). 

For additional technical details on the REST API for databases, take a look at [Database Services](Database-Services).

## NoSQL DB

You can easily connect to a number of NoSQL databases with DreamFactory. All of the NoSQL REST interfaces are similar, and you can swap out different NoSQL databases without changing your client application. 

DreamFactory auto-generates a REST API for these NoSQL databases:

* MongoDB
* MongoHQ
* MongoLab
* CouchDB
* Cloudant
* Windows Azure Tables
* Amazon DynamoDB
* Amazon SimpleDB

To set up a NoSQL DB connection, select “NoSQL DB” for Type and enter information about the service, including database name, username, password, and connection string.

A good way to learn about setting up a NoSQL database connection is to follow [this tutorial with MongoDB](http://blog.dreamfactory.com/blog/bid/339945/NoSQL-No-Problem-MongoDB-Specifics) or [this tutorial with Amazon DynamoDB](http://blog.dreamfactory.com/blog/dynamodb-app-tutorial-with-the-dreamfactory-sdk) (setting up other NoSQL databases is similar).

For additional technical details on the REST API for databases, take a look at [Database Services](Database-Services).

## Remote File Storage

Remote File Storage allows RESTful access to a number of remote file storage services, including:

* Amazon S3
* Windows Azure Storage
* Rackspace Cloud Files
* OpenStack Object Storage

“Remote” File Storage simply means that the file system is outside of DreamFactory, as opposed to the default local file storage available as part of the DreamFactory open source package (see Local File Storage below on this page for more info on generating a REST API for the local file system).

To set up a secure connection to remote file storage, select “Remote File Storage” in the Type field and enter the relevant information, including your security credentials. Master credentials for each remote file storage service are hidden securely on the server side in DreamFactory. This allows access to the storage system based on the user’s single sign-on credentials. Each Remote File Storage service also allows the administrator to choose the root access point for the storage tree. Because of this flexibility, individual users can be granted secure access to different BLOB services, or even different parts of the same service, by role assignment in DreamFactory.

Follow this [short tutorial](http://blog.dreamfactory.com/blog/bid/294849/Connecting-your-DSP-to-External-File-Storage) to learn how to set up a connection to remote file storage on Amazon S3. The process is similar for other remote file storage providers.

## Local File Storage

Local File Storage is used to store files on the server where DreamFactory is installed. Application (app) and Library (lib) are both examples of local file storage. When applications are hosted on the DreamFactory file system, the files are stored in the application/{ApplicationName} directory.

To set up a new REST API path to local file storage, simply enter the name you want for the REST API. DreamFactory will then auto-generate a REST API for local file storage with the API name that you entered. That’s all there is to it.

For additional technical details on the REST API for local file storage, take a look at [File Storage Services](File-Storage-Services).

## Remote Web Service

A remote web service is any external web service you want your applications to consume within DreamFactory. To set up a remote web service, select “Remote Web Service” for Type and enter information about the service. 

The “Service Definition” section is required if you are using any of the DreamFactory SDKs. The Service Definition is a JSON file that describes the REST API. This JSON file is pulled down by the client SDKs, which allows the client SDKs to be aware of the REST API at run time.

A good way to learn about setting up a remote web service is to go through the tutorials below:

* [An example of setting up the Edmunds REST API](http://blog.dreamfactory.com/blog/bid/326051/Adding-a-Remote-Web-Service-to-Your-DSP) 
* [An example of setting up the Rotten Tomatoes REST API](http://blog.dreamfactory.com/tutorial-angular-and-rest-made-simple). This tutorial shows how to include a JSON definition of the API that can be called directly from the DreamFactory client SDKs.

## Email Service

DreamFactory makes it easy to set up a REST API for email. There are three supported flavors of email:

* Server Default
* Server Command
* SMTP

When using the Server Default, DreamFactory utilizes the default email provider on the local machine. This is the default email setting for DreamFactory instances that are hosted on *.cloud.dreamfactory.com.

If your DreamFactory has been deployed to your data center or favorite IaaS or PaaS cloud provider, you have the option to use a server command of your choice to send emails. Here’s an example:

* Select “Services” from the left-side menu.
* In the Type drop down select Email Service, then select Server Command as the provider.
* Provide a Name for your service, an API Name, and a Description.
* In the command field enter "/usr/sbin/sendmail -bs".
* Under the parameters Section complete all of the required parameters for the email provider to send email and click to save.
* To test sending an email, go the API Docs tab on the left-side menu and navigate to the Email Service you just created. 
* In the POST section paste the JSON data below. Then click Try it out.

<pre class="de1">
{
  "to": [
    {
      "name": "Demo",
      "email": "demo@acme.com"
    }
  ],
  "subject": "Testing SMTP Email Service",
  "body_text": "I am sending a Test email from my DSP."
}
</pre>
<p>Once your email is sent the Response will be:</p>
<pre class="de1">
{
count (1): Number of emails successfully sent.
}
</pre>

You can configure SMTP to send emails using SSL or TLS authentication.

For example, to set up a SMTP email service using Gmail follow the instructions below:

* Select “Services” on the left-side menu.
* In the Type drop down select Email Service, then select SMTP as the provider.
* Provide a Name for your service, an API Name, and a Description.
* For this example we will use a Gmail account. In the host name enter smtp.gmail.com and the port number of 465.
* Under Security, select TLS.
* Enter a Gmail email address.
* Next, enter a Gmail password.
* Under the parameters Section enter all of the required parameters for Gmail to send email and click to save (note that Gmail requires the from_email and reply_to_email values to be the same as the username). Then click to save.
* To test sending an email, go the API Docs tab on the left-side menu and navigate to the Email Service you just created. 
* In the POST section paste the JSON data below. Then click Try it out.

<pre class="de1">
{
  "to": [
    {
      "name": "Demo",
      "email": "demo@acme.com"
    }
  ],
  "subject": "Testing SMTP Email Service",
  "body_text": "I am sending a Test email from my DSP."
}
</pre>
<p>Once your email is sent the Response will be </p>
<pre class="de1">
{
count (1): Number of emails successfully sent.
}
</pre>

For additional technical details on the REST API for email, take a look at [Email Services](Email-Services).

## Salesforce

Connecting to Salesforce is similar to connecting to a remote SQL DB. Simply select “Salesforce” in the Type field and enter your Salesforce username, password, security token, and Salesforce API version.

Once you’ve saved the connection, DreamFactory automatically generates a REST API for those Salesforce objects that you can access with your Salesforce credentials.

There’s an [example app](https://github.com/dreamfactorysoftware/app-salesforce-service) on GitHub that demonstrates Salesforce integration.
