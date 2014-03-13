This is a page of hints, tips and explanations to help you work with Snowplow. If something looks like a bug in Snowplow but isn't, it will end up on this page too.

1. [EmrEtlRunner failed. What do I do now?](#etl-failure)
2. [Why are browser features missing in IE?](#ie-features)
3. [Hive problem: I upgraded and now queries are not working](#non-hive-format-upgrade)
4. [I need to recreate my table of Snowplow events, how?](#rebuild-database)
5. [I want to recompute my Snowplow events, how?](#recompute-events)
6. [My database load process died during an S3 file copy, help!](#s3-filecopy)

<a name="etl-failure"/>
### EmrEtlRunner failed. What do I do now?

EmrEtlRunner has three different ways of failing:

1. The ETL job on Elastic MapReduce fails to start
2. The ETL job starts on Elastic MapReduce but errors part way through
3. One or more S3 file copy operations fail

For help diagnosing and fixing these problems, please see our dedicated [[Troubleshooting jobs on Elastic MapReduce]] wiki page.

<a name="ie-features"/>
### Why are browser features all recorded as null for Internet Explorer?

With the exception of cookies and Java, our JavaScript tracker cannot detect what browser features (PDF, Flash etc) a given instance of Internet Explorer has. This is because IE, unlike the other major browsers, does not populate the `window.navigator.mimeTypes[]` and `navigator.plugins[]` properties.

There are other ways of detecting some browser features (via ActiveX), but these are not advised as they can trigger UAC warnings on Windows.

<a name="non-hive-format-upgrade"/>
### Hive problem: I upgraded and now queries are not working or returning nonsense results

The most likely reason for this is that you have configured your ETL process to output your Snowplow event files in the **non-Hive format** (used to feed Infobright etc). This is typically configured with the following configuration option to EmrEtlRunner:

```yaml
:etl:
    :storage_format: non-hive
```

Unlike the Hive format output, the non-Hive format output for Snowplow event files is **not backwards compatible** for Hive queries. In other words, with the non-Hive format, running a HiveQL query across Snowplow event files generated by two different versions of the ETL process will probably not work.

The solution is to re-run the ETL process across all of your raw Snowplow logs when you upgrade your ETL process.

<a name="rebuild-database"/>
###  I need to recreate my table of Snowplow events, how?

If you have somehow lost or corrupted your Snowplow event store (in Infobright or Redshift), don't panic! 

Fortunately, **Snowplow does not delete any data at any stage of its processing**, so it's all available for you to restore from your archive buckets. 

Here is a simple workflow to use with StorageLoader to re-populate Infobright or Redshift with all of your events:

1. Create a new events table in your database, let's call it `events2`
2. Create a new S3 bucket, let's call it `events-archive2`
3. Edit your StorageLoader's `config.yml` file:
   * Change `:table:` to point to your `events2` table
   * Change `:in:` to point to your existing archive bucket
   * Change `:archive:` to point to your new `events-archive2` bucket
4. Rerun StorageLoader

This should load **all** of your events into your new `events2` table, archiving all events after loading into `events-archive2`.

<a name="recompute-events"/>
###  I want to recompute my Snowplow events, how?

You may well want to recompute all of your Snowplow events, for example if we release a new enrichment (such as geo-IP lookup) and you want it to be run against all of your historical data.

Fortunately, **Snowplow does not delete any data at any stage of its processing**, so the raw data is still available in your archive bucket for you to regenerate your Snowplow events from. 

Here is a simple workflow to use with EmrEtlRunner to regenerate your Snowplow events from your raw collector logs:

1. Create a new S3 bucket, let's call it `events2`
2. Create a new S3 bucket, let's call it `logs-archive2`
3. Edit your EmrEtlRunner's `config.yml` file:
   * Change `:in:` to point to your existing archive bucket
   * Change `:out:` to point to your new `events2` bucket
   * Change `:archive:` to point to your new `logs-archive2` bucket
4. Rerun EmrEtlRunner

This should load **recompute** all of your events into your new `events2` bucket, archiving all events after loading into `events-archive2`. From there you can reload your recomputed events into Infobright or Redshift using StorageLoader.

<a name="s3-filecopy"/>
###  My database load process died during an S3 file copy, help!

Occasionally Amazon S3 fails repeatedly to perform a file operation, eventually causing StorageLoader to die. When this happens, you may see "500 InternalServerErrors", reported by [Sluice] [sluice], which is the library we use to handle S3 file operations.

If this happens, you will need to rerun your StorageLoader process, using the following guidance:

If the job died during the download-to-local step, then:
  1. Delete any files in your download folder
  2. Rerun StorageLoader

If the job died during the archiving step, rerun StorageLoader with the command-line option of `--skip download,delete,load`

[sluice]: https://github.com/snowplow/sluice

[rvm]: https://rvm.io/
[rvmrc]: https://rvm.io/workflow/rvmrc/
[bundler]: https://gembundler.com

[sluice]: https://github.com/snowplow/sluice