<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow > [**Step 5: Get started analyzing Snowplow data**](Getting-started-analyzing-Snowplow-data) > Setting up Tableau to perform OLAP analysis on your data

## Contents

1. [What is Tableau, and why use it to analyse / visualize Snowplow data?](#what-and-why)
2. [Download and get started with Tableau](#setup)
3. [Connecting Tableau to Snowplow data in Redshift](#redshift)
4. [Getting started analyzing Snowplow data in Tableau](#1st-analysis)
5. [Next steps](#next-steps)

<a name="what-and-why" />
## 1. What is Tableau, and why use it to analyse / visualize Snowplow data?

Tableau is a Business Intelligence program, in the mould of Microstrategy or Pentaho. These types of software make it possible for users to perform [OLAP analysis][olap], which typically involves aggregating data by different dimensions and metrics, visualizing that data graphically, and then exploring relationships in the data by slicing and dicing different metrics by different dimensions.

Tableau has a number of strengths which account for why we prefer it to other BI tools like Pentaho, mostly around its simplicity and connectivity:

* The user interface is simple and straightforward to use
* The interface is *fast*. You can setup Tableau workbooks to query the data directly in Redshift, in which case the querying speed is determined by the speed at which Redshift works. (Which is pretty good.) You can also, however, import some or all of the data (depending on the volume you're handling) into Tableau's in-memory engine, in which case analysis is blindingly fast
* Simple to deploy: Tableau desktop can be employed as a standalone application. You connect to directly to Snowplow data (e.g. in Redshift). There is no need to setup associated servers to manage a data pipeline from Snowplow to Tableau (although Tableau server is available as an option). There is no requirement to manage any metadata around Snowplow. Instead, you grab the Snowplow data directly, and start visualizing it instantly

Like most other BI tools: Tableau has limitations when used outside of traditional OLAP analysis: we do not recommend it for statistical analysis (although it has some basic capabilities) or more bespoke graphs. For this type of capability, we recommend [R] [r].

Back to [top](#top)


<a name="setup" />
## 2. Download and get started with Tableau

If you are not already using Tableau, you can download a 30 day trial version of the desktop product from the [Tableau website] [tableau-trial].

Note: Tableau desktop **only** works on Windows. If you're using Linux or a Mac, you can run Tableau in a Virtual Machine, but you really want to make available as much RAM as possible to keep the analysis on the large Snowplow datasets snappy.

Installing Tableau desktop for windows is straightforward: simply [download the executable] [tableau-trial] and run it.

Back to [top](#top)

<a name="redshift" />
## 3. Connecting Tableau to Snowplow data in Redshift

Launch Tableau, and select **Connect to data** from the left hand menu:

[[/setup-guide/images/tableau/1.JPG]]

Tableau presents a list of data sources to connect to. Select **Amazon Redshift" from the **On a server** list:

[[/setup-guide/images/tableau/2.JPG]]

Tableau then asks for the details of the Redshift cluster we wish to connect to:

[[/setup-guide/images/tableau/3.JPG]]

We can fetch these details directly from the AWS console. Log into [console.aws.amazon.com] [aws-console], select **Redshift** from the list of services and then select the Redshift cluster you want to connect to. The details of the cluster you need to connect Tableau are listed under **Cluster Database Properties**:

[[/setup-guide/images/tableau/4.JPG]]

* Copy the database end point from the AWS console and paste it into the **server name** field in Tableau
* Copy the port number from the console into Tableau
* Copy the database name and username into Tableau
* Enter the password for the Redshift database. (This is **not** displayed in the Amazon console for security reasons.)
* Click the **Connect** button. Tableau will ping out to Redshift to check the connection is live
* Select **public** from the dropdown list of schemas. Your Snowplow events table should be one of the tables listed:

[[/setup-guide/images/tableau/5.JPG]]

* Select your Snowplow events table and click **OK**

[[/setup-guide/images/tableau/6.JPG]]

* Tableau asks if you want to "Connect live", "Import all data" or "Import some data". Select "Connect live"
* You should see a screen similar to the one below:

[[/setup-guide/images/tableau/7.JPG]]

**Troubleshooting your connection**: For security, Amazon only lets computers access a Redshift cluster where those computers are located at an IP address that has been white-listed. Hence, in order to connect Tableau, you must make sure that the machine running Tableau is on a white-listed IP address. Instructions on how to white-list IP addresses in Redshift are given [here] [white-list-ip-address].

Back to [top](#top)

<a name="1st-analysis" />
## 4. Getting started analyzing Snowplow data in Tableau

### 4.1 Plotting our first graph: number of uniques over time


### 4.2 Further analysis: best practice when using Tableau with Snowplow



Back to [top](#top)

<a name="next-steps" />
## 5. Next steps


Back ot [top](#top)

[olap]: http://snowplowanalytics.com/analytics/tools-and-techniques/converting-snowplow-data-into-a-format-suitable-for-olap.html#what
[r]: Setting-up-R-to-perform-more-sophisticated-analysis-on-your-data
[tableau-trial]: http://www.tableausoftware.com/products/trial
[aws-console]: https://console.aws.amazon.com/console/home
[white-list-ip-address]: setting-up-redshift#wiki-authorise