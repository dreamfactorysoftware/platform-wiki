[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analysing Snowplow data**](Getting-started-analysing-Snowplow-data) > [Getting started analysing your data in Infobright](Getting-started-analysing-your-data-in-Infobright)

Broadly speaking, there are three ways to query your data in Infobright:

1. [Directly, at the command line](#command-line)
2. [Using a SQL admin tool](#sql-admin)
3. [Using a BI / analysis tool e.g. ChartIO, Tableau, R](#analysis-tool)

<a name="command-line" />
## 1. Querying the data directly in Infobright, at the command line

It is possible to query the data directly in Infobright. SSH into the server running Infobright, then fire it up at the command line:

	$ ssh {{your-infobright-server-name}}
	$ mysql-ib -u {{username}} -p

Enter your password when prompted.

Now switch to the Snowplow database:

	mysql> use snowplow ;
	Database changed

We can now query the events table directly. For example, to count the number of uniques, visits and page views per day:

	SELECT
	dt,
	COUNT(DISTINCT(user_id)) AS uniques,
	COUNT(DISTINCT( CONCAT( user_id, "-", visit_id))) AS visits,
	COUNT(page_url) AS page_views
	FROM 
	events
	WHERE page_url IS NOT NULL
	GROUP BY dt ;

For more queries, please see the [analytics cookbook][analysts-cookbook].

<a name="sql-admin" />
## 2. Querying the data in Infobright using a SQL admin tool

There are a wide range of SQL admin tools that make executing SQL queries and performing analysis using SQL queries a lot easier. Because Infobright is a fork from MySQL, any SQL admin tool that works with MySQL will work with Infobright, via the MySQL JDBC driver. (A decent list is available [here](http://www.veign.com/blog/2010/05/03/top-15-mysql-managers-and-tools/).)

When setting up your connection between your tool of choice and Infobright, follow the instructions as if you were setting up a connection between the tool and a MySQL database, but remember that Infobright's default port is `5029`. (Rather than MySQL's `3306`).

<a name="analysis-tool" />
## 3. Querying the data in Infobright using an analysis tool e.g. Tableau, R, Weka

Because any tool that can read data from MySQL can also read data from Infobright, it is possible to access and process the data stored in Infobright using some very powerful analysis tools e.g. [ChartIO] [chartio], [Tableau] [tableau], [R] [r] and [Weka] [weka]. 

[ChartIO] [chartio] is a great tool for generating dashboards and quickly visualising Snowplow data. We provide a dedicated guide to getting up and running with ChartIO [here] [chartio].

Whilst it is possible to connect a BI / OLAP tool like Tableau or Microstrategy to run directly on top of your Snowplow data, you are better off generating a copy of that data optimized for OLAP analysis. (I.e. formatted with distinct dimensions and metrics.) We provide a detailed guide on doing so [here] [olap].

We will be adding guides to analysing your data using R and Weka to the [Analytsts Cookbook] [analysts-cookbook] in the near future.

[tableau]: http://www.tableausoftware.com/
[r]: http://www.r-project.org/
[weka]: http://weka.pentaho.com/
[chartio]: Setting-up-ChartIO-to-visualize-your-data-in-Infobright
[olap]: http://snowplowanalytics.com/analytics/tools-and-techniques/converting-snowplow-data-into-a-format-suitable-for-olap.html
[analysts-cookbook]: http://snowplowanalytics.com/analytics/index.html