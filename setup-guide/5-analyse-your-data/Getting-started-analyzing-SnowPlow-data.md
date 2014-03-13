<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analyzing Snowplow data**](Getting started analyzing Snowplow data)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/5-analytics.png]] 

Now you have your Snowplow data being generated and loaded into S3 and potentially also Amazon Redshift, you can start to analyse that data.

Because Snowplow gives you access to incredibly granular, event-level and customer-level data, the possible analyses you can perform on that data is endless.

As part of this setup guide, we provide details on how to get started analysing that data. There are many other resources we are building out (notably the [Analytics Cookbook] [analyst-cookbook]) that go into much more detail.

The first guide covers creating schemas with prebuilt recipes and cubes in Redshift or PostgreSQL. These can help you get started analyzing Snowplow data faster. 

The next four guides cover using different tools (ChartIO, Tableau, Excel and R) to analyze Snowplow data in Redshift or PostgreSQL. The sixth guide covers how to analyze Snowplow data in S3 using Elastic Mapreduce and Apache Hive specifically, as an easy-introduction to EMR more generally. The final guide (7) covers how to use Qubole with Apache Hive to analyze the data in S3, as an attractive alternative to EMR.

1. [Creating the prebuilt cube and recipe views that Snowplow ships with in Redshift / PostgreSQL] [views]
2. [Exploring, analysing and dashboarding your Snowplow data with Looker] [looker]
3. [Setup ChartIO to create dashboards with Snowplow data] [chartio]
4. [Setup Excel to analyze and visualize Snowplow data] [excel]
5. [Setup Tableau to perform OLAP analysis on Snowplow data] [tableau]
6. [Setup R to perform more sophisticated visualization, statistical analysis and data mining on Snowplow data] [r]
7. [Get started analyzing your data in S3 using EMR and Hive] [hive]
8. [Get started analyzing your data in S3 using Qubole and Hive / Pig] [qubole]


[analyst-cookbook]: http://snowplowanalytics.com/analytics/index.html
[looker]: Getting-started-with-Looker
[hive]: Getting-started-with-EMR
[infobright]: Getting-started-analysing-your-data-in-Infobright
[chartio]: Setting-up-ChartIO-to-visualize-Snowplow-data
[excel]: Setting-up-Excel-to-analyze-Snowplow-data
[tableau]: Setting-up-Tableau-to-analyze-your-Snowplow-data
[r]: Setting-up-R-to-perform-more-sophisticated-analysis-on-your-Snowplow-data
[qubole]: Setting-up-Qubole-to-analyze-Snowplow-data-using-Apache-Hive
[views]: Setting-up-the-prebuilt-views-in-Redshift-and-PostgreSQL