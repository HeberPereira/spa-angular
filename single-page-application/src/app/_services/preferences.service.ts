import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { Preferences } from '../_models/preferences'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { objectToUpperCase, objectTrim } from '../utils/index'

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private url = `${environment.baseUrl}/preferences`
  private urlTunnel = `${environment.baseUrlTunnelling}/preferences`

  constructor(private http: HttpClient) { }

  //Métodos de Configuração da MasterData

  findOne(id: number): Observable<ResponseDataModel<Preferences>> {
    return this.http.get<ResponseDataModel<Preferences>>(`${this.url}/${id}`)
  }

  findAll(): Observable<ResponseDataModel<Preferences>> {
    return this.http.get<ResponseDataModel<Preferences>>(this.url)
  }

  update(userPreferences: Preferences[]): Observable<ResponseDataModel<Preferences[]>> {
    userPreferences = objectToUpperCase(objectTrim(userPreferences)) as Preferences[]
    return this.http.put<ResponseDataModel<Preferences[]>>(`${this.url}`, userPreferences)
  }

  //Métodos de Configuração de Tunnel

  findOneTunnel(id: number): Observable<ResponseDataModel<Preferences>> {
    return this.http.get<ResponseDataModel<Preferences>>(`${this.urlTunnel}/${id}`)
  }

  findAllTunnel(): Observable<ResponseDataModel<Preferences>> {    
    return this.http.get<ResponseDataModel<Preferences>>(this.urlTunnel)
  }

  updateTunnel(userPreferences: Preferences[]): Observable<ResponseDataModel<Preferences[]>> {
    userPreferences = objectToUpperCase(objectTrim(userPreferences)) as Preferences[]
    return this.http.put<ResponseDataModel<Preferences[]>>(`${this.urlTunnel}`, userPreferences)
  }

  
}
