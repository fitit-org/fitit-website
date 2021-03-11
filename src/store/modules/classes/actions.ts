import { StoreAction } from '../../../types/StoreTypes'

export function classesAction<T, P>(type: T, payload: P): StoreAction<T, P> {
  return {
    type,
    payload,
  }
}

export type ClassesAction = typeof classesAction
