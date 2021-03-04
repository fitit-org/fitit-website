import { StoreAction } from '../../../types/StoreTypes'
import { call, put, CallEffect, PutEffect } from 'redux-saga/effects'
import LoginDTO from '../../../types/login.dto'
import RegisterDTO from '../../../types/register.dto'
import {
  login,
  register,
  AuthResponse,
  getUser,
} from '../../../services/APIService'
import { userAction } from './actions'
import User from '../../../types/User'

import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from '../../../utils/constants'

export function* loginWorker(
  action: StoreAction<LOGIN_REQUEST, LoginDTO>
): Generator<
  CallEffect<AuthResponse> | PutEffect<StoreAction<string, unknown>>,
  void,
  unknown
> {
  try {
    const { payload } = action
    const data = yield call(login, payload)
    yield put(userAction(LOGIN_SUCCESS, data))
  } catch (error) {
    yield put(userAction(LOGIN_FAILED, error))
  }
}

export function* registerWorker(
  action: StoreAction<REGISTER_REQUEST, RegisterDTO>
): Generator<
  CallEffect<AuthResponse> | PutEffect<StoreAction<string, unknown>>,
  void,
  unknown
> {
  try {
    const { payload } = action
    const data = yield call(register, payload)
    yield put(userAction(REGISTER_SUCCESS, data))
  } catch (error) {
    yield put(userAction(REGISTER_FAILED, error))
  }
}

export function* getUserWorker(): Generator<
  CallEffect<Partial<User>> | PutEffect<StoreAction<string, unknown>>,
  unknown,
  unknown
> {
  try {
    console.log('getUserWorker called')
    const data = yield call(getUser, localStorage.getItem('token') as string)
    yield put(userAction(GET_USER_SUCCESS, data))
    return data
  } catch (error) {
    yield put(userAction(GET_USER_FAILED, error))
  }
}
