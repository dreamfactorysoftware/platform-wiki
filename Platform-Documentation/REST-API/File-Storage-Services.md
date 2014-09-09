# Accessing the local files service(/rest/files) API

Uploading as Binary:

We'll need two headers to accomplish this feat.

 * X-File-Name
 * Content-Type

And here's some code!

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