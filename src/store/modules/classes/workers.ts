import { StoreAction } from '../../../types/StoreTypes'
import { call, put, CallEffect, PutEffect } from 'redux-saga/effects'
import { getClasses, createClass } from '../../../services/APIService'
import { classesAction } from './actions'
import Class from '../../../types/Class'
import User from '../../../types/User'
import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILED,
  CREATE_CLASS_FAILED,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_REQUEST,
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

export function* createClassWorker(
  action: StoreAction<CREATE_CLASS_REQUEST, { name: string }>
): Generator<
  CallEffect<Class> | PutEffect<StoreAction<string, unknown>>,
  void,
  unknown
> {
  try {
    const { payload } = action
    const data = yield call(
      createClass,
      localStorage.getItem('token') as string,
      payload.name
    )
    yield put(classesAction(CREATE_CLASS_SUCCESS, data))
  } catch (error) {
    yield put(classesAction(CREATE_CLASS_FAILED, error))
  }
}
