[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 4: setting up alternative data stores**](Setting-up-alternative-data-stores) > [**Using the StorageLoader**](2-Using-the-StorageLoader)

1. [Overview](#usage-overview)
2. [Command-line options](#cli-options)
3. [Running](#running)
4. [Troubleshooting](#troubleshooting)
5. [Next steps](#next-steps)

<a name="usage-overview"/>
## 1. Overview

Running the StorageLoader is very straightforward - please review the
command-line options in the next section. 

<a name="cli-options"/>
## 2. Command-line options

Invoke StorageLoader using Bundler's `bundle exec` syntax:

    $ bundle exec bin/snowplow-storage-loader
    
Note the `bin/` sub-folder, and that the `bundle exec` command will
only work when you are inside the `storage-loader` folder.

The command-line options for StorageLoader look like this:

    Usage: snowplow-storage-loader [options]

    Specific options:
        -c, --config CONFIG              configuration file
        -s, --skip download,load,archive skip work step(s)

    Common options:
        -h, --help                       Show this message
        -v, --version                    Show version

A note on the `--skip` option: this skips the work steps listed. So
for example `--skip download,load` would only run the final archive
step. This is useful if you have an error in your load and need to
re-run only part of it.

<a name="running"/>
## 3. Running

As per the above, running StorageLoader is a matter of populating
your configuration file, let's call it `my-config.yml` for this
example, and then invoking StorageLoader like so: 

    $ bundle exec snowplow-storage-loader --config my-config.yml

<a name="troubleshooting" />
## 4. Troubleshooting

### locate command missing

StorageLoader depends on SnowPlow's [Infobright Ruby Loader] [irl],
which in turn uses the `locate` shell command. If your shell complains
that this is missing, in which case you can install it separately.

To install and configure `locate` on Debian/Ubuntu:

    $ sudo apt-get install mlocate
    $ sudo updatedb

<a name="next-steps" />
## Next steps

All done? Then [schedule the StorageLoader](3-Scheduling-the-StorageLoader) to regularly migrate new data into your data store (e.g. Infobright or Redshift).