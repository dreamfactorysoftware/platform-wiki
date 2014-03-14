[**HOME**](Home) > [**DREAMFACTORY SETUP GUIDE**](Setting-up-DreamFactory) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Javascript tracker**](Javascript-tracker-setup) > Testing the Javascript tracker is firing

Once you have integrated DreamFactory tracking tags on your website, you can test that they are firing from your browser, using tools like [Firebug] [firebug] for Firefox, or developer tools in Chrome or IE.

#### 1. Load your browser, and open your developer tools (e.g. Firebug)

[[/setup-guide/images/test-tracker/1.png]]

In Firefox (assumes you have Firebug installed), right click on the web page you've loaded and select **Inspect Element with Firebug** from the menu. In Chrome, you also right click on the web page, but simply select **Inspect Element**.  In Internet Explorer, press F12 to launch the developer tools.

In all cases, the developer tools normally launches on the lower half of the browser window. (As in the example above.) Click on the network tab, to view requests made from the browser to different hosts on the Internet. In Firefox, that means clicking on the **Net** tab. In Chrome, select **Network**. In IE, also select **Network**. You may have to click "Start capturing" or something similar to get the developer tools to start monitoring communication between the browser and the Internet.

Once this has been enabled, you should be able to see requests made listed in the network tab. We want to see that the DreamFactory tracking tags are correctly "firing events" i.e. communicating data to your DreamFactory collector.

#### 2. Checking the network log to see if it contains DreamFactory

The Javascript tracker makes GET requests to the DreamFactory collector. The GET request is for the DreamFactory pixel, called `i`. You should be able to look through the set of requests made in the network tab, and identify some to `i`. By clicking on them, you can inspect the request more closely:

[[/setup-guide/images/test-tracker/2.png]]

In the above example, we've selected one of the requests, and clicked on the **Params** tab to zoom in on the data the tracker is conveying to the collector on the querystring. Note:

* We can see the Cloudfront domain that the tracker is pinging is `d10wr4jwvp55f9.cloudfront.net`. We can check that this is the domain used to setup the Cloudfront collector. (I.e. our tracker is pointing to the right endpoint.)
* We see that the status of the request is a '200 OK'. That's good!
* We can see the different parameters on the query string. In particular, we can see that `e` is set to 'pp': `e` is event type: and 'pp' represents a page ping event. We can also see that `duid`, which is the `domain_userid` is set to '8fbe862fff4ddef3'. You can look up the meaning of the other parameters on the [DreamFactory Tracker Protocol page] (DreamFactory-Tracker-Protocol).

#### 3. Specific things to check for

We recommend checking the following:

1. That the page view event fires at least once on each page load. This will include the parameter `e=pv`, to indicate that the event type is 'page_view'.
2. Check that any event specific tags (e.g. custom structured events or transaction events) are fired when you expect them. A structured event will include the parameter `e=se`. For other parameters, see the [DreamFactory Tracker Protocol page] (DreamFactory-Tracker-Protocol).

#### 4. My tracker is firing correctly. Can I check that my collector is receiving the data sent from the tracker?

If you are running your own DreamFactory collector on your own AWS account, you can - details below.

If you are using a DreamFactory account hosted by the DreamFactory team (e.g. a trial account), you cannot. You need to inform the DreamFactory team that you have setup your tracker, and ask them to check that they are receiving data successfully from it.

If you are running the Cloudfront collector, log into AWS and view the bucket in S3 that you setup to house the collector logs. You should see a set of logs like these below:

[[/setup-guide/images/test-tracker/3.png]]

If you are running the Clojure collector, you again need to check the S3 bucket with your collector logs. Identifying the location of the folder in that bucket with your logs can be a little involved - full instructions are given [here](Enable logging to S3#checking-that-your-logs-are-being-pushed-to-s3). Once you have located the folder, you should see a set of logs like these:

[[/setup-guide/images/test-tracker/4.png]]

It is the log files with name format corresponding to `_var_log_tomcat7_localhost_access_log.txt-XXXXXXXXXX.gz` that contain the DreamFactory data.

In either case (whether your are running the Clojure or Cloudfront collector), download one of the logs, unzip it, and inspect it. You should find records for requests to the `i` pixel you saw in the browser e.g.

	2013-06-27	01:35:08	GRU1	1058	190.113.143.59	GET	d10wr4jwvp55f9.cloudfront.net	/i	200	http://www.psychicbazaar.com/oracles/183-bach-flowers.html	Mozilla/5.0%20(Windows%20NT%206.1;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/27.0.1453.116%20Safari/537.36	e=pp&page=Bach%2520Flowers%2520-%2520Psychic%2520Bazaar&pp_mix=0&pp_max=0&pp_miy=0&pp_may=640&dtm=1372296910266&tid=082637&vp=1366x583&ds=1345x1463&vid=1&duid=e7cb17f1eaa05258&p=web&tv=js-0.13.1&fp=1875191152&aid=pbzsite&lang=es-419&cs=UTF-8&tz=America%252FArgentina%252FBuenos_Aires&refr=https%253A%252F%252Fwww.google.com.ar%252F&f_pdf=1&f_qt=1&f_realp=0&f_wma=1&f_dir=0&f_fla=1&f_java=1&f_gears=0&f_ag=0&res=1366x768&cd=32&cookie=1&url=http%253A%252F%252Fwww.psychicbazaar.com%252Foracles%252F183-bach-flowers.html	-	Hit	-4MCHKXwZozE3J2D-EH0UaGEj2h0_O8h1Qa-yjZEOeL7TsbpajoBdw==

## Next steps

There are a number of optional additional steps associated with Tracker Setup:

* [Host DreamFactory.js yourself] (self-hosting-dreamfactory-js)
* [Setup campaign tracking] (tracking-your-marketing-campaigns)

Once you have completed the Tracker setup, you will be successfully logging customer-level and event-level data to S3. Now you are ready to [Setup EmrEtlRunner] (Setting-up-DreamFactory#wiki-step3), which will regularly take that data, clean it up and enrich it, so that you can analyse it.






[firebug]: https://getfirebug.com/