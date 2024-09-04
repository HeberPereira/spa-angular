import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { ListV2Component } from 'src/app/shared/list-v2/list-v2.component'
import { EdsColumn } from 'src/app/_models/eds-column-model'
import { ChangeHistory } from 'src/app/_models/change-history'
import { ChangeHistoryService } from 'src/app/_services/change-history.service'
import { showErrorNotification } from 'src/app/utils'


@Component({
  selector: 'app-change-history-list',
  templateUrl: './change-history-list.component.html'
})

export class ChangeHistoryListComponent {
  @ViewChild('listaMinha') listaMinha: ListV2Component

  tableColumns: EdsColumn[] = [
    {
      key: 'userName',
      title: 'User Name',
      sort: 'asc'
    },
    {
      key: 'eventDate',
      title: 'Event Date',
      sort: 'asc'
    },
    {
      key: 'eventType',
      title: 'Event Type',
      sort: 'asc'
    },
    {
      key: 'tableName',
      title: 'Table Name',
      sort: 'asc'
    },
    {
      key: 'newValue',
      title: 'Information',
      sort: 'asc'
    }

  ]

  dataSource: ChangeHistory[]
  constructor(
    public changeHistoryService: ChangeHistoryService, 
    private router: Router) {
    this.dataSource = new Array<ChangeHistory>()
    this.loadEntitys()
  }
  onDataChange(data) {
    this.dataSource = []
    this.loadEntitys()
  }

  loadEntitys() {
    
    this.changeHistoryService.findAll().subscribe(
      (resp: any) => {

        resp.data.forEach(i => {
          this.dataSource.push({
            id: i.id,
            userName: i.userName,
            eventDate: i.eventDate,
            eventType: i.eventType,
            tableName: i.tableName,
            recordId: i.recordId,
            newValue: i.newValue         
          })
        })

        this.listaMinha.emitData()
        
      }, err => {
        showErrorNotification(err)
      }
    )
  }

  editTableRow(changes: ChangeHistory[]): void {
    const change = Object.assign({}, changes[0])
    this.router.navigate(['cluster-settings', 'change-history', 'view', change.id, change.tableName])
  }
}
