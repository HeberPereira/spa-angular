import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ProfileFormComponent } from './profile-form/profile-form.component'
import { ProfileComponent } from './profile.component'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfileListComponent } from './profile-list/profile-list.component'
import { MatTableModule } from '@angular/material/table';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileListComponent
      },
      {
        path: 'add',
        component: ProfileFormComponent
      },
      {
        path: 'edit/:idProfile',
        component: ProfileFormComponent
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
    FormsModule,
    MatTableModule
  ],
  declarations: [ProfileFormComponent, ProfileComponent, ProfileListComponent],
  exports: [ProfileFormComponent, ProfileComponent, ProfileListComponent]
})
export class ProfileModule {}
