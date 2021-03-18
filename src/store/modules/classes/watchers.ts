import { fork, ForkEffect, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  GET_CLASSES_REQUEST,
  CREATE_CLASS_REQUEST,
} from '../../../utils/constants'
import { getClassesWorker, createClassWorker } from './workers'

function* getClassesWatcher() {
  yield takeLatest(GET_CLASSES_REQUEST, getClassesWorker)
}

function* createClassWatcher() {
  yield takeEvery(CREATE_CLASS_REQUEST, createClassWorker)
}

export const classesWatchers: Array<ForkEffect> = [
  fork(getClassesWatcher),
  fork(createClassWatcher),
]
