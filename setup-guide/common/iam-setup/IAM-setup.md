## Overview

This is a short guide explaining how to setup users in [Identity and Access Management (IAM)] [iam] to:

1. Install Snowplow on your AWS account
2. Operate Snowplow
3. Perform analytics on Snowplow data using EMR

IAMs gives you fine grained control over the level of permissions each user has in accessing your AWS account. It is wise to limit the permissions to each user to the minimum to enable them to do the job required, so that if those credentials are compromised, the hacker who gains access to them has limited access to your AWS account.

We recommend you create 2-3 security groups for different types of user related to your Snowplow implementation:

1. [A security group for engineers that setup Snowplow] [install-snowplow]. These users require wide ranging permissions to your AWS account. For that reason, we recommend that these users credentials are created just before Snowplow setup, and deleted shortly afterwards.
2. [A security group for operating Snowplow] [operate-snowplow]. The Snowplow data pipeline is orchestrated by two applications: EmrEtlRunner and StorageLoader: both these applications require Amazon security credentials. We recommend creating a single user for both these applications, and granting that user only the very limited set of permissions required by EmrEtlRunner and StorageLoader.
3. [A security group for data analysts crunching Snowplow data] [crunch-snowplow-data]. For analysts who are crunching data in a database (i.e. Amazon Redshift or PostgreSQL), no Amazon security credentials are required. (Access is managed via the database i.e. Redshift and PostgreSQL.) For an analyst crunching Snowplow data using EMR (reading data from S3), security credentials *are* required however.

Instructions on setting up each of the types of user can be found below:

1. [Setup an IAM user to install Snowplow] [install-Snowplow]
2. [Setup an IAM user to operate Snowplow (i.e. for EmrEtlRunner and StorageLoader)] [operate-snowplow]
3. [Setup an IAM user to crunch Snowplow data in EMR] [crunch-snowplow-data]

**Disclaimer: Snowplow Analytics Ltd will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

[iam]: http://aws.amazon.com/iam/
[install-Snowplow]: Setup-IAM-permissions-for-users-installing-Snowplow
[operate-snowplow]: Setup-IAM-permissions-for-operating-Snowplow
[crunch-snowplow-data]:  Setup-IAM-permissions-for-a-data-analyst-using-EMR
