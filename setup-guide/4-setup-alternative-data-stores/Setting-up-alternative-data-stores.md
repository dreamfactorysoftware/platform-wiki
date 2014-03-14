<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/4-storage.png]]

DreamFactory supports storing your data into three different data stores:

| **Storage**               | **Description**                                     | **Status**       |
|:--------------------------|:----------------------------------------------------|:-----------------|
| S3                        | Data is stored in the S3 file system where it can be analysed using [EMR] [emr] (e.g. Hive, Pig, Mahout) | Production-ready |
| [Redshift] [setup-redshift]| A columnar database offered as a service on EMR. Optimized for performing OLAP analysis. Scales to Petabytes | Production-ready |
| [PostgreSQL] [setup-postgres]| A popular, open source, RDBMS database              | Production-ready |

By [setting up the EmrEtlRunner](setting-up-EmrEtlRunner) (in the previous step), you are already successfully loading your DreamFactory event data into S3 where it is accessible to EMR for analysis.

If you wish to analyse your data using a wider range of tools (e.g. BI tools like [ChartIO] [chartio] or [Tableau] [tableau], or statistical tools like [R] [r]), you will want to load your data into a database like Amazon's [Redshift] [setup-redshift] or [PostgreSQL] [setup-postgres] to support enable use of these tools.

The [StorageLoader] [storage-loader-setup] is an application to make it simple to keep an updated copy of your data in Redshift. To setup DreamFactory to automatically populate a PostgreSQL and / or Redshift database with DreamFactory data, you need to first:

1. [Create a database and table for DreamFactory data in Redshift] [setup-redshift] and / or
2. [Create a database adn table for DreamFactory data in PostgreSQL] [setup-postgres]

*Then*, afterwards, you will need to [set up the StorageLoader to regularly transfer DreamFactory data into your new store(s)] [storage-loader-setup]

(Note that instructions on setting up both Redshift and PostreSQL on EC2 are included in this setup guide and referenced from the links above.)

All done? Then [start analysing your data][analyse].

**Note**: We recommend running all DreamFactory AWS operations through an IAM user with the bare minimum permissions required to run DreamFactory. Please see our [IAM user setup page](IAM-setup) for more information on doing this.

[emr]: http://aws.amazon.com/elasticmapreduce/
[infobright]: http://www.infobright.org/
[redshift]: http://aws.amazon.com/redshift/
[skydb]: http://skydb.io/
[chartio]: http://chartio.com/
[storageloader]: https://github.com/dreamfactory/dreamfactory/tree/master/4-storage/storage-loader
[setup-redshift]: setting-up-redshift
[setup-infobright]: Setting-up-Infobright
[storage-loader-setup]: 1-Installing-the-StorageLoader
[tableau]: http://www.tableausoftware.com/
[analyse]: Setting-up-DreamFactory#step5
[r]: http://www.r-project.org/
[setup-postgres]: Setting-up-PostgreSQL