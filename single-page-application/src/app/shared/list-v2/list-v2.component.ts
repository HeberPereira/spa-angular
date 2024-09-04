import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import { ResponseDataModel } from '../../_models/response-data-model'
import { EdsColumn } from '../../_models/eds-column-model'
import { HttpErrorResponse } from '@angular/common/http'
import { Service } from '../../_models/service-model'
import { debounceEvent, showErrorNotification, showNotifications } from 'src/app/utils'
import { TableComponent } from '../table/table.component'
import { additionalButton } from 'src/app/_models/additional-button-model'
import { LoadingSpinnerService } from 'src/app/_services/interceptors/loader.service'
import { FilterGrid } from 'src/app/_models/filter'

@Component({
  selector: 'app-list-v2',
  templateUrl: './list-v2.component.html',
  styleUrls: ['./list-v2.component.css']
})
export class ListV2Component implements OnInit, AfterViewInit {
  data: unknown[]
  originalData: unknown[]

  @Input() resourceName: string
  @Input() id: string = 'app-list-v2-' + Math.round(Math.random() * 100000).toString() //to allow more than one component per page
  @Input() hideFilter: string
  @Input() editBtnCustomName: string
  @Input() editBtnCustomIconName: string
  @Input() service: Service<unknown>
  @Input() dataSourceList: any
  @Input() totalRecords: number;
  @Input() tableColumns: EdsColumn[]
  @Input() subtableColumns: EdsColumn[]
  @Input() EnabledPagination = true
  @Input() selectable: string = 'multi' // 'single' 'none'
  @Input() expandable: boolean = false
  @Input() propertySubData: string
  @Input() MessageEmptyRows: string = 'No data found.'
  @Input() ReplaceBooleanToIcon: boolean = false
  @Input() DescriptionSubTable: string
  @Input() additionalButtons: additionalButton<unknown>[]
  @Input() removedButtons: ('add' | 'edit' | 'delete')[]
  @Output() editButtonEmitter: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output() addButtonEmitter: EventEmitter<void> = new EventEmitter<void>()
  @Output() onDataChange: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output() onDataSelected: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output() onPaginationChangedEmitter: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output() onNumPerPageChangedEmitter: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output() editedCellEmitter: EventEmitter<unknown> = new EventEmitter<unknown>()

  @ViewChild('tableComponent') tableComponent: TableComponent

  constructor(private loaderService: LoadingSpinnerService) {  }
  ngOnInit(): void {
    this.getNewData()
  }
  public clearSelected() {  }
  ngAfterViewInit(): void {
    const dialogDOM: HTMLDivElement = document.querySelector(
      '#' + this.id + '-deleteConfirmationDialog'
    )
    const deleteButton: HTMLElement = document.querySelector(
      '#' + this.id + '-deleteConfirmationButton'
    )

   
   
  }
  
  deleteTableRow = (selectedRows: Record<string, unknown>[]): void => {
    const ids: number[] = selectedRows.map(resource => resource.id as number)
    this.service
      .delete(ids)
      .subscribe(this.successRequestCB, this.errorRequestCB)
      
  }
  editButtonClicked = (selectedRows: unknown[]): void => {
    this.editButtonEmitter.emit(selectedRows)
    debounceEvent(() => {
      const firstDialogInput = document.querySelector(
        '.dialog input'
      ) as HTMLInputElement
      firstDialogInput?.focus()
    })()
  }
  informDataOutput(dataSelected: unknown[]): void {
    this.onDataSelected.emit(dataSelected)
  }
  editedCell(id: any): void {
    this.editedCellEmitter.emit(id);
  }
  addButtonClicked = (): void => {
    this.addButtonEmitter.emit()
    debounceEvent(() => {
      const firstDialogInput = document.querySelector(
        '.dialog input'
      ) as HTMLInputElement
      firstDialogInput?.focus()
    })()
  }
  paginationChange = (evt: any): void => {
    this.onPaginationChangedEmitter.emit(evt)
  }
  numPerPageChanged = (evt: any): void => {
    this.onNumPerPageChangedEmitter.emit(evt)
  }
  public emitData() {
    debounceEvent(() => {
      this.getNewData()
    }, 10)()
  }
  getNewData = (): void => {
    this.originalData = [...this.dataSourceList.data || this.dataSourceList]
    this.data = [...this.dataSourceList.data || this.dataSourceList]
  }
  onFilter(filter: FilterGrid) {    
    if (filter.value) {
      this.data = this.originalData.filter(c => {
        for(let i = 0; i < filter.fields.length; i++){
          let field = filter.fields[i];

          if (typeof c[field] == 'undefined')
            return false;

          if (typeof c[field] === 'boolean')
            if (filter.value.length === 4 || filter.value.length === 5)
              if (c[field].toString().toLowerCase().includes(filter.value.toLowerCase()))
                return true;

          if (typeof c[field] == 'string'){
            if (c[field]) {
              if (c[field].toLowerCase().includes(filter.value.toLowerCase()))
                return true;
            }
          } else {
            for(let i = 0; i < c[field].length; i++){             
              if (c[field][i].toLowerCase().includes(filter.value.toLowerCase()))
                return true;
            }
          }          
        }
      });
    } else {
      this.data = this.originalData;
    }
  }
  successRequestCB = (response: ResponseDataModel<unknown | void>): void => {
    this.onDataChange.emit();
    showNotifications({
      title: 'Success',
      description: response.message ?? 'Action executed successfully.'
    })
  }

  errorRequestCB = (error: HttpErrorResponse): void => {
    showErrorNotification(error)
  }

  // isVisible(actionType: 'single' | 'batch' | 'free'): boolean {
  //   if (actionType === 'free') return false
  //   if (!this.tableComponent) return true
  //   const selectedsLength = this.tableComponent.table.selected.length
  //   if (actionType === 'single' && selectedsLength > 0 && selectedsLength < 2)
  //     return false
  //   if (actionType === 'batch' && selectedsLength > 0) return false
  //   return true
  // }
}
