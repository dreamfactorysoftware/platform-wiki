The user service is responsible for session management and profile and password maintenance. This service has the following resources…

* session – used for login, logout and getting the current session information

* profile – used to access and update the profile (name, email, etc.) of the current session’s user

* password – used to update the current session’s user’s password

* challenge – used to retrieve the security challenge question and post the answer to gain temporary access when the password is forgotten.



 Session
The session allows a user to access the system. All communication with the provisioned services are done while in a valid session. Only authentication resources (login and challenge) are allowed without a valid session.

 To Login


Description: Log in to the system.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/session/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body:



Element Name
Description
username
Required. User name
password
Required. User password


Response Body:



Element Name
Description
id
Id of the user
display_name
Displayable user name, ' John Doe'
email
User email
username
User name, 'JohnDoe'
is_sys_admin
Is the user an admin
first_name
User first name
last_name
User last name
app_groups
An array of app_groups including apps that belong to the app_group.
ungrouped_apps
An array of apps that don’t belong to any app_group.
ticket
Session ticket
ticket_expiry
Ticket expiration time
session_id
Session id


Sample JSON Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/user/session/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 52
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


{
"userName": "JohnDoe",
"password": "my_password"
}


Sample JSON Response



{

"id": "4",

"display_name": "John Doe",

"email": "johndoe@dreamfactory.com",

"phone": "",

"username": "JohnDoe",

"is_sys_admin": "true",

"first_name": "John",

"last_name": "Doe",

"created_date": "2012-12-26 20:11:34",

"last_modified_date": "2012-12-26 20:11:34",

"created_by_id": "1",

"last_modified_by_id": "1",

"role": null,

"ticket": "-4FoQlB4EjX-mO3yg2EpXcBgNaNVTPeyRuzsZ-9eIBY,",

"ticket_expiry": 1356553284,

"session_id": "as6klno8t5cd5i2o49n2nci175"

}



Sample XML Request



POST http://demo-dsp.cloud.dreamfactory.com/rest/user/session/?format=xml HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 52
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


<dfapi>
<username>JohnDoe</username>
<password>my_password</password>
</dfapi>


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 797
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<id>4</id>
<display_name>John Doe</display_name>
<email>johndoe@dreamfactory.com</email>
<phone></phone>
<username>JohnDoe</username>
<is_sys_admin>true</is_sys_admin>
<first_name>John</first_name>
<last_name>Doe</last_name>
<created_date>2012-12-26 20:11:34</created_date>
<last_modified_date>2012-12-26 20:11:34</last_modified_date>
<created_by_id>1</created_by_id>
<last_modified_by_id>1</last_modified_by_id>
<role></role>
<ticket>TmFA7g7uh_wtef1l6Icp7RAd31g499lbWo5SjqDuCXA,</ticket>
<ticket_expiry>1356553449</ticket_expiry>
<session_id>as6klno8t5cd5i2o49n2nci175</session_id>
</dfapi>

 To Logout


Description: Log out of the system.

Request HTTP Method: DELETE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/session/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body:



Element Name
Description
success
true


Sample JSON Request



DELETE http://demo-dsp.cloud.dreamfactory.com/rest/user/session/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 52
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample JSON Response



{

"success": "true"

}



Sample XML Request



DELETE http://demo-dsp.cloud.dreamfactory.com/rest/user/session/?format=xml HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 52
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample XML Response



HTTP/1.1 200 OK
Date: Wed, 26 Dec 2012 20:19:08 GMT
Server: Apache
X-Powered-By: PHP/5.3.10-1ubuntu3.4
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 797
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<success>true</success>
</dfapi>


 To Get or Renew Current Session Info


Description: Get fresh copy of session info using current session.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/session/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body: Same as login response.

Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/user/session/ HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 536
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/json
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


{
"id": "4",
"display_name": "John Doe",
"email": "johndoe@dreamfactory.com",
"phone": "",
"username": "JohnDoe",
"is_sys_admin": "true",
"first_name": "John",
"last_name": "Doe",
"created_date": "2012-12-26 20:11:34",
"last_modified_date": "2012-12-26 20:11:34",
"created_by_id": "1",
"last_modified_by_id": "1",
"role": null,
"ticket": "QzWVrDGX7YOLl521zN0KMZkH7LjV4pGZNPZBdd2QktI,",
"ticket_expiry": 1356553750,
"session_id": "as6klno8t5cd5i2o49n2nci175"
}


Sample XML Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/user/session?format=xml&ticket HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 797
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: application/xml
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


