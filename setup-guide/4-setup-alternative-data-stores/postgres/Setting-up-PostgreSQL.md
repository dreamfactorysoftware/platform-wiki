<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > Setup PostgreSQL

## Contents

1. [Setting up PostgreSQL on a EC2 instance](#ec2)
2. [Setting up PostgreSQL on Debian / Ubuntu](#debian)
3. [Creating the Snowplow events table in PostgreSQL](#events-table)
4. [Next steps](#next-steps)

<a name="ec2" />
## 1. Setting up PostgreSQL on EC2

**Note**: We recommend running all Snowplow AWS operations through an IAM user with the bare minimum permissions required to run Snowplow. Please see our [IAM user setup page](IAM-setup) for more information on doing this.

<a name="1.1" />
### 1.1 Setup an EC2 instance to run PostgreSQL server

If you do not have a server / EC2 instance already available to run PostgreSQL, you will need to create one. (If you do have one, skip to the next step, [installing PostgreSQL](#1.2)). 

Log into the AWS console, navigate to the EC2 section: 

[[/setup-guide/images/postgresql/aws-ec2-console.png]]

Press the **Launch Instance** button. Select the **Quick Launch Wizard**:

[[/setup-guide/images/postgresql/ec2-quick-launch-wizard.png]]

Either create a new security key pair, or create and download a new key pair. If you have downloaded a new key pair (in the form of a `.pem` file), you will need to make sure it is not publically viewable, by executing the following at the command line:

	$ chmod 400 $key-pair-name.pem

Choose to launch an **Amazon Linux AMI** instance, and press the **Continue** button.

[[/setup-guide/images/postgresql/create-new-instance-dialogue.png]]

Give your instance a name. Select a suitable instance type. (Note: if you are running a high traffic site, it makes sense to run a powerful instance e.g. one of the `xlarge` series.)

[[/setup-guide/images/postgresql/amazon-linux-ami.png]]

Click on the **Continue** button:

[[/setup-guide/images/postgresql/create-new-instance.png]]

There are a number of important options here that are worth highlighting: exactly which you select will depend on your business:

#### Instance type

Amazon offers a range of instances, with different costs and different configurations. Depending on your the number of events you expect to be tracking per day, it may make sense to select a larger, more powerful instance. Bear in mind though that these cost more.

#### Security settings

We recommend that you create a new security group for your PostgreSQL instance. To do this, select **Create new Security Group**:

[[/setup-guide/images/postgresql/create-security-group.png]]

Enter a group name and click **Create**. Now add two rules, one enabling SSH access from `0.0.0.0/0`, and a custom rule to enable access on PostgreSQL 5432 port:

[[/setup-guide/images/postgresql/security-settings.png]]

Click **Save**.

#### Launch your instance

When you are happy with the settings, click **Launch**. Note that in the example below, we are using a `t1.micro` instance for testing purposes.

<a name="1.2" />
### 1.2 Install PostgreSQL

#### 1.2.1 SSH into your EC2 instance

To install PostgreSQL, you need to SSH into the instance that you want to setup PostgreSQL on, and install Postres. In this tutorial, we're going to connect via a standalone SSH client, but you can also connect through the web browser.(For full instructions on the different connection options, see the [Amazon guide][amazon-emr-guide].)

To do that, go into the EC2 section of the AWS dashboard. Click on **Instances** link on the left hand menu. Right click on the instance you want to setup PostgreSQL on and click **Connect**. In the dialogue box that appears, open the drop down to **Connect with a standalone SSH Client**:

[[/setup-guide/images/postgresql/connect-with-standalone-ssh-client.png]]

Copy the text that Amazon instructs you to enter at the command line to SSH into the instance. Then paste it into the command line. In our case, that text is:

	$ ssh -i postgres-test.pem ec2-user@ec2-54-246-27-243.eu-west-1.compute.amazonaws.com

You should see something like this:

	$ ssh -i postgres-test.pem ec2-user@ec2-54-246-27-243.eu-west-1.compute.amazonaws.com
	The authenticity of host 'ec2-54-246-27-243.eu-west-1.compute.amazonaws.com (54.246.27.243)' can't be established.
	RSA key fingerprint is 55:88:a8:9e:7d:fe:d1:23:8f:d3:15:06:d7:c5:29:19.
	Are you sure you want to continue connecting (yes/no)? yes
	Warning: Permanently added 'ec2-54-246-27-243.eu-west-1.compute.amazonaws.com,54.246.27.243' (RSA) to the list of known hosts.

	       __|  __|_  )
	       _|  (     /   Amazon Linux AMI
	      ___|\___|___|

	https://aws.amazon.com/amazon-linux-ami/2013.03-release-notes/
	There are 6 security update(s) out of 11 total update(s) available
	Run "sudo yum update" to apply all updates.
	[ec2-user@ip-10-34-176-225 ~]$ 


#### 1.2.2 Download and install PostgreSQL on the instance

Amazon helpfully keeps a range of packages including PostgreSQL in repos so that EC2 users can install them directly, using `yum`. To install PostgreSQL from one of these repos, enter the following at the command line:

	$ sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs

Initialize a database:

	$ sudo service postgresql initdb

Then edit your `pg_hba.conf` file:

	$ sudo vim /var/lib/pgsql9/data/pg_hba.conf

Update the bottom of the file, which will read something like this, by default:

	# TYPE  DATABASE        USER            ADDRESS                 METHOD

	# "local" is for Unix domain socket connections only
	local   all             all                                     ident
	# IPv4 local connections:
	host    all             all             127.0.0.1/32            ident
	# IPv6 local connections:
	host    all             all             ::1/128                 ident

To read this:

	# TYPE  DATABASE        USER            ADDRESS                 METHOD

	# "local" is for Unix domain socket connections only
	local   all             all                                     trust
	# IPv4 local connections:
	host    all             power_user      0.0.0.0/0               md5
	host    all             other_user      0.0.0.0/0               md5
	# IPv6 local connections:
	host    all             all             ::1/128                 md5

Now that we've updated the authorization settings, we need to update PostgreSQL to enable remote connections to the database. At the command line enter:

	$ sudo vim /var/lib/pgsql9/data/postgresql.conf

Uncomment line 59:

	#listen_addresses = 'localhost'          # what IP address(es) to listen on;

And update the line to enable connections from any IP address:

	listen_address='*'

And uncomment line 63:

	#port = 5432

So it reads

	port = 5432

Now start the server:

	$ sudo service postgresql start

Log into the server:

	$ psql -U postgres

And add a password for your PostgreSQL admin:

	ALTER USER postgres WITH PASSWORD '$password';

Now we need to create user credentials for *power users*. These users will be able to perform any action on the database:

	CREATE USER power_user SUPERUSER;
	ALTER USER power_user WITH PASSWORD '$poweruserpassword';
	CREATE USER other_user NOSUPERUSER;
	ALTER USER other_user WITH PASSWORD '$otheruserpassword';
	CREATE DATABASE snowplow WITH OWNER other_user;

We can now exit from Postgres with `\q`. Setup is complete: we are ready to connect to our database remotely.

#### 1.2.3 Connect to your PostgreSQL instance remotely

Now that we have PostgreSQL up and running on our EC2 instance, we are in a position to connect from a remote computer using a PostgreSQL client. We'll be using Navicat in this tutorial, but any PostgreSQL compatible client (there are 100s) should work in a similar way.

Fire up Navicat, and under **Connection** select **PostgreSQL**. A dialogue box appears, enabling us to enter details to connect to PostgreSQL:

[[/setup-guide/images/postgresql/navicat-1.png]]

Give the connection a suitable name. You can identify the EC2 public IP address (to enter in the **Host name/IP Address** field, by clicking on the instance in the AWS console and scrolling down in the properties section to **Public DNS**:

[[/setup-guide/images/postgresql/navicat-2.png]]

Copy and paste the value (in our case) `ec2-54-216-22-100.eu-west-1.compute.amazonaws.com` into the host field in Navicat.

Select either the username `power_user` and associated password you created in the previous step, or `other_user`. (Depending on the permissions you wish to grant.)

[[/setup-guide/images/postgresql/navicat-3.png]]

You should now be able to either test the connection or click **OK** to save the connection. You can then double click it to go into the database.

Back to [top](#top).

<a name="debian" />
## 2. Setting up PostgreSQL on Debian / Ubuntu

TO WRITE

Back to [top](#top).

<a name="events-table" />
## 3. Create the Snowplow events table in PostgreSQL

Fire up your PostgreSQL client (e.g. Navicat), and double click on the PostgreSQL database you've setup, and the Snowplow database within it.

Enter the two SQL queries given in the [PostgreSQL table definition] [postgresql-table-def]. Those queries are printed below for convenience:

```sql
CREATE TABLE "atomic"."events" (
	-- App
	"app_id" varchar(255),
	"platform" varchar(255),
	-- Date/time
	"collector_tstamp" timestamp NOT NULL,
	"dvce_tstamp" timestamp,
	-- Date/time
	"event" varchar(128) NOT NULL,
	"event_vendor" varchar(128),
	"event_id" varchar(38) NOT NULL,
	"txn_id" integer,
	-- Versioning
	"v_tracker" varchar(100),
	"v_collector" varchar(100) NOT NULL,
	"v_etl" varchar(100) NOT NULL,
	-- User and visit
	"user_id" varchar(255),
	"user_ipaddress" varchar(19),
	"user_fingerprint" varchar(50),
	"domain_userid" varchar(16),
	"domain_sessionidx" smallint,
	"network_userid" varchar(38),
	-- Location
	"geo_country" char(2),
	"geo_region" char(2),
	"geo_city" varchar(75),
	"geo_zipcode" varchar(15),
	"geo_latitude" double precision,
	"geo_longitude" double precision,
	-- Page
	"page_title" varchar(2000),
	-- Page URL components
	"page_urlscheme" varchar(16),
	"page_urlhost" varchar(255),
	"page_urlport" integer,
	"page_urlpath" varchar(1000),
	"page_urlquery" varchar(3000),
	"page_urlfragment" varchar(255),
	-- Referrer URL components
	"refr_urlscheme" varchar(16),
	"refr_urlhost" varchar(255),
	"refr_urlport" integer,
	"refr_urlpath" varchar(1000),
	"refr_urlquery" varchar(3000),
	"refr_urlfragment" varchar(255),
	-- Referrer details
	"refr_medium" varchar(25),
	"refr_source" varchar(50),
	"refr_term" varchar(255),
	-- Marketing
	"mkt_medium" varchar(255),
	"mkt_source" varchar(255),
	"mkt_term" varchar(255),
	"mkt_content" varchar(500),
	"mkt_campaign" varchar(255),
	-- Custom structured event
	"se_category" varchar(255),
	"se_action" varchar(255),
	"se_property" varchar(255),
	"se_value" double precision,
	-- Ecommerce
	"tr_orderid" varchar(255),
	"tr_affiliation" varchar(255),
	"tr_total" decimal(18,2),
	"tr_tax" decimal(18,2),
	"tr_shipping" decimal(18,2),
	"tr_city" varchar(255),
	"tr_state" varchar(255),
	"tr_country" varchar(255),
	"ti_orderid" varchar(255),
	"ti_sku" varchar(255),
	"ti_name" varchar(255),
	"ti_category" varchar(255),
	"ti_price" decimal(18,2),
	"ti_quantity" integer,
	-- Page ping
	"pp_xoffset_min" integer,
	"pp_xoffset_max" integer,
	"pp_yoffset_min" integer,
	"pp_yoffset_max" integer,
	-- User Agent
	"useragent" varchar(1000),
	-- Browser
	"br_name" varchar(50),
	"br_family" varchar(50),
	"br_version" varchar(50),
	"br_type" varchar(50),
	"br_renderengine" varchar(50),
	"br_lang" varchar(255),
	"br_features_pdf" boolean,
	"br_features_flash" boolean,
	"br_features_java" boolean,
	"br_features_director" boolean,
	"br_features_quicktime" boolean,
	"br_features_realplayer" boolean,
	"br_features_windowsmedia" boolean,
	"br_features_gears" boolean,
	"br_features_silverlight" boolean,
	"br_cookies" boolean,
	"br_colordepth" varchar(12),
	"br_viewwidth" integer,
	"br_viewheight" integer,
	-- Operating System
	"os_name" varchar(50),
	"os_family" varchar(50),
	"os_manufacturer" varchar(50),
	"os_timezone" varchar(50),
	-- Device/Hardware
	"dvce_type" varchar(50),
	"dvce_ismobile" boolean,
	"dvce_screenwidth" integer,
	"dvce_screenheight" integer,
	-- Document
	"doc_charset" varchar(128),
	"doc_width" integer,
	"doc_height" integer,
	PRIMARY KEY ("event_id")
)
WITH (OIDS=FALSE)
;
```

Back to [top](#top).

<a name="next-steps" />

Now you have setup PostgreSQL, you area ready to [setup the StorageLoader][setup-storageloader] to automate the regular loading of Snowplow data into the PostgreSQL events table.

[amazon-emr-guide]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
[setup-storageloader]: 1-Installing-the-StorageLoader
[postgresql-table-def]: https://github.com/snowplow/snowplow/blob/feature/pg-support/4-storage/postgres-storage/sql/table-def.sql