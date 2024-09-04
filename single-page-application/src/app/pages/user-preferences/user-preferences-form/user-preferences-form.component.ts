import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { asyncScheduler, Observable, Subject } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import {
  changeVisibility,
  debounceEvent,  
  showNotifications,
  showErrorNotification,
  showLoadingInformations
} from 'src/app/utils'
import { inputMaxLengthHtml } from 'src/app/utils/globals'
import { UserPreferences } from 'src/app/_models/user-preferences'
import {Preferences} from 'src/app/_models/preferences'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { UserPreferencesService } from 'src/app/_services/user-preferences.service'
import { PreferencesService } from 'src/app/_services/preferences.service'
import { FormField } from 'src/app/_models/form-field'

@Component({
  selector: 'app-user-preferences-form',
  templateUrl: './user-preferences-form.component.html'
})
export class UserPreferencesFormComponent implements OnInit, OnDestroy {
  public maxLength = inputMaxLengthHtml
  public rsgTypes: { type: string }[] = []
  public specialsExceptions = '_.'
  public formFields: FormField[]
  public formFieldsCheck: FormField[]
  public changeVisibility = changeVisibility
  

  private $destroy: Subject<boolean> = new Subject<boolean>()

  userPreference: UserPreferences[]
  preference: Preferences[]
   
  constructor(
    private userPreferencesService: UserPreferencesService,
    ) 
  {
    
  }

  ngOnInit(): void {
    this.processParamData()
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }
  
  disablePreference(id: number, event: any) {
    this.userPreference.filter(c => c.preferenceId == id)[0].active = event.target.checked
    this.userPreference.filter(c => c.preferenceId == id)[0].value = event.target.checked
   
  }
 
  processParamData(): void {
    showLoadingInformations(true)
    this.userPreferencesService.findByUser()
      .subscribe((preferenceResp: any) => {
        showLoadingInformations(false)
        this.userPreference = preferenceResp.data
           
      }, this.errorCB)
  }
  
  successCB = (response: ResponseDataModel<UserPreferences[]>): void => {
    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (response: HttpErrorResponse): void => {
    showErrorNotification(response)
  }

  onSubmit(): void { 
    
    this.userPreferencesService.update(this.userPreference).subscribe(response => {
      this.successCB(response)
      window.location.reload()
    }, this.errorCB)
    
  }
}
  

  

  





