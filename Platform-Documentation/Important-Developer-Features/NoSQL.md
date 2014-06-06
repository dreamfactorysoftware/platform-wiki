<p>The DSP NoSQL service allows a developer to securely store any credentials required to access your storage on the server-side, relieving your app from maintaining this data.</p>
<p>Our NoSQL Service will remove any cross-site hoops your app would have to handle by making it a “native” REST service on the DSP.  We also provide a common, fully REST-based API to each of the supported NoSQL service types and use a common data format layout, using JSON, for data entry and retrieval.  Add in our SQL-like filtering language, to make it very simple to find the data you need.</p>

<B>Overview</B>
<p>Each flavor of NoSQL has a unique way of defining how data is stored. Azure calls them “tables” as does AWS, that is for DynamoDb, but for SimpleDb, they are called “domains”.  For CouchDb, they are called “databases”, not to be confused with MongoDb's “databases” which stores your data in what they call “collections”.   While each vendor calls them something different, we will refer to them collectively as “tables”.  These are the things that group your sets of data together or partition them.  You can actually manage most aspects of the table administration through the REST API. </p>
<p>Currently, each DSP supports Amazon Web Services' SimpleDB and DynamoDB, Windows Azure's Tables, MongoDB and CouchDB. </p>

<B>Service Setup</B>
<p>To create a new NoSQL service, select services from the Admin View left navigation menu.  In the type dropdown menu select NoSQL DB.  Enter the Service Name, Api Name and Description.  Then select the appropriate NoSQL Type.  The required fields for each NoSQL Type are outlined below. </p>

<B>Amazon DynamoDB</B>
<p>To complete the setup of your NoSQL service select Amazon DynamoDB from the NoSQL drop down. </p>
<p>Enter your AWS Access and Secret Key. </p>
<p>Select the AWS Region that will host your DynamoDB. </p>
<p><a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/ManagingCredentials.html#Using_CreateAccessKey" class="external text" rel="nofollow">Instructions on locating your AWS Access Key and Secret Key.</a></p>

<B>Amazon SimpleDB</B>
<p>To complete the setup of your NoSQL Service select Amazon SimpleDB from the NoSQL drop down. </p>
<p>Enter your AWS Access and Secret Key. </p>
<p>Select the AWS Region that will host your SimpleDB. </p>
<p><a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/ManagingCredentials.html#Using_CreateAccessKeyl" class="external text" rel="nofollow">Instructions on locating your AWS Access Key and Secret Key.</a></p>

<B>Windows Azure Tables</B>
<p>To setup your NoSQL service select Windows Azure Tables from the NoSQL drop down. </p>
<p>Enter your Azure Account Name and Account Key</p>
<p><a href="http://www.windowsazure.com/en-us/manage/services/storage/how-to-manage-a-storage-account/#regeneratestoragekeys" class="external text" rel="nofollow">Instructions on locating your Windows Azure Account Name and Account Key.</a></p>

<B>CouchDB</B>
<p>To setup your NoSQL service select CouchDB from the NoSQL drop down.</p>
<p>In the connection string enter the host name of your CouchDB Server.  For example couch.dreamfactory.com; if your CouchDB is running on a different port than 5984 you can append the port number to the host name ie. couch.dreamfactory.com: 5984.</p>
<p>The Database field is the location in CouchDB where the collection you wish to access is located.</p>
<p>The fields username and password are optional.  These values can be left blank unless they are required by your CouchDB deployment.</p>

<B>MongoDB</B>
<p>To setup your NoSQL service select MongoDB from the NoSQL drop down.</p>
<p>In the connection string enter the host name of your mongo instance.  For example mongo.dreamfactory.com; if your MongoDB is running on a different port than 27017 you can append the port number to the host name; mongo.dreamfactory.com:28017.</p>
<p>The Database field is the location in MongoDB where the collection you wish to access is located.</p>
<p>The fields username and password are optional.  These values can be left blank unless they are required by your MongoDB deployment.</p>
<p>If your DSP has been setup using Bitnami, GitHub, or using our Linux installation packages the MongoDB PHP driver will need to be installed.  Instructions for installing these drivers can be found <a href="http://docs.mongodb.org/ecosystem/drivers/php/" class="external text" rel="nofollow">here</a>.</p>

<B>Verifying your NoSQL Configuration.</B>
<p>The easiest way to verify your access to your NoSQL service is to use our API documentation tool, Swagger.  To access swagger press the script button next to the NoSQL service name.  To explore the service in depth press the HTTP Verb you would like to execute.</p>
<p>The HTTP verb 'POST' is used for creating new entities, 'PUT' is used for replacing the whole content of an entity and 'PATCH' is used to merge in changes to an entity ('PATCH' and 'MERGE' HTTP verbs are used interchangeably in the REST API).  Also, as with the other DSP services, if your transport layer only accepts 'GET' and 'POST' verbs, using a 'POST' command while setting either a url parameter, 'method=PATCH', or a header, X-HTTP-Method = PATCH will “tunnel” the command through properly.</p>

