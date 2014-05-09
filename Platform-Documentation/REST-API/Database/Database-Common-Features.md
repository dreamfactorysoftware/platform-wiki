# Database Services Common Operations

The following operations are typically available for all DreamFactory Database Services.
The examples given below use a single simple identifier field named "id" which is in this case an auto-created auto-incrementing primary key, this may not be the case for all tables or all database service types. Refer to the specifics of your database type documented in other pages in this section.

## Table Operations

* [Retrieving Tables](Database-Retrieving-Tables)

## Record Operations

* [Retrieving Records](Database-Retrieving-Records)
  * [by Old or Partial Records](#get-records)
  * [by Filter](#get-filter)
  * [by List of Identifiers](#get-ids)
  * [by a Single Identifier](#get-id)


* [Creating Records](Database-Creating-Records)
  * [by Multiple Records](#post-records)
  * [by a Single Record](#post-record)


* [Updating or Replacing Records](Database-Updating-Records)
  * [by Updated Records](#put-records)
  * [by Filter](#put-filter)
  * [by List of Identifiers](#put-ids)
  * [by a Single Identifier](#put-id)


* [Patching or Merging Records](Database-Patching-Records)
  * [by Updated Records](#patch-records)
  * [by Filter](#patch-filter)
  * [by List of Identifiers](#patch-ids)
  * [by a Single Identifier](#patch-id)


* [Deleting Records](Database-Deleting-Records)
  * [by List of Records](#delete-records)
  * [by Filter](#delete-filter)
  * [by List of Identifiers](#delete-ids)
  * [by a Single Identifier](#delete-id)

