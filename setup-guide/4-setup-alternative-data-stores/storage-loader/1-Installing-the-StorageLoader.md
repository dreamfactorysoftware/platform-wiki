[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > [**Installing the StorageLoader**](1-Installing-the-StorageLoader)

1. [Assumptions](#assumptions)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Next steps](#next-steps)

<a name="assumptions" />
## 1. Assumptions

This guide assumes that you have administrator access to a Unix-based server (e.g. Ubuntu, OS X, Fedora) which you can install StorageLoader on.

<a name="dependencies"/>
## 2. Dependencies

### 2.1 Software

To install StorageLoader, first make sure that your server has **all** of the following installed:

1. **Git** - see the [Git Installation Guide] [git-install]
2. **Ruby and RVM*** - see our [Ruby and RVM setup guide](Ruby-and-RVM-setup)

\* If you prefer, an alternative Ruby manager such as chruby or rbenv should work fine too.

Also make sure that if you are loading DreamFactory events into a PostgreSQL database, then the StorageLoader **must be run on the same server running PostgreSQL**. That is because it downloads the files locally, and Postgres needs to be able to ingest the data from the local file system.

<a name="s3-buckets"/>
### 2.2 S3 buckets

StorageLoader moves the DreamFactory event files through three distinct S3 buckets during
the load process. These buckets are as follows:

1. **In Bucket** - contains the DreamFactory event files to process
2. **Archive Bucket** - where StorageLower moves the DreamFactory
   event files after successful loading

The In Bucket for StorageLoader is the same as the Out Bucket for the EmrEtlRunner -
i.e. you will already have setup this bucket.

We recommend creating a new folder for the Archive Bucket - i.e. do **not** re-use
EmrEtlRunner's own Archive Bucket. Create the required Archive Bucket in the same
AWS region as your In Bucket.

**Important:** if you are using the StorageLoader to load your data into Redshift, you need to make sure your **In Bucket** is in the same region as your Redshift cluster. The reason is that Redshift currently only supports the bulk loading of data from S3 in the same region.

Right, now we can install StorageLoader.

<a name="installation"/>
## 3. Installation

First, checkout the DreamFactory repository and navigate to the StorageLoader root:

    $ git clone git://github.com/dreamfactory/dreamfactory.git
    $ cd dreamfactory/4-storage/storage-loader

StorageLoader depends on some Postgres libraries being installed to talk to Redshift. You will need to install this first:

    $ sudo aptitude install libpq-dev

Now you are ready to install the application on your system:

    $ bundle install --deployment

Check it worked okay:

    $ bundle exec bin/dreamfactory-storage-loader --version
    dreamfactory-storage-loader 0.0.4

<a name="configuration"/>
## 4. Configuration

StorageLoader requires a YAML format configuration file to run. We provide two configuration file templates in the DreamFactory GitHub repository:

1. [`/4-storage/storage-loader/config/redshift.yml.sample`] [redshift-config-yml]
2. [`/4-storage/storage-loader/config/postgres.yml.sample`] [postgres-config-yml]

### Redshift sample configuration

The Redshift configuration template looks like this:

```yaml
:aws:
  :access_key_id: ADD HERE
  :secret_access_key: ADD HERE
:s3:
  :region: ADD HERE # S3 bucket region must be the same as Redshift cluster region
  :buckets:
    :in: ADD HERE # Must be s3:// not s3n:// for Redshift
    :archive: ADD HERE
:download:
  :folder: # Not required for Redshift
:targets:
  - :name: "My Redshift database"
    :type: redshift
    :host: ADD HERE # The endpoint as shown in the Redshift console
    :database: ADD HERE # Name of database
    :port: 5439 # Default Redshift port
    :table: atomic.events
    :username: ADD HERE
    :password: ADD HERE
    :maxerror: 1 # Stop loading on first error, or increase to permit more load errors
    :comprows: 200000 # Default for a 1 XL node cluster. Not used unless --include compupdate specified
```

### Postgres sample configuration

The Postgres configuration template looks like this:

```yaml
:aws:
  :access_key_id: ADD HERE
  :secret_access_key: ADD HERE
:s3:
  :region: ADD HERE # S3 bucket region
  :buckets:
    :in: ADD HERE
    :archive: ADD HERE
:download:
  :folder: ADD HERE # Postgres-only config option. Where to store the downloaded files
:targets:
  - :name: "My PostgreSQL database"
    :type: postgres
    :host: ADD HERE # Hostname of database server
    :database: ADD HERE # Name of database
    :port: 5432 # Default Postgres port
    :table: atomic.events
    :username: ADD HERE
    :password: ADD HERE
    :maxerror: # Not required for Postgres
    :comprows: # Not required for Postgres
```

### Populating the configuration

To take each section from the configuration templates in turn:

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

Each of the bucket variables must start with an S3 protocol - we recommend using `s3://`, as the `s3n://` protocol does not currently work with Redshift. Each variable can include a sub-folder within the
bucket as required, and a trailing slash is optional.

**Important:** do not put your Archive Bucket location inside your In Bucket, or you will create circular references which StorageLoader cannot resolve when moving files.

The following are examples of valid bucket settings:

```yaml
:buckets:
  :in: s3://my-dreamfactory-data/events/
  :archive: s3://my-dreamfactory-archive/events/
```

Please note that all buckets must exist prior to running StorageLoader.

#### download

This is where we configure the StorageLoader download operation, which
downloads the DreamFactory event files from Amazon S3 to your local server,
ready for loading into your database.

This setting is needed for Postgres, but not if you are only loading into Redshift
- you can safely leave it blank.

You will need to set the `folder` variable to a local directory path -
please make sure that:

* this path exists,
* is writable by StorageLoader
* it is empty
* the postgres user needs to be able to read **every** directory containing the folder specified. This is necessary to ensure that PostgreSQL can read the data in the folder, when it comes to ingest it

#### target

In this section we configure exactly what database(s) StorageLoader should
load our DreamFactory events into. At the moment, StorageLoader supports
only two types of load target, Redshift and Postgres, which require slightly different configurations.

To take each variable in turn:

1. `name`, enter a descriptive name for this DreamFactory storage target
2. `type`, what type of database are we loading into? Currently the
   only supported formats are "postgres" and "redshift"
3. `host`, the host (endpoint in Redshift parlance) of the databse to
   load. Only supported for Redshift currently, leave blank for Infobright
4. `database`, the name of the database to load
5. `port`, the port of the database to load. 5439 is the default Redshift
   port; 5432 is the default Postgres port
6. `table`, the name of the database table which will store your
   DreamFactory events. Must have been setup previously
7. `username`, the database user to load your DreamFactory events with.
   You can leave this blank to default to the user running the script
8. `password`, the password for the database user. Leave blank if there
   is no password
9. `maxerror`, a Redshift-specific setting governing how many load errors
   should be permitted before failing the overall load. See the
   [Redshift `COPY` documentation] [redshift-copy] for more details

Note that the `host` and `port` options are not currently supported for
Infobright - StorageLoader assumes that the Infobright database is on the
server it is being run on, and accesses it on the standard Infobright port (5029).

### Loading multiple databases

It is possible to load DreamFactory events into multiple storage targets using
StorageLoader.

Simply add additional entries under the `:targets:` section, like so:

```yaml
:targets:
  - :name: "My test PostgreSQL database"
    :type: postgres
    ...
  - :name: "My production PostgreSQL database"
    :type: postgres
    ...
  - :name: "My test Redshift database"
    :type: redshift
    ...
  - :name: "My production Redshift database"
    :type: redshift
    ...
```

<a name="next-steps" />
## 5. Next steps

All done? You have the StorageLoader installed! Now find out [how to use it](2-using-the-storageloader).

[git-install]: http://git-scm.com/book/en/Getting-Started-Installing-Git

[redshift-config-yml]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/storage-loader/config/redshift.yml.sample
[postgres-config-yml]: https://github.com/dreamfactorysoftware/dsp-core/blob/master/4-storage/storage-loader/config/postgres.yml.sample

[redshift-copy]: http://docs.aws.amazon.com/redshift/latest/dg/r_COPY.html
