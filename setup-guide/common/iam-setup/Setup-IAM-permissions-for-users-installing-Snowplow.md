<a name="top" />
## Overview

Setting up permissions in IAM for the user(s) installing Snowplow is an 3 step process:

1. [Create an IAM group (incl. creating a user and setting permissions)] (#create-group)
2. [Enable users to log into AWS] (#enable-login)


**Disclaimer: Snowplow Analytics Ltd will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

_Warning: these permissions are still more permissive than they need to be. We will be putting in time to narrow them down further over the coming weeks._

<a name="create-group" />
## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

### Group Name

Enter a _Group Name_ of `snowplow-setup`:

[[/setup-guide/images/iam/new-iam-group-snowplow.png]]

### Permissions

Now choose the _Custom Policy_ option and click _Select_:

[[/setup-guide/images/iam/new-iam-group-custom-policy.png]]

Let's give it a _Policy Name_ of `snowplow-policy-setup-infrastructure`:

[[/setup-guide/images/iam/new-iam-group-policy-name.png]]

Now we need to give permissions on:

* Amazon S3: _All Actions (*)_
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
        "s3:*"
      ],
      "Resource": [
        "*"
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
        "ec2:*"
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

Now enter a first _User Name_ - we use `snowplow-setup`:

[[/setup-guide/images/iam/new-iam-group-create-new-user-snowplow.png]]

Keep the option _Generate an access key for each User_ checked, and then click _Continue_.

### Review

Check that the configuration for your new IAM group looks something like this:

[[/setup-guide/images/iam/new-iam-group-review.png]]

Click _Continue_ and you should see the following:

[[/setup-guide/images/iam/new-iam-group-download-credentials.png]]

Click _Download Credentials_ to save these credentials locally. Then click _Close Window_.

Provide these credentials in a secure way - **not** via email - to whoever is setting up Snowplow for you, so that they can add them into the configuration of your EmrEtlRunner and StorageLoader applications.

Back to [top](#top).

<a name="enable-login" />
## 2. Allow the IAM user to login

For much of the Snowplow setup process, the IAM user you have setup above will need access to the Amazon Web Services control panel.

From within the _Users_ tab inside the IAM dashboard, click on your `snowplow` user:

[[/setup-guide/images/iam/user-snowplow.png]]

Now switch to the _Security Credentials_ tab in the bottom pane, and click _Manage Password_ on the right:

[[/setup-guide/images/iam/user-snowplow-manage-password.png]]

Now choose _Assign an auto-generated password_:

[[/setup-guide/images/iam/user-snowplow-auto-password.png]]

Click _Apply_ and you should see the following:

[[/setup-guide/images/iam/user-snowplow-download-credentials.png]]

Click _Download Credentials_ to save these credentials locally. Then click _Close Window_.

Now, provide the following details in a secure way - **not** via email - to whoever is setting up Snowplow for you:

* Login URL: [https://snplow.signin.aws.amazon.com/console](https://snplow.signin.aws.amazon.com/console)
* Username: `snowplow`
* Password: as downloaded

Back to [top](#top).

[iam]: http://aws.amazon.com/iam/
[operate-snowplow]: Setup-IAM-permissions-for-operating-Snowplow