/* eslint-disable @typescript-eslint/no-var-requires */
/* global document, alert, require */

const {
  graphConfig
} = require('./authConfig')

// Select DOM elements to work with
export const welcomeDiv = document.getElementById('WelcomeMessage')
export const signInButton = document.getElementById('SignIn')
export const cardDiv = document.getElementById('card-div')
export const mailButton = document.getElementById('readMail')
export const profileButton = document.getElementById('seeProfile')
export const profileDiv = document.getElementById('profile-div')

export function showWelcomeMessage(username) {
  // Reconfiguring DOM elements
  cardDiv.style.display = 'initial'
  welcomeDiv.innerHTML = `Welcome ${username}`
  signInButton.setAttribute('onclick', 'signOut()')
  signInButton.setAttribute('class', 'btn btn-success')
  signInButton.innerHTML = 'Sign Out'
}

export function updateUI(data, endpoint) {
  // eslint-disable-next-line no-undef
  console.log('Graph API responded at: ' + new Date().toString())

  if (endpoint === graphConfig.graphMeEndpoint) {
    profileDiv.innerHTML = ''
    const title = document.createElement('p')
    title.innerHTML = '<strong>Title: </strong>' + data.jobTitle
    const email = document.createElement('p')
    email.innerHTML = '<strong>Mail: </strong>' + data.mail
    const phone = document.createElement('p')
    phone.innerHTML = '<strong>Phone: </strong>' + data.businessPhones[0]
    const address = document.createElement('p')
    address.innerHTML = '<strong>Location: </strong>' + data.officeLocation
    profileDiv.appendChild(title)
    profileDiv.appendChild(email)
    profileDiv.appendChild(phone)
    profileDiv.appendChild(address)

  } else if (endpoint === graphConfig.graphMailEndpoint) {
    if (!data.value) {
      alert('You do not have a mailbox!')
    } else if (data.value.length < 1) {
      alert('Your mailbox is empty!')
    } else {
      const tabContent = document.getElementById('nav-tabContent')
      const tabList = document.getElementById('list-tab')
      tabList.innerHTML = '' // clear tabList at each readMail call

      data.value.map((d, i) => {
        // Keeping it simple
        if (i < 10) {
          const listItem = document.createElement('a')
          listItem.setAttribute('class', 'list-group-item list-group-item-action')
          listItem.setAttribute('id', 'list' + i + 'list')
          listItem.setAttribute('data-toggle', 'list')
          listItem.setAttribute('href', '#list' + i)
          listItem.setAttribute('role', 'tab')
          listItem.setAttribute('aria-controls', i)
          listItem.innerHTML = d.subject
          tabList.appendChild(listItem)

          const contentItem = document.createElement('div')
          contentItem.setAttribute('class', 'tab-pane fade')
          contentItem.setAttribute('id', 'list' + i)
          contentItem.setAttribute('role', 'tabpanel')
          contentItem.setAttribute('aria-labelledby', 'list' + i + 'list')
          contentItem.innerHTML = '<strong> from: ' + d.from.emailAddress.address + '</strong><br><br>' + d.bodyPreview + '...'
          tabContent.appendChild(contentItem)
        }
      })
    }
  }
}
