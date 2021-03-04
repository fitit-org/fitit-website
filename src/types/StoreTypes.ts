import { Action } from 'redux'
import User from './User'

export interface StoreAction<T = string, P = unknown> extends Action {
  type: T
  payload: P
}

export interface UserState {
  user: Partial<User>
  token: string
  error: { register: boolean; login: boolean; get: boolean }
}

export interface StoreState {
  user: UserState
}
