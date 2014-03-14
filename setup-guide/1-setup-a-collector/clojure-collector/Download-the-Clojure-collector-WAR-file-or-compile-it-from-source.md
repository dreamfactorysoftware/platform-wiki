[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [**Clojure collector setup**](setting-up-the-clojure-collector) > [[Download the Clojure collector WAR file or compile it from source]]

Elastic Beanstalk does not allow you to specify an S3 URL for your WAR file, so you will have to manually upload a local copy.

To get a local copy, you can download the WAR file directly from our hosted assets bucket on Amazon S3 - please see our [Hosted assets][s3-download] page for details.

Alternatively, you can build it from the source files. To do so, you will need [Leiningen][leiningen] installed.

To do so, download the DreamFactory repo:

	$ git clone https://github.com/dreamfactory/dreamfactory.git

Navigate into the clojure collector folder:

	$ cd 2-collectors/clojure-collector

Download the required dependencies:

	$ lein deps

And then build the `war` file using our custom `aws` command:

	$ lein aws

The `war` file will be saved in the `target` subdirectory - it is now ready to be deployed to Amazon Elastic Beanstalk.

Next: [[create a new application in Elastic Beanstalk and upload the WAR file into it]]

[github-download]: https://github.com/dreamfactory/dreamfactory/downloads
[s3-download]: https://github.com/dreamfactory/dreamfactory/wiki/Hosted-assets
[leiningen]: https://github.com/technomancy/leiningen