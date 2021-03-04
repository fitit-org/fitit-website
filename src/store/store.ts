import createSagaMiddleware, { Saga, Task } from 'redux-saga'
import {
  applyMiddleware,
  createStore,
  CombinedState,
  Dispatch,
  Unsubscribe,
  Reducer,
  Observable,
} from 'redux'
import { rootReducer } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { StoreState, StoreAction, UserState } from '../types/StoreTypes'
import { initUserState } from './modules/user/reducer'

const init: StoreState = {
  user: initUserState,
}

type StoreReturnType = {
  runSaga: <S extends Saga<unknown[]>>(saga: S, ...args: Parameters<S>) => Task
  dispatch: Dispatch<StoreAction<string, unknown>>
  getState(): CombinedState<{
    user: UserState
  }>
  subscribe(listener: () => void): Unsubscribe
  replaceReducer(nextReducer: Reducer<unknown>): void
  [Symbol.observable](): Observable<unknown>
}

export function store(initialState: StoreState = init): StoreReturnType {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  const options = { trace: true }
  const composeEnhancers = composeWithDevTools(options)

  return {
    ...createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middleware))
    ),
    runSaga: sagaMiddleware.run,
  }
}
