import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { generateId } from 'src/app/utils'

@Component({
  selector: '[app-simple-modal]',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent implements AfterViewInit {
  @Input() text: string

  @Output() onClose: EventEmitter<unknown> = new EventEmitter<unknown>()
  @Output() onOkClick: EventEmitter<unknown> = new EventEmitter<unknown>()


  ngAfterViewInit(): void {
    //this.isDisabled = false

  }

  closeModal() {
    this.onClose.emit('close')
  }
}
