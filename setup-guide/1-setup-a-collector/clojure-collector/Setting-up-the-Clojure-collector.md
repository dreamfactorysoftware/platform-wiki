[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [Clojure collector setup](setting-up-the-clojure-collector)

## Overview of the Clojure Collector

The Clojure collector has been designed to enable cross-domain Snowplow deployments. As such, the Clojure collector performs one key function not performed by the [Cloudfront collector](setting up the cloudfront collector): it sets the `user_id` (used to identify unique visitors) server side, so that it is possible to reliably identify the same user across domains. This differs from the [Cloudfront collector](setting up the cloudfront collector), where user IDs are set on the client side.

The Clojure collector has been designed to run on [Amazon's Elastic Beanstalk][eb]. This provides two key advantages:

1. It makes it easy to deploy the Clojure collector in a scalable way
2. It makes use of Elastic Beanstalk's built in support for saving Tomcat logs into S3. These are the logs that are processed by the Enrichment stage to generate Snowplow event data.

## Contents

Setting up the Clojure collector is a 6 step process:

1. [Download the Clojure collector WAR file, or compile it from source](Download-the-Clojure-collector-WAR-file-or-compile-it-from-source). (Required)  
2. [Create a new application in Elastic Beanstalk, and upload the WAR file into it](Create-a-new-application-in-Elastic-Beanstalk-and-upload-the-WAR-file-into-it). (Required)  
3. [Enable logging to S3](Enable logging to S3). (Required)  
4. [Enable support for HTTPS](Enable support for HTTPS). (Optional, but recommended.)  


In addition, we document [additional configuration options](additional configuration options) at the end of this guide.

**Note**: We recommend running all Snowplow AWS operations through an IAM user with the bare minimum permissions required to run Snowplow. Please see our [IAM user setup page](IAM-setup) for more information on doing this.








[eb]: http://aws.amazon.com/elasticbeanstalk/

