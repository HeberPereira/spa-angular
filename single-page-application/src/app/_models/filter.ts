export class FilterGrid{
    value:any
    fields:string[]
}

export class Filter{
    pageNumber: number
    pageSize: number
    
    constructor() {        
        this.pageNumber = 1;
        this.pageSize = 10;
    }
  }