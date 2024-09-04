/* eslint-disable no-var */
import {
  Component,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceEvent, generateId } from 'src/app/utils'

@Component({
  selector: '[app-multi-select]',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements AfterViewInit {
  @Input() resourceName: string
  @Input() control: FormControl
  @Input() key: string
  @Input() label: string
  @Input() selectType: string
  @Input() data: unknown[]
  @Input() selectedData: unknown[]
  @Input() isDisabled: boolean = false
  @Input() clearAll: boolean
  @Output()
  onClick: EventEmitter<unknown[]> = new EventEmitter<unknown[]>()
  selectID = `id-${generateId()}`
  selectDOM: HTMLElement
  @ViewChildren('option') options: QueryList<ElementRef>
  
  ids: Array<unknown>

  ngAfterViewInit(): void {
    this.options.changes.subscribe(() => {
      if (!this.selectDOM) {
        this.selectDOM = document.getElementById(this.selectID)

        //Cria o evento que retorna os valores selecionados ao clicar em um item da lista
        let optionsList = this.selectDOM.getElementsByClassName('options-list')[0] as HTMLElement;

        optionsList.onmouseup = this.onClickItem.bind(this);
      }

      //preeche caso ja esteja selecionado no load
      document.querySelectorAll(`#${this.selectID} .options-list .item`).forEach((option: HTMLElement) => {
        const checkbox: HTMLInputElement = option.querySelector('input')
        if (this.ids?.includes(option.dataset.id))
          checkbox.checked || checkbox.click()
      })
    })
  }

  ngOnChanges(changes: any): void {
    if (this.clearAll == true) {
      this.resetAll()
    }
  }

  onClickItem = () => {
    debounceEvent(() => {
      this.onClick.emit(this.getSelectedOptions())

      //adiciona o evento para as pills
      let optionsContainer = this.selectDOM.getElementsByClassName('options_container')[0] as HTMLElement;
      optionsContainer.onmouseup = () => {
        debounceEvent(() => {
          this.onClick.emit(this.getSelectedOptions())
        }, 10)()
      }
    }, 10)()
  }

  protected isSelected = (id: number): boolean => {
    return this.ids?.includes(id)
  }

  private getSelectedOptions = (): unknown[] => {
    const selectedOptions: unknown[] = []
    this.selectDOM.querySelectorAll('.item').forEach((option: HTMLElement) => {
      const index = this.data.findIndex(data => {
        const checkbox: HTMLInputElement = option.querySelector('input')
        return checkbox.checked && data[this.key].toString() === option.dataset.id
      })
      if (index !== -1) {
        selectedOptions.push(this.data[index])
      }
    })
    return selectedOptions
  }

  private resetAll() {

    if (!this.selectDOM)
      return null;

    this.selectDOM.querySelectorAll('.item').forEach((option: HTMLElement) => {
      const checkbox: HTMLInputElement = option.querySelector('input')
      checkbox?.checked && checkbox?.click()
    })
    this.control?.patchValue([])
    this.control?.markAsPristine()

    return false;
  }

  setSelectedOptions = (selectedOptions: unknown[]): void => {
    const ids = selectedOptions.map(option => option['id'].toString())


    if (!this.selectDOM)
      return debounceEvent(this.setSelectedOptions)(selectedOptions)

    this.selectDOM.querySelectorAll('.item').forEach((option: HTMLElement) => {
      const checkbox: HTMLInputElement = option.querySelector('input')
      if (ids.includes(option.dataset.id)) {
        checkbox.checked || checkbox.click()
      } else {
        checkbox.checked && checkbox.click()
      }
    })

    let optionsContainer = this.selectDOM.getElementsByClassName('options_container')[0] as HTMLElement;
    optionsContainer.onmouseup = () => {
      debounceEvent(() => {
        this.onClick.emit(this.getSelectedOptions())
      }, 10)()
    }

    this.control.patchValue(selectedOptions.map(option => option['id']))
    this.control.markAsPristine()
  }
}
