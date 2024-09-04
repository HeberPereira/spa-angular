export const environment = {
  production: false,
  baseUrl: 'https://localhost:5001/api',
  baseUrlMopService: 'https://localhost:5001/api',
  baseUrlApiAuthentication: 'https://localhost:5001/api',
  baseUrlTunnelling: 'https://localhost:5003/api',
  baseUrlAppNotificationsHub: 'https://localhost:60525/app-notifications',
  baseUrlAppNotifications: 'https://localhost:60525/api', //Controller
  encryptHash: 'f5b99242-6504-4ca3-90f2-05e78e5761ef',

  //NITEO
  clientId: '2e5e5680-bb31-4cc9-8094-40a3ba419417', 
  authority: 'https://login.microsoftonline.com/69dea90e-4572-4b9c-be63-071af5ccf397', 
  // resourceScope: 'api://042ed8a1-554c-489b-9527-d934b6643f50/User.Access',
  apiScopes: ['api://042ed8a1-554c-489b-9527-d934b6643f50/User.Access', 'User.Read'],

  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  validateAuthority: true,
  baseURLApiCore: 'https://localhost:5001/',
  resourceUri: 'window.location.origin/',
  loginRequest: [],             
}