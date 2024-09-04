/* global Headers, fetch */
/** 
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/
export function callMSGraph(endpoint, token, callback) {
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers
  }

  // eslint-disable-next-line no-undef
  console.log('request made to Graph API at: ' + new Date().toString())

  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response, endpoint))
    // eslint-disable-next-line no-undef
    .catch(error => console.log(error))
}
