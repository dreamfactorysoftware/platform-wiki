<p>The <b>Users</b> module allows the administrator to create user accounts, to grant system admin access to new users, and to assign roles to user accounts. The administrator account on your DreamFactory has complete control over how users are added to the system. By default, only those with system administrator privileges can add users to the system.</p>
## <a name="create"></a><b>Create User</b>
<p>To create a new user:</p>
<ol>
<li>Access the <b>Admin Console</b> by clicking the gear icon in the upper-right tool bar.</li>
<li>Select <b>User</b> from the left-side menu. </li>
<li>Click the <b>Create New User</b> button.</li>
<li>Enter the Email address, First Name, Last Name, Display Name, and Phone number.</li>
<li>Select the <b>This is a system administrator</b> checkbox, if you want to grant this user that level of access.</li>
<li>Assign the user a role from the <b>Assign a Role</b> drop-down display field.
<li>Select whether or not you want to activate this user for access via login, by checking the <b>Active</b> checkbox.</li>
<li>Check the <b>Set password manually</b> checkbox. You can return to this user to change the password directly later if needed.</li>
<li>Click the <b>Save</b> button to save the new user account.</li>
</ol> 

<p>An admin, can send a request to the REST API to create a user by posting similar user data to /rest/system/user as follows.</p>
<pre class="dfpre">curl -X POST https://dsp-mydsp.cloud.dreamfactory.com/rest/system/user/ \
-H 'X-DreamFactory-Application-Name: admin' \
-d ' \
{ \
	"display_name":"Joe Smith", \
	"first_name":"Joe", \
	"last_name":"Smith", \
	"email":"joe.smith@acme.com", \
	"phone":"555-666-7777", \
	"is_active":true, \
	"is_sys_admin":false, \
	"role_id":1, \
	"password":"password" \
}'
</pre>

<p>This is useful for creating consumer accounts for things like opening up services for other web servers or test account access, or for creating specific users with default passwords, which they can change later.</p> <p><b>NOTE:</b> Using this part of the REST API requires a valid session, i.e., the administrator must be logged into DreamFactory. Also note that the password can only be set and never retrieved via the API for security reasons.</p>

## <a name="invite"></a><b>Invite User</b>
<p>A more popular way to add users would be to invite them and let them manage their own passwords. In this case, the admin still creates the user with email address, role, etc, but does not set a password. This user is created in a suspended state until a password is set.</p>

If a default email service is setup, the email service can be used to notify the user via their email address that they are invited to the system.  This can be accomplished in the previous Create User screen by selecting the "Send Email Invitation" checkbox. Likewise, in the API request mentioned earlier, just leave off the "password" in the posted data and add the URI parameter `?send_invite=true`. The CURL request would be as follows:

```bash
curl -X POST https://dsp-mydsp.cloud.dreamfactory.com/rest/system/user/?send_invite=true \
-H 'X-DreamFactory-Application-Name: admin' \
-d ' \
{ \
	"display_name":"Joe Smith", \
	"first_name":"Joe", \
	"last_name":"Smith", \
	"email":"joe.smith@acme.com", \
	"phone":"555-666-7777", \
	"is_active":true, \
	"is_sys_admin":false, \
	"role_id":1, \
}'
```

The configured email service is then called to invite the user, and an email is sent using the selected template. The receiving user may then follow the `{_invite_url_}` link in the email and complete the password requirement.