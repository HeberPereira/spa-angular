import { PrivacyPolicyStatus } from '../../../_models/privacy-policy'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import {
  changeVisibility,
  showNotifications,
  showErrorNotification,
  showLoadingInSubmitButton
} from 'src/app/utils'
import { inputMaxLengthHtml } from 'src/app/utils/globals'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { PrivacyPolicyService } from 'src/app/_services/privacy-policy.service'
import { PrivacyPolicy } from 'src/app/_models/privacy-policy'
import { AuthUserService } from 'src/app/_services/auth-user.service'

@Component({
  selector: 'app-privacy-policy-accept-form',
  templateUrl: './privacy-policy-accept-form.component.html'
})
export class PrivacyPolicyAcceptFormComponent implements OnInit, OnDestroy {

  public maxLength = inputMaxLengthHtml
  public rsgTypes: { type: string }[] = []
  public specialsExceptions = '_.'
  public privacyPolicyAcceptForm = this.createFormGroup()
  private defaultBody: PrivacyPolicy
  public changeVisibility = changeVisibility
  public privacyPolicyObj: PrivacyPolicy

  private $destroy: Subject<boolean> = new Subject<boolean>()

  privacyPolicy: PrivacyPolicy
  privacyPolicyStatus: PrivacyPolicyStatus[]

  dirty = false

  constructor(
    private formBuilder: FormBuilder,
    private authUserService: AuthUserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const jsonObj = localStorage.getItem('termToAccept')
    this.privacyPolicyObj = JSON.parse(jsonObj).data
    if (this.privacyPolicyObj.id == 0) {
      this.router.navigate(['cluster-settings', 'cluster'])
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: 0,
      concurrencyToken: undefined
    })
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

    this.authUserService.acceptTerms(this.privacyPolicyObj).subscribe(response => {
      this.successCB(response)
    }, this.errorCB)
  }

  successCB = (response: ResponseDataModel<PrivacyPolicy>): void => {
    showLoadingInSubmitButton(false)
    this.privacyPolicyAcceptForm.reset(this.defaultBody)

    // this.authUserService.getUserTerms().subscribe(resultado => {
    //   localStorage.setItem('termToAccept', JSON.stringify(resultado))
    //   window.location.reload()
    // })





    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (response: HttpErrorResponse): void => {
    showErrorNotification(response)
  }
}