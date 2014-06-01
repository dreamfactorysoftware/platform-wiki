The DreamFactory Mobile Application (DMA) allows you to quickly deploy your applications to end users on mobile devices. DMA was built with Apache Cordova, also known as PhoneGap. 

DMA is open source and free to use. DMA source code and build instructions are located on GitHub [here](https://github.com/dreamfactorysoftware/mobile-dreamfactory-app), if you'd like to customize the app cosmetically or functionally to meet your own needs.

### Example Usage

You work for a company and need to build three mobile apps for your employees. Not all employees can use all three apps. For example, some employees can sign in and use all three apps while other employees can sign in and only access one of the apps.

You've installed DreamFactory and built these three applications. DreamFactory is running on your own Linux server running in a data center, you're managing end user access control with DreamFactory SSO authentication, and the source code for your three apps is stored server-side in DreamFactory's file system.

Your end users can use the three apps you've built with the following instructions. 

You tell your end users:

1. Get the DreamFactory Mobile App from the [Apple Store](https://itunes.apple.com/us/app/dreamfactory-mobile/id798772786) or [Google Play Store](https://play.google.com/store/apps/details?id=com.dreamfactory.launchpad). (Note: You can skin and build the app yourself so you might tell them to get "our company mobile app" from the app store).
2. Sign in to the DMA with your username and password (i.e., end user credentials stored in DreamFactory). 
3. Navigate to, and use the applications displayed in the DMA interface (i.e., the applications running server-side on DreamFactory). (Note: End users will only see the applications they've been granted  permission to use). 
 
### Benefits

The purpose of the DMA is to simplify mobile app deployment. The DMA provides a quick and easy way to get apps into the hands of mobile end users, without the need to build your own mobile apps from scratch. All updates to your apps running on the server are dynamically available to end users who have installed the DMA on their phones and tablets. 

The DreamFactory Mobile App is particularly useful in these scenarios:

1. You work for a company that needs to deploy multiple applications to end users.
2. End users have different permissions to access / not access specific applications.
3. You need to make application updates and don't want to force end users to constantly upgrade a mobile app to get the updates. In other words, your application source code resides server-side in the DreamFactory file system, you update app source code server-side, and the DMA provides a secure container for the current version of all your applications. 
4. Your applications access some of the same backend services and data, for example a SQL database that stores internal corporate data that multiple apps access via REST.