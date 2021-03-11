import { Action } from 'redux'
import User from './User'
import Class from './Class'

export interface StoreAction<T = string, P = unknown> extends Action {
  type: T
  payload: P
}

export interface UserState {
  user: Partial<User>
  token: string
  error: { register: boolean; login: boolean; get: boolean }
}

export interface ClassesState {
  classes: Array<Class>
  users: Array<User>
  error: { getClasses: boolean }
  fetched: { getClasses: boolean }
}

export interface StoreState {
  user: UserState
  classes: ClassesState
}
