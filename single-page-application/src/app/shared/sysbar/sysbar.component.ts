import { AuthService } from './../../_services/auth.service'
import { Component, OnInit } from '@angular/core'


@Component({
  selector: 'app-sysbar',
  templateUrl: './sysbar.component.html',
  styleUrls: ['./sysbar.component.css']
})
export class SysbarComponent implements OnInit {
  public releaseNotes
  public username: string

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
    // this.authService
    //   .getUser()
    //   .subscribe(user => (this.username = user.displayName))
  }

  toogleSysPanelSettings(): void{
    if(document.querySelector('.syspanel').classList.contains('hidden')){
      document.querySelector('.syspanel').classList.remove('hidden')
      document.querySelector('.syspanel .settings').classList.remove('hidden')
      document.querySelector('.syspanel .notification-log').classList.add('hidden')
    }
    else{
      if(document.querySelector('.syspanel .settings').classList.contains('hidden')){
        document.querySelector('.syspanel .settings').classList.remove('hidden')
        document.querySelector('.syspanel .notification-log').classList.add('hidden')
      }
      else{
        document.querySelector('.syspanel').classList.add('hidden')
      }
    }
  }

  toogleSysPanelNotification(): void{
    if(document.querySelector('.syspanel').classList.contains('hidden')){
      document.querySelector('.syspanel').classList.remove('hidden')
      document.querySelector('.syspanel .settings').classList.add('hidden')
      document.querySelector('.syspanel .notification-log').classList.remove('hidden')
    }
    else{
      if(document.querySelector('.syspanel .notification-log').classList.contains('hidden')){
        document.querySelector('.syspanel .settings').classList.add('hidden')
        document.querySelector('.syspanel .notification-log').classList.remove('hidden')
      }
      else{
        document.querySelector('.syspanel').classList.add('hidden')
      }
    }
  }
}
