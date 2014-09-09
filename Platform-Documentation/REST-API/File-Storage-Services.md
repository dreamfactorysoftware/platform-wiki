# Accessing the local files service(/rest/files) API

Uploading Binary Files:

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
        $http.post(uploadUrl + file.name + "?app_name=your_app_name", {body: fd}, {
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

