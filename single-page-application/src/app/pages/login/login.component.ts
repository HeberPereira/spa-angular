import { Component } from '@angular/core'
import {
  myMSALObj
} from './auth/authPopup.js'
import {
  handleResponse
} from './auth/authRedirect.js'
import {
  loginRequest
} from './auth/authConfig.js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(){
    myMSALObj.loginPopup(loginRequest)
      .then(handleResponse)
      .catch(error => {
        console.error(error)
      })
  }

}
