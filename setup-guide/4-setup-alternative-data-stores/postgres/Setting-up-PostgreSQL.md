<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > Setup PostgreSQL

## Contents

1. [Setting up PostgreSQL on a EC2 instance](#ec2)
2. [Setting up PostgreSQL on Ubuntu](#ubuntu)


<a name="ec2" />
## 1. Setting up PostgreSQL on EC2

<a name="1.1" />
### 1.1 Setup an EC2 instance to run PostgreSQL server

If you do not have a server / EC2 instance already available to run PostgreSQL, you will need to create one. (If you do have one, skip to the next step, [installing PostgreSQL](#1.2)). 

Log into the AWS console, navigate to the EC2 section: 

[[/setup-guide/images/postgresql/aws-ec2-console.png]]

Press the **Launch Instance button**. Select the **Quick Launch Wizard**:

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

We will create a new user 'postgres':

	$ sudo adduser postgres
	$ sudo su
	$ passwd postgres

Now switch to the postgres user:
	
	# Do we also need this line:
	$ sudo su -
	$ su - postgres

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

To read this:

	# TYPE  DATABASE        USER            ADDRESS                 METHOD

	# "local" is for Unix domain socket connections only
	local   all             all                                     trust
	# IPv4 local connections:
	host    all             power_user      0.0.0.0/0               md5
	host    all             other_user      0.0.0.0/0               md5

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

You can log in to the server:

	$ psql -U postgres

And add a password for your PostgreSQL super user:

	ALTER USER postgres WITH PASSWORD '$password';

Now we need to create user credentials for *power users*. These users will be able to perform any action on the database:

	$ /usr/pgsql9/bin/createuser power_user

#### 1.2.3 Connect to your PostgreSQL instance remotely




[amazon-emr-guide]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html