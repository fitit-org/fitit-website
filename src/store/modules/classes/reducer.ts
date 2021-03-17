import { ClassesState, StoreAction } from '../../../types/StoreTypes'
import { Reducer } from 'redux'
import Class from '../../../types/Class'
import User from '../../../types/User'
import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILED,
} from '../../../utils/constants'

export const initClassesState: ClassesState = {
  classes: [] as Array<Class>,
  users: [] as Array<User>,
  error: {
    getClasses: false,
  },
  fetched: {
    getClasses: false,
  },
}

function setState(
  state: ClassesState,
  action: StoreAction<string, { classes: Array<Class>; users: Array<User> }>
): ClassesState {
  const { classes, users } = action.payload

  return {
    ...state,
    classes: classes,
    users: users,
    error: {
      getClasses: false,
    },
    fetched: {
      getClasses: true,
    },
  }
}

function setGetError(state: ClassesState): ClassesState {
  return {
    ...state,
    error: {
      ...state.error,
      getClasses: true,
    },
    fetched: {
      ...state.fetched,
      getClasses: false,
    },
  }
}

export const classesReducer: Reducer<ClassesState, StoreAction> = (
  state: ClassesState = initClassesState,
  action: StoreAction
): ClassesState => {
  switch (action.type) {
    case GET_CLASSES_SUCCESS:
      return setState(
        state,
        action as StoreAction<
          string,
          { classes: Array<Class>; users: Array<User> }
        >
      )
    case GET_CLASSES_FAILED:
      return setGetError(state)
    default:
      return {
        ...state,
      }
  }
}
