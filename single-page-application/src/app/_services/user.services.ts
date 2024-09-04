import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { MsalService } from '@azure/msal-angular'
import { Router } from '@angular/router'
import { AccesscredentialsService } from './accesscredentials.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: MsalService, private router: Router, private credential: AccesscredentialsService) { }
  loggedIn = false;

  public async ManagerAuthenticationOAuth(): Promise<any> {

    this.CheckoutAccount()

    if (!this.loggedIn) {
      this.CallLoginOAuth()
    }
    else {
      if (sessionStorage.getItem('AccessTokenInvoice')) {
        return await this.authUserApp(sessionStorage.getItem('AccessTokenInvoice'), window.location.pathname.replace('/invoicing/modernization/', '').replace('/', ''))
      }
      else {
        // const requestObj = {
        //   scopes: this.authService.getScopesForEndpoint(environment.resourceUri)
        // }

        // const tokenResponse = await this.authService.acquireTokenSilent(requestObj)
        // sessionStorage.setItem('AccessTokenInvoice', tokenResponse.accessToken)
        // return await this.authUserApp(tokenResponse.accessToken, window.location.pathname.replace('/invoicing/modernization/', '').replace('/', ''))
      }
    }
  }

  async authUserApp(idtoken: string, moduloRedirect: string): Promise<any> {

    const headersa = new Headers()
    const bearer = 'Bearer ' + idtoken
    headersa.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headersa
    }

    const json = await fetch(environment.baseUrl + 'Api/login', options)
      .then(function (response) {
        return response.json()
      })

    console.log('request user with success...')
    const userdata = JSON.parse(json)
    console.log(userdata)

    if (userdata == null) {
      this.credential.redirectToInvoice()
    }
    else {
      sessionStorage.setItem('userGrupos', JSON.stringify(userdata.Grupos))
      sessionStorage.setItem('userId', userdata.IdUsuario)
      sessionStorage.setItem('userLogin', userdata.Login)
      console.log(sessionStorage.getItem('userGrupos'))
    }
    return userdata
  }

  public AuthorizationUser(idtoken: string): Observable<any> {
    const headers = { 'content-type': 'application/json; charset=utf-8', 'authorization': 'Bearer ' + idtoken }
    return this.http.get(environment.baseUrl + 'Api/login', { headers })
  }


  CheckoutAccount() {
    this.loggedIn = false//!!this.authService.checkoutAccount
  }

  CallLoginOAuth() {
    this.authService.loginRedirect()
  }

  CallLogoutOAuth() {
    this.authService.logout()
  }

}
