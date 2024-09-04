import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AccesscredentialsService {
  private subject = new Subject<any>()

  constructor(private router: Router) { }

  public redirectToInvoice() {
    // console.log(`redirecting to ${environment.baseURL}`)
  }

  public redirectNotAuthorized() {
    console.log('redirecting to not authorized page')
    this.router.navigateByUrl('notauthorizedpage')
  }

  public checkGroups(gruponome: string) {
    let acesso = false
    return new Promise(resolve => {
      const grupos = sessionStorage.getItem('userGrupos')

      if (grupos != null) {
        const arrGrupos = JSON.parse(grupos)
        arrGrupos.forEach(grupo => {
          if (grupo.DescricaoGrupo === gruponome) {
            acesso = true
            
          }
        })
      }

      if(acesso)
        //this._lobrapService.SaveLog('Access the page:' + window.location.pathname, TypeInterface.Navegation, Plataform.Web)
        console.log('Access the page:' + window.location.pathname)
      else
        console.log('Access denied to pages:' + window.location.pathname)
      //this._lobrapService.SaveLog('Access denied to pages:' + window.location.pathname, TypeInterface.Authentication, Plataform.Web)

      resolve(acesso)

    })

  }

  public sendCompleteAuth(_code: number, _message: string, _userdata: any) {
    this.subject.next({ code: _code, text: _message, userdata: _userdata })
  }

  public clearMessages() {
    this.subject.next()
  }

  public getAuth(): Observable<any> {
    return this.subject.asObservable()
  }

}
