See the blog post below for a high-level overview of lookup keys.

* [DreamFactory 1.5 Introduces Lookup Keys](http://blog.dreamfactory.com/dreamfactory-introduces-lookup-keys)

Lookup Keys allow the DSP administrator to store any number of "key value" pairs that can be attached to a user, a role, or to the global configuration of the DSP itself. These lookup keys are then replaced with the value provisioned during the operation or execution of the interface in which they are used. Any Lookup Key can be marked as private, and in this case the key value is securely stored on the server-side and is no longer accessible from the client.

###Some Predefined System Lookup Keys

* **session.id**
* **session.ticket**
* **user.id**
* **user.email**
* **user.display_name**
* **user.first_name**
* **user.last_name**
* **role.id**
* **role.name**
* **app.id**
* **app.api_name**
* **dsp.name**
* **dsp.version**
* **dsp.host_url**
* **dsp.confirm_invite_url**
* **dsp.confirm_register_url**
* **dsp.confirm_reset_url**

###Provisioning New Lookup Keys

There's a hierarchy to lookup keys. The system will use the most specific one starting with user keys then role keys and finally global keys. This allows you to create a system of default settings and, if needed, overrides for special cases. Consider the case of using lookup keys for configuring credentials on a database service. Users who belong to Role A have their own database credentials. Same for users of Role B. In other words users of Role A will be logging into the database as a different database user than users of Role B. Everyone else has a third more restrictive database user.

####In Global Config

For those not in Role A or Role B these credentials will be used.  These users have no lookup key at the user or role level.

![Global Config Example](http://www.dreamfactory.net/dsp/images/6.png)

####In Role Config

For those users in Role A or Role B these credentials will be used.  Since these users have a lookup key at the role level, the one at the global level will never be used.

![Role Config Example](http://www.dreamfactory.net/dsp/images/4.png)

####In User Config

There is a special user in Role A who requires admin level database permissions. You can add a user lookup key that will override the role lookup key only for that one user.  All other users in Role A get the role level credentials.

![User Config Example](http://www.dreamfactory.net/dsp/images/5.png)

###Using Lookup Keys

The key names can currently be used in the following DSP interfaces and APIs... 

* in Server-Side Filters in the Role Service Access provisioning.
* in the username and password fields required to hook up to a SQL or NoSQL database. 
* in Email Templates in the subject line and message body.
* in Remote Web Services as parameters or headers.

Here's how you would use the lookup keys for username and password on a database service. The system will replace {db_username} and {db_password} with the most specific lookup keys defined for the user making the API call.

![Service Example](http://www.dreamfactory.net/dsp/images/7.png)
