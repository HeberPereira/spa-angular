import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { debounceEvent } from 'src/app/utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagesize: number = 10
  _totalrecords: number = 0

  @Input() set totalrecords(number){    
    this._totalrecords = number
    this.createPages()
  }

  get totalrecords(){
    return this._totalrecords
  }

  @Input() pageSelected: number = 1
  @Input() pagesizeSelected: number = 10
  @Output() changePage = new EventEmitter()

  totalpages : number[] = []
  lastpage: number = 0
  

  constructor() { }

  ngOnInit(): void {
  }

  firstPage(): void{    
    this.pageSelected = 1;
    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  backPage(): void{
    if(this.pageSelected > 1)
      this.pageSelected = this.pageSelected-1;
    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  nextPage(): void{
    if(this.lastpage > this.pageSelected)
      this.pageSelected = this.pageSelected+1;
    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  lastPage(): void{    
    this.pageSelected = this.lastpage;
    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  alterPage(page: any): void{
    this.pageSelected = page;
    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  alterPageSize(pagesize: any): void {
    
    this.pagesize = pagesize;
    this.pagesizeSelected = pagesize;

    this.createPages();

    if(this.pageSelected > this.lastpage)
      this.pageSelected = this.lastpage;

    this.changePage.emit([this.pageSelected, this.pagesize]);
  }

  createPages(): void {

    this.totalpages = []

    if (this.totalrecords > 0) {
      let count = 0;
      var t = 1;
      this.lastpage = 1;
      this.totalpages.push(t);
      for (let i = 1; i < this.totalrecords; i++) {
        count++
        if (count == this.pagesize) {
          t++;
          this.totalpages.push(t);
          this.lastpage = t;
          count = 0;
        }
      }
    }
  }
}
