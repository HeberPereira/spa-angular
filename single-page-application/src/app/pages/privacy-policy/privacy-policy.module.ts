import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { PrivacyPolicyComponent } from './privacy-policy.component'
import { PrivacyPolicyFormComponent } from './privacy-policy-form/privacy-policy-form.component'
import { PrivacyPolicyListComponent } from './privacy-policy-list/privacy-policy-list.component'
import { PrivacyPolicyAcceptFormComponent } from './privacy-policy-accept-form/privacy-policy-accept-form.component'

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
    children: [
      {
        path: '',
        component: PrivacyPolicyListComponent
      },
      {
        path: 'add',
        component: PrivacyPolicyFormComponent
      },
      {
        path: 'edit/:idPrivacyPolicy',
        component: PrivacyPolicyFormComponent
      },
      {
        path: 'dialog',
        component: PrivacyPolicyAcceptFormComponent
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
  declarations: [PrivacyPolicyComponent, PrivacyPolicyAcceptFormComponent, PrivacyPolicyFormComponent, PrivacyPolicyListComponent],
  exports: [PrivacyPolicyComponent, PrivacyPolicyAcceptFormComponent, PrivacyPolicyFormComponent, PrivacyPolicyListComponent]
})
export class PrivacyPolicyModule {}
