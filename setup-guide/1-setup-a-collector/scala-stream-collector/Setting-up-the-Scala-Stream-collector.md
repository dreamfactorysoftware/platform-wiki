[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [Scala Stream collector setup](Setting-up-the-Scala-Stream-collector)

## Overview of the Scala Stream collector.

The Scala Stream collector has been designed to enable cross-domain Snowplow deployments. As such, the Scala Stream collector performs one key function not performed by the [Cloudfront collector](setting up the cloudfront collector): it sets the `user_id` (used to identify unique visitors) server side, so that it is possible to reliably identify the same user across domains.

The Scala Stream collector has been designed to utilize [Amazon Kinesis][kinesis].

## Contents

Setting up the Scala Stream collector is a 3 step process:

1. [Download the Scala Stream collector jar, or compile it from source](Download-the-Scala-Stream-collector-jar-file-or-compile-it-from-source).
2. [Configure the Scala Stream collector](Configure-the-Scala-Stream-collector)
3. [Run the Scala Stream collector](Run-the-Scala-Stream-collector)


In addition, we document [additional configuration options](additional-configuration-options) at the end of this guide.

**Note**: We recommend running all Snowplow AWS operations through an IAM user with the bare minimum permissions required to run Snowplow. Please see our [IAM user setup page](IAM-setup) for more information on doing this.


[kinesis]: http://aws.amazon.com/kinesis/
