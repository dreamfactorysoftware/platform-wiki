 File Management Services
 Import Folders and Files from a Zip File
 From URL path
POST http://<server_name>/rest/<service_name>/[additional_path/]?url=<url_to_zip_file.zip>&extract=true&[clean=[true | false]]



 From Local File
POST http://<server_name>/rest/<service_name>/[additional_path/]? extract=true&[clean=[true | false]]



 Export Folders and Files as a Zip File
GET http://<server_name>/rest/<service_name>/[additional_path/]?zip=true



 Create Folders
POST http://<server_name>/rest/<service_name>/[additional_path/]<folder_name>?



 Create Files
 From URL
POST http://<server_name>/rest/<service_name>/[additional_path/]?url=<url_to_file.zip>



 From Local Files
POST http://<server_name>/rest/<service_name>/[additional_path/]



 From Content
POST http://<server_name>/rest/<service_name>/[additional_path/]





Description: Create one or more files or folders in file storage. Each request can create files, folders, or both. The folder content can be empty or be used for other purposes such as storing information about the folder. When creating a folder there is no need to include the slash at the end of the name. It will be added automatically.

Request HTTP Method: POST

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/doc/

Request URI Parameters: No additional parameters required, See Section 1 – REST Services.

Request Body: See sample request. It creates a folder and adds two files to the folder.



Response Body: See sample response.



Sample JSON Request (folder and two files)



{
"folders": {
"folder": [
{
"Name": "testfolder",
"Content": ""
}
]
},
"files": {
"file": [
{
"Name": "testfolder/testblob1",
"Content": "PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9Xb3JsZCAjMiEhITwvaDE+PC9ib2R5PjwvaHRtbD4=",
"is_base64": "true"
}, {
"Name": "testfolder/testblob2",
"Content": "PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9Xb3JsZCAjMiEhITwvaDE+PC9ib2R5PjwvaHRtbD4=",
"is_base64": "true"
}
]
}
}

Sample JSON Response (folder and two files)



HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-Length: 64
Content-Type: application/json
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Server: Microsoft-IIS/7.5
X-Powered-By: PHP/5.3.13
Access-Control-Allow-Origin: dreamfactorysoftware.blob.core.windows.net
X-Powered-By: ASP.NET
X-Powered-By: ARR/2.5
X-Powered-By: ASP.NET
Date: Wed, 26 Dec 2012 18:11:53 GMT

{
"folder": [
{
"name": "testfolder",
"path": "testfolder"
}
],
"file": []
}

Sample XML Request (folder and two files)



POST http://dftestcloud.azurewebsites.net/rest/DOC?format=xml HTTP/1.1
X-Application-Name: dfac
Content-Type: application/xml; charset=utf-8
Content-Length: 692
Cookie: PHPSESSID=5fp99ibgl6daasossunogm9ro5

POST http://dftestcloud.azurewebsites.net/rest/DOC?format=xml HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Application-Name: Admin
Content-Length: 561
Cookie: PHPSESSID=relmu57rl67km9lh96nrtkmvd5

<dfapi>
<folders>
<folder>
<name>testfolder</name>
<content></content>
</folder>
</folders>
<files>
<file>
<name>testfolder/testblob1</name>
<content>PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9X
b3JsZCAjMSEhITwvaDE+PC9ib2R5PjwvaHRtbD4=</content>
<is_base64>true</is_base64>
</file>
<file>
<name>testfolder/testblob2</name>
<content>PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9X
b3JsZCAjMiEhITwvaDE+PC9ib2R5PjwvaHRtbD4=</content>
<is_base64>true</is_base64>
</file>
</files>
</dfapi>



Sample XML Response (folder and two files)



HTTP/1.1 200 OK
Content-Length: 156
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<folders>
<folder>
<name>testfolder</name>
<path>testfolder</path>
</folder>
</ folders >
<files>
<file>
<name>testfolder/testblob1</name>
<path>testfolder/testblob1</path>
</file>
<file>
<name>testfolder/testblob2</name>
<path>testfolder/testblob2</path>
</file>
</files>
</dfapi>


 Get Folders and/or Files


Description: Retrieve a file from file storage.

Request HTTP Method: GET

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/doc/<filename>



