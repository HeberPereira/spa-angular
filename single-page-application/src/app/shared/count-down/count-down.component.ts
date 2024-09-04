import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() counter = 10; //in seconds
  @Input() tick = 1000;
  @Input() showLoading : boolean = false
  @Output() onTimeUp = new EventEmitter<any>()

  private _interval: any
  counterLeft: number = 10

  ngOnInit() {
  }

  start() {
    this.counterLeft = this.counter

    clearInterval(this._interval)
    this._interval = setInterval(() => 
      {
        //console.log('interval')

        if (this.counterLeft > 1) {
          //console.log('decrem')
          --this.counterLeft
        } 
        else if (this.counterLeft == 1)
        {
          this.onTimeUp.emit()
          this.stop()
        }
      }, 
      this.tick
    )
  }

  stop() {
    //console.log('stopping')
    clearInterval(this._interval)
    this._interval = null
  }

  ngOnDestroy(){
    this.stop()
  }
}