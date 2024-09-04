import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { UserPreferences } from '../_models/user-preferences'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { objectToUpperCase, objectTrim } from '../utils/index'

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private url = `${environment.baseUrl}/user-preferences`
  private urlTunnel = `${environment.baseUrlTunnelling}/user-preferences`

  constructor(private http: HttpClient) { }

  //Métodos de Configuração da MasterData

  findOne(id: number): Observable<ResponseDataModel<UserPreferences>> {
    return this.http.get<ResponseDataModel<UserPreferences>>(`${this.url}/${id}`)
  }

  findAll(): Observable<ResponseDataModel<UserPreferences>> {
    return this.http.get<ResponseDataModel<UserPreferences>>(this.url)
  }

  findByUser(): Observable<ResponseDataModel<UserPreferences>> {
    return this.http.get<ResponseDataModel<UserPreferences>>(`${this.url}/get-by-user/`)
  }

  update(userPreferences: UserPreferences[]): Observable<ResponseDataModel<UserPreferences[]>> {
    userPreferences = objectToUpperCase(objectTrim(userPreferences)) as UserPreferences[]
    return this.http.put<ResponseDataModel<UserPreferences[]>>(`${this.url}`, userPreferences)
  }

  //Métodos de Configuração de Tunnel

  findOneTunnel(id: number): Observable<ResponseDataModel<UserPreferences>> {
    return this.http.get<ResponseDataModel<UserPreferences>>(`${this.urlTunnel}/${id}`)
  }

  findAllTunnel(): Observable<ResponseDataModel<UserPreferences>> {    
    return this.http.get<ResponseDataModel<UserPreferences>>(this.urlTunnel)
  }

  updateTunnel(userPreferences: UserPreferences[]): Observable<ResponseDataModel<UserPreferences[]>> {
    userPreferences = objectToUpperCase(objectTrim(userPreferences)) as UserPreferences[]
    return this.http.put<ResponseDataModel<UserPreferences[]>>(`${this.urlTunnel}`, userPreferences)
  }

  
}
