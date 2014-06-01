<p>Each instance of DreamFactory has the ability to communicate with a wide range of services including: SQL data, NoSQL data, remote file storage, user management, permissions and roles, external integration, and application hosting.</p>

<b>NoSQL DB</b>
<p>The NoSQL Service allows a user to connect to a remote NoSQL DB. Currently support for Amazon DynamoDB, Amazon SimpleDB, and Windows Azure Tables are available.</p>
<p>All of the NoSQL REST interfaces are similar, and DreamFactory can swap out different backend services without the need for changing the client.</p>
<p>By storing the NoSQL service credentials on DreamFactory, the originating host problem for HTML5 applications is eliminated by allowing the client to conduct all service calls through a single endpoint, instead of trying to conduct cross-domain calls to multiple remote endpoints.<p>

<p>DreamFactory developed an excellent sample application displaying NOSQL functionality (app-todo-dynamodb). See the <a href="http://blog.dreamfactory.com/blog/dynamodb-app-tutorial-with-the-dreamfactory-sdk">DynamoDB App Tutorial</a>.</p>

<p>For additional information on setting up a NoSQL Service offering, see the <i>NoSQL Developers Features</i> section. </p>

<b>SQL DB</b>
<p>DreamFactory provides a comprehensive and secure connection to a dedicated SQL database. There are services for Create, Read, Update and Delete, as well as complex filtering, and a complete suite of metadata services.</p>
<p>The SQL service can also deliver an array of objects along with related objects in a sub-array. This is a very powerful feature for applications because large database documents can be downloaded and used immediately without any additional processing as a native JSON object. Any changes made to the array can be committed back to the database with a single transaction. All parent-child relationships, and many-to-many junction relationships are automatically updated.</p>
<p>These SQL capabilities are available on both the local and remote SQL services.</p>

<b>Remote File Storage</b>
<p>Remote File Storage allows a developer to access external storage services. Amazon S3, Open Stack, Rackspace, and Windows Azure remote file services can be accessed from DreamFactory.</p>
<p>The master credentials for each service are hidden securely on the server side. This allows access to the storage system based on the users single sign-on credentials. Each Remote File Storage service also allows the administrator to choose the root access point for the storage tree. Because of this flexibility, individual users can be granted secure access to different BLOB services, or even different parts of the same service, by role assignment.</p>

<p>For additional Remote File Service information, see the <i>Developers Features for Remote File Services</i>.</p>

<b>Local File Storage</b>
<p>Local File Storage Is used to store files on the DreamFactory server. Application (app) and Library (lib) are both examples of local file storage.</p> When applications are hosted on the DreamFactory file system, the files are stored in the application/{ApplicationName} directory.</p>

<b>Email Services</b>
<p>There are three types of email: Providers Server Default, Server Command, and SMTP. When using the Server Default, we utilize the default email provider on the local machine. This is the default email setting for DreamFactory instances that are hosted on *.cloud.dreamfactory.com.</p>

<p>If your DreamFactory has been deployed to data center or favorite cloud provider, you have the option to use a server command of your choice to send emails.</p>

<p>In the example below, we will use Sendmail to setup a SMTP email service.</p>

<ol>
<li>Access the <b>Admin Console</b> by clicking the gear icon in the upper-right tool bar.</li>
<li>Select <b>Services</b> from the left-side menu.</li>
<li>In the service Type drop down select Email Service, then select Server Command as the provider. </li>
<li>Provide a Service Name, API Name, and Description.</li>
<li>In the command field enter "/usr/sbin/sendmail -bs".</li>
<li>Under the parameters Section complete all of the fields.</li>
<li>To test sending an email, press the explore this Service button next to the API Name you created for your SMTP service.</li>
<li>In the POST data section you can paste the JSON data below to test your SMTP service. Then click Try it out.</li>
</ol>

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

<p>SMTP can be configured to send emails using your SMTP provider using SSL or TLS authentication.</p>
<p>To Setup a SMTP email service using Gmail follow the instructions below:</p>

<ol>
<li>Access the <b>Admin Console</b> by pressing the gear icon in the upper right.</li>
<li>Select <b>Services</b> on the left-side menu.</li>
<li>In the service Type drop down select Email Service, then select SMTP as the provider.</li>
<li>Provide a Service Name, API Name, and Description.</li>
<li>For this example we will use a Gmail account. In the host name enter smtp.gmail.com and the port number of 465.</li>
<li>Under Security, select TLS.</li>
<li>For the username we will enter dfdemo01@gmail.com.</li>
<li>Next, enter your gmail account password.</li>
<li>Under the parameters Section complete all of the fields. Gmail requires that the from_email, and reply_to_email values are the same as the username.</li>
<li>To test sending an email, click the Explore this Service button next to the API Name you created for your SMTP service. In the POST data section you can paste the JSON data below to test your SMTP service. Then click Try it out.</li>
</ol>

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