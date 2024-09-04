import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { of } from 'rxjs'
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { checkGroups, showErrorMessageNotification } from '../utils'

@Injectable()
export class PrivacyPolicyGuard implements CanActivateChild {

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    
    const pms = localStorage.getItem('listPermissions')
    
    if (!checkGroups(pms,'SAVE_PRIVACY_POLICY') && state.url.includes('add')){      
      showErrorMessageNotification('Acesso não autorizado.')
      return of(false)
    }

    if (!checkGroups(pms,'UPDATE_PRIVACY_POLICY') && state.url.includes('edit')){      
      showErrorMessageNotification('Acesso não autorizado.')
      return of(false)
    }

    return true
  }

}