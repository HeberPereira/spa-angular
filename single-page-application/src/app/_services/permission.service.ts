import { Injectable } from '@angular/core'
import { ResponseDataModel } from '../_models/response-data-model'
import { environment } from '../../environments/environment'
import { Permission } from '../_models/permission'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private url = `${environment.baseUrl}/permission`
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseDataModel<Permission>> {
    return this.http.get<ResponseDataModel<Permission>>(`${this.url}`)
  }
}
