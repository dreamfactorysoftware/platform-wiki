**// login - POST to /user/session**

* Use returned session_id as X-DreamFactory-Session-Token header in subsequent calls
* Change yourdsp to your dsp name 
* Change email and password to your email and password

```
curl -i -k -3 -X POST https://dsp-yourdsp.cloud.dreamfactory.com/rest/user/session \
 -H "X-DreamFactory-Application-Name: todojquery" \
 -d '{ "email" : "foo@bar.com", "password" : "yourpassword" }'
```

**// get all records from table named todo**

```
curl -i -k -3 -X GET https://dsp-yourdsp.cloud.dreamfactory.com/rest/db/todo \
  -H "X-DreamFactory-Application-Name: todojquery" \
  -H "X-DreamFactory-Session-Token: bhc7lov8r41h4cbn6pue1r63gbgh7jf6"
```

**// create new todo**

```
curl -i -k -3 -X POST https://dsp-yourdsp.cloud.dreamfactory.com/rest/db/todo \
  -H "X-DreamFactory-Application-Name: todojquery" \
  -H "X-DreamFactory-Session-Token: bhc7lov8r41h4cbn6pue1r63gbgh7jf6" \
  -d '{ "name" : "curl todo", "complete" : false }'
```

**// update todo with id = 1**

```
curl -i -k -3 -X PATCH https://dsp-yourdsp.cloud.dreamfactory.com/rest/db/todo/1 \
  -H "X-DreamFactory-Application-Name: todojquery" \
  -H "X-DreamFactory-Session-Token: bhc7lov8r41h4cbn6pue1r63gbgh7jf6" \
  -d '{ "complete" : true }'
```

**// delete todo with id = 1**

```
curl -i -k -3 -X DELETE https://dsp-yourdsp.cloud.dreamfactory.com/rest/db/todo/1 \
  -H "X-DreamFactory-Application-Name: todojquery" \
  -H "X-DreamFactory-Session-Token: bhc7lov8r41h4cbn6pue1r63gbgh7jf6"
```

**// logout - DELETE /user/session**

```
curl -i -k -3 -X DELETE https://dsp-yourdsp.cloud.dreamfactory.com/rest/user/session \
  -H "X-DreamFactory-Application-Name: todojquery" \
  -H "X-DreamFactory-Session-Token: bhc7lov8r41h4cbn6pue1r63gbgh7jf6"
```