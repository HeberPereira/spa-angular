import { PrivacyPolicy, UserTerm } from 'src/app/_models/privacy-policy'
import { Injectable } from '@angular/core'

import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ResponseDataModel } from '../_models/response-data-model'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
private url = `${environment.baseUrl}/auth`
  public router: Router  
  privacyPolicyObj: any
  accept: boolean

  constructor(private http: HttpClient, routerConfig: Router){
    this.router = routerConfig
  }

  getAccessToken(): string {
    return localStorage.getItem('auth_token') //TODO: confirmar se deve ser substituido pelas funcoes do MSAL. Ver app.component.acquireToken()
  }

  getPermissions(): Observable<Array<string>> {
    const res = this.http.get<Array<string>>(`${this.url}/permissions`)
       
    return res
  }

  getUserTerms(): Observable<PrivacyPolicy> {
    const res = this.http.get<PrivacyPolicy>(`${this.url}/get-accept-user`)       
    return res
  }

  acceptTerms(policy: PrivacyPolicy): Observable<ResponseDataModel<PrivacyPolicy>> {
    const res = this.http.post<ResponseDataModel<PrivacyPolicy>>(`${this.url}/accept-term`, policy)  
    
    return res
  }

  validateTerms(){
    this.getUserTerms().subscribe(retorno =>{      
      localStorage.setItem('termToAccept', JSON.stringify(retorno))  
      const jsonObj  = localStorage.getItem('termToAccept')   
      this.privacyPolicyObj = JSON.parse(jsonObj).data 
      this.accept = this.privacyPolicyObj?.id == 0  

      if(!this.accept){ 
        this.router.navigate(['user-management', 'privacy-policy','dialog'])
      }
    })
  }

  profilesGroupsAD(){
    const res = this.http.get<any>(`${this.url}/profiles-groups-ad`)
       
    return res
  }
}
