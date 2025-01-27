/* eslint-disable @typescript-eslint/no-var-requires */
/* global msal, require */

const {
  graphConfig,
  msalConfig,
  loginRequest,
  tokenRequest
} = require('./authConfig')
const {
  callMSGraph
} = require('./graph')
const {
  updateUI
} = require('./ui')

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
export const myMSALObj = new msal.PublicClientApplication(msalConfig)

let username = ''

function selectAccount() {

  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */

  const currentAccounts = myMSALObj.getAllAccounts()
  if (currentAccounts.length === 0) {
    return
  } else if (currentAccounts.length > 1) {
    // Add choose account code here
    // eslint-disable-next-line no-undef
    console.warn('Multiple accounts detected.')
  } else if (currentAccounts.length === 1) {
    username = currentAccounts[0].username
    //showWelcomeMessage(username)
  }
}

function handleResponse(response) {

  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  if (response !== null) {
    username = response.account.username
    //showWelcomeMessage(username)
  } else {
    selectAccount()
  }
}

function signIn() {

  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  myMSALObj.loginPopup(loginRequest)
    .then(handleResponse)
    .catch(error => {
      // eslint-disable-next-line no-undef
      console.error(error)
    })
}

function signOut() {

  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */

  const logoutRequest = {
    account: myMSALObj.getAccountByUsername(username),
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri
  }

  myMSALObj.logoutPopup(logoutRequest)
}

function getTokenPopup(request) {

  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = myMSALObj.getAccountByUsername(username)
  
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      // eslint-disable-next-line no-undef
      console.warn('silent token acquisition fails. acquiring token using popup')
      if (error instanceof msal.InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            // eslint-disable-next-line no-undef
            console.log(tokenResponse)
            return tokenResponse
          }).catch(error => {
            // eslint-disable-next-line no-undef
            console.error(error)
          })
      } else {
        // eslint-disable-next-line no-undef
        console.warn(error)   
      }})
}

function seeProfile() {
  getTokenPopup(loginRequest)
    .then(response => {
      callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI)
    }).catch(error => {
      // eslint-disable-next-line no-undef
      console.error(error)
    })
}

function readMail() {
  getTokenPopup(tokenRequest)
    .then(response => {
      callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI)
    }).catch(error => {

      // eslint-disable-next-line no-undef
      console.error(error)
    })
}

selectAccount()
