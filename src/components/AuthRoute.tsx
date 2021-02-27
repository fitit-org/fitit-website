import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

const AuthRoute = ({
  children,
  ...rest
}: {
  children: React.ReactNode
}): JSX.Element => {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token !== '' ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default AuthRoute