<?xml version="1.0" ?>
<dfapi>
<id>4</id>
<display_name>John Doe</display_name>
<email>johndoe@dreamfactory.com</email>
<phone></phone>
<username>JohnDoe</username>
<is_sys_admin>true</is_sys_admin>
<first_name>John</first_name>
<last_name>Doe</last_name>
<created_date>2012-12-26 20:11:34</created_date>
<last_modified_date>2012-12-26 20:11:34</last_modified_date>
<created_by_id>1</created_by_id>
<last_modified_by_id>1</last_modified_by_id>
<role></role>
<ticket>G-foyT6Z64Jqsb5apUVi6d0mBrTaMSTkGlVH-a_od_U,</ticket>
<ticket_expiry>1356553853</ticket_expiry>
<session_id>as6klno8t5cd5i2o49n2nci175</session_id>
</dfapi>

 To Get a New Session using a Temporary Timed Ticket


Description: Get new session using ticket.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/session/?ticket=<ticket >

Request URI Parameters:



Parameter Name
Description
ticket
Required. Temporary ticket passed in earlier session.


Request Body: None



Response Body: Same as login response.

Sample JSON Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/user/session?ticket=TmFA7g7uh_wtef1l6Icp7RAd31g499lbWo5SjqDuCXA%2CHTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


Sample XML Request



GET http://demo-dsp.cloud.dreamfactory.com/rest/user/session?format=xml&ticket=TmFA7g7uh_wtef1l6Icp7RAd31g499lbWo5SjqDuCXA%2C HTTP/1.1
Accept: application/xml, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Cookie: PHPSESSID=as6klno8t5cd5i2o49n2nci175


 Profile
The user profile resource consist of the typical things a user can update about themselves, i.e. first, last and display names, email address, phone number, and security question and answer. The password is managed through its own resource ‘password’ for now.

 To Retrieve User Profile
Description: Get user profile data for the current session’s user.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/profile/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: None

Response Body:



Element Name
Description
first_name
User’s configured first name.
last_name
User’s configured last name.
display_name
User’s configured display name.
email
User’s configured email address.
phone
User’s configured phone number.
security_question
User’s configured security challenge question.


{
"first_name": "System",
"last_name": "Administrator",
"display_name": "System Administrator",
"email": "lee@dreamfactory.com",
"phone": null
}


 To Update User Profile
Description: Update user profile data for the current session’s user.

Request HTTP Method: POST, PUT, or MERGE

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/profile/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body:



Element Name
Description
first_name
User’s desired first name.
last_name
User’s desired last name.
display_name
User’s desired display name.
email
User’s desired email address.
phone
User’s desired phone number.
security_question
User’s desired security challenge question.
security_answer
User’s desired security challenge answer.


{
"first_name": "System",
"last_name": "Administrator",
"display_name": "System Administrator",
"email": "admin@dreamfactory.com",
"phone": "555-666-7777"
}


Response Body:



Element Name
Description
success
True if the profile update was successful. Otherwise an error condition will be returned.


{

"success": "true"

}



 Password
Changing the users password is managed as a separate resource called ‘password’. This resource only accepts POST request with old_password and new_password, and must be called within a valid session.

 To Change User Password
Description: Change the user’s password.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/password/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body:



Element Name
Description
old_password
User’s current password.
new_password
User’s desired new password.


Response Body:



Element Name
Description
success
True if the profile update was successful. Otherwise an error condition will be returned.


{

“old_password”: “my_old_password”,

“new_password”: “my_new_password”

}



 Challenge
The challenge resource is used for security control when the user forgets their password. Currently this consists of a question and answer exchange. When a correct answer is received, then a temporary session is established so that the user can update

 To Retrieve the Challenge Question
Description: Get the security question belonging to the user matching username supplied.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/challenge/?username=<username>

Request URI Parameters:



Parameter Name
Description
username
Required. The username of the user to challenge.


Request Body: None



Response Body:



Element Name
Description
security_question
The provisioned security question for the username given.


{

"security_question": "What was your first pet’s name?"

}



 To Answer the Challenge Question
Description: Reset the user’s password by answering the challenge security question.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/challenge/?username=<username>

Request URI Parameters:



Parameter Name
Description
username
Required. The username of the user to challenge.


Request Body:



Element Name
Description
security_answer
The provisioned answer for the security question of the username given.
new_password
The desired new password for the challenged user.


Response Body: Same as login response.



 To Generate a Forgot-Password Email
Description: Get the security question belonging to the user matching username supplied.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/challenge/?username=<username>&send_email=true

Request URI Parameters:



Parameter Name
Description
username
Required. The username of the user to challenge.
send_email
Required. Set to true to send email, otherwise a challenge security question is returned.


Request Body: None



Response Body:



Element Name
Description
success
True if an email was generated. Errors will be returned otherwise .


 Change Password using Challenge Email Code


Description: Reset the user’s password by using the code supplied in the challenge email.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/user/challenge/?code=<code_from_email>

Request URI Parameters:



Parameter Name
Description
code
Required. The code generated and sent in the email from a previous user challenge.


Request Body:



Element Name
Description
new_password
The desired new password for the user.


Response Body: Same as login response.



