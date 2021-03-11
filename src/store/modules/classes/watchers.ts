import { fork, ForkEffect, takeLatest } from 'redux-saga/effects'
import { GET_CLASSES_REQUEST } from '../../../utils/constants'
import { getClassesWorker } from './workers'

function* getClassesWatcher() {
  yield takeLatest(GET_CLASSES_REQUEST, getClassesWorker)
}

export const classesWatchers: Array<ForkEffect> = [fork(getClassesWatcher)]
