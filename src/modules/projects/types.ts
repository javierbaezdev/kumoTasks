export type StateTypes = 'ACTIVE' | 'INACTIVE'

export interface project {
  key: string
  name: string
  description?: string
  state: StateTypes
}
