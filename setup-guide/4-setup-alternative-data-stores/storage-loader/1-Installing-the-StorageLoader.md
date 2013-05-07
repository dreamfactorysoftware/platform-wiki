[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > [**Installing the StorageLoader**](1-Installing-the-StorageLoader)

1. [Assumptions](#assumptions)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Next steps](#next-steps)

<a name="assumptions" />
## 1. Assumptions

This guide assumes that you have configured EmrEtlRunner to output the **non-Hive** Snowplow event format. The Hive Snowplow event format will not work with Infobright.

This guide assumes that you have administrator access to the Unix-based server (e.g. Ubuntu, OS X, Fedora) on which you installed ICE, and will install StorageLoader on the same server.

Please note that ICE can be deployed onto a Windows-based server, and in theory StorageLoader could be installed on a Windows-based server too, using the Windows Task Scheduler instead of cron, but this has not been tested or documented.

Also, note that, in theory, StorageLoader should work with [Infobright Enterprise Edition (IEE)] [iee] as well as ICE; however we have not yet tested this.

<a name="dependencies"/>
## 2. Dependencies

### 2.1 Software

To install StorageLoader, first make sure that your server has **all** of the following installed:

1. **Git** - see the [Git Installation Guide] [git-install]
2. **Ruby and RVM*** - see our [Ruby and RVM setup guide](Ruby-and-RVM-setup)

\* If you prefer, an alternative Ruby manager such as chruby or rbenv should work fine too.

<a name="s3-buckets"/>
### 2.2 S3 buckets

StorageLoader moves the Snowplow event files through three distinct S3 buckets during
the load process. These buckets are as follows:

1. **In Bucket** - contains the Snowplow event files to process
2. **Archive Bucket** - where StorageLower moves the Snowplow
   event files after successful loading

The In Bucket for StorageLoader is the same as the Out Bucket for the EmrEtlRunner -
i.e. you will already have setup this bucket.

We recommend creating a new bucket for the Archive Bucket - i.e. do **not** re-use
EmrEtlRunner's own Archive Bucket. Create the required Archive Bucket in the same
AWS region as your In Bucket.

**Important:** if you are using the StorageLoader to load your data into Redshift, you need to make sure that the location of your **In Bucket** and **Archive Bucket** are in 'us-east-1'. The reason is that currently, Amazon only offers Redshift in the 'us-east-1' region, and Redshift only supports the bulk loading of data from S3 within a region.

Right, now we can install StorageLoader.

<a name="installation"/>
## 3. Installation

First, checkout the Snowplow repository and navigate to the StorageLoader root:

    $ git clone git://github.com/snowplow/snowplow.git
    $ cd snowplow/4-storage/storage-loader

StorageLoader depends on some Postgres libraries being installed to talk to Redshift. You will need to install this first:

    $ sudo aptitude install libpq-devq

Now you are ready to install the application on your system:

    $ bundle install --deployment

Check it worked okay:

    $ bundle exec bin/snowplow-storage-loader --version
    snowplow-storage-loader 0.0.4

<a name="configuration"/>
## 4. Configuration

StorageLoader requires a YAML format configuration file to run. There is a configuration
file template available in the Snowplow GitHub repository at 
[`/4-storage/storage-loader/config/config.yml`] [config-yml]. The template looks like this:

```yaml
:aws:
  :access_key_id: ADD HERE
  :secret_access_key: ADD HERE
:s3:
  :region: ADD HERE # Note: for loading data into Redshift, your region needs to be 'us-east-1'
  :buckets:
    :in: ADD HERE # Note: for loading data into Redshfit, the bucket specified here must be located in 'us-east-1'
    :archive: ADD HERE # Note: for loading data into Redshfit, the bucket specified here must be located in 'us-east-1'
:download:
  :folder: ADD HERE # Infobright-only config option. Where to store the downloaded files. Note: only relevant for Infobright loads (not Redshift)
# Currently assumes we are loading only one target
:storage:
  :type: redshift # Or 'infobright'
  :host: ADD HERE # For Redshift, the endpoint as shown in the Redshift console. Not supported for Infobright currently
  :database: ADD HERE # Name of database 
  :port: 5439 # Typically '5439' for Redshift. Not supported for Infobright currently
  :table: events # For Redshift, or 'events_008' (or your table's current version) for Infobright
  :username: ADD HERE 
  :password: ADD HERE 
```

To take each section in turn:

#### aws

The `aws` variables should be self-explanatory - enter your AWS access
key and secret here.

#### s3

The `region` variable should hold the AWS region in which your two data
buckets (In Bucket and Archive Bucket) are located, e.g. "us-east-1"
or "eu-west-1".

**Important:** Please note that currently Redshift can only load from buckets in the US region, so you will need to put **both** your buckets in "us-east-1" if you are using Redshift.

Within the `s3` section, the `buckets` variables are as follows:

* `in` is where you specify your In Bucket
* `archive` is where you specify your Archive Bucket

Each of the bucket variables must start with an S3 protocol - either
`s3://` or `s3n://`. Each variable can include a sub-folder within the
bucket as required, and a trailing slash is optional.

**Important:** do not put your Archive Bucket location inside your In Bucket, or you will create circular references which StorageLoader cannot resolve when moving files.

The following are examples of valid bucket settings:

    :buckets:
      :in: s3n://my-snowplow-data/events/
      :archive: s3n://my-archived-snowplow-data

Please note that all buckets must exist prior to running StorageLoader.

#### download

This is where we configure the StorageLoader download operation, which
downloads the Snowplow event files from Amazon S3 to your local server, 
ready for loading into your database.

This setting is not used when loading Redshift - you can safely leave it
blank.

You will need to set the `folder` variable to a local directory path -
please make sure that this path exists, is writable by StorageLoader
and is empty.

#### storage

In this section we configure exactly what database StorageLoader should
load our Snowplow events into. At the moment, StorageLoader supports
only one load target, and this load target must be an Infobright
Community Edition database.

To take each variable in turn:

1. `type`, what type of database are we loading into? Currently the
   only supported formats are "infobright" and "redshift"
2. `host`, the host (endpoint in Redshift parlance) of the databse to
   load. Only supported for Redshift currently, leave blank for Infobright
3. `database`, the name of the database to load
4. `port`, the port of the database to load. Only supported for Redshift
   (where '5439' is the default). Leave blank for Infobright
5. `table`, the name of the database table which will store your
   Snowplow events. Must have been setup previously  
6. `username`, the database user to load your Snowplow events with.
   You can leave this blank to default to the user running the script
7. `password`, the password for the database user. Leave blank if there
   is no password

Note that the `host` and `port` options are not currently supported for
Infobright - StorageLoader assumes that the Infobright database is on the
server it is being run on, and accesses it on the standard Infobright port (5029).

<a name="next-steps" />
## 5. Next steps

All done? You have the StorageLoader installed! Now find out [how to use it](2-using-the-storageloader).

[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git
[ice]: http://www.infobright.org/
[iee]: http://www.infobright.com/Products/
[config-yml]: https://github.com/snowplow/snowplow/blob/master/4-storage/storage-loader/config/config.yml