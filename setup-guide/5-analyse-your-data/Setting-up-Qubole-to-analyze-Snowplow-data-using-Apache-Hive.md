<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analyzing Snowplow data**](Getting started analyzing Snowplow data) > Setting up Qubole to analyze your Snowplow data 

[Qubole] [qubole] provides a service that enables data scientists to crunch Snowplow data in S3 using Hive, Pig and other Hadoop-backed services. Qubole's service is an attractive alternative to Amazon's own EMR - it offers a couple of big advantages in particular:

1. **Ease-of-use**. Qubole provides a really nice, web-based user interface for composing and executing Hive queries. It makes it easy to execute and keep track of multiple queries in parallel (very useful with something like Hive, where each query can time a few minutes to run). It caches the results of individual queries, so you can quickly grab the results (even download them) and inspect / visualize them locally, whilst you continue to run new queries against your cluster. And it enables you to easily test queries on subsets of your data, before kicking off jobs to use the same queries to crunch bigger data sets.
2. **Speed / efficiency**. the Qubole team have optimized their Hadoop and Hive distribution, perhaps better than the folks at Amazon have for EMR. (They are well placed to do this, as their engineers include some of the original team at Facebook that developed Hive.)

We haven't tested Qubole's Pig capabilities - but we've used it to perform Hive queries, and it is fantastic. If you want to use Apache Hive, we strongly recommend you use Qubole over grappling with Hive on EMR via the EMR command line tools.

In this guide, we walk through the steps necessary to get up and running using Hive on Qubole to query your Snowplow data:

1. [Sign up to Qubole](#signup)
2. [Login](#login)
3. [Define your Snowplow table in Hive](#define-table)
4. [Performing some sample queries against the table](#queries)

<a name="sign-up" />
## 1. Sign up to Qubole

Signing up to Qubole is straightforward: apply for an account directly through the [Qubole website] [signup-for-qubole] by entering your name, email address and company name on the signup form.

Back to [top](#top).

<a name="login" />
## 2. Login to Qubole and setup access to your data in S3

Once you have signed up, login:

[[/setup-guide/images/qubole/1.png]]
git 
The first thing we need to do is give Qubole access to our AWS account details and S3 specifically, so that we can access our Snowplow data in S3

To do this, click on the **Control Panel** icon on the left of the UI:

[[/setup-guide/images/qubole/2.png]]

Select the **Storage type** drop down and change it from `QUBOLE_MANAGED` to `CUSTOMER_MANAGED`. Qubole now gives us the opportunity to enter our AWS credentials, and a location for any data created. Enter your AWS access and secret key, and enter a default location for any data created. (We created a specific bucket for the output of analysis with Qubole, called `qubole-analysis`.)

**Note**: we recommend using IAM to setup a specific user for Qubole, with limited permissions. A sample policy for those permissions is given below - note that they give Qubole the ability to read from your data bucket, and read / write to your output bucket, as well as all EC2 permissions (to spin up clusters). Note you will need to update the policy with your own S3 / ARN locations:

```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadPermissionsOnSnowplowData",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl"      
      ],
      "Resource": [
        "arn:aws:s3:::snowplow-saas-archive-eu-west-1/snplow2/events/*"
      ],
      "Effect": "Allow"
    },
    {
      "Sid": "ListAccessOnDataBucket",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::snowplow-saas-archive-eu-west-1"],
      "Effect": "Allow"
    },
    {
      "Sid": "AllPermissionsOnAnalysisOutputBucket",
      "Action": [
        "s3:*"
      ],
        "Resource": [
          "arn:aws:s3:::qubole-analysis/*"
        ],
        "Effect": "Allow"
    },
    {
      "Sid": "ListAccessOnAnalysisBucket",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::qubole-analysis"],
      "Effect": "Allow"
    }  
  ]
}
```

Now click the **Save** button. Qubole should report that the storage credentials have been validated.

Back to [top](#top).

<a name="define-table" />
## 3. Define a table in Hive for Snowplow data in S3

We're going to start our Qubole session by defining a table with our data in S3 using Hive. Click on the **Analyze** icon in Qubole, and then click on the **Composer** icon. Qubole provides a window in which you can enter a new query:

[[/setup-guide/images/qubole/3.png]]

(Note that in our screenshot, some historical queries are listed in the pane on the right hand side of the screen. If this is your first time logging in to Qubole, there will not be any listed on your screen.)

In the query window, enter the Hive query to define your Snowplow table. You can find the Hive definition for Snowplow data on S3 [here, in the Github repo] [hive-table-def]. Make sure you update the last line, `LOCATION '${EVENTS_TABLE}' ;`, with the specific location of your Snowplow data in S3, including the final backslash. In our case, that is `LOCATION 's3n://snowplow-saas-archive-eu-west-1/snplow2/events/' ;`:

[[/setup-guide/images/qubole/4.png]]

Click the submit button to execute the query. Qubole lets you know that the query is in progress. After a short period, Qubole should let you know that the query has succeeded. (A green icon appears over the query, and the query appears in the history pane on the right hand side of the screen, with a thumbs up to indicate it was successful):

[[/setup-guide/images/qubole/5.png]]

Snowplow data is partitioned in S3 by run ID (i.e. the output of each ETL run is saved in a separate folder in S3). We need to instruct Hive to identify all the different data partitions, by executing the following query:

```sql 
ALTER TABLE `events` RECOVER PARTITIONS;
```

To do so, simply delete the previous query from the query window, and paste in the above query. Hit the submit button:

[[/setup-guide/images/qubole/6.png]]

Once the query has finished running, you'll notice (you may need to scroll down) that the query is output has been logged to the screen: specifically, we can see the different partitions that Hive has found:

[[/setup-guide/images/qubole/7.png]]

To check that all is well with our table, let's pull five lines of data to see how they look in Qubole. Execute the following query:

```sql
SELECT * FROM `events` LIMIT 5;
```

Note how Qubole displays a sample set of the results below the query:

[[/setup-guide/images/qubole/8.png]]

Also note how you can download the results to your local machine, by simply clicking on the Download link. Data is downloaded as a tab-delimited text file, suitable for pasting directly into Excel, or opening directly in R.

Back to [top](#top).

<a name="queries" />
## 4. Performing a simple query against the table

Let's execute a straightforward query to calculate the number of unique visitors to our website by date:

```sql
SELECT
TO_DATE(`collector_tstamp`),
COUNT(DISTINCT(`domain_userid`)) 
FROM `events`
GROUP BY TO_DATE(`collector_tstamp`)
```

This query will take a bit of time to start. If you look at the Qubole menu, you'll notice that the icon in the **Cluster** section will start to flash. That is because Qubole is firing up a cluster to execute your query. Note that all the queries performed up until now haven't actually required a cluster to execute, because they've all been possible to execute without using a Map Reduce job. (They've basically all involved simply reading the data from S3, rather than actually processing it.)

[[/setup-guide/images/qubole/9.png]]

Once the query has finished you can click, you will be able to view some of the results in the Qubole interface, and download the results by clicking the **Download** link. The results can be opened and plotted directly in Excel, for example:

[[/setup-guide/images/qubole/9.JPG]]

That's it! For other analytics recipes to perform in Hive / Qubole, please consult the [Analytics Cookbook] [cookbook]...

Back to [top](#top).



[qubole]: http://www.qubole.com/
[signup-for-qubole]: http://info.qubole.com/free-account
[hive-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/hive-storage/hiveql/table-def.q
[cookbook]: http://snowplowanalytics.com/analytics/index.html