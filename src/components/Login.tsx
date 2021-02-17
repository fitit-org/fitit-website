import React from 'react';
import { mailValidation, passwordValidation } from './Helpers';

interface mailTypes {
  value: string;
}

interface loginPasswordTypes {
  value: string;
}

export default class Login extends React.Component<{}, {mail: mailTypes, loginPassword: loginPasswordTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      mail: {
        value: ''
      },
      loginPassword: {
        value: ''
        }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any): void {
    switch(event.target.id) {
      case 'loginMail' : this.setState({mail: {value: event.target.value}}); break;
      case 'loginPassword' : this.setState({loginPassword: {value: event.target.value}}); break;
    }
  }

  handleClick(event: any): void {
    event.target.classList.add('login-register__input--focus');
    event.target.classList.remove('login-register__input--danger');
    document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
  }

  handleBlur(event: any): void {
    event.target.classList.remove('login-register__input--focus')
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
    if(event.target.id === 'loginPassword') {
      let error = passwordValidation(event.target.value);
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

  handleSubmit(event: any): void {

  }


  render() {
    return (
      <div className={ 'login' }>
        <span className={ 'login-register--header' }>Logowanie</span>
        <form className={ 'login-register__form' }>
          <input
          id={ 'loginMail' }
          className={ 'login__input--text input--margin' }
          type='text'
          onClick={ this.handleClick }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur}
          value={ this.state.mail.value }
          placeholder='Adres email'
          required
          />
          <span id={ 'loginMailError' } className={ 'login-register__input--error' }></span>
          <input
          id={ 'loginPassword' }
          className={ 'login__input--text input--margin' }
          type='password'
          onClick={ this.handleClick }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur}
          value={ this.state.loginPassword.value }
          placeholder='Hasło'
          required
          />
          <span id={ 'loginPasswordError' } className={ 'login-register__input--error' }></span><br />
          <a className={ 'login__forget--text' } href="#register" onClick={ ()=>{ alert('No to dupa'); } }>Nie pamiętasz hasła?</a><br/>

          <input className={ 'login__button input--margin' } type="submit" value="Zaloguj" />
        </form>
      </div>
    );
  }
}