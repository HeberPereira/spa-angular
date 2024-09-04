import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: '[app-confirmation-dialog]',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() title: string
  @Input() description: string
  @Input() actionText: string
  @Output() onClickCancel:EventEmitter<any> = new EventEmitter()
  @Output() onClickDelete:EventEmitter<any> = new EventEmitter()

  public clickCancel(){
    this.onClickCancel.emit();
  }

  public clickDelete(){
    this.onClickDelete.emit();
  }
}
