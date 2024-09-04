import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ServiceSettingFormComponent } from './service-setting-form/service-setting-form.component'
import { ServiceSettingComponent } from './service-setting.component'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


const routes: Routes = [
  {
    path: '',
    component: ServiceSettingComponent,
    children: [
      {
        path: '',
        component: ServiceSettingFormComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  declarations: [ServiceSettingFormComponent, ServiceSettingComponent],
  exports: [ServiceSettingFormComponent, ServiceSettingComponent]
})
export class ServiceSettingModule {}
