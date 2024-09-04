import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ChangeHistoryFormComponent } from './change-history-form/change-history-form.component'
import { ChangeHistoryComponent } from './change-history.component'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChangeHistoryListComponent } from './change-history-list/change-history-list.component'

const routes: Routes = [
  {
    path: '',
    component: ChangeHistoryComponent,
    children: [
      {
        path: '',
        component: ChangeHistoryListComponent
      },
      {
        path: 'view/:idChangeHistory',
        component: ChangeHistoryFormComponent
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
  declarations: [ChangeHistoryFormComponent, ChangeHistoryComponent, ChangeHistoryListComponent],
  exports: [ChangeHistoryFormComponent, ChangeHistoryComponent, ChangeHistoryListComponent]
})
export class ChangeHistoryModule {}
