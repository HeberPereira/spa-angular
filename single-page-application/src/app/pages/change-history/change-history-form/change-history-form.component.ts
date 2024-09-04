import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { asyncScheduler, Observable, Subject } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import {
  changeVisibility,
  debounceEvent,
  showNotifications
} from 'src/app/utils'
import { inputMaxLengthHtml } from 'src/app/utils/globals'
import { ChangeHistory } from 'src/app/_models/change-history'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { ChangeHistoryService } from 'src/app/_services/change-history.service'

@Component({
  selector: 'app-change-history-form',
  templateUrl: './change-history-form.component.html'
})
export class ChangeHistoryFormComponent implements OnInit, OnDestroy {
  public maxLength = inputMaxLengthHtml
  public rsgTypes: { type: string }[] = []
  public specialsExceptions = '_.'
  public changeHistoryForm = this.createFormGroup()
  private defaultBody: ChangeHistory = {
    id: 0,
    eventDate: '',
    eventType: '',
    newValue: '',
    recordId: '',
    tableName: '',
    userName: ''
  }
  public changeVisibility = changeVisibility

  private $destroy: Subject<boolean> = new Subject<boolean>()

  changeHistorys: ChangeHistory[] = []
  changeHistory: ChangeHistory
  changeHistoryObj: ChangeHistory
  clearAllCustomers = false
  disableCustomer = true
  dirty = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeHistoryService: ChangeHistoryService,
    private router: Router
  ) {
    this.changeHistoryObj = new ChangeHistory()
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
      id: 0,
      name: ['', Validators.required],
      concurrencyToken: undefined
    })
  }

  processParamData(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((param: Params) => {

          const id = param['idChangeHistory']
          const table = param['table']
          if (id) {
            return this.changeHistoryService.findOne(id, table).pipe(
              map(response => response),
              takeUntil(this.$destroy)
            )
          } else {
            return new Observable(observer => {
              observer.next(this.defaultBody)
              asyncScheduler.schedule(() => observer.complete())
            })
          }
        }),
        takeUntil(this.$destroy)
      )
      .subscribe((changeHistoryResp: any) => {

        this.changeHistory = changeHistoryResp.data

        if (changeHistoryResp.data) {
          this.changeHistoryObj = changeHistoryResp.data
        }

        debounceEvent(() => {
          this.changeHistoryForm.patchValue(this.changeHistoryObj)
          this.changeHistoryForm.markAsPristine()
        }, 10)()
      }, this.errorCB)
  }


  onSubmit(): void {
    this.changeHistory = Object.assign({}, this.changeHistoryForm.value)
  }

  successCB = (response: ResponseDataModel<ChangeHistory>): void => {
    this.changeHistoryForm.reset(this.defaultBody)
    this.router.navigate(['cluster-settings', 'change-history'])
    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (error: HttpErrorResponse): void => {

    showNotifications({
      title: 'Error',
      description: error.error.errors.map(e => { return e.message.toString() })
    })
  }

  cancel(): void {
    this.router.navigate(['cluster-settings', 'change-history'])
  }




}
