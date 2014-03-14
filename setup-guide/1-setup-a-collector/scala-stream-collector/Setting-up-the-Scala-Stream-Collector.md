[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 1: setup a Collector**](Setting-up-a-Collector) > [Scala Stream Collector setup](Setting-up-the-Scala-Stream-Collector)

## Overview of the Scala Stream Collector

The Scala Stream Collector allows near-real time processing (Enrichment, Storage, Analytics) of a DreamFactory raw event stream. DreamFactory raw events can be sinked to either [Amazon Kinesis][kinesis] or to `stdout` for a custom stream collection process.

For more information on the architecture of the Scala Stream Collector, please see [[Scala Stream Collector]].

## Contents

Setting up the Scala Stream Collector is a 3 step process:

1. [[Install the Scala Stream Collector]]
2. [[Configure the Scala Stream Collector]]
3. [[Run the Scala Stream Collector]]

**Note**: We recommend running all DreamFactory AWS operations through an IAM user with the bare minimum permissions required to run DreamFactory. Please see our [IAM user setup page](IAM-setup) for more information on doing this.

[kinesis]: http://aws.amazon.com/kinesis/
