import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { inputMaxLength } from 'src/app/utils/globals'

@Component({
  selector: 'app-input-validations',
  templateUrl: './input-validations.component.html',
  styleUrls: ['./input-validations.component.css'],
  host: { class: 'ng-validation-msg' }
})
export class InputValidationsComponent {
  @Input() control: FormControl
  @Input() validations: Validation[]
  @Input() customMessages: {
    [validation in Validation]: string
  }
  inputMaxLength = inputMaxLength

  getErrorList() {
    if (this.control?.errors == null)
      return  [];
    
    return Object.keys(this.control.errors);
  }
}

type Validation =
  | 'whitespace'
  | 'required'
  | 'specials'
  | 'onlyNumbers'
  | 'maxlength'
