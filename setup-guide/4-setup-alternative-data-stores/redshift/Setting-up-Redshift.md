<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > Setup Redshift

Setting up Redshift is an 6 step process:

1. [Launch a cluster](#launch)
2. [Authorize client connections to your cluster](#authorise)
3. [Connect to your cluster](#connect)
4. [Setting up the Snowplow database and events table](#db)
5. [Creating a Redshift user with restrict permissions *just* for loading data into your Snowplow table](#user)
6. [Generating Redshift-format data from Snowplow](#etl)
7. [Automating the loading of Snowplow data into Redshift](#load)

**Note**: We recommend running all Snowplow AWS operations through an IAM user with the bare minimum permissions required to run Snowplow. Please see our [IAM user setup page](IAM-setup) for more information on doing this.

<a name="launch" />
## 1. Launch a Redshift Cluster

Go into the Amazon webservices console and select "Redshift" from the list of services.

[[/setup-guide/images/redshift-setup-guide/1.png]]

Click on the "Launch Cluster" button:

[[/setup-guide/images/redshift-setup-guide/2.png]]

Enter suitable values for the cluster identifier, database name, port, username and password. Click the "Continue" button.

[[/setup-guide/images/redshift-setup-guide/3.png]]

We now need to configure the cluster size. Select the values that are most appropriate to your situation. We generally recommend starting with a single node cluster with node type `dw.hs1.xlarge`, and then adding nodes as your data volumes grow.

You now have the opportunity to encrypt the database and and set the availability zone if you wish. Select your preferences and click "Continue".

[[/setup-guide/images/redshift-setup-guide/4.png]]

Amazon summarises your cluster information. Click "Launch Cluster" to fire your Redshift instance up. This will take a few minutes to complete.

<a name="authorise" />
## 2. Authorize client connections to your cluster

You authorize access to Redshift differently depending on whether the client you're authorizing is an EC2 instance or not

2.1 [EC2 instance](#ec2)  
2.2 [Other client](#other)

<a name="ec2" />
### 2.1 Granting access to an EC2 instance

TO WRITE

<a name="other" />
### 2.2 Granting access to non-EC2 boxes

To enable a direct connection between a client (e.g. on your local machine) and Redshift, click on the cluster you want to access, via the AWS console:

[[/setup-guide/images/redshift-setup-guide/5.png]]

Click on "Security Groups" on the left hand menu.

[[/setup-guide/images/redshift-setup-guide/6.png]]

Amazon lets you create several different security groups so you can manage access by different groups of people. In this tutorial, we will just update the default group to grant access to a particular IP address.

Select the default security group:

[[/setup-guide/images/redshift-setup-guide/7.png]]

We need to enable a connection type for this security group. Amazon offers two choices: an 'EC2 Security Group' (if you want to grant access to a client running on EC2) or a CIDR/IP connection if you want to connect a clieint that is not an EC2 instance.

In this example we're going to establish a direct connection between Redshift and our local machine (not on EC2), so select CIDR/IP. Amazon helpfully guesses the CIDR of the current machine. In our case, this is right, so we enter the value:

[[/setup-guide/images/redshift-setup-guide/8.png]]

and click "Add". 

We should now be able to connect a SQL client on our local machine to Amazon Redshift. 

<a name="connect" />
## 3. Connect to your cluster

There are two ways to connect to your Redshift cluster:

3.1 [Directly](#directly)  
3.2 [Via SSL](#ssl)  

<a name="directly" />
### 3.1 Directly connect 

Amazon has helpfully provided detailed instructions for connecting to Redshift using [SQL Workbench] [sql-workbench-tutorial]. In this tutorial we will connect using [Navicat](http://www.navicat.com/), a database querying tool which we recommend (30 day trial versios are available from the [Navicat website](http://www.navicat.com/)).

**Note: Redshift can be accessed using PostgreSQL JDBC or ODBC drivers. Only specific versions of these drivers work with Redshift**. These are:

* JDBC [[http://jdbc.postgresql.org/download/postgresql-8.4-703.jdbc4.jar]]
* ODBC [[http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_08_04_0200.zip]] or [[http://ftp.postgresql.org/pub/odbc/versions/msi/psqlodbc_09_00_0101-x64.zip]] for 64 bit machines

Clients running different PostgreSQL drivers will not be able to connect with Redshift specifically. Note that a number of SQL and BI vendors are launching Redshift specific drivers.

If you have the drivers setup, connecting to Redshift is straightforward:

Open Navicat, select "Connection" -> "PostgreSQL" to establish a new connection:

[[/setup-guide/images/redshift-setup-guide/9.png]]

Give your connection a suitable name. We now need to enter the host name, port, database, username and password. With the exception of password, these are all available directly from the AWS UI. Go back to your browser, open the AWS console, go to Redshift and select your cluster:

[[/setup-guide/images/redshift-setup-guide/10.png]]

Copy the endpoint, port, database name and username into the relevant fields in Navicat, along with the password you created when you setup the cluster:

[[/setup-guide/images/redshift-setup-guide/11.png]]

Click "Test Connection" to check that it is working. Assuming it is, click "OK".

[[/setup-guide/images/redshift-setup-guide/12.png]]

The Redshift cluster is now visible on Navicat, alongside every other database it is connected to.

<a name="ssl" />
### 3.2 Connect via SSL

TO WRITE

<a name="db" />
## 4. Setting up the Snowplow events table

Now that you have Redshift up and running, you need to create your Snowplow events table.

The Snowplow events table definition for Redshift is available on the repo [here] [redshift-table-def]. Execute this query in Redshift to create the Snowplow events table.

<a name="user" />
## 5. Creating a Redshift user with restrict permissions *just* for loading data into your Snowplow table

We recommend that you create a specific user in Redshift with *only* the permissions required to load data into your Snowplow events table, and use this user's credentials in the StorageLoader config to manage the automatic movement of data into the table. (That way, in the event that the server running StorageLoader is hacked and the hacker gets access to those credentials, they cannot use them to do any harm to your data.)

To create aa new user with restrictive permissions, log into Redshift, open the database containing the Snowplow events table, and execute the following SQL:

```sql
CREATE USER storageloader PASSWORD 'mYh4RDp4ssW0rD';
GRANT USAGE ON SCHEMA atomic TO storageloader;
GRANT INSERT ON TABLE "atomic"."events" TO storageloader;
```

You can set the user name and password (`storageloader` and `mYh4RDp4ssW0rD` in the example above) to your own values. Note them down: you will need them when you come to setup the storageLoader in the next phase of the your Snowplow setup.

<a name="etl" />
## 6. Generating Redshift-format data from Snowplow

Assuming you are working through the setup guide sequentially, you will have already  ([setup EmrEtlRunner] [emr-etl-runner]). You should therefore have Snowplow events in S3, ready for uploading into Redshift.

If you have not already [setup EmrEtlRunner] [emr-etl-runner], then please do so now, before proceeding onto the [next stage](#load).

<a name="load" />
## 7. Automating the loading of Snowplow data into Redshift

Now that you have your Snowplow database and table setup on Redshift, you are ready to [setup the StorageLoader to regularly upload Snowplow data into the table] [storage-loader]. Click [here] [storage-loader] for step-by-step instructions on how.

[Back to top](#top).


[emr-etl-runner]: 1-Installing-EmrEtlRunner
[storage-loader]: 1-Installing-the-StorageLoader
[sql-workbench-tutorial]: http://docs.aws.amazon.com/redshift/latest/gsg/getting-started.html
[redshift-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/redshift-storage/sql/table-def.sql
                      