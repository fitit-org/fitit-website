import { all, AllEffect, ForkEffect } from 'redux-saga/effects'

import { userWatchers } from './user/watchers'
import { classesWatchers } from './classes/watchers'

export function* rootSagas(): Generator<
  AllEffect<ForkEffect<unknown>>,
  void,
  unknown
> {
  const watchers = [...userWatchers, ...classesWatchers]
  yield all(watchers)
}
