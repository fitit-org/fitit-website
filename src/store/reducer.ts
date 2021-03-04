import { combineReducers } from 'redux'
import { userReducer } from './modules/user/reducer'

export const rootReducer = combineReducers({
  user: userReducer,
})
