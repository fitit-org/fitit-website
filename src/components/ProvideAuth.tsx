import React, { useState, useEffect } from 'react'
import { login, register, getUser } from '../services/APIService'
import { authContext } from '../hooks/use-auth'
import { User } from '../types/User'

const ProvideAuth = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
  const [user, setUser] = useState<Partial<User>>({})
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const signin = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      login({ email: email, password: password })
        .catch((err) => {
          reject(err)
          throw new Error(err)
        })
        .then((data) => {
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          resolve()
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
    register({
      name: name,
      surname: surname,
      email: email,
      password: password,
      code: code,
    })
      .catch((err) => {
        throw new Error(err)
      })
      .then((data) => {
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setToken(data.token)
      })
  }

  const getUserData = async () => {
    getUser(token)
      .catch((err) => {
        throw new Error(err)
      })
      .then((data) => {
        setUser(data)
      })
  }

  const logout = () => {
    setUser({})
    localStorage.removeItem('token')
    setToken('')
  }

  useEffect(() => {
    if (!user && token !== '') {
      try {
        getUserData()
      } catch (err) {
        logout()
      }
    }
    return
  })

  return {
    user,
    token,
    signin,
    signup,
    logout,
  }
}

export default ProvideAuth
