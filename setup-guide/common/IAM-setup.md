## Overview

This is a short guide explaining how to setup an [Identity and Access Management (IAM)] [iam] user to operate Snowplow on your AWS account. These instructions reduce the IAM user's permissions towards the minimum required to effectively deploy, configure and operate Snowplow within your AWS account.

We recommend setting up an IAM user for two main reasons:

1. If the server running EmrEtlRunner and StorageLoader is compromised, the AWS credentials in your configuration files will give the attacker only limited powers over your AWS account
2. If you hire an external resource to install Snowplow for you, again this approach limits their access to and control over your AWS account

**Disclaimer: While Snowplow Analytics Ltd are happy to provide these security instructions, we will not be liable for any issues caused by their full or partial implementation on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

Name the group Snowplow:

[[/setup-guide/images/iam/new-iam-group-snowplow.png]]

### Permissions

Now choose the _Policy Generator_ option and click _Select_:

[[/setup-guide/images/iam/new-iam-group-permissions.png]]

Now we can start adding the bare minimum permissions needed to deploy Snowplow.

### Permissions: S3

First we need to set permissions for Amazon S3:

* Select _Amazon S3_ from the first dropdown
* Select _CreateBucket_ option from the second dropdown:

[[/setup-guide/images/iam/new-iam-group-create-bucket.png]]

* Add `arn:aws:s3:::*` for the _Amazon Resource Name (ARN)_

Then click _Add Statement_:

[[/setup-guide/images/iam/new-iam-group-add-s3.png]]

### Permissions: EMR

Now it's permissions for Amazon EMR:

* Select _Amazon Elastic MapReduce_ from the first dropdown
* Select _All Actions (*)_ from the second dropdown:

[[/setup-guide/images/iam/new-iam-group-all-emr.png]]

Then click _Add Statement_:

[[/setup-guide/images/iam/new-iam-group-add-emr.png]]

### Permissions: CloudFront

If you are going to use the CloudFront Collector, you need to set permissions for Amazon CloudFront next:

* Select _Amazon CloudFront_ from the first dropdown
* Select _CreateBucket_ option from the second dropdown:

[[/setup-guide/images/iam/new-iam-group-create-dist.png]]

Then click _Add Statement_:

[[/setup-guide/images/iam/new-iam-group-add-cloudfront.png]]

### Permissions: Elastic Beanstalk

If you are going to use the Clojure Collector, you need to set permissions for Elastic Beanstalk next:

* Select _AWS Elastic Beanstalk_ 
* For now (we may update this in the future), select _All Actions (*)_ from the second dropdown:

[[/setup-guide/images/iam/new-iam-group-all-beanstalk.png]]

* Add `*` for the _Amazon Resource Name (ARN)_

Then click _Add Statement_:

[[/setup-guide/images/iam/new-iam-group-add-beanstalk.png]]

### Permissions: Amazon Redshift

If you are going to use Redshift to store your events, you need to set permissions for Amazon Redshift next:

* Select _Amazon Redshift_ from the first dropdown
* Select _All Actions (*)_ from the second dropdown:

[[/setup-guide/images/iam/new-iam-group-all-redshift.png]]

Then click _Add Statement_:

[[/setup-guide/images/iam/new-iam-group-add-redshift.png]]

The _Edit Permissions_ screen should like this now - you are ready to hit _Continue_:

[[/setup-guide/images/iam/new-iam-group-permissions-continue.png]]

On the next screen you will see the permissions summarized in a _Policy Document_:

[[/setup-guide/images/iam/new-iam-group-set-permissions.png]]

For completeness, we reproduce the complete _Policy Document_ here:

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

You can update the _Policy Name_ to make it easier to 

[iam]: http://aws.amazon.com/iam/