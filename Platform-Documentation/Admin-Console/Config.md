<b>CORS Access</b>
<p>Cross Origin Resource Sharing (CORS) permits browsers to make AJAX requests cross-domain.</p>
<p>To Enable CORS Access in your DreamFactory instance:</p>
<ol>
<li>Click <b>Config</b> in the navigation menu.</li>
<li>Under the CORS Access section, click the <b>New Host</b> button.</li>
<li>In the Host name field you can enter the wildcard * to allow access from all hosts. The Hostname or IP address can also be entered.</li>
<li>If you want to restrict which HTTP Verbs can be used by the remote server, check the appropriate boxes.</li>
</ol>
<p>For more information on CORS support, read  <a href ="https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS">HTTP access control (CORS)</a> on the Mozilla Developer Network.</p>

<b>Guest Users</b>
<p>There may be some functionality in your app that you want to make available to everyone. In this case, we have a configuration specifically for that purpose, it is called <b>Guest Users</b>. Again, in the Config module of the <b>Admin Console</b>, there is a place to allow guest access, and to assign the "guests" a specific restrictive access role. Once enabled, you will see that when accessing your DreamFactory instance, you are not immediately met with a login prompt, but the <b>Sign In</b> button, and optionally a <b>Create Account</b> button). These buttons allow returning users to gain access with their assigned, restricted access role.</p>

<b>Open Registration</b>
Open Registration allows users to sign up to be DreamFactory users, and to access your app and services. A developer will still be able to identify all of the DreamFactory users, and to control their access via roles.</p>
<p>To enable Open Registration:</p>
<ol>
<li>A system administrator logs into DreamFactory, and goes to the <b>Admin Console</b> by clicking the gear icon in the upper tool-bar.</li>
<li>Select the <b>Config</b> module from the left-side navigation menu.</li>
<li>Check the <b>Allow open registration</b>" checkbox.</li>
</ol>
<p>Once selected, the admin will see the option to assign every new user who comes in through the registration process a default role. You will want to limit what the users can do at first, and then possibly upgrade them later to a different role that allows greater access.</p>

<p>After these steps, refresh the Launchpad view and you will see a new <b>Create Account</b> button. Click this button to display an <b>Account Signup</b> page.</p>
<p>By default, when Open Registration is enabled, email validation for registration is disabled. This means that the user who wants to sign up gives their email address, other information, and password all at one time without any kind of verification. This is useful when you don't really care if the email/username is a valid email or not. In most cases, especially where the email address is used for other contact purposes, you will want to validate the email address given. To do this, go back to the Open Registration configuration and see the "Select an email service..." section. Select an email service from the drop down list.</p>
<p>Note that a default email service comes with your DreamFactory instance, but you may wish to add or change its configuration to meet your needs. See our documentation for Services options. The system comes with a default email template internally. Custom email templates can be created using the custom email templates under the <b>Admin Console</b>, <b>Config</b> module.</p>
<p>With this configuration, initially no password is required. Once registered, an email is sent, if following our template guidelines, with a confirmation code and a link to a confirmation page where that code will be entered along with the desired password for the account.</p>

<b>Password Reset</b>
<p>Password resets are performed using a security question-and-answer setup that can be set via a user's profile (see the user icon on the LaunchPad bar once logged in). If you would like a more secure way to handle password resets, you can enable email confirmation by selecting an email service, and optionally a template.</p>
<p>To initiate a password reset in the sign-in dialog box, type in your email address and click the <b>Forgot Password</b> button</p>
<p>Like registration, an email is sent with a link, and a confirmation code. Enter the code, and a new password to reset the existing password.</p>
<p>As with many websites today, sometimes it is easier if someone else handles the user confirmation and password maintenance, like the most popular social or enterprise websites. For these cases, DreamFactory can be configured to allow access via an OAuth service. This is currently tied to Open Registration being activated. Once provisioned, your allowed OAuth services will show up on the login screen. For more information on OAuth provisioning, see this blog.</p>
