import React, { useState, useEffect } from 'react'
import { register, login } from '../services/APIService'
import { authContext } from '../hooks/use-auth'
import User from '../types/User'
import { store } from '../store/store'
import { clearState, getUserAsync, logOut, setState } from '../store/user'

const ProvideAuth = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
  const [user, setUser] = useState<Partial<User>>(
    store.getState().user.user || {}
  )
  const [token, setToken] = useState(
    store.getState().user.token || localStorage.getItem('token') || ''
  )

  const signin = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      login({ email: email, password: password })
        .then((data) => {
          store.dispatch(clearState())
          store.dispatch(setState(data))
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((err) => {
          reject()
        })
    })
  }

  const signup = async (
    name: string,
    surname: string,
    email: string,
    password: string,
    code: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      register({
        name: name,
        surname: surname,
        email: email,
        password: password,
        code: code,
      })
        .then((data) => {
          store.dispatch(clearState())
          store.dispatch(setState(data))
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((err) => reject(err))
    })
  }

  const logout = () => {
    setUser({})
    localStorage.removeItem('token')
    setToken('')
    store.dispatch(logOut())
  }

  useEffect(() => {
    if (Object.keys(user).length === 0 && token !== '') {
      try {
        store.dispatch(getUserAsync())
        setUser(store.getState().user.user)
        setToken(store.getState().user.token)
      } catch (err) {
        logout()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    user,
    token,
    signin,
    signup,
    logout,
  }
}

export default ProvideAuth
