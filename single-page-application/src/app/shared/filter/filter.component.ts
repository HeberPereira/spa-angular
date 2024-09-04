import { Component, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core'
import { EdsColumn } from '../../_models/eds-column-model'
import { FilterGrid } from 'src/app/_models/filter'
import { MultiSelectComponent } from '../multi-select/multi-select.component'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { debounceEvent } from 'src/app/utils'


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements AfterViewInit {
  @Input() tableColumns: EdsColumn[]
  @Output() onFilterEmitter: EventEmitter<unknown> = new EventEmitter<unknown>()
  @ViewChild('fieldSelect') fieldSelect: MultiSelectComponent
  fieldSelected: string[]
  valueSelected: string
  controlFieldSelected = this.createFormGroup()
  fieldsAvaliable: EdsColumn[]
  constructor(private formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {
    this.fieldSelected = this.tableColumns.map(m => m.key);
    debounceEvent(() => { this.fieldsAvaliable = this.tableColumns }, 10)()

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      fieldsSelected: [''],
      value: '',
      concurrencyToken: undefined
    })
  }
  onFilter(textFilter: any): void {
    this.valueSelected = textFilter.target.value
    this.eventEmitterFilter()
  }
  onSelectField(items): void {
    if (items.length > 0)
      this.fieldSelected = items.map(m => m.key);
    else
      this.fieldSelected = this.tableColumns.map(m => m.key);

    this.eventEmitterFilter()
  }

  eventEmitterFilter() {
    let filter: FilterGrid = { value: this.valueSelected, fields: this.fieldSelected };
    this.onFilterEmitter.emit(filter);
  }
}
