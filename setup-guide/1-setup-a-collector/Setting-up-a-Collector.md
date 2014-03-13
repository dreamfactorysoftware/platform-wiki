<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [Step 1: setup a Collector](Setting-up-a-collector)

[[https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/2-collectors.png]]

The Snowplow collector receives data from Snowplow trackers and logs that data to S3 for storage and further processing. Setting up a collector is the first step in the Snowplow setup process.

1. [Choose a Collector](#choose)
2. [Setup a Collector](#setup)

<a name="choose" />
## 1. Choose a Collector 

There are currently three collectors available:

| **Collector**                                  | **Description**                                     | **Status**       |
|:-----------------------------------------------|:----------------------------------------------------|:-----------------|
| [Cloudfront Collector] [cloudfront-collector]  | A simple, robust and scalable collector powered by AWS Cloudfront | Production-ready |
| [Clojure Collector] [clojure-collector]        | A Clojure-based collector that enables user tracking across domains. Powered by Amazon Elastic Beanstalk | Production-ready |
| [Scala Stream Collector] [scala-stream-collector]        | A Scala-based collector that enables user tracking across domains. Powered by Amazon Kinesis | Beta |

### Are you setting up Snowplow to track users across a single domain, or multiple domains?

If you are tracking users across a single domain, we recommend setting up the [Cloudfront collector] [cloudfront-collector]. 

If you are tracking users across multiple domains, we recommending setting up the [Clojure collector] [clojure-collector] or [Scala Stream Collector] [scala-stream-collector]. This sets `user_id`s server side, so you can reliably track user journeys across multiple domains. (In contrast, the [Cloudfront collector] [cloudfront-collector] sets them client side, so users get assigned different `user_id`s on different domains.)

### Do you want to experiment with real-time event analytics?

Then check out the [Scala Stream Collector] [scala-stream-collector] - but please note that this collector is **still in beta**.

<a name="setup" />
## 2. Setup your Collector

1. [Setup the Cloudfront Collector now!] [cloudfront-collector]
2. [Setup the Clojure Collector now!] [clojure-collector]
3. [Setup the Scala Stream Collector now!] [scala-stream-collector]

Setup your collector? Then proceed to [step 2: setup a tracker] [tracker-setup].

[Return to the setup guide] [setup-guide].

[cloudfront-collector]: Setting-up-the-Cloudfront-collector
[clojure-collector]: Setting-up-the-Clojure-collector
[scala-stream-collector]: Setting-up-the-Scala-stream-Collector
[setup-guide]: Setting-up-Snowplow
[tracker-setup]: Setting-up-Snowplow#wiki-step2
[emretlrunner]: Setting-up-Snowplow#wiki-step3
