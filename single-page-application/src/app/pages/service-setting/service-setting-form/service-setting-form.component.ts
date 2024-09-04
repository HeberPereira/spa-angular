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
import { ServiceSetting } from 'src/app/_models/service-setting'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { ServiceSettingService } from 'src/app/_services/service-setting.service'
import { FormField } from 'src/app/_models/form-field'

@Component({
  selector: 'app-service-setting-form',
  templateUrl: './service-setting-form.component.html'
})
export class ServiceSettingFormComponent implements OnInit, OnDestroy {
  public maxLength = inputMaxLengthHtml
  public rsgTypes: { type: string }[] = []
  public specialsExceptions = '_.'
  public serviceSettingForm = this.createFormGroup()
  public formFields: FormField[]
  public formFieldsCheck: FormField[]
  public formFieldsDate: FormField[]

  private defaultBody: ServiceSetting = {
    id: 0,
    name: '',
    type: '',
    value: ''
    
  }

  public changeVisibility = changeVisibility

  private $destroy: Subject<boolean> = new Subject<boolean>()

  serviceSettings: ServiceSetting[] = []
  serviceSetting: ServiceSetting[]
  serviceSettingObj: ServiceSetting
  clearAllCustomers = false
  disableCustomer = true
  dirty = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceSettingService: ServiceSettingService,
    private router: Router
  ) {
    this.serviceSettingObj = new ServiceSetting()
  }

  ngOnInit(): void {
    this.processParamData()
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: 0      
    })
  }

  processParamData(): void {
    showLoadingInformations(true)
    this.serviceSettingService.findAll()
      .subscribe((serviceSettingResp: any) => {
        showLoadingInformations(false)
        this.serviceSetting = serviceSettingResp.data

        if (serviceSettingResp.data) {
          for (const formField of serviceSettingResp.data) {
            this.serviceSettingForm.addControl(formField.id, new FormControl(formField.value))
          }

          this.formFields = serviceSettingResp.data.filter(record => record.type == 'Int32' || record.type == 'String')
          this.formFieldsCheck = serviceSettingResp.data.filter(record => record.type == 'Boolean')
          this.formFieldsDate = serviceSettingResp.data.filter(record => record.type == 'DateTime')

        }


        debounceEvent(() => {
          this.serviceSettingForm.patchValue(this.serviceSettingObj)
          this.serviceSettingForm.markAsPristine()
        }, 10)()
      }, this.errorCB)
  }

  successCB = (response: ResponseDataModel<ServiceSetting[]>): void => {
    //this.serviceSettingForm.reset(this.defaultBody)
    this.router.navigate(['configuration', 'service-setting'])
    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (response: HttpErrorResponse): void => {
    showErrorNotification(response)
  }

  onSubmit(): void {
    
    const formValues = Object.assign({}, this.serviceSettingForm.value)
    const formArraysKeys = Object.keys(formValues)
    const formArrayValues = Object.values(formValues)

    for (let i = 0; i < formArraysKeys.length - 1; i++) {
      this.serviceSetting.find(s => s.id.toString() == formArraysKeys[i]).value = formArrayValues[i].toString()
    }

    this.serviceSettingService.update(this.serviceSetting).subscribe(response => {
      this.successCB(response)
    }, this.errorCB)
  }
}










