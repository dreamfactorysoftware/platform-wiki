[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 1: setup a Collector**](Setting-up-a-collector) > [**Setup the Cloudfront collector**](setting up the cloudfront collector) > 5. Test your pixel

Wait 10-15 minutes after creating the Cloudfront distribution before running the following test. (As it takes a little bit for the Cloudfront setup to complete...) Now try accessing your pixel over both `HTTP` and `HTTPS` using a browser, `wget` or `curl`:

	http://{{SUBDOMAIN}}.cloudfront.net/i
	https://{{SUBDOMAIN}}.cloudfront.net/i

If you have any problems, then double-check your CloudFront distribution's URL, and check the permissions on your pixel: it must be Openable by Everyone.

That's it - you now have a CloudFront distribution which can serve your tracking pixel fast to anybody anywhere in the world and log the request to Amazon S3 in your `snowplow-logs` bucket.

## All done?

Proceed to you are now ready to [setup a tracker][tracker-setup].

Return to the [setup guide](setting-up-SnowPlow).

[tracker-setup]: setting-up-SnowPlow#wiki-step2