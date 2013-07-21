# IAM setup

## Overview

This is a short guide explaining how to setup an [Identity and Access Management (IAM)] [iam] user to operate Snowplow on your AWS account. These instructions limit the IAM user's permissions to the bare minimum required to effectively deploy, configure and operate Snowplow within your AWS account.

We recommend setting up an IAM user for two main reasons:

1. If the server running EmrEtlRunner and StorageLoader is compromised, the AWS credentials in your configuration files will give the attacker only limited powers over your AWS account
2. If you are hiring an external resource to install Snowplow for you, again this approach limits their access to and control over your AWS account

## 1. Setup the IAM group

To write

[iam]: http://aws.amazon.com/iam/