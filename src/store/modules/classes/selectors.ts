import { StoreState } from '../../../types/StoreTypes'
import { createSelector } from 'reselect'

const getClasses = (state: StoreState) => state.classes.classes
const getUsers = (state: StoreState) => state.classes.users
const isGetFetched = (state: StoreState) => state.classes.fetched.getClasses
const isCreateError = (state: StoreState) => state.classes.error.createClass
const isCreateSuccess = (state: StoreState) => state.classes.success.createClass
const getLastClass = (state: StoreState) =>
  state.classes.classes[state.classes.classes.length - 1]

export const classes = createSelector(getClasses, (classes) => classes)
export const users = createSelector(getUsers, (users) => users)
export const getFetched = createSelector(isGetFetched, (fetched) => fetched)
export const getCreateError = createSelector(isCreateError, (error) => error)
export const getCreateSuccess = createSelector(
  isCreateSuccess,
  (success) => success
)
export const lastClass = createSelector(getLastClass, (lastClass) => lastClass)
