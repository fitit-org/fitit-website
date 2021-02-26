import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

const TeacherRoute = ({
  children,
  path,
}: {
  children: React.ReactNode
  path: string
}): JSX.Element => {
  const auth = useAuth()
  return (
    <Route
      path={path}
      render={({ location }) =>
        auth.token !== '' && auth.user.isTeacher ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default TeacherRoute
