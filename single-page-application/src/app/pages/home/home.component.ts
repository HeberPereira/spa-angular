/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccesscredentialsService } from './../../_services/accesscredentials.service'
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs' 


declare const $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public releaseNotes 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authResponse: any[] = [];
  authSubscription: Subscription;


  constructor(private credential: AccesscredentialsService) {

    console.log()
  }

  async ngOnInit() {
    this.authSubscription = this.credential.getAuth().subscribe(authResponse => {
      if (authResponse) {
        if (authResponse.code === 200) {
          sessionStorage.setItem('userGrupos', JSON.stringify(authResponse.userdata.Grupos))
          sessionStorage.setItem('userId', authResponse.userdata.IdUsuario)
          sessionStorage.setItem('userLogin', authResponse.userdata.Login)

          this.atualizarInit()
        }

      } else {
        console.log('err login')
        this.credential.redirectNotAuthorized()
        // clear messages when empty message received
        //this.messages = [];
      }
    })
    console.log()
  }
  async ngOnDestroy() {
    console.log()
  }

  atualizarInit() {
    console.log('ok atualizar login ok')
  }
}
