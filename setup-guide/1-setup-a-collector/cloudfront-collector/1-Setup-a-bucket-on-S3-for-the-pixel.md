[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 1: setup a Collector**](Setting-up-a-collector) > [**Setup the Cloudfront collector**](setting up the cloudfront collector) > 1. Setup a bucket on S3 for the pixel

Log into your AWS account on [console.aws.amazon.com](https://console.aws.amazon.com) and select **S3** from the list of services offered. (Under **Storage & Content Delivery**.) You should be presented with a screen like the one below:

[[/setup-guide/images/cloudfront-collector-setup-guide/s3.jpg]]

We need to create a new bucket to store the 1x1 tracking pixel. To do this, simply click on the **Create Bucket** button on the top left of the screen, just under the "Buckets" title:

[[/setup-guide/images/cloudfront-collector-setup-guide/s3-create-bucket.jpg]]

Enter a name for your bucket. (Note you wont be able to use `snwplw-static` itself, as every bucket name has to be globally unique, and we have just taken this one.)

Enter a bucket name and select a region. (The choice of region is not critical as the pixel will be served using Cloudfront. However, there are some privacy implications, especially for companies in the EU, that may mean you wish to select **Ireland** as your location: see [a note on privacy](#privacy) below).

**Do not** setup logging on this bucket. We will use Cloudfront, not S3, logging to record requests made for the tracking pixel.

Click the **Create** button on the bottom right of the popup. The new bucket should now be visible on the list of buckets on the left of the screen. On selecting it, you wil get a warning that the bucket is empty. (We haven't added the tracking pixel yet!)

[[/setup-guide/images/cloudfront-collector-setup-guide/s3-bucket-created.jpg]]

<a name="privacy" />
## A note on privacy

Above we mentioned that, from a performance perspective, it is not important which Amazon data center you choose to self-host your pixel, or indeed your JavaScript:

[[/setup-guide/images/02_choose_region.png]]

However, data center choice, particularly for your access logs, does matter from a data privacy perspective. For example, at the time of writing Amazon Web Services [recommends](http://aws.amazon.com/s3/faqs/#Can_I_comply_with_EU_data_privacy_regulations_using_Amazon_S3) storing data in the EU (Ireland) region if you wish to comply with EU data privacy regulations.

It is your responsibility to ensure that you comply with the privacy laws governing your web property and users.

## All done?

Proceed to [step 2: upload the tracking pixel](2-upload-the-tracking-pixel).

Return to an [overview of the Cloudfront Collector setup](Setting-up-the-Cloudfront-collector).

Return to the [setup guide](setting-up-Snowplow).