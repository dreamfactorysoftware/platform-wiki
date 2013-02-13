## Frequently Asked Questions

1. [Is SnowPlow real-time?](#rt)
2. [Does implementing SnowPlow impact the performance of my site?](#performance)
3. [Does SnowPlow have a graphical user interface?](#gui)
4. [Does SnowPlow use first- or third-party cookies?](#cookies)
5. [Does SnowPlow scale?](#scalability)
6. [How reliable is the CloudFront collector?](#cfreliability)
7. [Is SnowPlow IPv6 compliant?](#ipv6)
8. [What's next on the roadmap?](#roadmap)
9. [How can I contribute to SnowPlow?](#contribute)
10. [Any other question?](#otherq)

<a name="rt"/>
## Is SnowPlow real-time?

No, currently SnowPlow is not a real-time analytics solution. This is for two main reasons:

1. Both of the supported collectors (the CloudFront collector and the Clojure-based collector) feature a lag (typically 20-60 minutes) before events are written to Amazon S3
2. Our ETL process (which takes raw SnowPlow events and enriches them) is based on Hadoop/Hive, which are batch-based processing tools. They are not designed for real-time (or near-real-time) data processing

We have adding real-time support to SnowPlow on our radar, but this is not a priority currently.

<a name="performance"/>
## Does implementing SnowPlow on my site effect site performance e.g. page load times?

SnowPlow will have an impact on site performance, just as implementing any JavaScript-based tracking will impact site performance.

However, we have done everything we can to minimise the effect on site performance: by default the SnowPlow JavaScript tracker is minified, and hosted on Amazon CloudFront. We also recommend using the JavaScript tracker's asynchronous tags to minimize impact on page load.

<a name="gui"/>
## Does SnowPlow have a graphical user interface?

No, currently SnowPlow does not have a GUI. Analysts who want to query data collected by SnowPlow can use any third-party tool, such as Tableau, Chartio or PowerPivot.

We have written tutorials on using Tableau and Chartio to analyze SnowPlow data.

<a name="cookies"/>
## Does SnowPlow use first- or third-party cookies?

The SnowPlow JavaScript tracker uses first-party cookies to track a unique user ID and the user's session information. The CloudFront collector simply logs this data.

However, if you use the Clojure-based collector then this first-party user ID is overwritten with a unique user ID which is set server-side by the collector (i.e. a third-party cookie on the collector's own domain). This is extremely useful for tracking users across multiple domains.

<a name="scalability"/>
## Does SnowPlow scale?

Yes! In fact we designed SnowPlow primarily with extreme scalability in mind. In particular:

* xxx
* yyy
* zzz

<a name="cfreliability"/>
## How reliable is the CloudFront collector?

To write.

<a name="ipv6"/>
## Is SnowPlow IPv6 compliant?

IPv6 (Internet Protocol version 6) is a revision of the Internet Protocol (IP) which allows for far more addresses to be assigned than with the current IPv4.

At the moment, the CloudFront-based collector is not IPv6 compliant - because Amazon CloudFront is not yet IPv6 compliant - however the Clojure-based collector running on Elastic Beanstalk is IPv6 compliant.

<a name="roadmap"/>
## What's next on the roadmap?

Plenty! Checkout our [[Product roadmap]] for details.

<a name="contribute" />
## How can I contribute to SnowPlow?

The SnowPlow team welcomes contributions! The core team (SnowPlow Analytics Ltd) is small so we would love more people to join in and help realise our objectives of building the world's most powerful analytics platform. Stay tuned for a more detailed update on how best you can contribute to SnowPlow. 

<a name="otherq">
## Question not on this list?

Get in touch with us and ask it! See our [[Talk to us]] page for contact details.