import { Observable } from 'rxjs'
import { ResponseDataModel } from '../_models/response-data-model'

export interface Service<T> {
  findOne(id: number | string): Observable<ResponseDataModel<T>>
  findAll(): Observable<ResponseDataModel<T>>
  create(resource: T): Observable<ResponseDataModel<T>>
  update(id: number | string, resource: T): Observable<ResponseDataModel<T>>
  delete(ids: number[] | string[]): Observable<ResponseDataModel<T>>
}
