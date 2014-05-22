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

####In Global Config

####In Role Config

####In User Config

###Using Lookup Keys

The key names can currently be used in the following DSP interfaces and APIs... 

* in Server-Side Filters in the Role Service Access provisioning.
* in the username and password fields required to hook up to a SQL or NoSQL database. 
* in Email Templates in the subject line and message body.
* in Remote Web Services as parameters or headers.