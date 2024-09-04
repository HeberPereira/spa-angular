import { AfterViewInit, Component } from '@angular/core'

import { AuthService } from 'src/app/_services/auth.service'

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements AfterViewInit {

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    // const layout = new Layout(document.querySelector('body'))
    // layout.init()

    // const tree = new Tree(document.querySelector('.tree.navigation'))
    // tree.init()

    // NotificationLog.init()
    // if (localStorage.getItem('notificationLog')) {
    //   NotificationLog.loadNotificationLog(
    //     JSON.parse(localStorage.getItem('notificationLog'))
    //   )
    // }
    // if (NotificationLog.state.notifications.length === 0) {
    //   document
    //     .querySelector('.syspanel .notification-log .icon-trashcan')
    //     .setAttribute('hidden', 'true')
    // }
   
  }

  toggleMenu(menuObj: any) {

    menuObj.toggle()
    if (document.querySelector('.actions-left').getAttribute('style')) {
      document.querySelector('.actions-left').removeAttribute('style')
      document.querySelector('.title.open-menu').removeAttribute('style')
      document.querySelector('.fa-xmark').removeAttribute('style')
      document.querySelector('.fa-bars').setAttribute('style','display:none')
    }
    else {
      document.querySelector('.actions-left').setAttribute('style', 'width:60px')
      document.querySelector('.title.open-menu').setAttribute('style', 'left:60px')
      document.querySelector('.fa-xmark').setAttribute('style','display:none')
      document.querySelector('.fa-bars').removeAttribute('style')
    }


  }
}
