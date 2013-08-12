<a name="top" />
## Overview

These are instructions for setting up the IAM permissions for the "user(s)" that "operates" Snowplow: in practice this is the user associated with the credentials that should be used in the EmrEtlRunner and StorageLoader config files. The permissions represent the minimum required to keep the Snowplow data pipeline running: this is best practice, so that if a hacker manages to compromise the server with EmrEtlRunner and StorageLoader on it (so gain access to these credentials), they will have only limited access to your AWS resources.

Setting up the credentials is an 5 step process:

1. [Create a new IAM group] (#create-group)
2. [Set the permissions for the group] (#permissions)
3. [Create a new user] (#user)
4. [Add the new user to your new group] (#add-to-group)
5. [Update the EmrEtlRunner and StorageLoader config files with the new credentials] (#update-configs)
6. [Delete the user created to setup Snowplow] (#delete)

**Disclaimer: Snowplow Analytics Ltd will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

<a name="create-group" />
## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

### Group Name

Enter a _Group Name_ of `snowplow-data-pipeline`:

[[/setup-guide/images/iam/operating-snowplow-permissions/group-name-snowplow-data-pipeline.png]]

Then click continue.

Back to [top](#top).

<a name="permissions" />
## 2. Set the permissions for the group

Choose the *Custom Policy* option and click *Select*:

[[/setup-guide/images/iam/new-iam-group-custom-policy.png]]

Let's give it a _Policy Name_ of `snowplow-policy-operate-datapipeline`.

We now need to create the Amazon policy document to define *just* the user permissions required by EmrEtlRunner and StorageLoader to orchestrate the Snowplow data pipeline in stages. We'll build this up in stages: we recommend start with the following template (it will help if you do this in a text editor, and then paste the result into the AWS console when completed):

	{
	  "Version": "2012-10-17",
	  "Statement": [
	    {
	      "Sid": "PermissionsForEmrPt1",
	      "Action": [
	        "elasticmapreduce:AddInstanceGroups",
	        "elasticmapreduce:AddJobFlowSteps",
	        "elasticmapreduce:DescribeJobFlows",
	        "elasticmapreduce:ModifyInstanceGroups",
	        "elasticmapreduce:RunJobFlow",
	        "elasticmapreduce:SetTerminationProtection",
	        "elasticmapreduce:TerminateJobFlows",
	        "ec2:AuthorizeSecurityGroupIngress",
	        "ec2:CancelSpotInstanceRequests",
	        "ec2:CreateSecurityGroup",
	        "ec2:CreateTags",
	        "ec2:DescribeAvailabilityZones",
	        "ec2:DescribeInstances",
	        "ec2:DescribeKeyPairs",
	        "ec2:DescribeSecurityGroups",
	        "ec2:DescribeSpotInstanceRequests",
	        "ec2:DescribeSubnets",
	        "ec2:DescribeRouteTables",
	        "ec2:ModifyImageAttribute",
	        "ec2:ModifyInstanceAttribute",
	        "ec2:RequestSpotInstances",
	        "ec2:RunInstances",
	        "ec2:TerminateInstances",
	        "cloudwatch:GetMetricStatistics",
	        "cloudwatch:ListMetrics",
	        "cloudwatch:PutMetricData"
	      ],
	      "Resource": [
	        "*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsForEmrPt2",
	      "Action": [
	        "s3:GetObject",
	        "s3:ListBucket",
	        "sdb:CreateDomain",
	        "sdb:Select",
	        "sdb:GetAttributes",
	        "sdb:PutAttributes",
	        "sdb:BatchPutAttributes",
	        "sdb:ListDomains",
	        "sdb:DomainMetadata" 
	      ],
	      "Effect": "Allow",
	      "Resource": [
	                "arn:aws:s3:::*elasticmapreduce/*",
	                "arn:aws:sdb:*:*:*ElasticMapReduce*/*",
	                "arn:aws:sdb:*:*:*" 
	      ]
	    }       
	  ]
	}	

The above statement grants gruop members all the permissions required to run Elastic Mapreduce. Note that this includes a number of permissions for EC2 (on which EMR runs), Cloudwatch and Simple DB (which EMR uses for job monitoring and debugging).

We need to add additional permissinons to give the user the required access to S3 to read, write and delete files (as part of file moves) as required. We want to restrict these permissions to just those locations that are used by the Snowplow data pipeline. You can identify these locations by referring to the `config.yml` files for EmrEtlRunner and StorageLoader. (They can be found on the repo [here] [emretlrunner.config]) and [here] [storageloader.config].)

Start with your EmrEtlRunner config.yml file. If you view the file, you should see several locations in S3 defined, for different stages of the Snowplow data pipeline - that look something like this (your locations on S3 will be different, of course):

	:s3:
	  :region: eu-west-1
	  :buckets:
	    # Update assets if you want to host the serde and HiveQL yourself
	    :log: s3n://snowplow-test-etl-eu-west-1/hadoop-redshift/logs
	    :in: s3n://snowplow-ice-logs-emrtest
	    :processing: s3n://snowplow-test-etl-eu-west-1/hadoop-redshift/processing
	    :out: s3n://snowplow-test-data-eu-west-1/hadoop-redshift/events
	    :out_bad_rows: s3n://snowplow-test-data-eu-west-1/hadoop-redshift/bad-rows
	    :out_errors: s3n://snowplow-test-data-eu-west-1/hadoop-redshift/error-rows
	    :archive: s3n://snowplow-test-archive-eu-west-1/hadoop-redshift/raw

We need to add permissions to our policy for each of those S3 buckets. Let's start by adding write permissions for the `:log:` location on S3 (this is `s3n://snowplow-test-etl-eu-west-1/hadoop-redshift/logs` in our example):

	    {
	      "Sid": "PermissionsOnEmrLoggingBucket",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-etl-eu-west-1/hadoop-redshift/logs/*"
	      ],
	      "Effect": "Allow"
	    },

The above permissions enable members of the group to make HEAD and PUT requests at this location. 

Now we need to add permissions for our `:in:` location (i.e. the location on S3 where are collector logs are read in from, this is `s3n://snowplow-ice-logs-emrtest` in our example):

	    {
	      "Sid": "PermissionsOnEmrEtlRunnerInBucket",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-ice-logs-emrtest/*"
	      ],
	      "Effect": "Allow"
	    },

The above permissions enable members of the group to read data from this bucket, and delete data. (This is required because the data is moved as part of the process to the process bucket and then the archive bucket). 

Now let's add permissions for the `:processing:` location (this is `s3n://snowplow-test-etl-eu-west-1/hadoop-redshift/processing` in our example):

	    {
	      "Sid": "PermissionsOnEmrEtlRunnerProcessingLocation",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-etl-eu-west-1/hadoop-redshift/processing/*"
	      ],
	      "Effect": "Allow"
	    },

These permissions are more permissive than those on the `:in:` location, because we write data to the processing bucket, then read it, then delete it (as part of moving it to the archive location). 

Now let's add permissions for the `:out:` location (this is `s3n://snowplow-test-data-eu-west-1/hadoop-redshift/events` in our example):

	    {
	      "Sid": "PermissionsOnEmrEtlRunnerOutStorageLoaderInLocation",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/events/*"
	      ],
	      "Effect": "Allow"
	    },

These are as permissive as the permissions on the processing bucket: that is because the output of the EMR process gets written to this location, but the data then gets read (by the StorageLoader) and archived in a separate location, so is ultimately deleted from here as well.

Now let's add permissions for the `:out_bad_rows:` and `:out_errors:` locations:

	    {
	      "Sid": "PermissionsOnBadRowsLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/bad-rows/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsOnErrorRowsLocations",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/error-rows/*"
	      ],
	      "Effect": "Allow"
	    },

Note that we only need to be able to write to these buckets. Finally, we can add the permissions for the `:archive:` location:

	    {
	      "Sid": "PermissionsOnEmrEtlRunnerArchiveLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-archive-eu-west-1/hadoop-redshift/raw/*"
	      ],
	      "Effect": "Allow"
	    },

Note that we *only* have given write permissions on this location: this means that your raw collector logs should be safe, even if your credentials are compromised.

Now that we have given the relevant permissions on the locations identified in the EmrEtlRunner config file, we need to do the same for the locations identified in the StorageLoader config file. Locate that file, you should have a section that looks something like this:

	:s3:
	  :region: eu-west-1
	  :buckets:
	    :in: s3://snowplow-test-data-eu-west-1/hadoop-redshift/events
	    :archive: s3://snowplow-test-archive-eu-west-1/hadoop-redshift/events

Note that the `:in:` location for the StorageLoader is the `:out:` location for EmrEtlRunner - we have already set the relevant permissions on this location. Therefore, we only need to add permission to write to the `:archive:` location identified above (i.e. `s3://snowplow-test-archive-eu-west-1/hadoop-redshift/events` in our example):

	    {
	      "Sid": "PermissionsOnStorageLoaderArchiveLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-archive-eu-west-1/hadoop-redshift/events/*"
	      ],
	      "Effect": "Allow"
	    },

The above S3 permissions allow for specific requests to be made at the required locations in S3, where those locations are specified precisely (i.e. within each bucket where appropriate). In order to work, however, it is necessary to enable `ListBucket` permissions for *every* bucket where there is a location that we use. In our case, there are 4 buckets:

1. s3n://snowplow-test-etl-eu-west-1
2. s3n://snowplow-ice-logs-emrtest
3. s3n://snowplow-test-data-eu-west-1
4. s3n://snowplow-test-archive-eu-west-1
	    
However, there may be more or less in your case. For each bucket identified, you need to add the `ListBucket` permission i.e.:

    {
      "Sid": "ListAccessOnCollectorLogsBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket" ],
      "Resource": [ "arn:aws:s3:::snowplow-ice-logs-emrtest"]
    },
    {
      "Sid": "ListAccessOnProcessingBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket" ],
      "Resource": [ "arn:aws:s3:::snowplow-test-etl-eu-west-1"]
    },
    {
      "Sid": "ListAccessOnEmrEtlRunnerOutputBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket" ],
      "Resource": [ "arn:aws:s3:::snowplow-test-data-eu-west-1"]
    },
    {
      "Sid": "ListObjectsOnEmrEtlRunnerArchiveBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket" ],
      "Resource": [ "arn:aws:s3:::snowplow-test-archive-eu-west-1"]
    }, 

Your completed permissions file should look something like this:

	{
	  "Version": "2012-10-17",
	  "Statement": [
	    {
	      "Sid": "ListAccessOnCollectorLogsBucket",
	      "Effect": "Allow",
	      "Action": ["s3:ListBucket" ],
	      "Resource": [ "arn:aws:s3:::snowplow-ice-logs-emrtest"]
	    },
	    {
	      "Sid": "PermissionsOnEmrEtlRunnerInBucket",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-ice-logs-emrtest/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "ListAccessOnProcessingBucket",
	      "Effect": "Allow",
	      "Action": ["s3:ListBucket" ],
	      "Resource": [ "arn:aws:s3:::snowplow-test-etl-eu-west-1"]
	    },
	    {
	      "Sid": "PermissionsOnEmrEtlRunnerProcessingLocation",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-etl-eu-west-1/hadoop-redshift/processing/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsOnEmrLoggingBucket",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-etl-eu-west-1/hadoop-redshift/logs/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsOnEmrEtlRunnerOutStorageLoaderInLocation",
	      "Action": [
	        "s3:DeleteObject",
	        "s3:DeleteObjectVersion",
	        "s3:GetObject",
	        "s3:GetObjectAcl",
	        "s3:GetObjectVersion",
	        "s3:GetObjectVersionAcl",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/events/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "ListAccessOnEmrEtlRunnerOutputBucket",
	      "Effect": "Allow",
	      "Action": ["s3:ListBucket" ],
	      "Resource": [ "arn:aws:s3:::snowplow-test-data-eu-west-1"]
	    },    
	    {
	      "Sid": "PermissionsOnBadRowsLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/bad-rows/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsOnErrorRowsLocations",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-data-eu-west-1/hadoop-redshift/error-rows/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "ListObjectsOnEmrEtlRunnerArchiveBucket",
	      "Effect": "Allow",
	      "Action": ["s3:ListBucket" ],
	      "Resource": [ "arn:aws:s3:::snowplow-test-archive-eu-west-1"]
	    },     
	    {
	      "Sid": "PermissionsOnEmrEtlRunnerArchiveLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-archive-eu-west-1/hadoop-redshift/raw/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsOnStorageLoaderArchiveLocation",
	      "Action": [
	        "s3:GetObject",
	        "s3:GetObjectVersion",
	        "s3:PutObject",
	        "s3:PutObjectAcl",
	        "s3:PutObjectVersionAcl"
	      ],
	      "Resource": [
	        "arn:aws:s3:::snowplow-test-archive-eu-west-1/hadoop-redshift/events/*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsForEmrPt1",
	      "Action": [
	        "elasticmapreduce:AddInstanceGroups",
	        "elasticmapreduce:AddJobFlowSteps",
	        "elasticmapreduce:DescribeJobFlows",
	        "elasticmapreduce:ModifyInstanceGroups",
	        "elasticmapreduce:RunJobFlow",
	        "elasticmapreduce:SetTerminationProtection",
	        "elasticmapreduce:TerminateJobFlows",
	        "ec2:AuthorizeSecurityGroupIngress",
	        "ec2:CancelSpotInstanceRequests",
	        "ec2:CreateSecurityGroup",
	        "ec2:CreateTags",
	        "ec2:DescribeAvailabilityZones",
	        "ec2:DescribeInstances",
	        "ec2:DescribeKeyPairs",
	        "ec2:DescribeSecurityGroups",
	        "ec2:DescribeSpotInstanceRequests",
	        "ec2:DescribeSubnets",
	        "ec2:DescribeRouteTables",
	        "ec2:ModifyImageAttribute",
	        "ec2:ModifyInstanceAttribute",
	        "ec2:RequestSpotInstances",
	        "ec2:RunInstances",
	        "ec2:TerminateInstances",
	        "cloudwatch:GetMetricStatistics",
	        "cloudwatch:ListMetrics",
	        "cloudwatch:PutMetricData"
	      ],
	      "Resource": [
	        "*"
	      ],
	      "Effect": "Allow"
	    },
	    {
	      "Sid": "PermissionsForEmrPt2",
	      "Action": [
	        "s3:GetObject",
	        "s3:ListBucket",
	        "sdb:CreateDomain",
	        "sdb:Select",
	        "sdb:GetAttributes",
	        "sdb:PutAttributes",
	        "sdb:BatchPutAttributes",
	        "sdb:ListDomains",
	        "sdb:DomainMetadata" 
	      ],
	      "Effect": "Allow",
	      "Resource": [
	                "arn:aws:s3:::*elasticmapreduce/*",
	                "arn:aws:sdb:*:*:*ElasticMapReduce*/*",
	                "arn:aws:sdb:*:*:*" 
	      ]
	    }       
	  ]
	}

Copy and paste the completed file into the 

[[/setup-guide/images/iam/operating-snowplow-permissions/permissions-entered.png]]

Click *Continue*:

[[/setup-guide/images/iam/operating-snowplow-permissions/add-existing-users.png]]

When given the opportunity, do not add an existing user. We want to create a new user with these permissions, who **only** has these permissions.

Review the final settings before pressing *Continue* to complete the process. Your new group is now setup.

Back to [top](#top).

<a name="user" />
## 3. Create a new user

Now that our group has been created, we need to add a new user to it.

In the IAM console, click on the *Users* section on the left hand menu:

[[/setup-guide/images/iam/operating-snowplow-permissions/users-section.png]]

Click on the *Create New Users* button:

[[/setup-guide/images/iam/operating-snowplow-permissions/create-new-user.png]]

Give your new user a suitable name e.g. `snowplow-operator`. Click *Create*:

[[/setup-guide/images/iam/operating-snowplow-permissions/download-credentials.png]]

AWS gives you the chance to either show or download the credentials. Whichever you do, make sure you **store these credentials safely**. You will need them in [step 5] (#update-configs) of this guide.

Now close the window: your new user is setup.

Back to [top](top).

<a name="add-to-grup" />
## 4. Add the new user to your new group

The user we have created has no permissions -> we need to add her to the new group we created to give her those permissions.

To do that, click on the *Groups* section on the AWS console, and select the new group you created:

[[/setup-guide/images/iam/operating-snowplow-permissions/select-group.png]]

Click on the *Add Users to Group* button:

[[/setup-guide/images/iam/operating-snowplow-permissions/add-user-to-group.png]]

The user now has the required permissions.

Back to [top](top).

<a name="update-configs" />
## 5. Update the EmrEtlRunner and StorageLoader config files with the new credentials

Now that you have setup your new user and given her the relevant permissions to run the Snowplow data pipeline, you need to take those credentials and use them instead of the existing credentials in your EmrEtlRunner and StorageLoader config files.

Those files should be accessible on the server setup to run EmrEtlRunner and StorageLoader. (Examples of those files can be found on the Snowplow repo [here] [emretlrunner.config] and [here] [storageloader.config].) Update the `:access_key_id:` and `:secret_access_key:` fields with those from the new user in **both** files. 

Back to [top](#top).

<a name="delete" />
## 6. Delete the user created to setup Snowplow

Now that we have created a new user with just the permissions required to run the Snowplow data pipeline, and used her credentials in in the EmrEtlRunner and StorageLoader config files, we can delete the user that we created to setup/install Snowplow originally.

In the IAM console, go into the `snowplow-setup` group you created when you created user credentials for the individual who setup Snowplow. Select the user in that group e.g. `snowplow-setup` and click the *Remove User from Group* link:

[[/setup-guide/images/iam/operating-snowplow-permissions/remove-snowplow-setup.png]]

Click *Remove from Group* when AWS asks you to confirm.

[[/setup-guide/images/iam/operating-snowplow-permissions/confirm-remove.png]]

In the event that you need to update your Snowplow setup in the future, you can simply create a new user, fetch their credentials, then add them to the `setup-snowplow` group to give them the relevant permissions.

Back to [top](#top).



[emretlrunner.config]: https://github.com/snowplow/snowplow/tree/master/3-enrich/emr-etl-runner/config
[storageloader.config]: https://github.com/snowplow/snowplow/tree/master/4-storage/storage-loader/config
