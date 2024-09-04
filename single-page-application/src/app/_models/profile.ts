import { Permission } from './permission'

export class Profile {
  id?: number
  name: string
  description: string
  idmRole: string
  adGroupId: string  
  permissions: Permission[] = []
  concurrencyToken: string
}