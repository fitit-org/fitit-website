import User from '../types/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, getUser } from '../services/APIService'
import LoginDTO from '../types/login.dto'
import { AppThunk, RootState } from './store'

interface UserState {
  user: Partial<User>
  token: string
}

const initialState: UserState = {
  user: {},
  token: localStorage.getItem('token') || '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<UserState>) => {
      state = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    clearState: (state) => {
      state.user = {}
      localStorage.removeItem('token')
      state.token = ''
    },
  },
})

export const loginAsync = (dto: LoginDTO): AppThunk => async (dispatch) => {
  const data = await login(dto)
  dispatch(setState(data))
}

export const logOut = (): AppThunk => (dispatch) => {
  dispatch(clearState())
}

export const getUserAsync = (): AppThunk => async (dispatch, getState) => {
  const data = await getUser(getState().user.token)
  dispatch(setUser(data))
}

export const { setState, setUser, clearState } = userSlice.actions
export const selectUser = (state: RootState): Partial<User> => state.user.user
export const selectToken = (state: RootState): string => state.user.token
export const isTeacher = (state: RootState): boolean | undefined =>
  state.user.user.isTeacher
export default userSlice.reducer
