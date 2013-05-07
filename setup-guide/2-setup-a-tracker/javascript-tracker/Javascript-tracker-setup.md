[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Snowplow setup guide) > [**Step 2: setup a Tracker**](choosing-a-tracker) > [Javascript tracker](Javascript-tracker-setup)

Before you integrate Snowplow's Javascript tracker, you need to decide whether you'll integrate it with a tag management system, or implement the Snowplow tags directly onto your site.

We strongly advice new Snowplow users who are not using a Tag Management solution to implement one before implementing Snowplow, and integrate Snowplow using it. We have documented [how to setup Google Tag Manager](Integrating-javascript-tags-with-Google-Tag-Manager) and [how to setup QuBit's OpenTag](Integrating Javascript tags with QuBit OpenTag), as well as how to integrate Snowplow using both these solutions, as part of this setup guide.

Select a setup option below based on your choice of Tag Management solution:

1. [Integrating Snowplow Javascript tracking tags directly onto your website](integrating-javascript-tags-onto-your-website) 
2. [Setting up Google Tag Manager (GTM) and integrating Snowplow Javascript tracking tags via GTM](Integrating-javascript-tags-with-Google-Tag-Manager) 
3. [Setting up QuBit's OpenTag and integrating Snowplow Javascript tracking tags via OpenTag](Integrating Javascript tags with QuBit OpenTag)

There are Additional setup options you may want to take:

1. [Hosting Snowplow.js yourself](self-hosting-snowplow-js) (optional but recommended). We provide a hosted version of Snowplow.js that any of our users are welcome to use. However, if you would like to host Snowplow.js yourself, instructions to do so can be found [here](self-hosting-snowplow-js).
2. [Modifying Snowplow.js](modifying-snowplow-js) (optional). You may want to hack on Snowplow.js yourself, to develop additional custom functionality. Find out [how](modifying-snowplow-js).
3. [Setting up campaign tracking](tracking-your-marketing-campaigns) (optional but recommended). Snowplow identifiers the campaigns that drove users to your website using parameters appended to the landing page the ads push users into. (Exactly the same way that Google Analytics identifies traffic from campaigns). Instructions on how to track campaigns can be found [here](tracking-your-marketing-campaigns).

Back to [Tracker Setup](Setting-up-a-tracker).

Back to the [Setup Guide](Setting-up-Snowplow).

