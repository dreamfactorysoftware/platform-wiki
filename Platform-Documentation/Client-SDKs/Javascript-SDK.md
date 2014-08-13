The Javascript SDK is on GitHub [here](https://github.com/dreamfactorysoftware/javascript-sdk).

The Javascript SDK includes an "index.html" file with simple REST API calls to create, read, update, and delete records from a pre-built "to do list" table in DreamFactory. There's also a "ReadMe" file with links to short tutorials.

The Javascript SDK is a convenience wrapper for all the methods exposed in the REST API. The SDK contains your REST endpoint and API key so you can start coding immediately. When a new REST API is provisioned in the Admin Console, the JavaScript SDK will automatically include that API the next time your application is loaded.

Access the SDK by using the "df" object. You can see the "df" object in your debugger by opening up the DOM inspection tab. The "df" object is attached to the "window" object. For example, using Chrome's Dev Tools, open the console and start typing "window.df.apis" to display all the methods and properties.

Use of the Javascript SDK on the local file system requires "*" to be in your list of allowed hosts in the CORS configuration section of the Admin Console.

