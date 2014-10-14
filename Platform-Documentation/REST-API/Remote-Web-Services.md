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

![Private Folder](http://www.dreamfactory.net/dsp/images/9.png)

To make a single file private (not accessible directly by URL):

![Private File](http://www.dreamfactory.net/dsp/images/10.png)

The second way to access files is through the REST API, in which case you can allow access to one or more top level folders using the Role Service Access settings. This also gives you control over HTTP verbs for that resource.

![Role Service Access](http://www.dreamfactory.net/dsp/images/8.png)

You can create new services of type Local File Storage with their own unique API name. These services will point to the same /storage directory as the 'files' service but it gives you the option to have a different service name for use in setting up Service Access to various folders under /storage.

### Remote File Storage

Files and folders on remote services are handled exactly the same as those in Local File Storage. You just have to configure the service then access the files directly by URL or via the REST API.

### Remote File Storage (Amazon S3)

Access Key - Required. The access key for your AWS account. Can be a private lookup key.

Secret Key - Required. The secret key for your AWS account. Can be a private lookup key.

Region - The region for your AWS service.

### Remote File Storage (Windows Azure Storage)

Account Name - Required. The account name for your Azure service.

Account Key - Required. The account key for your Azure service.

### Remote File Storage (RackSpace CloudFiles and OpenStack Object Storage)

You will need to enter the following information to configure your RackSpace or OpenStack storage on DreamFactory.

User Name
API Key
Tenant Name
Region
URL/Endpoint

### Email Services

You can set up email services to facilitate sending of emails via the REST API.  Each DSP comes with an email service named 'Email Service' with API name of 'email'. This service uses sendmail to send the emails. You can also add your own email services using whatever provider you like.  You enter your mail server information and credentials in the service config then you POST data to that service. Go to the service in the API Docs to see the format of data that should be POSTed to the service.

The simplest email:

`POST https://dsp-test.cloud.dreamfactory.com:443/rest/email`

```json
{
  "to": [
    {
      "name": "Joe Blow",
      "email": "joeblow@dreamfactory.com"
    }
  ],
  "subject": "This is a test!",
  "body_text": "Test"
}

The posted data can specify an email template. Templates are created and managed from the Config section of the admin console. The server will replace the lookups in the template with the data provided in the API request. In this example {first_name} in the template will be replaced with the value of first_name in the API request. The subject and body are stored in the template.

Email Template Definition

![Email Template](http://www.dreamfactory.net/dsp/images/11.png)

Email Template Usage

`POST https://dsp-test.cloud.dreamfactory.com:443/rest/email`

```json
{
    "template": "test_template",
    "to": [
        {
            "name": "Todd Appleton",
            "email": "todd@dreamfactory.com"
        }
    ],
    "first_name": "Todd"
}