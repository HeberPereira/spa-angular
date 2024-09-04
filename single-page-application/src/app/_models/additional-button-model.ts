export interface additionalButton<T> {
  actionType: 'single' | 'batch' | 'free'
  fn: (selectedRows: T[]) => void
  title: string
  icon: string
  tooltip?: string
  disabled?: (selectedRows: T[]) => boolean
  disabledTooltip?: string
  childrenActions?: additionalButton<T>[]
}
