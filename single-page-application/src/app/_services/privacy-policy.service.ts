import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { PrivacyPolicy } from '../_models/privacy-policy'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Service } from '../_models/service-model'
import { objectToUpperCase, objectTrim } from '../utils/index'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService implements Service<PrivacyPolicy> {
  private url = `${environment.baseUrl}/privacy-policy`

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<ResponseDataModel<PrivacyPolicy>> {
    return this.http.get<ResponseDataModel<PrivacyPolicy>>(`${this.url}/${id}`).pipe(
      map(response => {

        return response
      })
    )
  }

  findAll(): Observable<ResponseDataModel<PrivacyPolicy>> {
    return this.http.get<ResponseDataModel<PrivacyPolicy>>(this.url)
  }

  create(privacyPolicy: PrivacyPolicy): Observable<ResponseDataModel<PrivacyPolicy>> {
    privacyPolicy = objectToUpperCase(objectTrim(privacyPolicy)) as PrivacyPolicy
    return this.http.post<ResponseDataModel<PrivacyPolicy>>(this.url, privacyPolicy)
  }

  update(id: number, privacyPolicy: PrivacyPolicy): Observable<ResponseDataModel<PrivacyPolicy>> {
    privacyPolicy = objectToUpperCase(objectTrim(privacyPolicy)) as PrivacyPolicy
    return this.http.put<ResponseDataModel<PrivacyPolicy>>(`${this.url}/${id}`, privacyPolicy)
  }

  delete(ids: number[]): Observable<ResponseDataModel<PrivacyPolicy>> {
    return this.http.request<ResponseDataModel<PrivacyPolicy>>('DELETE', this.url, {
      body: { ids }
    })
  }
}
