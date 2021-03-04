import { fork, ForkEffect, takeLatest } from 'redux-saga/effects'

import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  GET_USER_REQUEST,
} from '../../../utils/constants'
import { loginWorker, registerWorker, getUserWorker } from './workers'

function* loginWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(LOGIN_REQUEST, loginWorker)
}

function* registerWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(REGISTER_REQUEST, registerWorker)
}

function* getUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(GET_USER_REQUEST, getUserWorker)
}

export const userWatchers: Array<ForkEffect> = [
  fork(loginWatcher),
  fork(registerWatcher),
  fork(getUserWatcher),
]
