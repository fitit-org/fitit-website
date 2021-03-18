import React, { useEffect } from 'react'
import { StoreState } from '../../types/StoreTypes'
import { name, surname } from '../../store/modules/user/selectors'
import {
  GET_USER_REQUEST,
  CLEAN_USER,
  CLEAN_CLASSES,
} from '../../utils/constants'
import { connect } from 'react-redux'
import { userAction, UserAction } from '../../store/modules/user/actions'
import {
  classesAction,
  ClassesAction,
} from '../../store/modules/classes/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'

import userNavStyles from '../../styles/TheUserNav.module.scss'

type UserNavProps = {
  name: string | undefined
  surname: string | undefined
  getUser: UserAction
  showArrow: boolean
  clearUser: UserAction
  clearClasses: ClassesAction
  BackHandler?: (e: React.MouseEvent<SVGSVGElement>) => void
}

const TheUserNavComponent = (props: UserNavProps): JSX.Element => {
  const history = useHistory()

  const { name, surname, getUser } = props

  useEffect(() => {
    if (!name || !surname) {
      getUser(GET_USER_REQUEST, undefined)
    }
  }, [name, surname, getUser])

  const handleLogout = (e: React.MouseEvent<SVGSVGElement>) => {
    props.clearClasses(CLEAN_CLASSES, undefined)
    props.clearUser(CLEAN_USER, undefined)
    history.push('/')
  }

  return (
    <div className={userNavStyles.userNav}>
      {props.showArrow ? (
        <FontAwesomeIcon
          icon={['fas', 'arrow-left']}
          onClick={props.BackHandler}
          className={userNavStyles.userNavBackIcon}
        />
      ) : (
        ''
      )}
      <FontAwesomeIcon
        icon={['fas', 'user']}
        className={userNavStyles.userNavUserIcon}
      />
      {name} {surname}
      <FontAwesomeIcon
        className={userNavStyles.userNavLogoutIcon}
        onClick={handleLogout}
        icon={['fas', 'sign-out-alt']}
      />
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  name: name(state),
  surname: surname(state),
})

const dispatchToProps = {
  getUser: userAction,
  clearUser: userAction,
  clearClasses: classesAction,
}

const TheUserNav = connect(stateToProps, dispatchToProps)(TheUserNavComponent)
export { TheUserNav }
