import { StoreState } from '../../../types/StoreTypes'
import { createSelector } from 'reselect'

const getUser = (state: StoreState) => state.user.user
const getToken = (state: StoreState) => state.user.token
const getActivities = (state: StoreState) => state.user.user.activityLog_ids
const getLoginError = (state: StoreState) => state.user.error.login
const getRegisterError = (state: StoreState) => state.user.error.register
const getName = (state: StoreState) => state.user.user.name
const getSurname = (state: StoreState) => state.user.user.surname

export const user = createSelector(getUser, (user) => user)
export const token = createSelector(getToken, (token) => token)
export const activityLog = createSelector(
  getActivities,
  (activities) => activities
)
export const loginError = createSelector(getLoginError, (error) => error)
export const registerError = createSelector(getRegisterError, (error) => error)
export const name = createSelector(getName, (name) => name)
export const surname = createSelector(getSurname, (surname) => surname)