<B>Retrieving Records using Swagger</B>
<p>When it comes to making your NoSQL data available to your app, our REST API provides several different methods to get just the data sets you want, when you want it.  Below are the available options for a GET  request on a particular table.</p>
<p>The table name is sent as part of the url, while the other options are sent as url parameters.  If url parameters are not your cup of tea, you can send most of them as posted data (using POST request with X-HTTP-METHOD = GET as mentioned earlier, Note that the “record” parameter can only be sent in this way).  Most of them are self explanatory, but a few may need clarification.</p>
<table class="table-striped table-condensed">
    <tr>
        <td><p>ids</p></td>
        <td>
            <p>This is a comma delimited list of unique identifiers (think primary key) values for retrieving multiple records at a time. If passed as POST data, this can also be an array of ids. In the case where there is no static identifier field (DynamoDb), use of the “id_field” parameter is necessary to indicate which field these values belong to.</p>
        </td>
    </tr>
    <tr>
        <td><p>filter</p></td>
        <td>
            <p>This is where you use our simple SQL-like filter string. Comparison operators supported on every platform are ' = ', ' != ', ' > ', ' >= ', ' < ', ' <= '; or as their SQL short form ' eq ', ' ne ', ' gt ', ' ge ', ' lt ', ' le '. Depending on the dbvendor, others such as ' contains ', ' like ', and ' begins_with '.Spaces surrounding the operator is required. String values on the right side of the comparison must be within single of double quotes. Depending on the db vendor, logical comparisons (AND, OR, NOT) are also supported.  The whole filter string must be url-encoded.</p>
        </td>
    </tr>
    <tr>
        <td><p>record</p></td>
        <td>
            <p>Used only in POST data, this option allows you to send partial (minimally the identifier fields) or complete records back to the database to be “refreshed” with the latest values. This is also helpful in instances where the table has multiple indexes, i.e. DynamoDb and Azure Tables.</p>
        </td>
    </tr>
</table>
<p>If we want to find the first 3 records in the zipcodes table information that have a population of over 20,000 people, returning only the city, state and percentage over 40 years of age. Here is what it looks like in our REST API.</p>

<pre class="de1">
https://dsp-mydspname.cloud.dreamfactory.com/rest/mongo/zipcodes?filter=pop+%3E+20000&limit=3&fields=city%2Cstate%2CPopulationOver40
</pre>
<p>And this is what gets returned...</p>
<pre class="de1">
{
"record": [
{
"_id": "28659",
"city": "NORTH WILKESBORO",
"state": "NC",
"PopulationOver40": 9.19
},
{
"_id": "31201",
"city": "HUBER",
"state": "GA",
"PopulationOver40": 99.877
},
{
"_id": "71291",
"city": "WEST MONROE",
"state": "LA",
"PopulationOver40": 80.099
}
]
}
</pre>

<B>Updating and Merging Into Records</B>

<p>The same array of records or a single record format with changes is supported for updating records.  Using the PUT HTTP verb as mentioned above will replace the whole record with the posted data if found by matching identifiers in the record.</p>

<pre class="de1">
PUT https://dsp-mydspname.cloud.dreamfactory.com/rest/mongo/zipcodes
</pre>
<pre class="de1">
{
"_id": "29684",
"city": "STARR",
"state": "SC",
"pop": 2890,
"PopulationOver40": 79.4
}
</pre>
<p>If you only want to merge changes into a record without having to reset everything, then use the MERGE or PATCH HTTP verb and send only the changes along with the identification fields.</p>
<pre class="de1">
PATCH https://dsp-mydspname.cloud.dreamfactory.com/rest/mongo/zipcodes
</pre>
<pre class="de1">
{
"_id": "29684",
"pop": 2890,
"PopulationOver40": 79.4
}
</pre>
<p>If you only want to update or merge data for one record, and it can be identified by a single key field, then you could also add the id to the end of the url, and pass only the fields that require change.</p>
<pre class="de1">
PATCH https://dsp-mydspname.cloud.dreamfactory.com/rest/mongo/zipcodes/29684
</pre>
<pre class="de1">
{
"pop": 2890,
"PopulationOver40": 79.4
}
</pre>
<p>Two other methods of merging data are by id list or filter (using “ids” or “filter” url parameters mentioned above for retrieving records).  In these cases, if not natively supported, the server will query the table for the filtering results, merge in the record changes and push the changes back in an update request.  This is an easy way of updating multiple records with the same field-value changes.</p>

<B>Deleting Records</B>
<p>Deleting is similar to updating records but no posted data is required.</p>