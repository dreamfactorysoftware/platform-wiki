<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow > [**Step 5: Get started analyzing Snowplow data**](Getting-started-analyzing-Snowplow-data) > Setting up Qubole to analyze your Snowplow data 

Snowplow delivers your granular, customer-level and event-level data into your own data warehouse on S3 (for processing using Hadoop / Hive / Pig / Mahout on EMR) or into a database (Amazon Redshift or Postgres) for analysis using more traditional (rather than big-data) toolsets.

An interesting option for analysts and data scientists who want to use big data tools like Hadoop, Hive, Pig etc., is to use [Qubole] [qubole] as an alternative to EMR. Qubole has been built by the team that originally created Hive at Facebook: it offers a couple of big advantages over EMR:

1. Convenience: execute queries from the comfort of a UI in the browser, or integrate Qubole with BI and analytics tools
2. Speed / efficiency: the Qubole team have optimized their Hadoop and Hive distribution, perhaps better than the folks at Amazon have for EMR

Like EMR, Qubole let's you crunch data stored in S3.

<a name="sign-up" />
## 1. Sign up to Qubole

Signing up to Qubole is straightforward: apply for an account directly through the [Qubole website] [signup-for-qubole] by entering your name, email address and company name on the signup form.

Once you have signed up, login:

[[/setup-guide/images/qubole/1.png]]


[qubole]: http://www.qubole.com/
[signup-for-qubole]: http://info.qubole.com/free-account