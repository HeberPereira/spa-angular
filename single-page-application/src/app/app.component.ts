/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core'
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular'
import { AuthenticationResult, BrowserUtils, InteractionRequiredAuthError, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser'
import { Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment'
import { AuthUserService } from './_services/auth-user.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private authUserService: AuthUserService,
    private msalBroadcastService: MsalBroadcastService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const currentPath = this.location.path()
    // Dont perform nav if in iframe or popup, other than for front-channel logout
    this.isIframe = BrowserUtils.isInIframe() && !window.opener && currentPath.indexOf('logout') < 0 // Remove this line to use Angular Universal
    this.setLoginDisplay()
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(result => {
        console.debug(result)
        this.setLoginDisplay()
        this.checkAndSetActiveAccount()
        
      })
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0
  }

  checkAndSetActiveAccount(): void {

    let activeAccount = this.authService.instance.getActiveAccount()
    
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts()
      this.authService.instance.setActiveAccount(accounts[0])
      activeAccount = accounts[0]

    }

    //let storage: Storage = window[]
    this.acquireToken()
    //console.log(this.authService.instance.getTokenCache())

    
  }

  acquireToken(): any {

    const accessTokenRequest = {
      scopes: environment.apiScopes,
      account: this.authService.instance.getActiveAccount()
    }

    this.authUserService.getPermissions().subscribe(resultado =>{
      localStorage.setItem('listPermissions', JSON.stringify(resultado))      
    })

    this.authUserService.getUserTerms().subscribe(resultado =>{
      localStorage.setItem('termToAccept', JSON.stringify(resultado))      
    })

    
    this.authService.instance
      .acquireTokenSilent(accessTokenRequest)
      .then(function(accessTokenResponse) {
        // Acquire token silent success
        // Call API with token      
        localStorage.setItem('auth_token', accessTokenResponse.accessToken)
        return accessTokenResponse.accessToken
      })
      .catch(function (error) {
        //Acquire token silent failure, and send an interactive request
        console.error(error)

        if (error instanceof InteractionRequiredAuthError) {
          return this.authService.instance.acquireTokenRedirect(accessTokenRequest)
        }
        return ''
      })    
  }

  loginRedirect(): void {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    } else {
      this.authService.loginRedirect()
    }
  }

  loginPopup(): void {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account)
        })
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account)
        })
    }
  }

  logout(popup?: boolean): void {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/'
      })
    } else {
      this.authService.logoutRedirect()
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined)
    this._destroying$.complete()
  }
}
