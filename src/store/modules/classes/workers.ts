import { StoreAction } from '../../../types/StoreTypes'
import { call, put, CallEffect, PutEffect } from 'redux-saga/effects'
import { getClasses } from '../../../services/APIService'
import { classesAction } from './actions'
import Class from '../../../types/Class'
import User from '../../../types/User'
import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILED,
} from '../../../utils/constants'

export function* getClassesWorker(): Generator<
  | CallEffect<{ classes: Array<Class>; users: Array<User> }>
  | PutEffect<StoreAction<string, unknown>>,
  void,
  unknown
> {
  try {
    const data = yield call(getClasses, localStorage.getItem('token') as string)
    yield put(classesAction(GET_CLASSES_SUCCESS, data))
  } catch (error) {
    yield put(classesAction(GET_CLASSES_FAILED, error))
  }
}
