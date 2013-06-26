[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Javascript tracker**](Javascript-tracker-setup) > Testing the Javascript tracker is firing

CONTENT COMING SOON





## Next steps

There are a number of optional additional steps associated with Tracker Setup:

* [Tracking additional events (not just pageviews, transactions and custom events)](javascript-tracker). Snowplow.js supports capture of a growing number of event types: details on how to integrate them can be found on the [[Javascript Tracker]] section of the [Technical Documentation](snowplow-technical-documentation).
* [Setup campaign tracking] (tracking-your-marketing-campaigns)
* [Host Snowplow.js yourself] (self-hosting-snowplow-js)
* [Modify / hack on Snowplow.js] (modifying-snowplow-js)

Once you have completed the Tracker setup, you will be successfully logging customer-level and event-level data to S3. Now you are ready to [Setup EmrEtlRunner] (Setting-up-Snowplow#wiki-step3), which will regularly take that data, clean it up and enrich it, so that you can analyse it.

