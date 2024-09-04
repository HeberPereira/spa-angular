import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { ServiceSetting } from '../_models/service-setting'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { objectToUpperCase, objectTrim } from '../utils/index'

@Injectable({
  providedIn: 'root'
})
export class ServiceSettingService {
  private url = `${environment.baseUrl}/service-settings`
  private urlTunnel = `${environment.baseUrlTunnelling}/service-settings`

  constructor(private http: HttpClient) { }

  //Métodos de Configuração da MasterData

  findOne(id: number): Observable<ResponseDataModel<ServiceSetting>> {
    return this.http.get<ResponseDataModel<ServiceSetting>>(`${this.url}/${id}`)
  }

  findAll(): Observable<ResponseDataModel<ServiceSetting>> {
    return this.http.get<ResponseDataModel<ServiceSetting>>(this.url)
  }

  update(serviceSetting: ServiceSetting[]): Observable<ResponseDataModel<ServiceSetting[]>> {
    serviceSetting = objectToUpperCase(objectTrim(serviceSetting)) as ServiceSetting[]
    return this.http.put<ResponseDataModel<ServiceSetting[]>>(`${this.url}`, serviceSetting)
  }

  //Métodos de Configuração de Tunnel

  findOneTunnel(id: number): Observable<ResponseDataModel<ServiceSetting>> {
    return this.http.get<ResponseDataModel<ServiceSetting>>(`${this.urlTunnel}/${id}`)
  }

  findAllTunnel(): Observable<ResponseDataModel<ServiceSetting>> {    
    return this.http.get<ResponseDataModel<ServiceSetting>>(this.urlTunnel)
  }

  updateTunnel(serviceSetting: ServiceSetting[]): Observable<ResponseDataModel<ServiceSetting[]>> {
    serviceSetting = objectToUpperCase(objectTrim(serviceSetting)) as ServiceSetting[]
    return this.http.put<ResponseDataModel<ServiceSetting[]>>(`${this.urlTunnel}`, serviceSetting)
  }

  
}
