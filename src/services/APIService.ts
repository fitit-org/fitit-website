import LoginDTO from '../types/login.dto'
import RegisterDTO from '../types/register.dto'
import User from '../types/User'

const URI = process.env.REACT_APP_API_URL

enum FetchMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface AuthResponse {
  user: User
  token: string
}

async function fetchAndCatch(
  method: FetchMethod,
  uri: string,
  body: unknown | undefined = undefined,
  token = ''
): Promise<Record<string, unknown>> {
  const requestOptions: RequestInit = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body)
  }
  if (token !== '') {
    requestOptions.headers = {
      Authorization: `Bearer ${token}`,
      ...requestOptions.headers,
    }
  }
  return fetch(uri, requestOptions)
    .catch(() => {
      throw new Error('Request failed!')
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res
    })
    .then((res) => res.json())
}

export async function login(dto: LoginDTO): Promise<AuthResponse> {
  return fetchAndCatch(FetchMethod.POST, `${URI}/auth/login`, dto).then(
    (obj) => {
      return {
        user: obj.user as User,
        token: obj.token as string,
      }
    }
  )
}

export async function register(dto: RegisterDTO): Promise<AuthResponse> {
  return fetchAndCatch(FetchMethod.POST, `${URI}/auth/register`, dto).then(
    (obj) => {
      return {
        user: obj.user as User,
        token: obj.token as string,
      }
    }
  )
}

export async function getUser(token: string): Promise<User> {
  return fetchAndCatch(
    FetchMethod.GET,
    `${URI}/api/v1/users`,
    undefined,
    token
  ).then((obj) => {
    return (obj as unknown) as User
  })
}