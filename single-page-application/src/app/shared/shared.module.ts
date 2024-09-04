import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'
import { FilterComponent } from './filter/filter.component'
import { ListV2Component } from './list-v2/list-v2.component'
import { MultiSelectComponent } from './multi-select/multi-select.component'
import { SingleSelectComponent } from './single-select/single-select.component'
import { TableComponent } from './table/table.component'
import { FileInputComponent } from './file-input/file-input.component'
import { InputValidationsComponent } from './input-validations/input-validations.component'
import { TreeComponent } from './tree/tree.component'
import { SimpleModalComponent } from './simple-modal/simple-modal.component'
import { DateInputComponent } from './date-input/date-input.component'
import { ListBuilderV2Component } from './list-builder-v2/list-builder-v2.component'
import { HelpRouteComponent } from './help-route/help-route.component'
import { CountDownComponent } from './count-down/count-down.component'
import { PaginationComponent } from './pagination/pagination.component'

const components = [
  HelpRouteComponent,
  FilterComponent,
  TableComponent,
  ConfirmationDialogComponent,
  ListV2Component,
  MultiSelectComponent,
  DateInputComponent,
  SingleSelectComponent,
  FileInputComponent,
  InputValidationsComponent,
  TreeComponent,
  SimpleModalComponent,
  ListBuilderV2Component,
  CountDownComponent,
  PaginationComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class SharedModule { }
