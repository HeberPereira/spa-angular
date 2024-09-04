import { PermissionService } from './../../../_services/permission.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { asyncScheduler, Observable, Subject } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { changeVisibility, debounceEvent, showNotifications, showErrorNotification, showLoadingInSubmitButton, sortByProperty, showLoadingInFinishtButton } from 'src/app/utils'
import { inputMaxLengthHtml } from 'src/app/utils/globals'
import { Profile } from 'src/app/_models/profile'
import { ResponseDataModel } from 'src/app/_models/response-data-model'
import { ProfileService } from 'src/app/_services/profile.service'
import { ListBuilderV2Component } from 'src/app/shared/list-builder-v2/list-builder-v2.component'

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  @ViewChild('listaPermissions') listaPermissions: ListBuilderV2Component

  public maxLength = inputMaxLengthHtml
  public items: { type: string }[] = []
  public specialsExceptions = '_.'
  public profileForm = this.createFormGroup()
  private defaultBody: Profile = {
    id: 0,
    name: '',
    description: '',
    idmRole: '',
    adGroupId: '',
    permissions: [],
    concurrencyToken: undefined
  }

  public changeVisibility = changeVisibility

  private $destroy: Subject<boolean> = new Subject<boolean>()

  profile: Profile
  profileObj: Profile
  clearAllCustomers = false
  disableCustomer = true
  dirty = false
  isLastStep: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    public permissionService: PermissionService,
    private router: Router
  ) {
    this.profileObj = new Profile()
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
      permissions: [],
      name: new FormControl(this.profileObj?.name, [Validators.required]),
      description: new FormControl(this.profileObj?.description, [Validators.required]),
      idmRole: new FormControl(this.profileObj?.idmRole, [Validators.required]),
      adGroupId: new FormControl(this.profileObj?.adGroupId, [Validators.required]),
      concurrencyToken: undefined
    })
  }

 
  wizardChangeStateHandler(e: any): void {
    var wizardNext = <HTMLInputElement>document.getElementById("wizard-next")
    var wizardFinish = <HTMLInputElement>document.getElementById("wizard-finish")

    this.isLastStep = (e.detail.state.currentStep == e.detail.state.numSteps - 1)

    if (!this.isLastStep) {
      wizardFinish.classList.add('hidden')
      wizardNext.classList.remove('hidden')
    }
    else {
      wizardFinish.classList.remove('hidden')
      wizardNext.classList.add('hidden')
    }
  }

 
  processParamData(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((param: Params) => {
          const id = param['idProfile']
          if (id) {
            return this.profileService.findOne(id).pipe(
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
      .subscribe((profileResp: any) => {
        if (profileResp.data) {
          this.profile = profileResp.data

          this.profileObj = profileResp.data
          this.profileObj.name = profileResp.data.name
          this.profileObj.description = profileResp.data.description
          this.profileObj.idmRole = profileResp.data.idmRole
          this.profileObj.adGroupId = profileResp.data.adGroupId
        }

        this.loadPermissions()

        debounceEvent(() => {
          this.profileForm.patchValue(this.profileObj)
          this.profileForm.markAsPristine()
        }, 10)()
      }, this.errorCB)


  }

  loadPermissions(): void {
    this.permissionService.findAll().subscribe(
      resp => {
        var permissions = resp.data
        //let sourcePermissions = Array.from(permissions, function (p) { return p.name })
        this.listaPermissions.setItems(permissions);
        this.listaPermissions.setSelectedItems(this.profileObj?.permissions)
      }
    )
  }

  onSubmit(): void {
    showLoadingInFinishtButton(true)
    
    this.profile = Object.assign({}, this.profileForm.value)
    this.profile.permissions = this.listaPermissions.getSelectedItems()

    if (this.profile.id) {

      this.profileService.update(this.profile.id, this.profile).subscribe(response => {
        this.successCB(response)
      }, this.errorCB)
    } else {
      this.profileService.create(this.profile).subscribe(response => {
        this.successCB(response)
      }, this.errorCB)
    }
  }

  successCB = (response: ResponseDataModel<Profile>): void => {
    showLoadingInSubmitButton(false)

    this.profileForm.reset(this.defaultBody)
    this.router.navigate(['user-management', 'profile'])
    showNotifications({
      title: 'Success',
      description: response.message
    })
  }

  errorCB = (response: HttpErrorResponse): void => {
    showLoadingInFinishtButton(false)

    showErrorNotification(response)
  }

  cancel(): void {
    this.router.navigate(['user-management', 'profile'])
  }
}
