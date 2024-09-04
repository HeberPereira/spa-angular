import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthUserService } from '../_services/auth-user.service'

@Injectable()
export class BaseGuard  {
  privacyPolicyObj: any
  accept: boolean
  public authUserService: AuthUserService
  public router: Router    

  constructor(authUserService: AuthUserService, router: Router
  ) {
    
    this.authUserService = authUserService
    this.router = router
  }
}