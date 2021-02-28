import React, { useState, useEffect } from 'react'
import { login, register, getUser } from '../services/APIService'
import { authContext } from '../hooks/use-auth'
import { User } from '../types/User'
import { rejects } from 'assert'

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
        .then((data) => {
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((err) => reject(err))
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
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((err) => rejects(err))
    })
  }

  const getUserData = async () => {
    return new Promise<void>((resolve, reject) => {
      getUser(token)
        .then((data) => {
          setUser(data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const logout = () => {
    setUser({})
    localStorage.removeItem('token')
    setToken('')
  }

  useEffect(() => {
    if (!user && token !== '') {
      console.log('trying to get user via token')
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
