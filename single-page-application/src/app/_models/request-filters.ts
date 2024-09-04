import { Filter } from "./filter"

export interface RequestFilters {
    designStatusId?: number
    excludedId?: number
    customerId?: number
    customerIds?: number[]
    countryId?: number
    countryIds?: number[]
    clusterId?: number
    clusterIds?: number []
    nodeTypeId?: number
    technologyId?: number
    nodeNames?: string[]
    nodeName?:string
    nodeTemplateIds?: number[]
    activityTypeId?: number
    activityTypeName?: string
    activityTypes?: number[]
    activityCodes?:string[]
    activityCode?:string
    activityStatusId?: number
    startDate?: Date
    finishDate?: Date
    jmTypeId?:number
    statusWorkflowId?: number
    dateScheduling?: Date
    regionId?:number
    regions?:number[]
    startedBy?: string
    automaticExecution?: boolean
}

export class GenericFilters {
    designStatusId?: number
    excludedId?: number
    customerId?: number
    customerIds?: number[]
    countryId?: number
    countryIds?: number[]
    clusterId?: number
    clusterIds?: number []
    nodeTypeId?: number
    technologyId?: number
    nodeNames?: string[]
    nodeName?:string
    nodeTemplateIds?: number[]
    activityTypeId?: number
    activityTypeName?:string
    activityTypes?: number[]
    activityCodes?:string[]
    activityCode?:string
    activityStatusId?: number
    startDate?: Date
    finishDate?: Date
    jmTypeId?:number
    statusWorkflowId?: number
    dateScheduling?: Date
    regionId?:number
    regions?:number[]
    startedBy?: string
    filter: Filter

    constructor(){
        this.filter = new Filter()
        this.filter.pageNumber = 1
        this.filter.pageSize = 10
    }
}

export interface RequestWorkFlowNodeFilters {    
    customerId?: number    
    nodeNames?: string    
}