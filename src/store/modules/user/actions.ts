import { StoreAction } from '../../../types/StoreTypes'

export function userAction<T, P>(type: T, payload: P): StoreAction<T, P> {
  return {
    type,
    payload,
  }
}

export type UserAction = typeof userAction
