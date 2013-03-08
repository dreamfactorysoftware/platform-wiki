[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow > [**Step 5: Get started analysing SnowPlow data**](Getting-started-analysing-SnowPlow-data) > [Setting up ChartIO](Setting-up-ChartIO-to-visualise-your-data-in-Infobright)

<a name="top" />
## Contents

1. [What is ChartIO, and why use it to analyse / visualize SnowPlow data](#what-and-why)
2. [Setting up a ChartIO account](#setup)
3. [Connecting ChartIO to SnowPlow data in Redshift](#redshift)
4. [Connecting ChartIO to SnowPlow data in Infobright](#infobright)
5. [Creating your first SnowPlow dashboard in ChartIO](#1st-dashboard)
6. [Next steps](#next-steps)

<a name="what-and-why" />
## 1. What is ChartIO, and why use it to analyse / visualize SnowPlow data?

[ChartIO] [ChartIO] is a fantastic BI tool that has a number of attractive features, especially for people who want to graph SnowPlow data sources quickly:

1. It is very simple and straightforward to setup and use. Most BI tools require users to invest in formatting data in their data warehouse in a specific way and / or configuring the way the data from a warehouse is ingested by the BI tool, so that the BI tool knows how to present the data to users via its UI. ChartIO takes a much simpler approach: it lets users query underlying data sources directly (by explicitly entering SQL commands) and then graph the results directly via a web UI. No fiddling around with any metadata editors required.
2. It is a SaaS solution, so minimal software to setup and install.
3. It is secure, using SSH to establish a secure connection between SnowPlow data and the ChartIO webapp.

[Back to top](#top)

<a name="setup" />
## 2. Setting up a ChartIO account

1. Go to the [ChartIO website] [ChartIO], and setup a trial account by clicking the [Try it Free] [trial] button on the homepage. Enter an email address and password to sign up.

2. Enter a company name and project name in the next screen, then select 'Create Project'.

Now, if your SnowPlow data is in [Redshift](#redshift), read on. If your SnowPlow data is in [Infobright](#infobright), proceed to [section 4](#infobright).

<a name="redshift" />
## 3. Connecting ChartIO to SnowPlow data in Redshift

### 3.1 Create a read-only user in Redshift

Before you setup your connection between ChartIO and Redshift, we recommend that you create a `read-only` user in Redshift. We'll then use these credentials to establish the connection.

To create a read only user, login to Redshift using your preferred SQL client (you can use `psql`) using super-user account details (the ones you created with your cluster). E.g. if you're using `psql`, you'd enter something like the following (changing the host and database name as appropriate.)

	 psql -d snowplow -h snowplow.cjbccnwghslt.us-east-1.redshift.amazonaws.com -p 5439 -U admin

Now create your read only user:

	CREATE USER mydbuser_ro PASSWORD 'my-password-inc-one-capital-at-least-8-chars' NOCREATEDB;

Now grant permissions to that user so he / she can read the relevant tables:

	GRANT USGAE ON SCHEMA public TO mydbuser_ro;
	GRANT SELECT ON events_008 TO mydbuser_ro;

Note: if there are other tables the user needs to access, you should grant select permission to those as well.

### 3.2 White label ChartIO's inbound IP in your Redshift security group

Amazon Redshift will only allow clients on whitelisted IP addresses to connect.

To whitelist the ChartIO IP address, log into your AWS console and navigate into Redshift.

Click on the "Security Groups" option on the left hand menu and select your security group. (This is normally 'default'). Amazon gives you the option to add a new connection type: select "CIDR/IP" from the drop down and then enter the ChartIO IP address `173.203.96.249/32`. Click the "add": you should see a screen like the one below, with the ChartIO IP address listed as one of the options. (In our case, it is the one at the top.)

[[/setup-guide/images/chartio/redshift-1.png]]

### 3.3 Setup the connection in ChartIO

Log in to ChartIO. Click on the 'Settings' menu on the top right of the screen, and select '+ New Data Source'. 

You will be presented with a selection of databases - select PostgreSQL.

ChartIO will ask if you want to setup a Tunnel Connection or Direct Connection. Select 'Use Direct Connection Method'.

Enter your Redshift credentials as appropriate: use the endpoint for 'Host'. Don't forget to update the port number (Redshift is 5439 by default, not PostgreSQL's 5432). Use the read only username and password you created in step 3.1. Please make sure you **uncheck the 'Connect using SSL' checkbox**:

[[/setup-guide/images/chartio/redshift-2.PNG]]

Click 'Test Connection and Save'. Your connection should be setup! Proceed to [step 5: creating your first SnowPlow dashboard in ChartIO](#1st-dashboard).


<a name="infobright" />
## 4. Connecting ChartIO to SnowPlow data in Infobright

We now need to create a connection between ChartIO and SnowPlow data, stored on Infobright. To establish a connection, we use the fact that Infobright is a fork of MySQL, and so ChartIO can connect to Infobright as it would to MySQL.

With that in mind click on the **MySQL** button in the ChartIO UI. We recommend using the 'Tunnel Connection Method'. Select this button: ChartIO displays a page with instructions on how to setup a connection server-side. We repeat the instructions below, but make them SnowPlow specific:

SSH into your server running Infobright. You need to install ChartIO onto this server. If you have `pip`, simply execute:

	$ sudo pip install chartio

at the command line to install ChartIO. Alternatively if you have `easy_install`:

	$ sudo easy_install chartio

If you have neither you can download chartio manually:

	$ wget https://chartio.com/static/src/chartio-1.1.19.tar.gz

then decompress the download:

	$ tar xvzf chartio-1.1.19.tar.gz

and then install it:

	$ cd chartio-1.1.19
	$ sudo python setup.py install

Before we run the `chartio_setup` to establish the connection we need to ensure that we have MySQL installed on the server. (Because `chartio_setup` uses `mysql` rather than `mysql-ib` to establish the connection.) To check if you have MySQL installed (as well as Infobright), run 

	$ which mysql

If you get back the path to MySQL you have MySQL and can skip to the next step. (E.g. `/usr/bin/mysql`.) If you do not get back a path, you'll need to install MySQL by executing the following command:

	$ sudo apt-get install mysql-server mysql-client libmysqlclient-dev

Now run `chartio_setup` at the command line:

	`chartio_setup`

The setup wizard will prompt you to select a type of database to connect to. Enter `1` for MySQL.

The setup wizard will prompt you to enter a port number for the database. Enter `5029`. (The default port for Infobright.)

When prompted to enter the database name to connect to, you can leave this option blank. (ChartIO will later list all the databases available so you can select the one you use for SnowPlow.)

When prompted, enter your database administrator name and password. ChartIO will use this to log onto your database, create a user with read only access to your SnowPlow data, and make that user the one for whom an SSH connection is established to the ChartIO webapp.

ChartIO should now list all the databases on Infobright. Select the one you use for SnowPlow.

When prompted to enter an existing read-only role, leave blank. (So ChartIO creates a new role.)

You should see something like the following displayed:

	Enter an existing read-only role for Chartio to use
	    [Leave blank to create a new role automatically]
	Read-only role name: 
	==> Creating read-only user 'chartio_pbz305'
	==> Finished configuring database information
	==> Launching chartio_connect
	chartio_connect daemonized as process 25762
	==> chartio_connect running
	==> Registering datasource with Chartio. This will take a moment.
	==> Datasource registered. chartio_connect is running.

When prompted whether you would 'like a crontab entry added to reconnect to Chartio on reboot? [y/n]:` select 'Y'. You should see something as follows, to indicate that the connection has been setup successfully:

	Visit your dashboard at
	  https://chart.io/project/6431/dash/

Now go back to your ChartIO in your browser. Select 'Dashboards' on the top menu screen and then select '+Chart' on the left hand menu. The name of the database you created a connection to should be displayed under 'Chart creator'. (In the example below, the name of the database is 'pbz' and it contains tables named 'Cube', 'Cube With Att Data', 'Demo cube', 'Events', 'Events 003', 'Events 004', 'Events with Att Data' and 'Prestashop Catalogue Data'. It is likely you will only have one 'Events XXX' table, where 'XXX' refers to the version of the SnowPlow events table you are using.)

[[/setup-guide/images/chartio/1.png]]

[Back to top](#top)

<a name="1st-dashboard" />
## 5. Creating your first SnowPlow dashboard in ChartIO

Now that we have a data connection setup between SnowPlow and ChartIO, we can start graphing SnowPlow data. ChartIO makes this very easy. To demonstrate, we'll create a graph that shows the number of unique visitors and visits to our website in the last 4 weeks:

(a) Select the table with the SnowPlow events data in it. (In our case, 'Events 004'.) A list of all the columns in our table is displayed as below, divided between 'Measures' and 'Dimensions':

[[/setup-guide/images/chartio/2.png]]

(b) Select the 'query mode'. (The 'query mode' hyperlink is in the 'Layer 1' shaded box.) ChartIO gives you the opportunity to enter a SQL query:

[[/setup-guide/images/chartio/3.png]]

(c) Enter the following query (adjust the table name from 'event_004' to reflect the name / version of your SnowPlow table):

	SELECT
	collector_dt,
	COUNT( DISTINCT (user_id)) AS uniques
	FROM events_004
	GROUP BY dt
	ORDER BY dt DESC LIMIT 28 ;

[[/setup-guide/images/chartio/4.png]]

(d) Click the chart query button at the bottom of the screen. A table of results is returned:

[[/setup-guide/images/chartio/5.png]]

(e) Select the line graph icon to create a line graph:

[[/setup-guide/images/chartio/6.png]]

(f) Now we have a line graph of the number of uniques for the last 28 days - let's add a second line with the number of visits, to overlay on the same graph. Scroll down the page and select '+ New Layer':

[[/setup-guide/images/chartio/7.png]]

(g) Once again, select 'Query mode' for the new layer and enter the following query:

	SELECT
	collector_dt,
	COUNT( DISTINCT (CONCAT(user_id,'-',visit_id)) ) AS visits
	FROM events_004
	GROUP BY dt
	ORDER BY dt DESC LIMIT 28 ;

(h) Select 'Chart Query'. Bingo! Our graph is created, with both lines:

[[/setup-guide/images/chartio/8.png]]

(i) Now we need to tidy things up a little bit. Let's rename the 'Chart Title' by hovering next to it and selecting the 'edit' hyperlink that appears. Call it something more useful like 'Uniques and visits, last 28 days'.

(j) In the same way rename 'Layer 1' to 'uniques' and 'Layer 2' to 'visits':

[[/setup-guide/images/chartio/9.png]]

(h) Our chart is ready! Now we can embed it in a dashboard by clicking 'Save to My First Dashboard'

(i) ChartIO let's us drag the ChartIO around the new dashboard. We can now create new charts in exactly the same way, save them to the same dashboard, and arrange them by simply dragging and dropping them!

[Back to top](#top)

<a name="next-steps" />
## 4. Next steps

Up and running with ChartIO on top of SnowPlow? Visit the [Analyst Cookbook][analyst-cookbook] to find out about more ways to drive value from SnowPlow data.

Return to [getting started analysing your SnowPlow data](Getting-started-analysing-SnowPlow-data).

Return to the [setup guide](Setting-up-SnowPlow#wiki-step5).


[trial]: https://chartio.com/users/signup/
[ChartIO]: http://chartio.com/
[analyst-cookbook]: http://snowplowanalytics.com/analytics/index.html