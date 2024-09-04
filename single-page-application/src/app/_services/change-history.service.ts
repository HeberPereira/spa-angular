import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ChangeHistory } from '../_models/change-history'

@Injectable({
  providedIn: 'root'
})
export class ChangeHistoryService {
  private url = `${environment.baseUrl}/change-history`
  
  constructor(private http: HttpClient) { }

  findOne(id: string, table: string): Observable<ResponseDataModel<string>> {
    return this.http.get<ResponseDataModel<string>>(`${this.url}/${id}/${table}`)
  }

  findAll(): Observable<ResponseDataModel<ChangeHistory>> {
    return this.http.get<ResponseDataModel<ChangeHistory>>(this.url)
  }
}
