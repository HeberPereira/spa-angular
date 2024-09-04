import {Input, Component, OnInit } from '@angular/core'
import { default as HelpRoutes } from '../../../assets/help-route.json'

@Component({
  selector: 'app-help-route',
  templateUrl: './help-route.component.html',
  styleUrls: ['./help-route.component.css']
})
export class HelpRouteComponent implements OnInit {
  public helpRoutes = HelpRoutes
  
  @Input() PageDescription: string
  @Input() Route: string
  
  ngOnInit(): void {
    
  }

  openUrl(): void {
    window.open(this.helpRoutes.routes[this.Route], '_blank')
  }
  

}
