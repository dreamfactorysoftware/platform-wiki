### Use of our API requires [SSL3](http://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_3.0)

During the app building process, you may find yourself using command line tools such as CURL, or writing code. Be sure you have chosen the correct settings/options for [SSL3](http://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_3.0).

For instance, to retrieve your DreamFactory configuration with CURL (replace *localhost* with the URL of your DreamFactory instance if different):

```
$ curl -3 http://localhost/rest/system/config?app_name=**api_key**
{"id":1,"created_date":null,"created_by_id":null,"last_modified_date":"2014-03-11 22:46:44","last_modified_by_id":1,"db_version":"1.5.0","allow_open_registration":false,"open_reg_role_id":null,"open_reg_email_service_id":null,"open_reg_email_template_id":null,"invite_email_service_id":null,"invite_email_template_id":null,"password_email_service_id":null,"password_email_template_id":null,"allow_guest_user":false,"guest_role_id":null,"editable_profile_fields":"email,display_name,first_name,last_name,phone,default_app_id,security_question,security_answer","custom_settings":[],"lookup_keys":[],"dsp_version":"1.5.x-dev","latest_version":"1.4.0","upgrade_available":false,"is_guest":true,"allow_admin_remote_logins":false,"allow_remote_logins":false,"allowed_hosts":[]}
```

### Your API Key

Your **API key**, required in REST calls to your DreamFactory instance, is chosen by you when you create your application. It defaults to the **name** of your application.

Providing the API key along with the request can be done in one of two ways:

1. **Via Query String** Add ```?app_name=**api_key**``` to each endpoint URL

or

2. Send a custom HTTP header along with your requests. Your DSP will recognize API keys provided in the header **X-DreamFactory-Application-Name**:

```
$ curl  -H 'X-DreamFactory-Application-Name: **api_key**' -3 http://localhost/rest/system/config
{"id":1,"created_date":null,"created_by_id":null,"last_modified_date":"2014-03-11 22:46:44","last_modified_by_id":1,"db_version":"1.5.0","allow_open_registration":false,"open_reg_role_id":null,"open_reg_email_service_id":null,"open_reg_email_template_id":null,"invite_email_service_id":null,"invite_email_template_id":null,"password_email_service_id":null,"password_email_template_id":null,"allow_guest_user":false,"guest_role_id":null,"editable_profile_fields":"email,display_name,first_name,last_name,phone,default_app_id,security_question,security_answer","custom_settings":[],"lookup_keys":[],"dsp_version":"1.5.x-dev","latest_version":"1.4.0","upgrade_available":false,"is_guest":true,"allow_admin_remote_logins":false,"allow_remote_logins":false,"allowed_hosts":[]}
```

### Authentication
If your application is not part of the guest user’s role, then access to any service or data components will require authentication.
To authenticate a user, simply POST a JSON string to ```/user/session``` that takes on the following format: ```{“email":"email_value", “password":"password_value"}```
If successful, in the response, you’ll see a ```session_id``` indicating that a new session has been created.

Very Important: For all future requests to the API, you’ll need to pass the ```session_id``` as a new request header called **X-DreamFactory-Session-Token **
