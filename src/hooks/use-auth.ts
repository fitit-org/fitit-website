import { useContext, createContext } from 'react'
import { User } from '../types/User'

interface ContextProps {
  user: Partial<User>
  token: string
  signin: (email: string, password: string) => Promise<void>
  signup: (
    name: string,
    surname: string,
    email: string,
    password: string,
    code: string
  ) => Promise<void>
  logout: () => void
}

const authContext = createContext({} as ContextProps)

const useAuth = (): ContextProps => {
  return useContext(authContext)
}

export { authContext, useAuth }
