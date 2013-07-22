## Overview

This is a short guide explaining how to setup an [Identity and Access Management (IAM)] [iam] user to operate Snowplow on your AWS account. These instructions reduce the IAM user's permissions towards the minimum required to effectively deploy, configure and operate Snowplow within your AWS account.

We recommend setting up an IAM user for two main reasons:

1. If the server running EmrEtlRunner and StorageLoader is compromised, the AWS credentials in your configuration files will give the attacker only limited powers over your AWS account
2. If you hire an external resource to install Snowplow for you, again this approach limits their access to and control over your AWS account

**Disclaimer: Snowplow Analytics Ltd will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

### Group Name

Enter a _Group Name_ of `Snowplow`:

[[/setup-guide/images/iam/new-iam-group-snowplow.png]]

### Permissions

Now choose the _Custom Policy_ option and click _Select_:

[[/setup-guide/images/iam/new-iam-group-custom-policy.png]]

Let's give it a _Policy Name_ of `snowplow-policy`:

[[/setup-guide/images/iam/new-iam-group-policy-name.png]]

Now we need to give permissions on:

* Amazon S3: _CreateBucket_
* Amazon EMR: _All Actions (*)_
* Amazon CloudFront: _CreateDistribution_
* Amazon Elastic Beanstalk: _All Actions (*)_
* Amazon Redshift: _All Actions (*)_

These permissions are set out in the following policy document. **If you are not using the Clojure Collector, you can remove the Elastic Beanstalk section.**

Now paste the following JSON into the _Policy Document_ text area:

 ```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:CreateBucket"
      ],
      "Resource": [
        "arn:aws:s3:::*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticmapreduce:*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "cloudfront:CreateDistribution"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticbeanstalk:*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "redshift:*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

Now click _Continue_:

[[/setup-guide/images/iam/new-iam-group-policy-continue.png]]

### Users

From the _Add Existing Users_ tab, switch to the _Create New Users_ tab:

[[/setup-guide/images/iam/new-iam-group-create-new-user.png]]

Now enter a first _User Name_ - we use `snowplow`:

[[/setup-guide/images/iam/new-iam-group-create-new-user-snowplow.png]]

Keep the option _Generate an access key for each User_ checked, and then click _Continue_.

### Review

Check that the configuration for your new IAM group looks something like this:

[[/setup-guide/images/iam/new-iam-group-review.png]]

Click _Continue_ and you should see the following:

[[/setup-guide/images/iam/new-iam-group-download-credentials.png]]

Click _Download Credentials_ to save these credentials locally. Then click _Close Window_.

## 

[iam]: http://aws.amazon.com/iam/