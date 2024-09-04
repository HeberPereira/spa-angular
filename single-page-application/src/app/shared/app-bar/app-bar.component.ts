import { Event, NavigationStart, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'


@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  
  breadcrumbsPaths: string[]

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.breadcrumbsPaths = event.url.slice(1).split('/')
       
      }
    })
    this.breadcrumbsPaths = this.router.url.slice(1).split('/')
  }


  formatMethod(text: string): string {
    return text.replace(/add.*/gi, 'New').replace(/edit.*/gi, 'Update')
  }

  captalize(text: string): string {
    const textArray = text.split('-')
    const resultString = textArray.map(
      txt => txt.substr(0, 1).toUpperCase() + txt.substr(1)
    )
    return resultString.join(' ')
  }

  changeTitle(): void {
    document.title = `IOBOX ${this.captalize(
      this.breadcrumbsPaths.slice(1).join(' | ') || 'Home'
    )}`
  }
}
