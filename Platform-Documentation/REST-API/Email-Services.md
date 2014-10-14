### Email Services

You can set up email services to facilitate sending of emails via the REST API.  Each DSP comes with an email service named 'Email Service' with API name of 'email'. This service uses sendmail to send the emails. You can also add your own email services using whatever provider you like.  You enter your mail server information and credentials in the service config then you POST data to that service. Go to the service in the API Docs to see the format of data that should be POSTed to the service.

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

The posted data can specify an email template. Templates are created and managed from the Config section of the admin console. The server will replace the lookups in the template with the data provided in the API request. In this example {first_name} in the template will be replaced with the value of first_name in the API request. The subject and body are stored in the template.

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