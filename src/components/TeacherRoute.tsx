import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { StoreState } from '../types/StoreTypes'
import { user, token } from '../store/modules/user/selectors'
import { userAction, UserAction } from '../store/modules/user/actions'
import User from '../types/User'
import { GET_USER_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'

type TeacherRouteProps = {
  children: React.ReactNode
  path: string
  user: Partial<User>
  token: string
  getUser: UserAction
}

const TeacherRoute = (props: TeacherRouteProps): JSX.Element => {
  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      props.getUser(GET_USER_REQUEST, undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Route
      path={props.path}
      render={({ location }) =>
        props.token !== '' &&
        Object.keys(props.user).length !== 0 &&
        props.user.isTeacher ? (
          props.children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

const stateToProps = (state: StoreState) => ({
  user: user(state),
  token: token(state),
})

const dispatchToProps = {
  getUser: userAction,
}

export default connect(stateToProps, dispatchToProps)(TeacherRoute)
