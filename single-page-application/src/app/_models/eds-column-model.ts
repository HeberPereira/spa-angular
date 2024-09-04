export interface EdsColumn {
  key: string
  title: string
  sort?: string
  hidden?: boolean
  width?: string
  cellStyle?: string
  editable?:boolean
  tooltip?: {
    text: string
    position: string
    width: string
  }
}
