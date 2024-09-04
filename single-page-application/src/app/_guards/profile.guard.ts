import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { of } from 'rxjs'
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { checkGroups, showErrorMessageNotification } from '../utils'
import { BaseGuard } from './base.guard'
import { AuthUserService } from '../_services/auth-user.service'

@Injectable()
export class ProfileGuard extends BaseGuard implements CanActivateChild {
  constructor(    
    authUserService: AuthUserService,
    router: Router
  ) {
    super(authUserService,router)
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    this.authUserService.validateTerms()
    const pms = localStorage.getItem('listPermissions')
    
    if (!checkGroups(pms,'SAVE_PROFILE') && state.url.includes('add')){      
      showErrorMessageNotification('Acesso não autorizado.')
      return of(false)
    }

    if (!checkGroups(pms,'UPDATE_PROFILE') && state.url.includes('edit')){      
      showErrorMessageNotification('Acesso não autorizado.')
      return of(false)
    }

    return true
  }

}