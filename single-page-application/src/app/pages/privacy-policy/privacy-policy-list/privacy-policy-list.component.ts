import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { ListV2Component } from 'src/app/shared/list-v2/list-v2.component'
import { showErrorNotification } from 'src/app/utils'
import { EdsColumn } from 'src/app/_models/eds-column-model'
import { PrivacyPolicy } from 'src/app/_models/privacy-policy'
import { PrivacyPolicyService } from 'src/app/_services/privacy-policy.service'


@Component({
  selector: 'app-privacy-policy-list',
  templateUrl: './privacy-policy-list.component.html'
})

export class PrivacyPolicyListComponent {
  @ViewChild('listaMinha') listaMinha: ListV2Component

  tableColumns: EdsColumn[] = [
    {
      key: 'privacyPolicyStatusDescription',
      title: 'Privacy Policy Status',
      sort: 'asc'
    },
    {
      key: 'conditions',
      title: 'Conditions',
      sort: 'none'
    }
  ]

  dataSource: PrivacyPolicy[]
  constructor(public privacyPolicyService: PrivacyPolicyService, private router: Router) {
    this.dataSource = new Array<PrivacyPolicy>()
   // this.loadPrivacyPolicys()
  }
  
  onDataChange(data) {
    this.dataSource = []
    this.loadPrivacyPolicys()

  }

  
  loadPrivacyPolicys() {

    this.privacyPolicyService.findAll().subscribe(
      (resp: any) => {

        resp.data.forEach(i => {

          this.dataSource.push({
            id: i.id,
            privacyPolicyStatus: i.privacyPolicyStatus,
            privacyPolicyStatusDescription: i.privacyPolicyStatus == 1 ? 'Draft' : i.privacyPolicyStatus == 2 ? 'Current' : 'Outdated',
            conditions: i.conditions, 
            concurrencyToken: i.concurrencyToken
          })
        })

        this.listaMinha.emitData()
      }, err => {
        showErrorNotification(err)
      }
    )
  }

  editTableRow(privacyPolicies: PrivacyPolicy[]): void {
    const privacyPolicy = Object.assign({}, privacyPolicies[0])
    this.router.navigate(['user-management', 'privacy-policy', 'edit', privacyPolicy.id])
  }

  addTableRow(): void {
    this.router.navigate(['user-management', 'privacy-policy', 'add'])
  }
}


