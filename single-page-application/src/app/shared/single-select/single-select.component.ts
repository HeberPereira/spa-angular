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
  selector: '[app-single-select]',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.css']
})
export class SingleSelectComponent implements AfterViewInit, OnChanges {
  @Input() resourceName: string
  @Input() clearAll: boolean
  @Input() control: FormControl
  @Input() key: string
  @Input() label: string
  @Input() isDisabled: boolean = false
  currentValue: unknown = {}
  @Input() selectType: string
  @Input() data: unknown[]
  @Input() buttonId: string = '';
  @Input() optionListId: string = '';
  @Output()
  onClick: EventEmitter<unknown> = new EventEmitter<unknown>()
  @ViewChild('componentScope')
  private divComponent: ElementRef
  selectID = `id-${generateId()}`
  selectDOM: HTMLElement

  ngAfterViewInit(): void {
    //this.isDisabled = false
    this.selectDOM = this.divComponent.nativeElement.querySelector(
      `#${this.selectID}`
    )
    this.selectDOM.addEventListener('click', () => this.control?.markAsDirty())
    this.control?.valueChanges.subscribe(value => {
      this.currentValue = this.data.find(data => data[this.key] === value)
      if (this.currentValue) {
        const currentText = this.currentValue[this.label]
        this.selectDOM.querySelectorAll('.item').forEach((div: HTMLElement) => {
          !div.classList.contains('active') &&
            div.innerText.trim() === currentText &&
            div.click()
        })
      } else {
        const currentOption = this.selectDOM.querySelector('.current-options')
        currentOption.innerHTML = `Select ${this.resourceName}`
        const activeElement = this.selectDOM.querySelector(
          '.options-list .item.active'
        )
        activeElement?.classList.remove('active')
      }
    })
  }

  resetAll() {
    const currentOption = this.selectDOM.querySelector('.current-options')
    currentOption.innerHTML = `Select ${this.resourceName}`
    const activeElement = this.selectDOM.querySelector(
      '.options-list .item.active'
    )
    activeElement?.classList.remove('active')
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data?.firstChange) {
      return
    } else {
      if (!this.currentValue) {
        this.currentValue = this.data.find(
          data => data[this.key] === this.control.value
        )
      }
    }

    if (this.clearAll == true) {
      this.resetAll()
    }  
  }

  getSelectedOptions = (): unknown => {
    return this.currentValue
  }

  setSelectedOptions = (selectedOption: string): void => {
    this.currentValue = this.data.find(
      value => value[this.key] == selectedOption
    )
    this.control?.setValue(this.toNumberIfPossible(this.currentValue[this.key]))
    this.onClick.emit(this.currentValue)
    this.control?.markAsPristine()
  }

  toNumberIfPossible(value: string): number | string {
    return Number.isNaN(Number(value)) ? value : parseInt(value)
  }

  setPositionSelectList(e) {
    if(e.currentTarget){
      let element = e.currentTarget.parentElement
      var positionDDHolder = element.getBoundingClientRect();
      var $listOptionHolder = element.parentElement.getElementsByClassName("options-list")[0]

      $listOptionHolder.style.top = (positionDDHolder.top + element.clientHeight) + "px"
      $listOptionHolder.style.left = (positionDDHolder.left) + "px"
    };
    return false;
  }
}
