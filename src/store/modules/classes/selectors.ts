import { StoreState } from '../../../types/StoreTypes'
import { createSelector } from 'reselect'

const getClasses = (state: StoreState) => state.classes.classes
const getUsers = (state: StoreState) => state.classes.users
const isGetFetched = (state: StoreState) => state.classes.fetched.getClasses

export const classes = createSelector(getClasses, (classes) => classes)
export const users = createSelector(getUsers, (users) => users)
export const getFetched = createSelector(isGetFetched, (fetched) => fetched)
