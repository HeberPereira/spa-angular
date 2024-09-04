import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LogoutComponent } from './logout.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: LogoutComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [LogoutComponent],
  exports: [LogoutComponent]
})
export class LogoutModule {}
