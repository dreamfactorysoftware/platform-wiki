<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analyzing Snowplow data**](Getting started analyzing Snowplow data) > Setting up the prebuilt views (cubes and recipes) in Redshift and PostgreSQL

## Introduction

Snowplow data is stored in a single events table, where the complete event stream for each visitor can be viewed.

Whilst this gives analysts immense power to crunch Snowplow data in a huge number of ways to answer a wide variety of business questions, it can be daunting for new Snowplow users to get started analyzing the Snowplow data set.

In order to help analysts get productive with Snowplow data faster, we've shipped Snowplow with a number of views, that make certain common analyses much easier, because rather than craft SQL queries themselves, analysts can simply retrieve views of the data that we have already created for them.

This guide covers adding those views to your Snowplow database

## Contents

1. [Setting up the views](#setup)
2. [Using the views](#use)

<a name="setup" />
## 1. Setting up the views

Setting up the views in your database is straightforwards: you simply need to run the different `.sql` files in the [analytics] [analytics-on-github] section of the repo.

First, we need to identify the relevant SQL files in the repo. If you are running Redshift, they are [here] [redshift-sql], if you are running PostgreSQL, they are [here] [postgres-sql]. Now you can use `psql` to run the SQL files into your Redshift / Snowplow database as follows:

	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f recipes/recipes-basic.sql
	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f recipes/recipes-catalog.sql
	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f recipes/recipes-customers.sql
	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f cubes/cube-pages.sql
	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f cubes/cube-visits.sql
	$ psql -h <HOSTNAME> -U <USERNAME> -d <DATABASE NAME> -p <PORT> -f cubes/cube-transactions.sql

You will need to replace `<HOSTNAME>`, `<USERNAME>`, `<DATABASE NAME>` and `<PORT>` with the appropriate values for your database setup.

Note that you need to run `cube-visits.sql` *before* you run `cube-transactions.sql`.

<a name="use" />
## 2. Using the views

Once you have setup the views, you should be able to see them in your database.

Log into your database using your favorite front end (e.g. [Navicat] [navicat]):

[[/setup-guide/images/views/1.jpg]]

You should be able to see the new schemas alongside the `atomic` schema that contains the raw events table, and the `public` schema that is there by default:

* `recipes_basic`
* `recipes_customer`
* `recipes_catalog`
* `cubes_ecomm`
* `cubes_pages`
* `cubes_visits`

Note that for Redshift users, in some database front ends, the new schemas and views will only be accessible if you update the Redshift search path to include the new schemas. Doing this is covered in the [Redshift setup guide] (Setting-up-Redshift). Note that even without adding the new schema to the Redshift search path you should still be able to see those actual views by executing a query against them e.g.

```sql
SELECT * 
FROM recipes_basic.uniques_and_visits_by_day
```

[[/setup-guide/images/views/2.jpg]]

Contrast the results with viewing the `atomic.events` table directly:

[[/setup-guide/images/views/3.jpg]]

We recommend that you experiment by viewing and plotting the output of the different views, and examine the SQL that was used to generate them (in the files in the repo). By modifying these in simple ways, you can craft your own, bespoke analyses, to meet your own particular business needs.



[analytics-on-github]: https://github.com/snowplow/snowplow/tree/master/5-analytics
[redshift-sql]: https://github.com/snowplow/snowplow/tree/master/5-analytics/redshift
[postgres-sql]: https://github.com/snowplow/snowplow/tree/master/5-analytics/postgresql/recipes
[navicat]: http://www.navicat.com/

       