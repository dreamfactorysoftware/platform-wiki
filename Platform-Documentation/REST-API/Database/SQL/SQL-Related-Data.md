One of the most powerful features of SQL databases is the ability to relate separate data records and perform queries that retrieve that related data all at once. DreamFactory's SQL DB service discovers these relationships automatically from the schema in your database. This allows clients of the API to work with related data as one unit. You don't have to provision anything except the connection parameters. The service can only access schema and records that are allowed by the credentials given in the connection parameters. Additional restrictions for the access through the API may be provisioned using our user role setup.

###Building New Relationships

Using the [schema](Database-Schema) portion of the database service, relationships between new or existing tables can easily be created. Consider the following schema for a demo of tracking contacts in a database. Here we can show the various ways data can be related and how to use our API to discover these relationships and perform CRUD operations with them. Note: The tables here have been edited for size and clarity, to see the full schema, see [Contact Demo Schema](contact_demo_schema.json). The schema here can be posted to the [database schema API](Database-Creating-Schema), or imported into the Schema Manager in the admin application, to create these tables and relationships.

```javascript
{
	"description": "These tables comprise the contacts demo suite schema, used by the demo app and test suites.",
	"table":       [
		{
			"description": "The main table for tracking contacts.",
			"name":        "contact",
			"field":       [
				{
					"name":  "id",
					"label": "Contact Id",
					"type":  "id"
				},
				{
					"name":       "first_name",
					"type":       "string",
					"size":       40,
					"allow_null": false,
					"is_index":   true,
					"validation": {
						"not_empty": {
							"on_fail": "First name value must not be empty."
						}
					}
				},
				{
					"name":       "last_name",
					"type":       "string",
					"allow_null": false,
					"is_index":   true,
					"size":       40
				},
				{
					"description": "Relates one contact to another, an inter-table many-to-one relationship.",
					"name":       "reports_to",
					"type":       "reference",
					"ref_table":  "contact",
					"ref_fields": "id"
				},
                ...
			]
		},
		{
			"description": "The contact details sub-table, owned by contact table row.",
			"name":        "contact_info",
			"field":       [
				{
					"name":  "id",
					"label": "Info Id",
					"type":  "id"
				},
				{
					"description": "Relates contact_info to contact row, an many-to-one relationship.",
					"name":          "contact_id",
					"type":          "reference",
					"allow_null":    false,
					"ref_table":     "contact",
					"ref_fields":    "id",
					"ref_on_delete": "CASCADE"
				},
				...
			]
		},
		{
			"description": "The main table for tracking groups of contact.",
			"name":        "contact_group",
			"field":       [
				{
					"name": "id",
					"type": "id"
				},
				{
					"name":       "name",
					"type":       "string",
					"size":       128,
					"allow_null": false,
					"validation": {
						"not_empty": {
							"on_fail": "Group name value must not be empty."
						}
					}
				},
				...
			]
		},
		{
			"description": "The join table for tracking contacts in groups, creates a many-to-many relationship.",
			"name":        "contact_group_relationship",
			"field":       [
				{
					"name": "id",
					"type": "id"
				},
				{
					"name":          "contact_id",
					"type":          "reference",
					"allow_null":    false,
					"ref_table":     "contact",
					"ref_fields":    "id",
					"ref_on_delete": "CASCADE"
				},
				{
					"name":          "contact_group_id",
					"type":          "reference",
					"allow_null":    false,
					"ref_table":     "contact_group",
					"ref_fields":    "id",
					"ref_on_delete": "CASCADE"
				}
			]
		},
		{
			"description": "The join table for tracking associated contacts, creating a many-to-many relationship.",
			"name":        "associated_contact",
			"field":       [
				{
					"name": "id",
					"type": "id"
				},
				{
					"name":          "contact_id",
					"type":          "reference",
					"allow_null": false,
					"ref_table":     "contact",
					"ref_fields":    "id",
					"ref_on_delete": "CASCADE"
				},
				{
					"name":       "associated_id",
					"type":       "reference",
					"allow_null": false,
					"ref_table":  "contact",
					"ref_fields": "id"
				},
				...
			]
		}
	]
}
```

