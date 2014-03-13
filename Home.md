Important Notes

Use of our API requires SSL3. If you plan on making requests from Curl, or your Native SDK, make sure you are using version 3.
For example, in curl: curl - 3 url

Your API Key
Your “api key” to talk to our API is your App Name as defined in the Administration App, For each request, you can :

1.Append app_name=yourappname to the querystring or<br/>
2.Send a request header called X-DreamFactory-Application-Name with the value of your app name.

Authentication
If your application is not part of the guest user’s role, then access to any service or data components will require authentication.
To authenticate a user, simply POST a JSON string to /user/session that takes on the following format: ‘{“email”:”email_value”, “password”:”password_value”}’
If successful, in the response, you’ll see a session_id has been created.
Very Important : For all future requests to the API, you’ll need to pass the session_id as a new request header called X-DreamFactory-Session-Token 

Welcome to **Snowplow** - the open-source, web-scale analytics platform powered by [Hadoop][hadoop], [Hive][hive] and [Redshift][redshift].

This wiki is the main source of documentation for **developers** working with (or contributing to) the Snowplow project. If this is your first time hearing about Snowplow, we recommend starting with the [Snowplow website][website].

## Quick navigation

| About Snowplow             | Project & Community              | Setup Guide          | Technical Documentation                  |
|----------------------------|---------------------------------|-------------------------------|---------------------------|
| [[/images/help.png]] | [[/images/users.png]] | [[/images/tools.png]] | [[/images/database.png]] |
| [[About Snowplow|Snowplow-overview]] | [[Project & Community|Snowplow-project-and-community]]       | [[Setup Guide|Setting-up-Snowplow]] | [[Technical Documentation|Snowplow-technical-documentation]]|
| Introducing Snowplow - why we built it and what it does | About the open-source project, our community and how to contribute | A step-by-step guide to running Snowplow | Detailed technical documentation on Snowplow and its five sub-systems |

## Questions or need help?

Check out our [[Talk to us]] page for different ways of getting in touch.

[website]: http://snowplowanalytics.com
[hadoop]: http://hadoop.apache.org/
[hive]: http://hive.apache.org/
[redshift]: http://aws.amazon.com/redshift/
