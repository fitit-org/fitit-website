import React, { useEffect } from 'react'
import { StoreState } from '../../types/StoreTypes'
import { name, surname } from '../../store/modules/user/selectors'
import { GET_USER_REQUEST } from '../../utils/constants'
import { connect } from 'react-redux'
import { userAction, UserAction } from '../../store/modules/user/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import userNavStyles from '../../styles/TheUserNav.module.scss'

type UserNavProps = {
  name: string | undefined
  surname: string | undefined
  getUser: UserAction
  showArrow: boolean
}

const TheUserNavComponent = (props: UserNavProps): JSX.Element => {
  useEffect(() => {
    if (!props.name || !props.surname) {
      props.getUser(GET_USER_REQUEST, undefined)
    }
  }, [props])
  return (
    <div className={userNavStyles.userNav}>
      {props.showArrow ? <FontAwesomeIcon icon="arrow-left" /> : ''}
      <FontAwesomeIcon icon="user" className={userNavStyles.userNavUserIcon} />
      {props.name} {props.surname}
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  name: name(state),
  surname: surname(state),
})

const dispatchToProps = {
  getUser: userAction,
}

const TheUserNav = connect(stateToProps, dispatchToProps)(TheUserNavComponent)
export { TheUserNav }
