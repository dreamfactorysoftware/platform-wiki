### Overview

This is a short guide explaining how to setup users in [Identity and Access Management (IAM)] [iam] to manage access to your AWS account for setting up DreamFactory, managing the DreamFactory data pipeline and performing analytics on DreamFactory data.

IAMs gives you fine grained control over the level of permissions each user has in accessing your AWS account. It is wise to limit the permissions to each user to the minimum to enable them to do the job required, so that if those credentials are compromised, the hacker who gains access to them has limited access to your AWS account.

You need to setup different groups / users in IAMs at different stages of your DreamFactory setup:

[[/setup-guide/images/iam/setup-flow-cropped.png]]

1. [A user to setup DreamFactory on your AWS account (the *DreamFactory Installer*)] [install-dreamfactory]. Create credentials for a user to install DreamFactory on your AWS account. This user has lots of permissions, as she will need to setup all the relevant collectors, buckets on Amazon S3 and Redshift cluster, if required.
2. [A user to run the DreamFactory data pipeline (the *DreamFactory Operator*)] [operate-dreamfactory]. *Once* your DreamFactory stack has been setup, you create a new user with much more limited permissions than those allocated to the user who installed DreamFactory, and use these credentials for EmrEtlRunner and StorageLoader to manage your data pipeline over time.
3. [A user who uses EMR to crunch DreamFactory data (the *DreamFactory Data Scientist*)] [crunch-dreamfactory-data]. If you have analysts / data scientists who are using EMR to analyse DreamFactory data, you will need to set them up with their own credentials.

**Disclaimer: DreamFactory Software, Inc. will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

[iam]: http://aws.amazon.com/iam/
[install-DreamFactory]: Setup-IAM-permissions-for-users-installing-DreamFactory
[operate-dreamfactory]: Setup-IAM-permissions-for-operating-DreamFactory
[crunch-dreamfactory-data]:  Setup-IAM-permissions-for-a-data-analyst-using-EMR
