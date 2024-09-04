export interface ResponseDataModel<T> {
  timestamp: string
  message: string
  status: number
  path: string
  data: T[]
}
