<b>Manage Schema</b>


</p>Schema allows a developer to create tables in DreamFactory utilizing the Local SQL DB service. </p>

<b>Schema DataTypes</b>
    <table class="table table-bordered table-striped table-hover">
        <thead>
        <tr>
            <th>
                Data Type
            </th>
            <th>
                Description
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                ID/Primary Key
            </td>
            <td>
                Defines a typical table identifier, translates to "int not null auto_increment primary key". This type requires no other properties to define the field. It presumes a "type" of int with "allow_null" set to
 false, the "auto_increment" and "is_primary_key" are set to true. It can only be used once in a table definition.
            </td>
        </tr>
        <tr>
            <td>
                String
            </td>
            <td>
                Defines a string field (i.e. varchar or char), defaults to a length of 255, but can be set using the
                "length" property. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Integer
            </td>
            <td>
                Defines an integer field. Use "length" to set the displayable length of the integer, i.e. int(11) in
                MySQL. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Text
            </td>
            <td>
                Defines a large string field (i.e., MySQL's text or MSSQL's varchar[max]), defaults to the largest length string allowed by the underlying database. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td width="100">
                Boolean
            </td>
            <td>
                Defines a boolean field, which may be represented by int of length 1, using 0 and 1 values, if a true
                and false boolean type is not supported by the underlying database. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Binary
            </td>
            <td>
                Defines a binary string field (i.e. varbinary or binary), defaults to a length of 255, but can be set
                using the "length" property. Set the "fixed_length" property to true for fixed length (i.e. binary)
                behavior. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Blob
            </td>
            <td>
                Defines a large binary string field (i.e. MySQL's blob or MSSQL's varbinary[max]), defaults to the
                largest length binary string allowed by the underlying database. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Float
            </td>
            <td>
                Defines a standard float field. Use “scale" to set the number of desired decimal places to the right of
                the decimal point. Use “length” or "precision" to set the total number of digit positions. Optional
                properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Decimal
            </td>
            <td>
                Defines a standard decimal field. Use “scale" to set the number of desired decimal places to the right
                of the decimal point. Use “length” or "precision" to set the total number of digit positions. Optional
                properties: "allow_null.
            </td>
        </tr>
        <tr>
            <td>
                Datetime
            </td>
            <td>
                A datetime field. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Date
            </td>
            <td>
                A date field. Optional properties: "allow_null".
            </td>
        </tr>
        <tr>
            <td>
                Time
            </td>
            <td>
                A time field. Optional properties: "allow_null".
            </td>
        </tr>
        </tbody>
    </table>


<b>Import Schema</b>

<p>The other option for importing data, is to import schema from JSON data. Below is an example of a valid JSON file for creating schema. To import JSON data:</p>

<ol>
<li>Access the <b>Admin Console</b> by clicking the gear icon in the upper right.</li>
<li>Select <b>Schema</b> from the left-side menu.</li>
<li>Click the <b>Import JSON Schema</b> button.</li> 
<li>Next, paste your JSON schema into the input box and click the <b>Validate</b> button.</li>  
<li>To import your JSON file, click the <b>Create Table(s)</b> button.</li>
</ol>

<pre class="de1">
{
  "Contacts": {
    "name": "Contacts",
    "fields": [
      {
        "name": "contactId",
        "type": "int",
        "autoIncrement": true,
        "header": "ID",
        "width": 50,
        "editor": {
          "xtype": "hiddenfield"
        }
      },
      {
        "name": "firstName",
        "size": 64,
        "header": "First Name",
        "required": true,
        "editor": {
          "xtype": "textfield",
          "anchor": "100%"
        }
      },
      {
        "name": "lastName",
        "size": 64,
        "header": "Last Name",
        "required": true,
        "editor": {
          "xtype": "textfield",
          "anchor": "100%"
        }
      },
      {
        "name": "imageUrl",
        "header": "Image URL",
        "size": 1024,
        "editor": {
          "xtype": "textfield",
          "anchor": "100%"
        }
      },
      {
        "name": "twitter",
        "header": "Twitter",
        "size": 1024,
        "editor": {
          "xtype": "textfield",
          "anchor": "100%"
        }
      },
      {
        "name": "skype",
        "header": "Skype",
        "size": 1024,
        "editor": {
          "xtype": "textfield",
          "anchor": "100%"
        }
      },
      {
        "name": "notes",
        "size": 1024,
        "header": "Notes",
        "autoExpand": true,
        "editor": {
          "xtype": "textarea",
          "anchor": "100%"
        }
      }
    ]
  }
}
</pre>

<b>Manually Create Schema</b>

<p>A developer can manually enter the fields.</p>
<p>To enter fields manually:</p>

<ol>
<li>Access the <b>Admin Console</b> by clicking the gear icon in the upper-right tool bar.</li>
<li>Select <b>Schema</b> from the left navigation menu.</li>
<li>Click the <b>Create New Table</b> button.</li>
<li>Enter the table name you would like to create. You are now ready to create fields for your DB.</li>
<li>Enter a file name, then select Field type and length, then click <b>Add Field</b>.</li>
<li>Once all of your fields have been entered, click the <b>Save</b> button.</li>
</ol>

<p>If you would like to add data manually, select <b>Data</b> on the left navigation menu, then select your table by name.</p>

