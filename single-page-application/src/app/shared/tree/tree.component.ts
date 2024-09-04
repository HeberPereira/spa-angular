import { AfterViewInit, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: '[app-tree]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements AfterViewInit {
  @Input() control: FormControl

  ngAfterViewInit(): void {
  }

  

  setSelected(
    item: {
      title: string
      items: string[]
      checked: boolean
    },
    index: number
  ): void {
    item.checked = !item.checked
    //this.trees[index].checked = item.checked
    //this.control.patchValue(
      //this.trees.filter(item => item.checked).map(item => ({ id: item.id }))
    //)
    this.control.markAsDirty()
  }
}
