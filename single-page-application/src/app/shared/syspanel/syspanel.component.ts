import { AuthUserService } from 'src/app/_services/auth-user.service';
import { Component, Inject, OnInit } from '@angular/core'
import { MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular'
import { SignalRService } from 'src/app/_services/signal-r'

@Component({
  selector: 'app-syspanel',
  templateUrl: './syspanel.component.html',
  styleUrls: ['./syspanel.component.css']
})
export class SyspanelComponent implements OnInit {
  bodyDOM: HTMLBodyElement
  theme: string
  themeToggler: HTMLInputElement
  username: string
  name: string
  teste: string

  constructor(@Inject(MSAL_GUARD_CONFIG) 
              private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService, 
              private authUserService: AuthUserService,
              private appNotificationService: SignalRService) {}

  

  ngOnInit(): void {

    this.username = this.authService.instance.getAllAccounts()[0].username
    this.name = this.authService.instance.getAllAccounts()[0].name

        
    // this.authUserService.getUserTerms().subscribe(resultado =>{
    //   localStorage.setItem('termToAccept', JSON.stringify(resultado))      
    // })

    //this.appNotificationService.startConnection()

    this.bodyDOM = document.querySelector('body')
    this.themeToggler = document.querySelector('#themeToggler')
    this.theme = localStorage.getItem('theme')

    if (this.theme === 'dark') {
      this.bodyDOM.classList.add('dark')
      this.bodyDOM.classList.remove('light')
    } else {
      this.bodyDOM.classList.add('light')
      this.bodyDOM.classList.remove('dark')
    }
  }

  toggleTheme = (): void => {
    this.bodyDOM.classList.toggle('light')
    this.bodyDOM.classList.toggle('dark')
    localStorage.setItem('theme', this.themeToggler.checked ? 'light' : 'dark')
    this.theme = localStorage.getItem('theme')
  }

  clearNotificationLog = (): void => {
    document
      .querySelectorAll('.syspanel .notification-log .notification-log-item')
      .forEach(notification => notification.remove())
    document
      .querySelector('.syspanel .notification-log .notification-log-empty')
      .classList.remove('hidden')
    document
      .querySelector('.syspanel .notification-log .icon-trashcan')
      .setAttribute('hidden', 'true')
   
    localStorage.removeItem('notificationLog')
  }

  isAuthenticated(): boolean {
    return this.authService.instance.getAllAccounts().length>0
  }

  signOut(): void {
    this.authService.logout()
  }

  signIn(): void {
    //this.authService.isAuthenticated()
    // if () {
    //   console.log('sign')
    // } else {
    //   this.authService.login()
    // }

    //this.authService.login()
  }   

  toogleSysPanel(): void{
    document.querySelector('.syspanel').classList.add('hidden')
  }

}