Request URI Parameters:



Parameter Name
Description
properties
Boolean, true = return blob properties.
content
Boolean, true = include base64 content as a property.


Request Body: None



Response Body: See sample response.



Sample JSON Request



GET http://dftestcloud.azurewebsites.net/rest/doc/testfolder/testblob2?properties=true&content=true&_=1356542389597 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
X-Application-Name: Admin
Cookie: PHPSESSID=relmu57rl67km9lh96nrtkmvd5


Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 252
Content-Type: application/json

{
"name": "testblob2",
"lastModified": "Thu, 06 Dec 2012 14:45:08 GMT",
"size": 77,
"contentType": "text\/html",
"path": "testfolder\/testblob2",
"content": "PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9Xb3JsZCAjMiEhITwvaDE+PC9ib2R5PjwvaHRtbD4="
}

Sample XML Request



GET http://dftestcloud.azurewebsites.net/rest/DOC/testfolder/testblob2?format=xml&properties=true&content=true HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=relmu57rl67km9lh96nrtkmvd5


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 338
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<name>testblob2</name>
<lastModified>Thu, 06 Dec 2012 14:45:08 GMT</lastModified>
<size>77</size>
<contentType>text/html</contentType>
<path>testfolder/testblob2</path>
<content>PCFET0NUWVBFIGh0bWw+PGh0bWw+PGJvZHk+PGgxPkhlbGxvIGZyb20gSGVsbG9Xb3JsZCAjMiEhITwvaDE+PC9ib2R5PjwvaHRtbD4=</content>
</dfapi>


 Delete File


Description: Delete a file or folder from blob storage. Folder names must end with '/' and folders cannot be deleted unless they are empty.

Request HTTP Method: POST (requires additional header, see Request Headers below)

Request Headers: No additional headers required, See Section 1 – REST Services.

Request URI: http://<server_name>/rest/DOC/<filename>?format=<fmt>



Request URI Parameters:



Parameter Name
Description




Request Body: None



Response Body: See sample response.



Sample JSON Request



POST http://dftestcloud.azurewebsites.net/rest/DOC/testfolder/testblob1 HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=relmu57rl67km9lh96nrtkmvd5
Content-Length: 0


Sample JSON Response



HTTP/1.1 200 OK
Content-Length: 31
Content-Type: application/json

{
"file": [
{
"path": "testfolder/testblob1"
}
]
}

Sample XML Request



POST http://dftestcloud.azurewebsites.net/rest/DOC/testfolder/testblob2?format=xml HTTP/1.1
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip, deflate
X-Application-Name: Admin
Cookie: PHPSESSID=relmu57rl67km9lh96nrtkmvd5
Content-Length: 0


Sample XML Response



HTTP/1.1 200 OK
Content-Length: 116
Content-Type: application/xml

<?xml version="1.0" ?>
<dfapi>
<files>
<file>
<path>testfolder/testblob2</path>

</file>

</files>
</dfapi>

 Library File Service
The application library service is built on top of the file management service concept. All REST API methods apply to the library service using “lib” as the service_name in the URL.

One thing different about the library service is that it includes a default directory called web-core that cannot be modified or deleted. This directory contains a set of libraries used by the DreamFactory suite of applications and may be used by other apps as well.

Another thing special about the library service is that the files can be included directly from your app via a URL.

 Application File Service
The application file service is built on top of the file management service concept. All REST API methods apply to the library service using “app” as the service_name in the URL.

One thing different about the application file service is that it includes a way of importing application from a DreamFactory package file that includes the definition of the application, the files for the application, any associated schema, and some sample data.

Another thing special about the application service is that the files can be accessed directly via a URL.

 Import Application from a Package File
A DreamFactory package file, extension “.dfpkg”, is a zip file with a special format.

 From URL path
POST http://<server_name>/rest/app/?url=<url_to_package_file.dfpkg>&extract=true&[clean=<true | false>]



 From Local File
POST http://<server_name>/rest/app/



 Export Application as a Package File
GET http://<server_name>/rest/app/<app_name>/?[include_files=<true | false>]&[include_schema=<true | false>[&include_data=<true | false>]]



 Accessing Files in an Application

