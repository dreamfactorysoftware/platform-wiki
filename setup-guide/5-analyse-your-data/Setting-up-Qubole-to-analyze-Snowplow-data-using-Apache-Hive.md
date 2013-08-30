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

Back to [top](#top).

<a name="login" />
## 2. Login to Qubole and setup access to your data in S3

Once you have signed up, login:

[[/setup-guide/images/qubole/1.png]]

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

## 3. Define a table in Hive for Snowplow data in S3

We're going to start our Qubole session by defining a table with our data in S3 using Hive. Click on the **Analyze** icon in Qubole, and then click on the **Composer** icon.









[qubole]: http://www.qubole.com/
[signup-for-qubole]: http://info.qubole.com/free-account
[hive-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/hive-storage/hiveql/table-def.q