import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core'


@Component({
    selector: 'app-list-builder-v2',
    templateUrl: './list-builder-v2.component.html',
    styleUrls: ['./list-builder-v2.component.css']
})
export class ListBuilderV2Component implements OnInit, AfterViewInit {

    @Input() resourceName: string
    @Input() fieldName: string = 'name'

    _items: any[] = []
    _selectedItems: any[] = []
    _selectedItemsWithOutFilter: any[] = []
    _availableItems: any[] = []
    _availableItemsWithOutFilter: any[] = []
    _toAdd: any[] = []
    _toRemove: any[] = []
    _textFilterAdd: string = ''
    public setItems(data: any[]) {
        this._items = data
        this._setAvailableItems()
    }

    public setSelectedItems(selected: any[]) {
        Object.assign(this._selectedItems,selected);
        Object.assign(this._selectedItemsWithOutFilter, selected)
        this._setAvailableItems()
    }

    public getSelectedItems(): any[] {
        return this._selectedItemsWithOutFilter
    }

    private _setAvailableItems() {
        this._availableItems = this._items.filter(i =>
            this._selectedItemsWithOutFilter.length > 0 ?
                this._selectedItemsWithOutFilter.filter(s => s[this.fieldName] == i[this.fieldName]).length == 0
                :
                this._selectedItems.filter(s => s[this.fieldName] == i[this.fieldName]).length == 0
        )
        this._availableItemsWithOutFilter = this._availableItems;
        this.filterItemsAvaliableChange(this._textFilterAdd);
    }

    toggleToAdd(evt, value: any) {
        if (evt.target.checked)
            this._toAdd.push(value)
        else
            this._toAdd.splice(this._toAdd.findIndex(a => a[this.fieldName] == value[this.fieldName]), 1)
    }

    toggleToRemove(evt, value: any) {
        if (evt.target.checked)
            this._toRemove.push(value)
        else
            this._toRemove.splice(this._toRemove.findIndex(a => a[this.fieldName] == value[this.fieldName]), 1)
    }
    selectAllAdd(evt: any) {
        if (evt.target.checked) {
            let add = this._availableItems.filter(i => this._toAdd.filter(s => s[this.fieldName] == i[this.fieldName]).length == 0)
            this._toAdd = this._toAdd.concat(add)
        }
        else
            this._toAdd = []
    }
    checkedItemAdd(entity: any): boolean {
        this.checkedAllItensAdd()
        return this._toAdd.filter(i => i.id == entity.id).length > 0;
    }
    checkedAllItensAdd(): boolean {
        return this._toAdd.length == this._availableItems.length
    }
    selectAllRemove(evt: any) {
        if (evt.target.checked) {
            let remove = this._selectedItems.filter(i => this._toRemove.filter(s => s[this.fieldName] == i[this.fieldName]).length == 0)
            this._toRemove = this._toRemove.concat(remove)
        }
        else
            this._toRemove = []
    }
    checkedItemRemove(entity: any): boolean {
        this.checkedAllItensRemove()
        return this._toRemove.filter(i => i.id == entity.id).length > 0;
    }
    checkedAllItensRemove(): boolean {
        return this._toRemove.length == this._selectedItems.length
    }
    _addItems(): void {
        for (let index = 0; index < this._toAdd.length; index++) {
            const i = this._toAdd[index];
            this._selectedItems.push(i)
            this._selectedItemsWithOutFilter.push(i)
        }
        this._toAdd = []
        this._setAvailableItems()
    }

    _removeItems(): void {
        this._selectedItems = this._selectedItems.filter(s =>
            this._toRemove.filter(r => r[this.fieldName] == s[this.fieldName]).length == 0
        )
        this._selectedItemsWithOutFilter = this._selectedItemsWithOutFilter.filter(s =>
            this._toRemove.filter(r => r[this.fieldName] == s[this.fieldName]).length == 0
        )

        this._toRemove = []
        this._setAvailableItems()
    }

    filterItemsAvaliableChange(filter: string): void {
        if (this._availableItemsWithOutFilter.length == 0)
            Object.assign(this._availableItemsWithOutFilter,this._availableItems);

        if (filter.trim()) {
            this._textFilterAdd = filter;
            this._availableItems = this._availableItemsWithOutFilter.filter(f => f[this.fieldName].toLowerCase().indexOf(filter.trim().toLowerCase()) > -1)
        }
        else {
            Object.assign(this._availableItems, this._availableItemsWithOutFilter)
        }
    }
    filterItemsSeletedChange(filter: string): void {
        if (this._selectedItemsWithOutFilter.length == 0)
            Object.assign(this._selectedItemsWithOutFilter, this._selectedItems);

        if (filter.trim()) {
            this._selectedItems = this._selectedItemsWithOutFilter.filter(f => f[this.fieldName].toLowerCase().indexOf(filter.trim().toLowerCase()) > -1)
        }
        else {
            Object.assign(this._selectedItems, this._selectedItemsWithOutFilter);
        }
    }

    constructor() {

    }
    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
    }
}