<p>The Remote file service allows a developer to connect to external storage providers to store and retrieve files.  The following storage providers are available: Amazon Simple Storage Service (Amazon S3), Windows Azure Storage, Rackspace Cloud Files and OpenStack Object Storage. </p>

<B>Remote File Service Setup</B>
<p>Once you’re in the DSP Admin View, click on the Services menu. Then click on the “Create New Service”</p>
<p>Enter an API Name. The API Name will be used when making REST calls within the DSP.</p>
<p>Enter a Description of the service (optional).</p>
<p>In the Type drop down select “Remote File Storage.”</p>
<p>In the Storage Name field enter the folder name where your content is located on either Amazon S3 or Windows Azure.</p>
<p>In the Storage Type drop down, select either Amazon S3 or Windows Azure. See the directions below for adding your S3 or Azure key credentials.</p>
<p>Check the Active box to enable the service.</p>

<B>Amazon S3 Configuration</B>
<p>For Amazon S3 you’ll need to provide your Access Key and Secret Key. </p>
<p>Click <a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/ManagingCredentials.html#Using_CreateAccessKey" class="external text" rel="nofollow">here</a> for instructions on locating your Account Name and Account Key.</p>

<B>Windows Azure Configuration</B>
<p>Windows Azure Storage requires an Account Name and Account Key. </p>
<p>Click <a href="http://www.windowsazure.com/en-us/manage/services/storage/how-to-manage-a-storage-account/#regeneratestoragekeys" class="external text" rel="nofollow">here</a> for instructions on locating your Account Name and Account Key.</p>

<B>Rackspace Cloud Files Configuration</B>
<p>Rackspace Cloud Files requires your Rackspace username, API Key, Tenant Name also known as your Cloud Account Number, and the region where you files are stored.</p>
<p><a href="http://www.rackspace.com/knowledge_center/article/rackspace-cloud-essentials-1-viewing-and-regenerating-your-api-key" class="external text" rel="nofollow"> Instructions on locating your Rackspace username, API Key, and Tenant Name.</a> </p>

<B>Test Your Connection</B>
<p>Now it’s time to test your connection to remote file storage. Select the Manage Files menu item in the Admin View.  You will now see a new entry for the DSP service name you just created.</p>
<p>Double click on the service name to view your remote files.</p>
<p>And you’re done! Now your application can access all the remote files located in the specified Amazon S3, Windows Azure or Rackspace folder.</p>