###Discovering the Relationships

Likewise, schema can be retrieved by the [database schema API](Database-Retrieving-Schema) to discover existing relationships. So the following GET request to /rest/<db_service_name>/_schema/contact pulls the `contact` table's schema as well as its relationships (Note: Edited for size and clarity).

```javascript
{
  "name": "contact",
  "label": "Contact",
  "plural": "Contacts",
  "primary_key": "id",
  "name_field": null,
  "field": [
    ...
  ],
  "related": [
    {
      "name": "associated_contacts_by_associated_id",
      "type": "has_many",
      "ref_table": "associated_contact",
      "ref_field": "associated_id",
      "field": "id"
    },
    {
      "name": "associated_contacts_by_contact_id",
      "type": "has_many",
      "ref_table": "associated_contact",
      "ref_field": "contact_id",
      "field": "id"
    },
    {
      "name": "contact_by_reports_to",
      "type": "belongs_to",
      "ref_table": "contact",
      "ref_field": "id",
      "field": "reports_to"
    },
    {
      "name": "contact_group_relationships_by_contact_id",
      "type": "has_many",
      "ref_table": "contact_group_relationship",
      "ref_field": "contact_id",
      "field": "id"
    },
    {
      "name": "contact_groups_by_contact_group_relationship",
      "type": "many_many",
      "ref_table": "contact_group",
      "ref_field": "id",
      "join": "contact_group_relationship(contact_id,contact_group_id)",
      "field": "id"
    },
    {
      "name": "contact_infos_by_contact_id",
      "type": "has_many",
      "ref_table": "contact_info",
      "ref_field": "contact_id",
      "field": "id"
    }
  ]
}
```

Note that auto-generated "related" section returned with the schema gives the following details about each relationship.

  * `name` - The auto-generated relationship name to be used when issuing CRUD requests on records.
  * `type` - One of "belongs_to", "has_many", or "many_many", describing the type of the relationship each reference has to the table queried.
  * `ref_table` - The related table making up the other side of the relationship with the table queried. 
  * `ref_field` - The field in `ref_table` that makes up the {table,field} tuple of the reference, i.e. the foreign key.
  * `field` - The field on the table queried that is part of the relationship, i.e. what is pointed to by the reference.
  * `join` - A generalized statement about the junction table, that joins the `ref_table` to the queried table, including the two fields that point to each side of the relationship.
  
The server actually uses this information to dictate the behavior of how things are retrieved and updated when dealing with related data. While most of this information may seem unnecessary for the client side to know, the `name` is necessary when using related data in API transactions. The `type` field also comes in handy, as you will see in the following section.

This particular schema states that...

  * `contact_info` records must belong to a single `contact` record, via the `contact_id` field. A `contact` record may have zero or more `contact_info` records pointing to it, i.e. one for work, another for home, etc. That is, `contact_info` has a "many-to-one" relationship to `contact`.
  * `contact` records may belong to zero or more `contact_group` records, via the `contact_group_relationship` junction table. You could also say that each `contact_group` "contains" zero to multiple `contact` records, a "many-to-many" relationship.
  * A `contact` record may be "belong" directly to one other `contact` record, via the reports_to field, creating a "belongs-to" relationship.
  * A `contact` may be associated indirectly with zero or more `contact` records, via `associated_contact` junction table, creating a "many-to-many" relationship.


###Getting the Related Data

