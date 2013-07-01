<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 5: Get started analysing Snowplow data**](Getting-started-analysing-Snowplow-data)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/5-analytics.png]] 

Now you have your Snowplow data being generated and loaded into S3 and potentially also Amazon Redshift, you can start to analyse that data.

Because Snowplow gives you access to incredibly granular, event-level and customer-level data, the possible analyses you can perform on that data is endless.

As part of this setup guide, we provide details on how to get started analysing that data. There are many other resources we are building out (notably the [Analytics Cookbook] [analyst-cookbook]) that go into much more detail.

1. [Get started analysing your data in S3 using EMR and Hive] [hive]
2. [Setup ChartIO to visualize Snowplow data] [chartio]
3. [Setup Tableau to perform OLAP analysis on Snowplow data] [tableau]
4. [Setup R to perform more sophisticated visualization, statistical analysis and data mining on Snowplow data] [r]


[analyst-cookbook]: http://snowplowanalytics.com/analytics/index.html
[hive]: Getting-started-with-EMR
[infobright]: Getting-started-analysing-your-data-in-Infobright
[chartio]: Setting-up-ChartIO-to-visualize-your-data
[tableau]: Setting-up-Tableau-to-analyse-data-in-Redshift
[r]: Setting-up-R-to-perform-more-sophisticated-analysis-on-your-data