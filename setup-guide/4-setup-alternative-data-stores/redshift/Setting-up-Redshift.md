<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > [Setting up Infobright to work with SnowPlow] (Setting-up-Infobright)

Setting up Redshift is an X step process:

1. [Launch a cluster](#launch)
2. [Enabling client connections to your cluster](#client-connections)
2. [Setting up the SnowPlow database and events table](#db)
3. [Automating the loading of SnowPlow data into Redshift](#load)

<a name="launch" />
## 1. Launch a Redshift Cluster

Go into the Amazon webservices console and select "Redshift" from the list of services.

![welcome-to-amazon-redshift][image-1]

Click on the "Launch Cluster" button:

![define-cluster][image-2]

Enter suitable values for the cluster identifier, database name, port, username and password. Click the "Continue" button.

![configure-cluster][image-3]

We now need to configure the cluster size. Select the values that are most appropriate to your situation. We generally recommend starting with a single node cluster with node type `dw.hs1.xlarge`, and then adding nodes as your data volumes grow.

You now have the opportunity to encrypt the database and and set the availability zone if you wish. Select your preferences and click "Continue".

![configure-cluster][image-4]

Amazon summarises your cluster information. Click "Launch Cluster" to fire your Redshift instance up. This will take a few minutes to complete.

<a name="client-connections" />
## 2. Enabling client connections to your cluster

There are two ways clients can connect to your Redshift cluster:

2.1 [Direct connections](#direct)
2.2 [SSL connections](#ssl)

<a name="direct" />
### 2.1 Direct connections

<a name="ssl" />
### 2.2 SSL connections

<a name="db" />
## 3. Setting up the SnowPlow database and events table

<a name="load" />
## 4. Automating the loading of SnowPlow data into Redshift

Now that you have your SnowPlow database and table setup on Redshift, you are ready to [setup the StorageLoader to regularly upload SnowPlow data into the table] [storage-loader]. Click [here] [storage-loader] for step-by-step instructions on how.

[Back to top](#top).

[image-1]: /images/redshift-setup-guide/1.png
[image-2]: /images/redshift-setup-guide/2.png
[image-3]: /images/redshift-setup-guide/3.png
[image-4]: /images/redshift-setup-guide/4.png
[storage-loader]: 1-Installing-the-StorageLoader