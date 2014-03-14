[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 1: setup a Collector**](Setting-up-a-collector) > [**Setup the Cloudfront collector**](setting up the cloudfront collector) > 4. Create a Cloudfront distribution

Having setup everything in S3, we now need to create a Cloudfront distribution. This will be used to serve the tracking pixel `i`. (So we need to tell Cloudfront to serve the contents of the [first bucket](#bucket1) in S3 we created, that houses the tracking pixel.) We also need to switch on Cloudfront logging, so that every request made for the tracking pixel by the DreamFactory tracker will be logged. Again, we need to tell Cloudfront to store these logs in the bucket we created in [step 3 above](#bucket2).

## 4.1 Switch from S3 to Cloudfront

Click on the **Services** menu on the top left of the browser screen, and select **Cloudfront** from the drop down:

[[/setup-guide/images/cloudfront-collector-setup-guide/switch-to-cloudfront.jpg]]

You should see a screen like the following: (Note - if you have not setup many Cloudfront distributinons previously, it will look a lot more sparse :-) .)

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-1.jpg]]

## 4.2 Create a new Cloudfront distribution / subdomain

Click on the **Create Distribution** button on the top right of the window. When presented with the following screen, select **Download** (rather than **Streaming**) and click the **Continue** button.

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-2.jpg]]

Now we are presented with a screen with many options:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-3.jpg]]

The first field, **Origin Domain ID** lets us specify where Cloudfront should find the content to distribute on the Cloudfront subdomain we are in the process of creating. If you click on it, you will be presented with a drop down:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-4.jpg]]

In the drop down you should see the bucket you setup in [step 1](#bucket1) that contains the tracking pixel `i`. Selet this - the **Origin ID** field should be automatically populated for you:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-5.jpg]]

Great! We've linked the Cloudfront subdomain to the bucket on S3 with our tracking pixel. Now we need to switch on Cloudfront logging, and ensure that Cloudfront logs to the bucket we setup in S3. Scroll down the list of options (you will need to scroll quite far):

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-6.jpg]]

Change the radio button for **Logging** from **Off** to **On**. The two fields beneath it should be activated. Now click on the **Buckets for logging** field:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-7.jpg]]

You should now be able to select the [2nd bucket](#bucket2) you setup to store the logs.

Now all you need to do is tell Cloudfront to create the distribution. Scroll down to the end of the options and select the **Create Distribution** button:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-8.jpg]]

You should see your new distribution listed:

[[/setup-guide/images/cloudfront-collector-setup-guide/cloudfront-create-distribution-9.jpg]]

Write down the **Domain Name** for the distribution you just created. (Highlighted above - in our case it is `http://dzvb5g6uxbzaz.cloudfront.net`.) You will need this in the next step (to test the collector is working), and when you setup your [tracker](choosing-a-tracker).

## All done?

Proceed to [step 5: test your pixel](5-Test-your-pixel).

Return to an [overview of the Cloudfront Collector setup](Setting-up-the-Cloudfront-collector).

Return to the [setup guide](setting-up-DreamFactory).