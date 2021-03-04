import { all, AllEffect, ForkEffect } from 'redux-saga/effects'

import { userWatchers } from './user/watchers'

export function* rootSagas(): Generator<
  AllEffect<ForkEffect<unknown>>,
  void,
  unknown
> {
  const watchers = [...userWatchers]
  yield all(watchers)
}
