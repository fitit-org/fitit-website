import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { mailRegex } from '../utils/helpers'
import { userAction, UserAction } from '../store/modules/user/actions'
import { user, token, loginError } from '../store/modules/user/selectors'
import User from '../types/User'
import { StoreState } from '../types/StoreTypes'
import { GET_USER_REQUEST, LOGIN_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'

type LoginProps = {
  user: Partial<User>
  token: string
  error: boolean
  login: UserAction
  getUser: UserAction
}

type LoginData = {
  email: string
  password: string
}

const Login = (props: LoginProps): JSX.Element => {
  const history = useHistory()

  const [error, setError] = useState(false)

  useEffect(() => {
    if (props.token !== '') {
      if (Object.keys(props.user).length !== 0) {
        if (props.user.isTeacher) {
          history.push('/teacher')
        } else {
          history.push('/student')
        }
      } else {
        props.getUser(GET_USER_REQUEST, undefined)
      }
    }
    setError(props.error)
  }, [props, history])

  const { register, errors, handleSubmit } = useForm<LoginData>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<LoginData> = ({ email, password }, e) => {
    e?.preventDefault()
    props.login(LOGIN_REQUEST, { email: email, password: password })
  }

  const onError: SubmitErrorHandler<LoginData> = (errors) => {
    setError(true)
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
          {error ? 'Email lub hasło są niepoprawne' : ''}
        </span>
      </form>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  user: user(state),
  token: token(state),
  error: loginError(state),
})

const dispatchToProps = {
  login: userAction,
  getUser: userAction,
}

export default connect(stateToProps, dispatchToProps)(Login)
