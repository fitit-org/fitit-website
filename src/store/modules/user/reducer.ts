import { UserState, StoreAction } from '../../../types/StoreTypes'
import User from '../../../types/User'
import { AuthResponse } from '../../../services/APIService'
import { Reducer } from 'redux'
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_USER_SUCCESS,
  CLEAN_USER,
  LOGIN_FAILED,
  REGISTER_FAILED,
  GET_USER_FAILED,
} from '../../../utils/constants'

export const initUserState: UserState = {
  user: {} as Partial<User>,
  token: localStorage.getItem('token') || '',
  error: {
    login: false,
    register: false,
    get: false,
  },
}

function setState(
  state: UserState,
  action: StoreAction<string, AuthResponse>
): UserState {
  const { payload } = action

  return {
    ...state,
    user: payload.user,
    token: payload.token,
    error: {
      login: false,
      register: false,
      get: false,
    },
  }
}

function setUser(
  state: UserState,
  action: StoreAction<string, Partial<User>>
): UserState {
  const { payload } = action
  return {
    ...state,
    user: payload,
    error: {
      login: false,
      register: false,
      get: false,
    },
  }
}

function clean(): UserState {
  localStorage.removeItem('token')
  return initUserState
}

function setLoginError(): UserState {
  localStorage.removeItem('token')
  return { ...initUserState, error: { ...initUserState.error, login: true } }
}

function setRegisterError(): UserState {
  localStorage.removeItem('token')
  return { ...initUserState, error: { ...initUserState.error, register: true } }
}

function setGetError(state: UserState): UserState {
  return {
    ...state,
    error: {
      ...state.error,
      get: true,
    },
  }
}

export const userReducer: Reducer<UserState, StoreAction> = (
  state: UserState = initUserState,
  action: StoreAction
): UserState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return setState(state, action as StoreAction<string, AuthResponse>)
    case GET_USER_SUCCESS:
      return setUser(state, action as StoreAction<string, Partial<User>>)
    case CLEAN_USER:
      return clean()
    case REGISTER_FAILED:
      return setRegisterError()
    case LOGIN_FAILED:
      return setLoginError()
    case GET_USER_FAILED:
      return setGetError(state)
    default:
      return {
        ...state,
      }
  }
}
