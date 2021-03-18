import { ClassesState, StoreAction } from '../../../types/StoreTypes'
import { Reducer } from 'redux'
import Class from '../../../types/Class'
import User from '../../../types/User'
import {
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILED,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAILED,
  CREATE_CLASS_UNSUCCESS,
  CLEAN_CLASSES,
} from '../../../utils/constants'

export const initClassesState: ClassesState = {
  classes: [] as Array<Class>,
  users: [] as Array<User>,
  error: {
    getClasses: false,
    createClass: false,
  },
  fetched: {
    getClasses: false,
  },
  success: {
    createClass: false,
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
      createClass: false,
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

function setCreateError(state: ClassesState): ClassesState {
  return {
    ...state,
    error: {
      ...state.error,
      createClass: true,
    },
    fetched: {
      ...state.fetched,
    },
  }
}

function pushClass(
  state: ClassesState,
  action: StoreAction<string, Class>
): ClassesState {
  return {
    ...state,
    classes: [...state.classes, action.payload],
    error: {
      ...state.error,
      createClass: false,
    },
    fetched: {
      ...state.fetched,
    },
    success: {
      createClass: true,
    },
  }
}

function unsuccess(state: ClassesState): ClassesState {
  return {
    ...state,
    success: {
      createClass: false,
    },
  }
}

function clean(): ClassesState {
  return initClassesState
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
    case CREATE_CLASS_SUCCESS:
      return pushClass(state, action as StoreAction<string, Class>)
    case CREATE_CLASS_FAILED:
      return setCreateError(state)
    case CREATE_CLASS_UNSUCCESS:
      return unsuccess(state)
    case CLEAN_CLASSES:
      return clean()
    default:
      return {
        ...state,
      }
  }
}
