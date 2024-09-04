import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core'
import { EdsColumn } from '../../_models/eds-column-model'
import { debounceEvent } from 'src/app/utils'
import { LoadingSpinnerService } from 'src/app/_services/interceptors/loader.service'
import { inputMaxLength } from 'src/app/utils/globals'

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Output()
  deleteButtonClicked: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output()
  editButtonClicked: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  @Output()
  addButtonClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output()
  paginationChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  numPerPageChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  editedCellEmitter: EventEmitter<unknown> = new EventEmitter<unknown>()
  @Input() data: unknown[]
  @Input() tableColumns: EdsColumn[]
  @Input() subtableColumns: EdsColumn[]
  @Input() id: string //= "app-table-" + Math.round(Math.random() * 100000).toString() //fix: allowing more than one component per page
  @Input() paginationObj: any
  @Input() totalRecords: any
  @Input() selectable: string = 'multi' // 'single' 'none'
  @Input() expandable: boolean = false
  @Input() propertySubData: string
  @Input() MessageEmptyRows: string = 'No data found.'
  @Input() ReplaceBooleanToIcon: boolean = false
  @Input() EnabledPagination: boolean = true
  @Input() DescriptionSubTable: string
  filteredData: unknown[]
  tableDOM: Element
  isLoading = false

  constructor(private loaderService: LoadingSpinnerService) {

  }

  ngOnInit(): void {
    this.tableColumns.forEach(column => column.sort = column.sort || 'none')

    //show loading spinner on service request
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      this.isLoading = status;
    });
  }

  ngAfterViewInit(): void {
    //({  tableDOM: this.tableDOM } = this.createEDSTable())
    this.filteredData = this.data
    this.handleAdd()
    this.handleDelete()
    this.handleEdit()
    this.handleFilter()
    this.handleChangePage()
  }

  ngOnDestroy(): void {
    document.querySelector('.dialog.table-settings').remove()
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data?.isFirstChange()) {
      return
    }

    this.initPagination()
    this.data = changes.data?.currentValue
    //this.table.update(changes.data.currentValue,this.paginationObj?.totalRecords|| changes.data.currentValue.length)
    
    //  this.table.setTotalRecords(this.totalRecords)
    this.toggleEditButton()
    this.toggleDeleteButton()


    if (!this.isLoading && this.data?.length === 0) {
      (
        document.querySelector('#' + this.id + '-table .no-data-row')
          .childNodes[0] as HTMLTableColElement
      ).innerText = this.MessageEmptyRows
    }
  }

  // createEDSTable = (): { table: Table; tableDOM: Element } => {

  //   const tableDOM = document.querySelector('#' + this.id + '-table')
  //   const table = new Table(tableDOM as HTMLElement, {
  //     data: this.filteredData,
  //     columns: this.tableColumns,
  //     selectable: this.selectable,
  //     expandable: this.expandable,
  //     sortable: true,
  //     actions: true,
  //     scroll: true,
  //     onEditedCell: this.handleEditCell,
  //     onCreatedRow: this.handleCreatedRow,
  //     onCreatedDetailsRow: (td, data) => {
  //       if (this.subtableColumns) {
  //         let htmlSubTable: string = '';
  //         if (this.DescriptionSubTable)
  //           htmlSubTable = `<div><p>${this.DescriptionSubTable}</p></div>`

  //         htmlSubTable += `<table id="${this.id}-sub-table" class="table subtable"></table>`
  //         td.innerHTML = htmlSubTable

  //         const subtableDOM = td.childNodes[td.childNodes.length - 1];

  //         const subtable = new Table(subtableDOM as HTMLElement, {
  //           data: data[this.propertySubData],
  //           columns: this.subtableColumns,
  //           selectable: 'none',
  //           expandable: false,
  //           sortable: false,
  //           actions: false,
  //           scroll: true,
  //           onCreatedRow: this.handleCreatedRow,
  //         })
  //         subtable.init();
  //       }
  //     }
  //   })
  //   table.init()

  //   return { table, tableDOM }
  // }

  handleAdd = (): void => {
    document.querySelector('#' + this.id + '-addButton')?.addEventListener('click', () => {
      this.addButtonClicked.emit()
    })
  }

  handleChangePage = (): void => {
    const paginationDOM = document.querySelector('#dynamic-example')
    if (paginationDOM) {
      paginationDOM.addEventListener('paginationChangePage', (evt: Event) => {
        this.paginationChanged.emit(evt['detail']['state'])

      })
    }
    // paginationDOM.addEventListener('paginationChangeSelect', (evt: Event) => {      
    //   this.paginationChanged.emit(evt['detail']['state'])
    // })
  }

  onClick = (evt): void => {
    console.log(evt)
  }
  onPerPageChange(event: any) {
    event.path[1].classList.remove('closed');
  }
  initPagination = (): void => {
    const paginationDOM = document.querySelector('#dynamic-example')

    if (paginationDOM && this.paginationObj) {
      // this.pagination = new Pagination(paginationDOM as HTMLElement)
      // this.pagination.init(this.paginationObj?.totalRecords || 0)
      document.querySelector('.pagination-group ul.pagination li.active').classList.remove('active')
      document.querySelectorAll('.pagination-group ul.pagination li')[this.paginationObj?.pageNumber].classList.add('active')
      //    this.table.setTotalRecords(this.paginationObj.totalRecords)
    }
  }
  onPerPageSelectChange = (numPerPage) => {
    this.numPerPageChanged.emit({ numPerPage: numPerPage, currentPage: this.paginationObj?.pageNumber })
    this.handleChangePage()
  }

  handleDelete = (): void => {
    document.querySelector('#deleteButton')?.addEventListener('click', () => {
      //this.deleteButtonClicked.emit(this.table.selected)
      this.toggleDeleteButton()
      this.toggleEditButton()
    })

    this.tableDOM.addEventListener('toggleSelectRow', this.toggleDeleteButton)
    this.toggleDeleteButton()
  }

  handleEdit = (): void => {
    document.querySelector('#' + this.id + '-editButton')?.addEventListener('click', () => {
      //this.editButtonClicked.emit(this.table.selected)
      this.toggleEditButton()
    })

    this.tableDOM.addEventListener('toggleSelectRow', this.toggleEditButton)
    this.toggleEditButton()
  }

  handleEditCell = (htmlCell: HTMLTableCellElement, valueCell: any, lineIndex: number): void => {

    console.log(htmlCell);
    this.editedCellEmitter.emit({ value: valueCell, line: lineIndex })
  }

  handleCreatedRow = (tr: any, entity: any, index: any) => {
    if (this.ReplaceBooleanToIcon) {
      for (let i = 0; i < tr.childNodes.length; i++) {
        let td = tr.childNodes[i];
        if (td.innerText.toString().toLowerCase() == "true")
          td.innerHTML = ' <i class="icon icon-success circle-green"></i>'
        else if (td.innerText.toString().toLowerCase() == "false")
          td.innerHTML = ' <i class="icon icon-failed circle-red"></i>'
      }
    }
  }

  toggleDeleteButton = (): void => {
    const deleteButton: HTMLElement = document.querySelector(
      '#' + this.id + '-deleteConfirmationButton'
    )
    if (deleteButton) {
      //deleteButton.style.display =
        //this.table.selected.length === 0 ? 'none' : ''
    }
  }

  toggleEditButton = (): void => {
    const editButton: HTMLElement = document.querySelector('#' + this.id + '-editButton')
    if (editButton) {
      //editButton.style.display =
       // this.table.selected.length < 1 || this.table.selected.length > 1
       //   ? 'none'
       //   : ''
    }
  }

  handleFilter = (): void => {

    const filterInput = document.querySelector('#' + this.id + '-filter') as HTMLInputElement
    const filterSelect = document.querySelector('#' + this.id + '-filterSelect')

    filterSelect?.addEventListener(
      'click',
      debounceEvent(() => this.filter(filterInput.value))
    )

    filterInput?.addEventListener(
      'keyup',
      debounceEvent((event: Event) => {
        const textValue = (event.target as HTMLInputElement).value
        this.filter(textValue)
      }, 200)
    )

    filterInput?.addEventListener(
      'onpaste',
      debounceEvent((event: Event) => {
        const textValue = (event.target as HTMLInputElement).value
        this.filter(textValue)
      }, 200)
    )
  }

  filter = (textValue: string): void => {
    if (textValue.trim() !== '' && textValue.trim() !== ',') {
      const data = this.data.map(obj => Object.assign({}, obj))
      const optionsList: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        '#' + this.id + '-filterSelect .options-list .item'
      )
      let columns: string[] = []

      // If select has at least one column option selected: filter by it
      // else: filter by all columns
      optionsList.forEach(option => {
        const checkbox: HTMLInputElement = option.querySelector('input')
        if (checkbox.checked) {
          columns.push(
            this.getKeyByTitle((option as HTMLElement).dataset.value)
          )
        }
      })
      if (columns.length === 0) {
        columns = this.tableColumns.map((col: EdsColumn) => col.key)
      }

      this.filteredData = data.filter((col: Record<string, unknown>) => {
        col = Object.assign({}, col)
        Object.keys(col).forEach((key: string) => {
          if (!columns.includes(key)) {
            delete col[key]
          }
        })

        return Object.values(col).some(value =>
          textValue
            .trim()
            .toLowerCase()
            .split(',')
            .filter(txt => txt)
            .some(input =>
              String(value).toLowerCase().trim().includes(input.trim())
            )
        )
      })
    } else {
      this.filteredData = this.data
    }

    //this.table.update(this.filteredData)
    this.toggleDeleteButton()
    this.toggleEditButton()
    //this.table.setTotalRecords(this.filteredData.length)
  }

  private getKeyByTitle(title: string) {
    return this.tableColumns.find(
      tableColumn => tableColumn.title.toLowerCase() === title?.toLowerCase()
    ).key
  }

  
}

