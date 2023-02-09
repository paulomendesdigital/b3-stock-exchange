import { IndexModel } from '../models/index-model'

export interface AddIndexModel {
  name: string
  price_open: number
  price_close: number
  price_high: number
  price_low: number
  price_day: Date
}

export interface IAddIndex {
  add: (index: AddIndexModel) => IndexModel
}
