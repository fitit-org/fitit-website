import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { userAction, UserAction } from '../store/modules/user/actions'
import { user, token, registerError } from '../store/modules/user/selectors'
import User from '../types/User'
import { StoreState } from '../types/StoreTypes'
import { GET_USER_REQUEST, REGISTER_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'
import { mailRegex, passwordRegex } from '../utils/helpers'

type RegisterData = {
  name: string
  surname: string
  email: string
  password: string
  passwordRepeated: string
  code: string
}

type RegisterProps = {
  user: Partial<User>
  token: string
  error: boolean
  register: UserAction
  getUser: UserAction
}

const Register = (props: RegisterProps): JSX.Element => {
  const { register, errors, handleSubmit, getValues } = useForm<RegisterData>({
    mode: 'onBlur',
  })
  const [error, setError] = useState(false)
  const history = useHistory()

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

  const onSubmit: SubmitHandler<RegisterData> = async (
    { name, surname, email, password, passwordRepeated, code },
    e
  ) => {
    e?.preventDefault()
    props.register(REGISTER_REQUEST, {
      name: name,
      surname: surname,
      email: email,
      password: password,
      code: code,
    })
  }

  const onError: SubmitErrorHandler<RegisterData> = (errors) => {
    setError(true)
  }

  return (
    <div className={'register'}>
      <span className={'login-register--header'}>Rejestracja</span>
      <form
        className={'login-register__form'}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          id="registerName"
          className={'register__input--text input--margin'}
          type="text"
          ref={register({
            required: 'Należy podać imię',
            minLength: {
              value: 3,
              message: 'Imię musi składać się z co najmniej 3 znaków',
            },
            pattern: {
              value: /(?![^a-zA-Z -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń])/,
              message: 'Wprowadzono niedozwolone znaki',
            },
          })}
          placeholder="Imię"
          name="name"
          required
        />
        <span
          id={'registerNameError'}
          className={'login-register__input--error'}
        >
          {errors.name && errors.name.message}
        </span>
        <input
          id="registerSurname"
          className={'register__input--text input--margin'}
          type="text"
          ref={register({
            required: 'Należy podać nazwisko',
            minLength: {
              value: 3,
              message: 'Nazwisko musi składać się z co najmniej 3 znaków',
            },
            pattern: {
              value: /(?![^a-zA-Z -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń])/,
              message: 'Wprowadzono niedozwolone znaki',
            },
          })}
          placeholder="Nazwisko"
          name="surname"
          required
        />
        <span
          id={'registerSurnameError'}
          className={'login-register__input--error'}
        >
          {errors.surname && errors.surname.message}
        </span>
        <input
          id="registerMail"
          className={'register__input--text input--margin'}
          type="text"
          ref={register({
            required: 'Należy podać adres email',
            pattern: {
              value: mailRegex,
              message: 'Wprowadzono niepoprawny adres email',
            },
          })}
          name="email"
          placeholder="Adres email"
          required
        />
        <span
          id={'registerMailError'}
          className={'login-register__input--error'}
        >
          {errors.email && errors.email.message}
        </span>
        <input
          id="registerPassword"
          className={'register__input--text input--margin'}
          type="password"
          ref={register({
            required: 'Należy podać hasło',
            pattern: {
              value: passwordRegex,
              message:
                'Hasło musi składać się z co najmniej 10 znaków, małej i wielkiej litery, cyfry i znaku specjalnego',
            },
          })}
          name="password"
          placeholder="Hasło"
          required
        />
        <span
          id={'registerPasswordError'}
          className={'login-register__input--error'}
        >
          {errors.password && errors.password.message}
        </span>
        <input
          id="registerPasswordRepeated"
          className={'register__input--text input--margin'}
          type="password"
          ref={register({
            required: 'Należy powtórzyć wprowadzone hasło',
            validate: {
              sameAs: (value) =>
                value === getValues('password') || 'Hasła muszą być takie same',
            },
          })}
          name="passwordRepeated"
          placeholder="Powtórz hasło"
          required
        />
        <span
          id={'registerPassword2Error'}
          className={'login-register__input--error'}
        >
          {errors.passwordRepeated && errors.passwordRepeated.message}
        </span>
        <input
          id="registerCode"
          className={'register__input--text input--margin'}
          type="text"
          name="code"
          ref={register({
            required: 'Należy podać kod zaproszenia',
            pattern: {
              value: /(?![^a-zA-Z0-9 -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń])/,
              message: 'Wprowadzono niedozwolone znaki',
            },
            minLength: {
              value: 3,
              message: 'Kod musi się składać z co najmniej 3 znaków',
            },
          })}
          placeholder="Kod zaproszenia"
          required
        />
        <span
          id={'registerCodeError'}
          className={'login-register__input--error'}
        >
          {errors.code && errors.code.message}
        </span>
        <br />
        <input type="checkbox" required />
        <a
          className={'register__agreement--text'}
          href="https://www.youtube.com/watch?v=DLzxrzFCyOs"
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;&nbsp;Akceptuję warunki umowy
        </a>
        <br />
        <span id={'registerError'} className={'login-register__input--error'}>
          {error ? 'Wystąpił błąd przy rejestracji' : ''}
        </span>
        <input
          className={'input--margin register__button'}
          type="submit"
          value="Rejestracja"
        />
      </form>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  user: user(state),
  token: token(state),
  error: registerError(state),
})

const dispatchToProps = {
  register: userAction,
  getUser: userAction,
}

export default connect(stateToProps, dispatchToProps)(Register)
