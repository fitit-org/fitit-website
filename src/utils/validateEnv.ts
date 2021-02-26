import { cleanEnv, ValidatorSpec, url } from 'envalid'

const env: { [x: string]: ValidatorSpec<unknown> } = {
  API_URL: url(),
}

export default function validateEnv(): void {
  cleanEnv(process.env, env)
}
