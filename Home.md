**DreamFactory Services Platform&trade;**

This wiki is the main source of documentation for **developers** working with (or contributing to) the DreamFactory Services Platform&trade; project(s). If this is your first time hearing about DreamFactory, we recommend starting with the [DreamFactory website][website].

## Quick navigation

| About DreamFactory             | Project & Community              | Setup Guide          | Technical Documentation                  |
|----------------------------|---------------------------------|-------------------------------|---------------------------|
| [[/images/help.png]] | [[/images/users.png]] | [[/images/tools.png]] | [[/images/database.png]] |
| [[About DreamFactory|DreamFactory-overview]] | [[Project & Community|DreamFactory-project-and-community]]       | [[Setup Guide|Setting-up-DreamFactory]] | [[Technical Documentation|DreamFactory-technical-documentation]]|
| DreamFactory Services Platform&trade; - why we built it and what it does | About the open-source project, our community and how to contribute | A step-by-step guide to running a DSP | Detailed technical documentation on the platform |

## Important Notes

### Use of our API requires [SSL3](http://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_3.0)

During the app building process, you may find yourself using command line tools such as CURL, or writing code; be sure to you have chosen the correct settings/options for [SSL3](http://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_3.0).

For instance, to retrieve your DSP's (replace *localhost* with the URL of your DSP if different) configuration with CURL:

```
	$ curl -3 http://localhost/rest/system/config?app_name=**api_key**
```
### Your API Key

Your **API key**, required in REST calls to your DSP, is chosen by you when you create your application. It defaults to the **name** of your application.

Providing the API key along with the request can be done in one of two ways:

1. **Via Query String** Add ```?app_name=**api_key**``` to each endpoint URL

or

2. Send a custom HTTP header along with your requests. Your DSP will recognize API keys provided in the header **X-DreamFactory-Application-Name**:

```
	$ curl -3 http://localhost/rest/system/config?app_name=**api_key**
```

### Authentication
If your application is not part of the guest user’s role, then access to any service or data components will require authentication.
To authenticate a user, simply POST a JSON string to ```/user/session``` that takes on the following format: ```{“email":"email_value", “password":"password_value"}```
If successful, in the response, you’ll see a ```session_id``` indicating that a new session has been created.

Very Important: For all future requests to the API, you’ll need to pass the ```session_id``` as a new request header called **X-DreamFactory-Session-Token **

## Questions or need help?

Check out our [[Talk to us]] page for different ways of getting in touch.

[website]: https://www.dreamfactory.com
