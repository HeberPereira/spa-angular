import { environment } from './../environments/environment'
import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser'

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.clientId, // '0ad42306-75c8-4986-98d0-a3266d7fdeb9',
    authority: environment.authority, //'https://login.microsoftonline.com/94accf33-8973-479c-ba5f-31c1f691afea',
    redirectUri: environment.redirectUri //'https://localhost:4200/signin-callback'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        //console.debug(message)
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}
export const protectedResources = {
  api: {
    endpoint: environment.baseUrl, 
    scopes: environment.apiScopes
  }
}
export const loginRequest = {
  scopes: []
}
