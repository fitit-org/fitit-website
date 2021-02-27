import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { mailRegex } from './Helpers'
import { useAuth } from '../hooks/use-auth'

type LoginData = {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const { register, errors, handleSubmit } = useForm<LoginData>({
    mode: 'onBlur',
  })
  const [loginError, setLoginError] = useState(false)
  const history = useHistory()
  const auth = useAuth()

  const onSubmit: SubmitHandler<LoginData> = async ({ email, password }, e) => {
    e?.preventDefault()
    try {
      await auth.signin(email, password)
      if (auth.user.isTeacher) {
        history.push('/teacher')
      } else {
        history.push('/student')
      }
    } catch (err) {
      setLoginError(true)
    }
  }

  const onError: SubmitErrorHandler<LoginData> = (errors) => {
    setLoginError(true)
  }

  return (
    <div className={'login'}>
      <span className={'login-register--header'}>Logowanie</span>
      <form
        className={'login-register__form'}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          id="loginMail"
          className={'login__input--text input--margin'}
          type="text"
          name="email"
          ref={register({
            required: 'Adres email jest wymagany',
            pattern: {
              value: mailRegex,
              message: 'Należy wprowadzić poprawny adres email',
            },
          })}
          placeholder="Adres email"
          required
        />
        <span id={'loginMailError'} className={'login-register__input--error'}>
          {errors.email && errors.email.message}
        </span>
        <input
          id={'loginPassword'}
          className={'login__input--text input--margin'}
          type="password"
          name="password"
          ref={register({
            required: 'Hasło jest wymagane',
          })}
          placeholder="Hasło"
          required
        />
        <span
          id={'loginPasswordError'}
          className={'login-register__input--error'}
        >
          {errors.password && errors.password.message}
        </span>
        <br />
        <a
          className={'login__forget--text'}
          href="#register"
          onClick={() => {
            alert('Skontaktuj się ze swoim nauczycielem')
          }}
        >
          Nie pamiętasz hasła?
        </a>
        <br />
        <input
          className={'login__button input--margin'}
          type="submit"
          value="Zaloguj"
        />
        <span id="loginError" className={'login-register__input--error'}>
          {loginError ? 'Email lub hasło są niepoprawne' : ''}
        </span>
      </form>
    </div>
  )
}

export default withRouter(Login)
