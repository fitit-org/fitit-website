import { ActivityType } from '../types/ActivityType'
import LoginDTO from '../types/login.dto'
import RegisterDTO from '../types/register.dto'
import User from '../types/User'
import Class from '../types/Class'
import ActivityData from '../types/ActivityData'

const URI = process.env.REACT_APP_API_URL

enum FetchMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface AuthResponse {
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

export async function getUser(token: string): Promise<Partial<User>> {
  return fetchAndCatch(
    FetchMethod.GET,
    `${URI}/api/v1/users`,
    undefined,
    token
  ).then((obj) => {
    return (obj as unknown) as User
  })
}

export async function getClasses(
  token: string
): Promise<{ classes: Array<Class>; users: Array<User> }> {
  return fetchAndCatch(
    FetchMethod.GET,
    `${URI}/api/v1/classes`,
    undefined,
    token
  ).then(
    (obj) => (obj as unknown) as { classes: Array<Class>; users: Array<User> }
  )
}

export async function getActivityTypes(): Promise<Array<ActivityType>> {
  const obj = await fetchAndCatch(
    FetchMethod.GET,
    `${URI}/api/v1/activitytypes`
  )
  return (obj as unknown) as Array<ActivityType>
}

export function addActivity(activityData: ActivityData, token: string) {
  fetchAndCatch(
    FetchMethod.POST,
    `${URI}/api/v1/activitylog`,
    activityData,
    token
  )
}
