## Overview

This is a short guide explaining how to setup an [Identity and Access Management (IAM)] [iam] user to operate Snowplow on your AWS account. These instructions reduce the IAM user's permissions towards the minimum required to effectively deploy, configure and operate Snowplow within your AWS account.

We recommend setting up an IAM user for two main reasons:

1. If the server running EmrEtlRunner and StorageLoader is compromised, the AWS credentials in your configuration files will give the attacker only limited powers over your AWS account
2. If you hire an external resource to install Snowplow for you, again this approach limits their access to and control over your AWS account

**Disclaimer: While Snowplow Analytics Ltd are happy to provide these instructions, we will not be liable for any issues caused by their full or partial implementation on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

Name the group Snowplow:

[[/setup-guide/images/iam/new-iam-group-snowplow.png]]

### Permissions

Now choose the _Custom_ option and click _Select_:

[[/setup-guide/images/iam/new-iam-group-custom-policy.png]]

Let's give it a _Policy Name_:

[[/setup-guide/images/iam/new-iam-group-policy-name.png]]

Now we need to give permissions on:

* Amazon S3: _CreateBucket_
* Amazon EMR: _All Actions (*)_
* Amazon CloudFront: _CreateDistribution_
* Amazon Elastic Beanstalk: _All Actions (*)_
* Amazon Redshift: _All Actions (*)_

Paste the following into the _Policy Document_ text area:

 ```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:CreateBucket"
      ],
      "Sid": "Stmt1374503110000",
      "Resource": [
        "arn:aws:s3:::*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticmapreduce:*"
      ],
      "Sid": "Stmt1374503416000",
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "cloudfront:CreateDistribution"
      ],
      "Sid": "Stmt1374504844000",
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticbeanstalk:*"
      ],
      "Sid": "Stmt1374507681000",
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "redshift:*"
      ],
      "Sid": "Stmt1374508219000",
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

**If you are not using the Clojure Collector, you can remove the Elastic Beanstalk section in the above policy document.**

Now click _Continue_:

[[/setup-guide/images/iam/new-iam-group-policy-continue.png]]

[iam]: http://aws.amazon.com/iam/