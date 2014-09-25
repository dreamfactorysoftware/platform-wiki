# Working with Files

###Local File Storage on the DSP (/rest/files)

Working with files, whether local to the DSP or remote breaks down to basic CRUD operations, just like working with your database services.  

There are a few setup items you'll need to consider first.

####By default, files are publicly available via URL.

You may like that, or question it, but lets walk through how to configure the local file service with the access to files you prefer.

Your rest api calls to your file service break down as follows:

{protocol}{dsp_url}/{endpoint}/{file_service_name}/{container}/{path}

file_service_name is the name of the file service (/files for local storage)

The container is simply the root folder of your file service.

The path is simply the file or folder path you wish to work with.

Put it all together:

https://dsp-x.cloud.dreamfactory.com/rest/files/mycontainer/myfolder/myfile

On dsp-x, I've created a container called public, where I'll put the files I actually want to be public.

It sits along side two containers that I do not want to be public.

When we open up the local file storage service, we see "Private Folders and Files" as an accordion header.

I'll open that up and add the paths I want private and update the service.

Now any calls to those folders will return a 403, forbidden response code.

So what if you're like me, and you have dsp-x out there with guest access on so that anyone can access my services via the API?

Well this part has been around for a while, but in case you missed it.

I have a guest access turned on, with a role called file_access assigned.

Lets look at that role.  As you can see, in the service access assignments, I've added the local file storage service, with the component set to "public".  The component in this case is the container.
I also added root ("*") access so that I can list the containers, you'll see why coming up.

This means if anyone tries to make api calls to the local file storage service and they are trying to hit any container besides public, they'll get a 403.

###I read all that, I just want code samples.

I recommend you visit the API Docs section of your admin console to get familiar with both the paths and the associated SDK calls for your file service.

###Getting a list of files
We're going to do a GET on the files service and tell it which container to use.

What if you don't know the container?  Just leave it off the url, the API will list them for you.

Lets call DSP-X and ask what we have access to.

I'll use Jquery since we're all familiar with it.

```javascript
//DO NOT FORGET YOUR APP NAME!
$.get("https://dsp-x.cloud.dreamfactory.com/rest/files?app_name=filedemo");

//what comes back
{
    "resource": [
        {
            "name": "applications",
            "path": "applications"
        },
        {
            "name": "public",
            "path": "public"
        },
        {
            "name": "swagger",
            "path": "swagger"
        }
    ]
}


```

###Creating Files
Two ways to do this, uploading a file as binary, or creating a file from content.
#####Uploading Binary Files
This is by far our most requested sample.



In Angular

Read This First [MULTIPART/FORM-DATA FILE UPLOAD WITH ANGULARJS](http://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs)

Using the directive in the linked Blog above by JENNY LOUTHAN, we can use that file in a new service and controller.

Create the File Upload Service
```javascript
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        //Big Difference here, have to use files, not file
        fd.append('files', file);
        $http.post(uploadUrl + file.name + "?app_name=your_app_name", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);
```
Invoke that Service in your controller

```javascript
var file = $scope.myFile;
var uploadUrl = 'https://yourdspurl/rest/files/{container}/';
fileUpload.uploadFileToUrl(file, uploadUrl);
```


Here's a [jsFiddle](http://jsfiddle.net/specialjyo/a0umb9js/1/) That puts it all together.

Check out our file management [source on github](https://github.com/dreamfactorysoftware/dsp-core/blob/master/web/filemanager/js/filemanagement.js) to see how we do it with jquery

