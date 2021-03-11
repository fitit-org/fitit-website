import { combineReducers } from 'redux'
import { userReducer } from './modules/user/reducer'
import { classesReducer } from './modules/classes/reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  classes: classesReducer,
})
