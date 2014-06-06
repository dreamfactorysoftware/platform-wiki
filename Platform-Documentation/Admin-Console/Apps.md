<p>The <b>Apps</b> module allows the developer to further define and update the new application. Use this tab to manage backend app configuration.</p>

<p>Upon application launch in the <b>QuickStart</b> module, the <b>Apps</b> module appears. The <b>Apps</b> module displays all of the users applications in the left-side <b>My Apps</b> list. The <b>Apps</b> module allows the user to preview the application, manage application files, and to delete applications.</p>

<p><b>NOTE:</b>There are several SDKs that make it easy to make REST API calls to DreamFactory. In Step 2 below, you can choose to download the Javascript SDK. You can also download the SDKs in the <b>API / SDK</b> module, or click on the links below to get the SDKs from GitHub.</p>
<ul>
<li>Javascript SDK</li>
<li>AngularJS SDK</li>
<li>Android SDK</li>
<li>iOS SDK</li>
</ul>
<p>To continue development of your newly launched application:</p>

<ol>
<li>Select and click the app name in the left-side <b>My Apps</b> list.</li>
<li>If you want to download a customized Javascript SDK, click the <b>Download JS SDK</b> button.</li>
<li>Select where the app will reside by clicking the radio button that corresponds to your choice.</li>
<li>Select where you want your app files to be stored.</li>
<li>Select a <b>Public name on Launchpad</b>.</li>
<li>Enter a <b>Public description on Launchpad</b>.</li>
<li>Review and modify the default path, if you want to change the path.</li>
<li>Review and select between the <b>Run Full Screen without Toggle</b> and <b>Show Full Screen with Toggle</b> check boxes.</li>
<li>Click the <b>Update Application</b> button to save your changes.</li>
</ol>

<b>Sample Applications</b>
<p>To gain an understanding of how applications work inside of DreamFactory, we have included sample applications.  These applications provide a basic overview of the functionality of DreamFactory, and can be deleted at anytime they are no longer needed.</p>
<p>If you would like to import a sample application:</p>

<ol>
<li>Click the <b>Import New App</b> button in the upper right of the screen. The <b>Import App from Package File<b> appears.</li>
<li>Select the application from the application list, or click the <b>Browse...</b> button to find a .dfpkg file to import.</li>
<li>Finally, click the appropriate <b>Import</b> button.</li>
</ol>

<p>Additional applications can be found on the <a href="https://github.com/dreamfactorysoftware" class="external text" rel="nofollow"> DreamFactory GitHub Page</a>.</p>

<b>Local or Remote Application Hosting</b>
<p>Application can use DreamFactory to host all of the application files. Files can be uploaded to the application using the DreamFactory File Manager. Some developers will work on applications using their desktop development tools, and then upload their files to their DreamFactory. The application files can be hosted on either Local File Storage, or Remote File Storage (if the service has been setup in DreamFactory).</p>

<b>Native Device Hosted Application</b>
<p>Native applications use DreamFactory to access the REST system, but all of the application’s files are located on the device or the client.</p>

<b>External Hosted Application</b>
<p>The application can use your DreamFactory to host all of the application files. Files can be uploaded to the application using the DreamFactory File Manager.</p>
<p>If you have an application that is hosted on one of your existing web servers, you can configure your DSP to communicate with this environment by entering the URL of your application.</p>

<b>Preview Applications</b>
<p>Applications can be previewed by clicking the <b>Preview this app</b> (eye) icon next to the application name.</p> 
<p>To view the application as a user:</p>
<ol>
<li>Click the <B>Show Apps</B> icon in the upper-right tool bar,</li>
<li>Then select the application name from the <b>Default Group</b> that appears.</li>
</ol>

<b>Application Files</b>
<p>Application files can be stored in the default DreamFactory app storage, or in one of the Remote Files Storage Services. For more information on Remote File Storage, please read our Developer Features Documentation.  Files can also be stored on the native device, or a remote client / desktop. If you have an existing application hosted on an external server, you also have the option to supply the URL.</p>

<b>Edit Files in the Browser</b>
<p>When an application is hosted on Local or Remote File Storage, our built-in file editor allows the user to edit the application files in the browser. To edit the file, press the folder icon next to the application.  Once you see your files in our file management tool, you can press the pencil icon to the right of the file name.</p>

<b>Delete an Application</b>
<p>Applications can be deleted by pressing the the trash icon. When you delete an application that is hosted on DreamFactory, all of the application files will also be deleted. If the application was using the Local SQL service, any schema will remain on DreamFactory.</p>