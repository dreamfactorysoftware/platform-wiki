[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow > [**Step 5: Get started analysing Snowplow data**](Getting-started-analysing-Snowplow-data) > Setting up Excel to analyze Snowplow data

<a name="top" />
## Contents

1. [Why use Excel to analyze / visualize Snowplow data](#why)
2. [Setting up Excel to directly fetch Snowplow data from Amazon Redshift](#redshift)
3. [Setting up Excel to directly fetch Snwoplow data from PostgreSQL](#postgres)
4. [Performing a simple analysis](#simple-analysis)
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

Setting up Excel so that you can grab live Snowplow data directly from Amazon Redshift is a 3 step process:

1. [Install the Redshift ODBC driver](#driver)
2. [White label your local IP address with Amazon Redshift security](#security)
3. [Create a data connection in Windows to your Snowplow data in Redshift, via ODBC](#windows)
4. [Use that connection to fetch Snowplow data from Excel, directly into your Excel workbook](#excel)

<a name="driver" />
### 2.1 Install the Redshift ODBC driver

If you have not already done so, you need to install an ODBC driver so Windows can talk to your Amazon Redshift cluster.

At the time of writing, Amazon Redshift works with [version 8 of the PostgreSQL ODBC driver][odbc-driver]. If you do not already have the driver installed, then download it. The [32 bit version][32-bit-driver] is available [here][32-bit-driver]. The [64 bit version][64-bit-driver] is available [here] [64-bit-driver].

**Note:** it is very important that if you are using a 32 bit version of MS Excel, that you download the 32 bit version of the driver, and if you are using a 64 bit version of MS Excel, you download the 64 bit version of the driver. If you are running Excel 2013, click on the **File** menu and select **Account**. Press the **About Excel** button. In the example below you can see that we are running the 64 bit version:

[[/setup-guide/images/excel/excel-2013-check-version.JPG]]

To check whether you are running a 32 bit or 64 bit version of Excel 2010, simply click on the **File** button and then select **Help** from the menu. In the example below, we are also running a 64 bit version of Excel:

[[/setup-guide/images/excel/excel-2010-check-version.JPG]]

Once you have downloaded the ODBC driver ZIP file, extract it onto your hard drive and double click the on the MSI file (e.g. `psqlodbc_x64.msi`). This launches an installation wizard. Work through the installation wizard until the installation is completed.

Once completed, you can check that the driver is available in Windows. Click on the start menu and type in "Data sources". An option to launch **Data Sources (ODBC)** should appear. Click on it and then click on the **Drivers** tab in the top middle. You should see something like this:

[[/setup-guide/images/excel/odbc-data-sources-drivers-listed.JPG]]

Notice the listings for `PostgreSQL ANSI(x64)` and `PostgreSQL Unicode(x64)`. These are the drivers that have been, that we will use to connect to Redshift with. 

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



Back to [top](#top).

<a href="excel" />
### 2.4 Use that connection to fetch Snowplow data from Excel, directly into your Excel workbook



Back to [top](#top).


* Install ODBC driver for Redshift in Windows
  * Be careful to install 32 or 64 bit version depending on version of Excel being run
* Setup ODBC connection in Data sources to Snowplow database table on Redshift
* Use ODBC connection in Excel to fetch data directly
	* Where to insert custom query
	* Refresh settings

TO WRITE

Back to [top](#top).

<a name="postgres" />
## 3. Setting up Excel to directly fetch Snwoplow data from PostgreSQL

TO WRITE

Back to [top](#top).

<a name="simple-analysis" />
## 4. Performing a simple analysis

TO WRITE

Back to [top](#top).

<a name="notes" />
## 5. Notes

* Managing the volume of data inserted into Excel
* Excel 2013 vs Excel 2010
* Inserting directly vs inserting into a PivotTable / PivotChart

TO WRITE

Back to [top](#top).
<a name="next-steps" />
## 6. Next steps

TO WRITE

Back to [top](#top).


[odbc-driver]: http://docs.aws.amazon.com/redshift/latest/gsg/before-you-begin.html
[64-bit-driver]: http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_09_00_0101-x64.zip
[32-bit-driver]: http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_08_04_0200.zip