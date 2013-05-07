[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Snowplow setup guide) > [**Analytics**](analytics-setup)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/5-analytics.png]] 

## Analytics modules

| **Analytics module**                                   | **Description**                                                          |
|:-------------------------------------------------------|:-------------------------------------------------------------------------|
| [Hive / Hadoop analytics on EMR](hive-analytics-setup) | Setup command line tools to start writing Hive / Hadoop jobs and running them on Snowplow data stored in S3 using EMR |
| [Analytics in Infobright](infobright-analytics-setup)  | Perform analytics on data stored in Infobright, either by directly executing SQL statements in Infobright, or by plugging in one of the many tools that work with data stored in MySQL. (On which Infobright is based) |
| [ChartIO](chartio-setup)                               | Use ChartIO to interrogate and visualise Snowplow data stored in Infobright, including creating dashboards. This is the fastest way to build dashboards from Snowplow data |

## Snowplow approach to analytics

Enabling analysts to perform the widest set of analysis on their web and application data is the principle reason we created Snowplow in the first place.

Snowplow is architected to enable analysts to use a wide range of tools and technologies to analyse their data, regardless of where [that data is stored](choosing a storage module).

Broadly, there are three types of analytics we are interested in performing on web analytics and event data: (Where by 'types' we mean analytics approaches rather than types of end-user analytics e.g. customer analytics vs product analytics.)

1. OLAP analysis: where we aggregate different combinations of metrics and dimensions, with a view to understand what underlying changes is driving changes in the performance of our website or application and business
2. Event path analytics: where we explore the journeys that users take through our website or application, with a view to improving product design
3. Machine learning analytics: where we develop algorithms to segment entities (e.g. users, products, keywords, media items), classify entities (e.g. users, products, keywords, media items) and recommend entities (usually products or media items).

Whether your data is stored in S3 or in Infobright, the structure and granularity of the data is exactly the same. Although there are differences in setup required to query the data in S3 using Hive vs in Infobright, the types of queries that you can run, and the range of tools that you can connect to is equally large - the steps required to enable those connections are different depending on your storage solution.

Exploring and documenting all those possibilities is beyond the scope of this setup guide. Instead, over here we've outlined how to get started with analysis in both the storage options outlined above. For further ideas, we recommend looking at the Snowplow [Analytics Cookbook](http://snowplowanalytics.com/analytics/index.html), on the [Snowplow website](http://snowplowanalytics.com/). 
