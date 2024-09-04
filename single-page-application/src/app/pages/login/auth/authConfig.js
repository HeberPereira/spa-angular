/* global msal */
/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
const msalConfig = {
  auth: {
    clientId: '1edca401-c308-4160-90d8-4dac18e0928a',
    authority: 'https://login.microsoftonline.com/92e84ceb-fbfd-47ab-be52-080c6b87953f',
    redirectUri: 'http://localhost:4200/'
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to 'true' if you are having issues on IE11 or Edge
  },
  system: {	
    loggerOptions: {	
      loggerCallback: (level, message, containsPii) => {	
        if (containsPii) {		
          return
        }		
        switch (level) {		
        case msal.LogLevel.Error:		
          // eslint-disable-next-line no-undef
          console.error(message)		
          return
        case msal.LogLevel.Info:		
          // eslint-disable-next-line no-undef
          console.info(message)		
          return
        case msal.LogLevel.Verbose:		
          // eslint-disable-next-line no-undef
          console.debug(message)		
          return		
        case msal.LogLevel.Warning:		
          // eslint-disable-next-line no-undef
          console.warn(message)
          return
        }	
      }	
    }	
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ['User.Read']
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
  scopes: ['User.Read', 'Mail.Read'],
  forceRefresh: false // Set this to 'true' to skip a cached token and go to the server to get a new token
}


export {
  loginRequest,
  msalConfig,
  tokenRequest
}