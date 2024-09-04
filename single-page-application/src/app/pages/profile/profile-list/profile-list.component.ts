import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { ListV2Component } from 'src/app/shared/list-v2/list-v2.component'
import { EdsColumn } from 'src/app/_models/eds-column-model'
import { Profile } from 'src/app/_models/profile'
import { ProfileService } from 'src/app/_services/profile.service'
import { showErrorNotification } from 'src/app/utils'
import { additionalButton } from 'src/app/_models/additional-button-model'

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html'
})

export class ProfileListComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource1 = ELEMENT_DATA;

  // @ViewChild('listaMinha') listaMinha: ListV2Component
  public additionalButtons: additionalButton<any>[] = []

  tableColumns: EdsColumn[] = [
    { key: 'name', title: 'Name', sort: 'asc' },
    { key: 'description', title: 'Description' },
    { key: 'idmRole', title: 'IDM Role', },
    { key: 'adGroupId', title: 'AD Group ID' }
  ]

  dataSource: Profile[]
  constructor(public profileService: ProfileService, private router: Router) {
    this.dataSource = new Array<Profile>()
    this.loadEntitys()
  }

  onDataChange(data) {
    this.dataSource = []
    this.loadEntitys()
  }
  
  loadEntitys() {
    this.profileService.findAll().subscribe(
      (resp: any) => {
        
        resp.data.forEach(i => {
          this.dataSource.push({
            id: i.id,
            name: i.name,
            description: i.description,
            idmRole: i.idmRole,
            adGroupId: i.adGroupId,
            permissions: i.permissions, 
            concurrencyToken: i.concurrencyToken
          })
        })

        // this.listaMinha.emitData()

      }, err => {
        showErrorNotification(err)
      }
    )
  }

  editTableRow(profiles: Profile[]): void {
    const profile = Object.assign({}, profiles[0])

    this.router.navigate(['user-management', 'profile', 'edit', profile.id])
  }

  addTableRow(): void {
    this.router.navigate(['user-management', 'profile', 'add'])
  }

 
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];