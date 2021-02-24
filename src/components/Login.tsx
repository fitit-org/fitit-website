import React from 'react';
import { mailValidation, handleErrors, apiUrl } from './Helpers';
import Cookies from 'universal-cookie';

interface mailTypes {
  value: string;
}

interface loginPasswordTypes {
  value: string;
}

interface loginResponseTypes {
  status: number;
  message: string;
}

const cookies = new Cookies();

export default class Login extends React.Component<{}, {loginMail: mailTypes, loginPassword: loginPasswordTypes, loginResponse: loginResponseTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      loginMail: {
        value: ''
      },
      loginPassword: {
        value: ''
      },
      loginResponse: {
        status: 0,
        message: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any): void {
    switch(event.target.id) {
      case 'loginMail' : this.setState({loginMail: {value: event.target.value}}); break;
      case 'loginPassword' : this.setState({loginPassword: {value: event.target.value}}); break;
    }
  }

  handleClick(event: any): void {
    event.target.classList.add('login-register__input--focus');
    event.target.classList.remove('login-register__input--danger');
    document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
  }

  handleBlur(event: any): void {
    event.target.classList.remove('login-register__input--focus');
    if(event.target.id === 'loginMail') {
      let error = mailValidation(event.target.value);
      if(error !== '') {
        event.target.classList.add('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = error;
      }
      else {
        event.target.classList.remove('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
  }

  handleSubmit(event: any) : void {
    event.preventDefault();
    if(mailValidation(this.state.loginMail.value) === '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.loginMail.value,
          password: this.state.loginPassword.value
        })
      };
      fetch(`${apiUrl}auth/login`, requestOptions)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById('loginError')!.innerHTML = '';
        cookies.set('jwt', data.token, {
            // secure: true,
            sameSite: true
          });
      })
      .catch(() => {
        document.getElementById('loginError')!.innerHTML = 'Wprowadzono złe hasło lub mail';
      });
    }
  }


  render() {
    return (
      <div className={ 'login' }>
        <span className={ 'login-register--header' }>Logowanie</span>
        <form className={ 'login-register__form' } onSubmit={ this.handleSubmit }>
          <input
            id={ 'loginMail' }
            className={ 'login__input--text input--margin' }
            type='text'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.loginMail.value }
            placeholder='Adres email'
            required
          />
          <span
            id={ 'loginMailError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'loginPassword' }
            className={ 'login__input--text input--margin' }
            type='password'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            value={ this.state.loginPassword.value }
            placeholder='Hasło'
            required
          />
          <span
            id={ 'loginPasswordError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <br />
          <a
            className={ 'login__forget--text' }
            href="#register"
            onClick={ ()=>{ alert('Skontaktuj się ze swoim nauczycielem'); } }
          >
            Nie pamiętasz hasła?
          </a>
          <br/>
          <input
            className={ 'login__button input--margin' }
            type="submit"
            value="Zaloguj"
          />
          <span
            id={ 'loginError' }
            className={ 'login-register__input--error' }
          >
          </span>
        </form>
      </div>
    );
  }
}