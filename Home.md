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