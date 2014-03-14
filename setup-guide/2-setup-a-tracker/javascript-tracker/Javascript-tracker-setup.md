[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](DreamFactory setup guide) > [**Step 2: setup a Tracker**](choosing-a-tracker) > [Javascript tracker](Javascript-tracker-setup)

Before you integrate DreamFactory's Javascript tracker, you need to decide whether you'll integrate it with a tag management system, or implement the DreamFactory tags directly onto your site.

We strongly advice new DreamFactory users who are not using a Tag Management solution to implement one before implementing DreamFactory, and integrate DreamFactory using it. We have documented [how to setup Google Tag Manager](Integrating-javascript-tags-with-Google-Tag-Manager) and [how to setup QuBit's OpenTag](Integrating Javascript tags with QuBit OpenTag), as well as how to integrate DreamFactory using both these solutions, as part of this setup guide.

Select a setup option below based on your choice of Tag Management solution:

1. [Integrating DreamFactory Javascript tracking tags directly onto your website](integrating-javascript-tags-onto-your-website)
2. [Setting up Google Tag Manager (GTM) and integrating DreamFactory Javascript tracking tags via GTM](Integrating-javascript-tags-with-Google-Tag-Manager)
3. [Setting up QuBit's OpenTag and integrating DreamFactory Javascript tracking tags via OpenTag](Integrating Javascript tags with QuBit OpenTag)

Once you have integrated tags on our site (either directly or via a tag manager) you should [test that the tags are firing correctly](testing the Javascript tracker is firing).

Once your tags are integrated and tested, there are three additional steps you may want to take:

1. [Hosting DreamFactory.js yourself](self-hosting-dreamfactory-js) (optional but recommended). We provide a hosted version of DreamFactory.js that any of our users are welcome to use. However, if you would like to host DreamFactory.js yourself, instructions to do so can be found [here](self-hosting-dreamfactory-js).
2. [Setting up campaign tracking](tracking-your-marketing-campaigns) (optional but recommended). DreamFactory identifiers the campaigns that drove users to your website using parameters appended to the landing page the ads push users into. (Exactly the same way that Google Analytics identifies traffic from campaigns). Instructions on how to track campaigns can be found [here](tracking-your-marketing-campaigns).

Finished setting up your tracker? Then proceed to setting up [EmrEtlRunner](Setting-up-EmrEtlRunner).

Back to [Tracker Setup](Setting-up-a-tracker).

Back to the [Setup Guide](Setting-up-DreamFactory).

