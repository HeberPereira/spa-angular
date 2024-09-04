import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { Profile } from '../_models/profile'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Service } from '../_models/service-model'
import { objectToUpperCase, objectTrim } from '../utils/index'

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Service<Profile> {
  private url = `${environment.baseUrl}/profile`
  
  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<ResponseDataModel<Profile>> {
    return this.http.get<ResponseDataModel<Profile>>(`${this.url}/${id}`)
  }

  findAll(): Observable<ResponseDataModel<Profile>> {
    return this.http.get<ResponseDataModel<Profile>>(this.url)
  }

  create(profile: Profile): Observable<ResponseDataModel<Profile>> {
    profile = objectToUpperCase(objectTrim(profile)) as Profile
    return this.http.post<ResponseDataModel<Profile>>(this.url, profile)
  }

  update(id: number, profile: Profile): Observable<ResponseDataModel<Profile>> {
    profile = objectToUpperCase(objectTrim(profile)) as Profile
    return this.http.put<ResponseDataModel<Profile>>(`${this.url}/${id}`, profile)
  }

  delete(ids: number[]): Observable<ResponseDataModel<Profile>> {
    return this.http.request<ResponseDataModel<Profile>>('DELETE', this.url, {
      body: { ids }
    })
  }
}