When using data in your application, you might want to retrieve, interact, and display related data as complete units, not individual pieces. The DreamFactory REST API can return related records as part of the primary record queried so that all of the related data is in one JSON record. For SQL DB Services, when performing CRUD operations (see [database records API](Database-Records) for general usage), there are a few additional URL parameters that aid in retrieving the desired related table records. Like the [`fields`](Database-Records#selecting-returned-fields) parameter, these can be used on all CRUD operations. 

  * `related` - Comma-delimited list of relations to return for each record in response, or "*" to retrieve all related records. By default, all fields of the related record(s) are returned. Optional fields, limit, and order can be sent for each relation. The following separate URL parameters apply to each relationship given...
    * `<relation_name>.fields` - A comma-delimited list of fields to return in the response for the related record(s). If this parameter is set to "*" or missing, all fields will be returned. Setting it to empty ("") will result in just the primary key field(s) and value(s) being returned.
    * `<relation_name>.limit` - An integer count value limiting the number of related records of the given relationship to return in the response. Default is unlimited until max response size met.
    * `<relation_name>.order` - Declares the ‘order by’ field and direction for sorting the related results per record per relationship.
  
An API retrieve, by id or by filter string, using the `related` URL parameter pulls the existing relationships, and adds them to the requested record(s) using the relationship name as the additional field name. For the relationship types of `has_many` and `many_many`, the value of that field will always be an array of records (which could be empty "[]"). For the relationship type of `belongs_to`, the value of that field will either be "null", or a single record. 

For example, [retrieving](Database-Retrieving-Records) the record and related data for a specific contact with primary key '1'...

GET /rest/db/contact/1?related=contact_infos_by_contact_id,contact_groups_by_contact_group_relationship

```javascript
{
    "record": [
        {
            "id": 1,
            "first_name": "Jon",
            "last_name": "Yang",
            "display_name": "Jon Yang",
            ...
            "reports_to": null,
            "contact_infos_by_contact_id": [
                {
                    "id": 1,
                    "contact_id": 1,
                    "info_type": "home",
                    "phone": "500 555-0162",
                    "email": "jon24@Home.com",
                    "address": "3761 N. 14th St",
                    "city": "MEDINA",
                    "state": "ND",
                    "zip": "58467",
                    "country": "USA"
                },
                {
                    "id": 2,
                    "contact_id": 1,
                    "info_type": "work",
                    "phone": "500 555-0110",
                    "email": "jon24@Work.com",
                    "address": "2243 W St.",
                    "city": "MEDINA",
                    "state": "ND",
                    "zip": "58467",
                    "country": "USA"
                }
            ],
            "contact_group_relationships_by_contact_id": [
                {
                    "id": 1,
                    "contact_id": 1,
                    "contact_group_id": 7
                }
            ],
            "contact_groups_by_contact_group_relationship": [
                {
                    "id": 7,
                    "name": "Mid West"
                }
            ]
        }
    ]
}
```

###Creating the Related Data

When you [create](Database-Creating-Records) new records using our REST API via the POST command, you can add new relationships to the records in two ways...

  * create new related records and automatically create the relationship between them, or
  * create a relationship to other already existing records (updating those related records at the same time)
  
  
For example, the following command accomplishes all of the following in one POST request...
  * creating a new contact Joe Smith, 
  * creatng some work information for the new contact, 
  * creating a new group "ACME Inc." for Joe's company
  * adding Joe to our existing "Sales" contact group

POST /rest/db/contact
```
{
  "first_name": "Joe",
  "last_name": "Smith",
  "display_name": "Joe Smith",
  "contact_infos_by_contact_id": [
    {
      "info_type": "Work",
      "phone": "555-555-1234",
      "email": "joesmith@acme.com",
      "address": "1234 Demo Way",
      "city": "ATLANTA",
      "state": "GA",
      "zip": "30303",
      "country": "USA"
    }
  ],
  "contact_groups_by_contact_group_relationship": [
    {
      "name": "ACME Inc."
    },
    {
      "id": 1,
      "name": "Sales"
    }
  ]
}
```

Notice that no primary key is included in the related `contact_info` or the new `contact_group` records. This indicates that they are new records that need to be created. After the records are created, the relationships are automatically created. For the `contact_info`, the `contact_id` field is simply set to the newly created `contact` records primary key. For the `contact_group`, an entry is added to the `contact_group_relationship` junction table linking the two new records.

To relate the new `contact` record with existing records, just include the identifying (i.e. primary key) fields or the whole existing record. Joe is added to the "Sales" group by automatically adding an entry in the `contact_group_relationship` junction table. The "name" is not necessary in this case, only the primary key of the group record. In fact, if the "name" or other fields are included along with the identifying fields, they are considered for update on that record (see updates section below). Note that for direct relationships, if the relating field (for `contact_info` it is `contact_id`) is in the record, the value will be overwritten with the current contact record's primary key, essentially "adopting" the `contact_info` record from one `contact` record to another.

###Updating the Related Data


When you update existing records using the REST API PATCH command, you can change relationships to the records in three ways...

  * create new related records and automatically create the relationship between them, or
  * create a relationship to other already existing records (updating them at the same time), or
  * remove a relationship to existing related records
  
For example, we want to update Joe's `contact` record (given the id "33" from earlier creation) with a twitter handle, add his home phone and address info, update his address in the work info, and add him to your "Golf" group. We do this by issuing a PATCH request with the necessary related information.

PATCH /rest/db/contact/33
```javascript
{
  "twitter": "@popular_joe",
  "contact_infos_by_contactId": [
    {
      "info_type": "Home",
      "phone": "555-555-5678",
      "email": "golfin_joe@gmail.com",
      "address": "999 Back Nine Drive",
      "city": "ATLANTA",
      "state": "GA",
      "zip": "30301",
      "country": "USA"
    },
    {
      "id": 44,
      "address": "1111 Demo Way"
    }
  ],
  "contact_groups_by_contact_group_relationship": [
    {
      "id": 9
    }
  ]
}
```

The `contact_info` with id "44" is Joe's work info created earlier, and the `contact_group` with id "9" is a pre-existing group named "Golf". As with any of the above scenarios, when updating related records, you can pass only what changed or the whole record, whatever is most convenient for your application. You can also pass Joe's whole record including the primary key to the /rest/db/contact. This also works for updating multiple `contact` records at once.


###Unrelating or Removing Related Data


To remove relationships from a record, we include the relating fields to indicate to the service to remove the relationship. With directly related records, just set the relating field to null. In our example, this is `contact_id` for `contact_info` records. We include the following URL parameter to help with cleanup of disassociated or abandoned records.

  * `allow_related_delete` - Defaults to false. When the relating field's database schema is set so that it will not allow null values (allow_null is false), i.e. requires a parent value, this record can not stand alone unrelated and thus must be deleted. As a safety catch, this scenario will return an error unless this URL parameter is set to true, at which time the service will attempt to delete the related child record.

For records related via a junction table, add the serviced table's primary key field and set it to null (i.e. the table being serviced here is `contact`, note the "table-dot-field" notation separating it from the rest of the fields in the record). In our example, this is "contact.contact_id" in the `contact_group` records. The relationship is automatically removed by deleting the linking entry from junction table, in this case `contact_group_relationship`. For records related via junction tables, like `contact_group`, this scenario can be managed by schema setup (on_update/on_delete properties with settings of SET_NULL or CASCADE).

So now we want to remove Joe from the "Sales" and "ACME" groups, and remove his work contact info. The request would look like the following...

PATCH /rest/db/Contacts/33
```javascript
{
  "contact_infos_by_contactId": [
    {
      "id": 44,
      "contact_id": null
    }
  ],
  "contact_groups_by_contact_group_relationship": [
    {
      "id": 3,
      "contact.contact_id": null
      "name": "ACME"
    },
    {
      "id": 1,
      "contact.contact_id": null
      "name": "Sales"
    }
  ]
}
```

As before, the "name" fields are not required, and are just there for clarification.

###Reminders

Native record fields are updated as usual.

If related records are contained in the request, the fields contained in the request trigger different actions.

If the related table's primary key field is not included in the related record, it is assumed that this record doesn't exist yet (or if the primary key isn't an auto-incrementing field) and, if allowed, the related record is created along with the new relationship.

For Parent-Child Relationships: Existing related records are updated, if allowed. If parent lookup field is in the record and not set to null, the value will be overwritten with the current parent record's primary key (useful when "adopting" other records). If parent lookup field is in the record and it is set to null, indicating that this child needs to be removed from the relationship, the lookup field is set to null, or if allowed (see above) is deleted.

For Many-to-Many Relationships: If the primary key of the related table (using dot notation) is set and has a null value, the junction table record is deleted thus removing the relationship.

All of this logic works for creating or updating single records or multiple records at a time. The "related" parameter can also be used (along with "fields" parameter) when making requests (POST, PUT, PATCH, DELETE) and retrieving changed data in one shot (see the API/SDK in the admin panel).
