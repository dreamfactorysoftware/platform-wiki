[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analysing Snowplow data**](Getting started analyzing Snowplow data) > Setting up Excel to analyze Snowplow data

<a name="top" />
## Contents

1. [Why use Excel to analyze / visualize Snowplow data](#why)
2. [Setting up Excel to directly fetch Snowplow data from Amazon Redshift](#redshift)
3. [Setting up Excel to directly fetch Snwoplow data from PostgreSQL](#postgres)
4. [Fetching data into Excel as a PivotTable or PivotChart Report](#simple-analysis)
5. [Notes](#notes)
6. [Next steps](#next-steps)

<a name="why" />
## 1. Why use Excel to analyze / visualize Snowplow data?

Excel is the most popular BI / analysis tool in the world. *Every* analyst, and a large number of business, sales and marketing people are excellent at using Excel, but shy away from other tools.

By accessing your Snowplow data diretly from Excel, anyone who's familiar with Excel can start doing sophisticated web analysis.

Back to [top](#top).

<a name="redshift" />
## 2. Setting up Excel to directly fetch Snowplow data from Amazon Redshift

*This guide walks through the process of setting up a fetching data directly into Excel from Amazon Redshift on a Windows PC. We have not tried to do this on an Mac.*

Setting up Excel so that you can grab live Snowplow data directly from Amazon Redshift is a 4 step process:

1. [Install the Redshift ODBC driver](#driver)
2. [White label your local IP address with Amazon Redshift security](#security)
3. [Create a data connection in Windows to your Snowplow data in Redshift, via ODBC](#windows)
4. [Use that connection to fetch Snowplow data from Excel, directly into your Excel workbook](#excel)
5. [Fetching data into Excel as a PivotTable or PivotChart Report](#pivot)

<a name="driver" />
### 2.1 Install the Redshift ODBC driver

If you have not already done so, you need to install an ODBC driver so Windows can talk to your Amazon Redshift cluster.

At the time of writing, Amazon Redshift works with [version 8 of the PostgreSQL ODBC driver][odbc-driver]. If you do not already have the driver installed, then download it. The [32 bit version][32-bit-driver] is available [here][32-bit-driver]. The [64 bit version][64-bit-driver] is available [here] [64-bit-driver].

**Note:** it is very important that if you are using a 32 bit version of MS Excel, that you download the 32 bit version of the driver, and if you are using a 64 bit version of MS Excel, you download the 64 bit version of the driver. If you are running Excel 2013, click on the **File** menu and select **Account**. Press the **About Excel** button. In the example below you can see that we are running the 64 bit version:

[[/setup-guide/images/excel/excel-2013-check-version.JPG]]

To check whether you are running a 32 bit or 64 bit version of Excel 2010, simply click on the **File** button and then select **Help** from the menu. In the example below, we are also running a 64 bit version of Excel:

[[/setup-guide/images/excel/excel-2010-check-version.JPG]]

Once you have downloaded the ODBC driver ZIP file, extract it onto your hard drive and double click the on the MSI file (e.g. `psqlodbc_x64.msi`). This launches an installation wizard. Work through the installation wizard until the installation is completed.

Once completed, you can check that the driver is available in Windows. Open up your **Control Panel**, double click on the **Administrative Tools** and then double click on **Data sources (ODBC)**. (Alternatively, click on the start menu and type in "Data sources". An option to launch **Data Sources (ODBC)** should appear.) Click on the **Drivers** tab in the top middle. You should see something like this:

[[/setup-guide/images/excel/odbc-data-sources-drivers-listed.JPG]]

Notice the listings for `PostgreSQL ANSI(x64)` and `PostgreSQL Unicode(x64)`. These are the drivers that have been, that we will use to connect to Redshift with. 

**Note:** if you are running a 64 bit version of Windows, but are running a 32 bit version of Excel, so have installed the 32 bit driver, this will **not** be visible in the list of data sources you've just pulled up. Instead, you will need to open `c:\Windows\SysWOW64\odbcad32.exe`, to see a version of the same software with all the 32 bit drivers listed. All the rest of the instructions that follow should be the same.

Back to [top](#top).

<a name="security" />
### 2.2 White label your local IP address with Amazon Redshift security

As a security measure, Amazon only allows connection to Redshift clusters from white-labelled IP addresses. That means you need to white label the IP address of the computer running Excel that you want to connect to Redshift. 

To do this, log into the AWS console. (Ideally, from the computer you plan to run Excel on.) Click on **Redshift** and then select **Security Groups**:

[[/setup-guide/images/excel/redshift-security-groups.png]]

Click on your security group. A list of white labelled IP addresses should be shown. At the bottom of the window should be an option to white label an additional connection. Click on the **Connection Type** drop down and select **CIDR/IP**:

[[/setup-guide/images/excel/redshift-security-groups-2.png]]

Enter the IP address you would like to white list, with the '/32' at the end. Note: Amazon gives you the IP address of the computer you have logged into AWS with - if this is the same computer, you can simply copy and paste the result in the AWS console. (In the example above, it is `37.157.33.178/32`.)

If you do not know the IP address of the computer you wish to use Excel on, you can find it out by visiting [www.findmyip.org] (http://www.findmyip.org/). In most cases, you will simply need to add `/32` to the IP address to correctly get the CIDR/IP address. 

Enter the address into the AWS console and click **Authorize**. You are now ready to create an ODBC connection between your Windows machine and Amazon Redshift!

Back to [top](#top).

<a name="windows" />
### 2.3 Create a data connection in Windows to your Snowplow data in Redshift, via ODBC

Now that you have a Redshift compatible ODBC driver installed on your local machine, and have white labelled the IP address on that same machine, you're in a position to create a connection between it and your Amazon Redshift instance.

Go back to **Data Sources (ODBC)** (in Control Panel / Administrative Tools). 

[[/setup-guide/images/excel/connection-1.JPG]]

Click on the **Add** button:

[[/setup-guide/images/excel/connection-2.JPG]]

Select **PostgreSQL Unicode*x64) and click the **Finish** button:

[[/setup-guide/images/excel/connection-3.JPG]]

You will be given the chance to name the data connection (we've called ours "Snplow on Redshift") and enter your Redshift cluster details. Note: most of these details (the server and port particularly) can be copied directly from the AWS web console:

[[/setup-guide/images/excel/aws-cluster-details.JPG]]

You can enter the admin credentials you used when you setup your cluster, or better, create a read only user in Redshift, and use that user's details to login. (Details on setting up users in Redshift can be found [here][redshift-create-user].)

Once the details have been entered, you can test them (hit the **Test** button), and if a connection is successful, save it. It should now appear on the list:

[[/setup-guide/images/excel/connection-4.JPG]]

Back to [top](#top).

<a href="excel" />
### 2.4 Use that connection to fetch Snowplow data from Excel, directly into your Excel workbook

Create a new Excel workbook.

Open the **DATA** ribbon (by clicking on **DATA** in the top-level menu). click on **Get External Data**, select **From Other Sources** and then select **From Data Connection Wizard**:

[[/setup-guide/images/excel/connection-5.JPG]]

Select **ODBC DSN** and click **Next**:

[[/setup-guide/images/excel/connection-6.JPG]]

You should see a list of your ODBC connections, including the connection you created to your Snowplow data on Redshift in [section 2.3](#windows) above. Select it and click **Next**:

[[/setup-guide/images/excel/connection-7.JPG]]

Excel shows you all the tables in the Snowplow database: which is *just* the events table. Click **Next**:

[[/setup-guide/images/excel/connection-8.JPG]]

You can now associate a filename with the connection details, and add a description to the connection. Do so and click **Finish**.

[[/setup-guide/images/excel/connection-9.JPG]]

Excel now gives you a set of options related to the format you data will be imported in. (Do you want it in the form of a table, PivotTable or PivotChart?) Before we pick one, however, we need to tell Excel that rather than import the `events` table in in its entirity (which may be billions of lines of data - more than enough to crash Excel), we want to specify a query for defining a subset, or rolled up, view of the data. To do this, click on the **Properties** button:

[[/setup-guide/images/excel/connection-10.JPG]]

Excel now gives us options to set how frequently data is refreshed. We recommend refrehing the data when the file is opened, but then now refreshing it again. (Minimizing the refresh rate keeps the spreadsheet quick to use- and Snowplow data does not generally change so quickly.) Given that, we recommend checking the box **Refreesh when opening the file** and unchecking **Enable background refresh**.

[[/setup-guide/images/excel/connection-11.JPG]]

Now click the **Definition** table:

[[/setup-guide/images/excel/connection-13.JPG]]

Excel gives you the chance to paste in a query (in the **Command text** section at the bottom of the dialogue box). To keep things simple, we're going to paste in the following simple query, that returns the number unique visitors, and visits, by date, for the last 3 months:

```sql
select
	to_char(collector_tstamp, 'YYYY-MM-DD') AS "Date",
	count(distinct(domain_userid)) AS "Uniques",
	count(distinct(domain_userid || '-' || domain_sessionidx)) AS "Visits"
from events
where collector_tstamp < current_date
and collector_tstamp > current_date -91
group by "Date"
order by "Date";
```

Paste the above query into the Command text:

[[/setup-guide/images/excel/connection-14.JPG]]

We recommend saving the connection file for reuse later. To do that, click on the **Export Connection File** button, give the connection a query-specific name e.g. `snplow uniques and visitors by day.odc`. Finally, click **OK*:

[[/setup-guide/images/excel/connection-9.JPG]]

We're going to simply pull the results of our query into Excel as a table, so click **OK**:

[[/setup-guide/images/excel/connection-15.JPG]]

Voila! Our slice of data appears directly in Excel. We can graph it as normal:

[[/setup-guide/images/excel/connection-16.JPG]]

Note: we can use pull *any* cut of Snowplow data direclty into Excel in the method described above. For ideas of other slices of data / queries to run, see the [Analytics Cookbook] [cookbook].

Back to [top](#top).

<a name="postgres" />
## 3. Setting up Excel to directly fetch Snwoplow data from PostgreSQL

TO WRITE

Back to [top](#top).

<a name="simple-analysis" />
## 4. Fetching data into Excel as a PivotTable or PivotChart Report

In the above examples, we a cut of Snowplow data into Excel as a simple table.

Often, however, it is nice to pull a larger data set into Excel directly as a PivotTable or PivotChart. This lets us slice and dice the data by different dimensions and metric combinations within Excel, enabling us to create multiple visualizations and explore the relationship between different variables in our data set.

Importing data from Snowplow into Excel as a PivotTable or PivotChart is reasonably straightforward. The key thing to understand is that the data must be suitably formatted for Excel to correctly read it into the PivotTable or PivotChart. We've written a set of instructions on [formatting Snowplow data for OLAP analysis][olap-analysis]: those instructions apply here, as PivotTables / PivotCharts are a form of OLAP analysis.

To demonstrate, we're going to use the following query to generate our PivotChart report. (Refer to the [guide to formatting data for OLAP analysis] [olap-analysis] for instructions in how this was derived):

```sql
SELECT
	page_views.domain_userid,
	users.cohort,
	users.first_visit_mkt_source,
	users.first_visit_mkt_medium,
	users.first_visit_mkt_medium,
	users.first_visit_mkt_term,
	users.first_visit_mkt_content,
	users.first_visit_mkt_campaign,
	users.first_visit_refr_medium,
	users.first_visit_refr_source,
	users.first_visit_refr_urlhost,
	users.first_visit_refr_urlpath,
	page_views.domain_sessionidx,
	visits."Date",
	visits.visit_mkt_source,
	visits.visit_mkt_medium,
	visits.visit_mkt_term,
	visits.visit_mkt_content,
	visits.visit_mkt_campaign,
	visits.visit_refr_medium,
	visits.visit_refr_source,
	visits.visit_refr_urlhost,
	visits.visit_refr_urlpath,
	page_views.page_urlpath,
	page_views.page_views,
	1 AS number_of_visits	
FROM (
	SELECT
		domain_userid,
		domain_sessionidx,
		page_urlpath,
		count(*) AS page_views
	FROM events e
	WHERE event = 'page_view'
	GROUP BY 1,2,3
) page_views
LEFT JOIN (
	SELECT
		v.domain_userid,
		v.domain_sessionidx,
		e2.mkt_source AS visit_mkt_source,
		e2.mkt_medium AS visit_mkt_medium,
		e2.mkt_term AS visit_mkt_term,
		e2.mkt_content AS visit_mkt_content,
		e2.mkt_campaign AS visit_mkt_campaign,
		e2.refr_medium AS visit_refr_medium,
		e2.refr_source AS visit_refr_source,
		e2.refr_urlhost AS visit_refr_urlhost,
		e2.refr_urlpath AS visit_refr_urlpath,
		MIN(e2.collector_tstamp) AS "Date"
		FROM events e2
		INNER JOIN
		(	SELECT
			domain_userid,
			domain_sessionidx,
			MIN(collector_tstamp) AS first_touch_timestamp
			FROM events
			GROUP BY 1,2) v
		ON v.domain_userid = e2.domain_userid
		AND v.domain_sessionidx = e2.domain_sessionidx
		AND e2.collector_tstamp = v.first_touch_timestamp
		GROUP BY 1,2,3,4,5,6,7,8,9,10,11
) visits
ON page_views.domain_userid = visits.domain_userid
AND page_views.domain_sessionidx = visits.domain_sessionidx
LEFT JOIN (
		SELECT
			u.domain_userid,
			to_char(collector_tstamp, 'YYYY-MM') AS cohort,
			e3.mkt_source AS first_visit_mkt_source,
			e3.mkt_medium AS first_visit_mkt_medium,
			e3.mkt_term AS first_visit_mkt_term,
			e3.mkt_content AS first_visit_mkt_content,
			e3.mkt_campaign AS first_visit_mkt_campaign,
			e3.refr_medium AS first_visit_refr_medium,
			e3.refr_source AS first_visit_refr_source,
			e3.refr_urlhost AS first_visit_refr_urlhost,
			e3.refr_urlpath AS first_visit_refr_urlpath
		FROM events e3
		INNER JOIN
		(	SELECT
			domain_userid,
			MIN(collector_tstamp) AS first_touch_timestamp
			FROM events
			WHERE domain_sessionidx = 1
			GROUP BY 1) u
		ON u.domain_userid = e3.domain_userid
		AND e3.collector_tstamp = u.first_touch_timestamp
) users
ON page_views.domain_userid = users.domain_userid
```

Create a new workbook in Excel. Go to DATA > Get External Data > From other data sources > Data connection wizard > ODBC DSN > Snowplow connection as you would to pull in data as a table. When presented with the following screen:

[[/setup-guide/images/excel/connection-9.JPG]]

Click on **Properties** > **Definitions** and paste the above query in:

[[/setup-guide/images/excel/connection-17.JPG]]

Click **OK**. Now click the radio button for **PivotChart**:

[[/setup-guide/images/excel/connection-18.JPG]]

And click **OK**. We are now presented with our PivotTable and PivotChart:

[[/setup-guide/images/excel/connection-19.JPG]]

We can then slice and dice on our different dimensions as normal for a pivot table. In the below example, we're plotting the number of visits by first referer over time:

[[/setup-guide/images/excel/connection-20.JPG]]

Back to [top](#top).

<a name="notes" />
## 5. Notes

### Managing the volume of data inserted into Excel

Snowplow data is often very large volume. Most analyses on Snowplow data start by identifying the slice, or cut of Snowplow data that is required, generating that cut in Redshift, and then importing that into a standard analysis tool like Excel, Tableau, or R, that is not built to handle the types of volumes that Amazon Redshift / EMR are built to handle.

These considerations are especially important in the case of Excel, which is much worse at handling data at large volumes than e.g. Tableau or R. As a result, we recommend analysts check how many results their query returns (e.g. using Navicat) before running it in Excel.

### Excel 2013 vs Excel 2010

The above instructions *should* work with both Excel 2013 and Excel 2010. However, we have not had a chance to test them against Excel 2010 - it is likely that some of the dialogue boxes look different. We've also heard anecdotally that Excel 2013 is much better at handling bigger data sets than Excel 2010. However, we have not had a chance to test these claims.

Back to [top](#top).
<a name="next-steps" />
## 6. Next steps

TO WRITE

Back to [top](#top).


[odbc-driver]: http://docs.aws.amazon.com/redshift/latest/gsg/before-you-begin.html
[64-bit-driver]: http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_09_00_0101-x64.zip
[32-bit-driver]: http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_08_04_0200.zip
[redshift-create-user]: http://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_USER.html
[cookbook]: http://snowplowanalytics.com/analytics/index.html
[olap-analysis]: http://snowplowanalytics.com/analytics/tools-and-techniques/converting-snowplow-data-into-a-format-suitable-for-olap.html