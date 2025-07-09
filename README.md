CIAM Setup in Microsoft Entra

1. Create CIAM Tenant
   * Go to https://entra.microsoft.com
   * So for my example i am using my developer domain: yqvgs.onmicrosoft.com

2. Register Backend API App (Let's name it: ciam-api)
   * Applications > App registrations > New registration
   * Name: ciam-api
   * Supported account types: Accounts in this organizational directory only
   * Redirect URI: Leave blank
   * Click Register

   + Expose API Scope
   * Go to Expose an API
   * Click Set for App ID URI: There will be a default like: api://client-id
   * Click Add a scope:
     * Name: access_as_user
     * Admin consent display name: Access CIAM API
     * Admin consent description: Allows fronted to access API
     * Select Enabled

3. Register Frontend App (Let's name it: ciam-frontend)
    * Applications > App registrations > New registration
    * Name: ciam-frontend
    * Supported account types: Accounts in this organizational directory only
    * Redirect URI: http://localhost:3000
    * Implicit grant:
       - Select Access tokens
    
    + Grant API Permissions
     * API permissions > Add permission > APIs my organization uses
     * Select ciam-api
     * Choose scope: access_as_user


Side Note: I got to learn that ClientSecret is not required for validating tokens (bearer auth) but is necessary if the API app needs to call another protected API (like Microsoft Graph) as a client.

For the frontend. Look at the authConfig.ts file. 

So the app signs in the CIAM user via MSAL:

 auth: {
    clientId: "<frontend-client-id>",
    authority: "https://yqvgs.ciamlogin.com/<tenant-id>/v2.0",
    redirectUri: "http://localhost:3000"
  },


It request a token for: 
export const loginRequest = {
  scopes: ["api://<backend-client-id>/access_as_user"]
};