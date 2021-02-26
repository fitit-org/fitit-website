import { cleanEnv, url } from 'envalid'

export default function validateEnv(): void {
  cleanEnv(process.env, {
    REACT_APP_API_URL: url(),
  })
}
