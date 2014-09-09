# Accessing the local files service(/rest/files) API

Uploading as Binary:

We'll need two headers to accomplish this feat.

 * X-File-Name
 * Content-Type

In jQuery

```javascript
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("X-File-Name", file.name);
        request.setRequestHeader("Content-Type", file.type);
    },
    type :'POST',
    url :{yourdspurl}/rest/files/{container}/{file_path} createFile()
    data: yourfile,
    cache:false,
    processData: false
});
```
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
        //Wrap the files in a body request param
        $http.post(uploadUrl, {body: fd}, {
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
var uploadUrl = 'https://yourdspurl/rest/files/{container}/{file_path}';
fileUpload.uploadFileToUrl(file, uploadUrl);
```
