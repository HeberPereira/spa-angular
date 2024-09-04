import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../_services/auth.service'
import {ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree { 

    

    return true    
    
  
  }
}
