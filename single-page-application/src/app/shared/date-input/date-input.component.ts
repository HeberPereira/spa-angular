import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { generateId } from 'src/app/utils';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit, AfterViewInit {
  @Input() control: FormControl
  @Input() min: Date

  datepickerID = `date-picker-${generateId()}`
  datepickerDOM: HTMLElement
  
  
  constructor(private formBuilder: FormBuilder) { }
  
  ngAfterViewInit(): void {
    this.initDatePicker()
  }

  ngOnInit(): void {
        
  }

  initDatePicker() {
    this.datepickerDOM = <HTMLElement>document.querySelectorAll('#' + this.datepickerID)[0];
  }

  update(e) {
    this.control.setValue(e.target.value)
  }

}
