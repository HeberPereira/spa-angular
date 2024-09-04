import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { UserPreferencesFormComponent } from './user-preferences-form/user-preferences-form.component'
import { UserPreferencesComponent } from './user-preferences.component'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


const routes: Routes = [
  {
    path: '',
    component: UserPreferencesComponent,
    children: [
      {
        path: '',
        component: UserPreferencesFormComponent
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
  declarations: [UserPreferencesFormComponent, UserPreferencesComponent],
  exports: [UserPreferencesFormComponent, UserPreferencesComponent]
})
export class UserPreferencesModule {}
