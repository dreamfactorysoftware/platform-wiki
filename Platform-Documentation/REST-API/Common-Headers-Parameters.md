### Your API Key

Your **API key**, required in REST calls to your DreamFactory instance, is chosen by you when you create your application. It defaults to the **name** of your application.

Providing the API key along with the request can be done in one of two ways:

1. **Via Query String** Add ```?app_name=**api_key**``` to each endpoint URL

or

2. Send a custom HTTP header along with your requests. Your DSP will recognize API keys provided in the header **X-DreamFactory-Application-Name**:

### Your Session Token

For all authenticated requests after logging in, to the API, you’ll need to pass the ```session_id``` as a new request header called **X-DreamFactory-Session-Token **
