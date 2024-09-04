import { PrivacyPolicyStatus } from './../../../_models/privacy-policy';
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { asyncScheduler, Observable, Subject } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import {
  changeVisibility,
  debounceEvent,
  showNotifications,
  showErrorNotification,
  showLoadingInSubmitButton
} from 'src/app/utils'
import { inputMaxLengthHtml } from 'src/app/utils/globals'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { PrivacyPolicyService } from 'src/app/_services/privacy-policy.service'
import { PrivacyPolicy } from 'src/app/_models/privacy-policy'

@Component({
  selector: 'app-privacy-policy-form',
  templateUrl: './privacy-policy-form.component.html'
})
export class PrivacyPolicyFormComponent implements OnInit, OnDestroy {

  public maxLength = inputMaxLengthHtml
  public rsgTypes: { type: string }[] = []
  public specialsExceptions = '_.'
  public privacyPolicyForm = this.createFormGroup()
  private defaultBody: PrivacyPolicy
  public changeVisibility = changeVisibility

  private $destroy: Subject<boolean> = new Subject<boolean>()

  privacyPolicy: PrivacyPolicy
  privacyPolicyObj: PrivacyPolicy
  privacyPolicyStatus: PrivacyPolicyStatus[]

  dirty = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private privacyPolicyService: PrivacyPolicyService,
    private router: Router
  ) {
    this.privacyPolicyObj = new PrivacyPolicy()
  }

  ngOnInit(): void {
    this.processParamData()
    this.privacyPolicyStatus = Array<PrivacyPolicyStatus>()

    this.processSetPrivacyPolicyStatus(1, 'Draft')
    this.processSetPrivacyPolicyStatus(2, 'Current')
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: 0,
      privacyPolicyStatus: ['', Validators.required],
      conditions: ['', Validators.required],
      concurrencyToken: undefined
    })
  }

  processParamData(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((param: Params) => {
          const id = param['idPrivacyPolicy']
          if (id) {
            return this.privacyPolicyService.findOne(id).pipe(
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
      .subscribe((privacyPolicyResp: any) => {
        if (privacyPolicyResp.data) {
          this.privacyPolicyObj = privacyPolicyResp.data
        }

        debounceEvent(() => {
          this.privacyPolicyForm.patchValue(this.privacyPolicyObj)
          this.privacyPolicyForm.markAsPristine()
        }, 10)()
      }, this.errorCB)
  }

  processSetPrivacyPolicyStatus(privacyPolicyStatus: number, name: string): void {
    this.privacyPolicyStatus.push({
      privacyPolicyStatus: privacyPolicyStatus,
      name: name,
      concurrencyToken: undefined
    })
  }

  onSubmit(): void {
    showLoadingInSubmitButton(true)

    this.privacyPolicy = Object.assign({}, this.privacyPolicyForm.value)

    if (this.privacyPolicy.id) {

      this.privacyPolicyService.update(this.privacyPolicy.id, this.privacyPolicy).subscribe(response => {
        this.successCB(response)
      }, this.errorCB)
    } else {
      this.privacyPolicyService.create(this.privacyPolicy).subscribe(response => {
        this.successCB(response)
      }, this.errorCB)
    }
  }

  successCB = (response: ResponseDataModel<PrivacyPolicy>): void => {
    showLoadingInSubmitButton(false)
    this.privacyPolicyForm.reset(this.defaultBody)
    this.router.navigate(['user-management', 'privacy-policy'])
    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (response: HttpErrorResponse): void => {
    showErrorNotification(response)
  }

  cancel(): void {
    this.router.navigate(['user-management', 'privacy-policy'])
  }
}