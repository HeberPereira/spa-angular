/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core'
import { UserManager, User, UserManagerSettings } from 'oidc-client'
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();

  private get idpSettings() : UserManagerSettings {
    return {
      authority: 'https://login.microsoft.com/94accf33-8973-479c-ba5f-31c1f691afea/', //Constants.idpAuthority,
      client_id: '13a7ff16-00bb-4e15-a0a8-bbc90616fbf6', //Constants.clientId,
      redirect_uri: `${environment.redirectUri}signin-callback`,
      scope: 'openid profile companyApi',
      response_type: 'id_token',
      post_logout_redirect_uri: `${environment.redirectUri}signout-callback`
    }
  }

  constructor() { 
    //this._userManager = new UserManager(this.idpSettings)
  }

  public login = () => {
    return this._userManager.signinRedirect()
  }

  public isAuthenticated = (): boolean => {
    return true
    // return this._userManager.getUser()
    //   .then(user => {
    //     if(this._user !== user){
    //       this._loginChangedSubject.next(this.checkUser(user))
    //     }

    //     this._user = user

    //     return this.checkUser(user)
    //   })
  }

  public getUser = (): User => {
    // return this._userManager.getUser()
    //   .then(user => {
    //     if(this._user !== user){
    //       this._loginChangedSubject.next(this.checkUser(user))
    //     }

    //     this._user = user

    //     return this._user
    //   })
    return this._user
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._loginChangedSubject.next(this.checkUser(user))
        return user
      })
  }

  public logout = () => {
    this._userManager.signoutRedirect()
  }

  public finishLogout = () => {
    this._user = null
    return this._userManager.signoutRedirectCallback()
  }

  private checkUser = (user : User): boolean => {
    return !!user && !user.expired
  }
}