You can set up email services to facilitate sending of emails via the REST API.  Each DSP comes with an email service named 'Email Service' with API name of 'email'. This is the default email service and uses the email server configured in php.ini. We like to use sendmail as our default email server but you can install and use whatever you like. You can also add additional email services such as external SMTP.  Enter your mail server information and credentials in the service config then POST data to that service. Go to the service in the API Docs to see the format of data that should be POSTed to the service.

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
```

The posted data can also specify an email template. Templates are created and managed from the Config section of the admin console. The server will replace the lookups in the template with the data provided in the API request. In this example {first_name} in the template will be replaced with the value of first_name in the API request. The subject and body are stored in the template. You can use system lookups like {dsp.host_url} as well.

Email Template Definition

![Email Template](http://www.dreamfactory.net/dsp/images/11.png)

Email Template Usage

`POST https://dsp-test.cloud.dreamfactory.com:443/rest/email`

```json
{
    "template": "test_template",
    "to": [
        {
            "name": "Joe Blow",
            "email": "joeblow@dreamfactory.com"
        }
    ],
    "first_name": "Joe"
}
```

Resulting Email Body

![Email Body](http://www.dreamfactory.net/dsp/images/12.png)
