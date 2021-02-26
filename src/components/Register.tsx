import React from 'react';
import Cookies from 'universal-cookie';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { nameSurnameValidation, mailValidation, registerPasswordValidation, codeValidation, handleErrors, apiUrl } from './Helpers';



interface nameTypes {
  value: string;
}

interface surnameTypes {
  value: string;
}

interface mailTypes {
  value: string;
}

interface registerPasswordTypes {
  value: string;
}

interface registerCodeTypes {
  value: string;
}

const cookies = new Cookies();

class Register extends React.Component<{} & RouteComponentProps, {name: nameTypes, surname: surnameTypes, registerMail: mailTypes, registerPassword: registerPasswordTypes, registerPassword2: registerPasswordTypes, registerCode: registerCodeTypes}> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: {
        value: ''
      },
      surname: {
        value: ''
      },
      registerMail: {
        value: ''
      },
      registerPassword: {
        value: ''
      },
      registerPassword2: {
        value: ''
      },
      registerCode: {
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
      case 'registerName' : this.setState({name: {value: event.target.value}}); break;
      case 'registerSurname' : this.setState({surname: {value: event.target.value}}); break;
      case 'registerMail' : this.setState({registerMail: {value: event.target.value}}); break;
      case 'registerPassword' : this.setState({registerPassword: {value: event.target.value}}); break;
      case 'registerPassword2' : this.setState({registerPassword2: {value: event.target.value}}); break;
      case 'registerCode' : this.setState({registerCode: {value: event.target.value}}); break;
    }
  }

  handleClick(event: any): void {
    event.target.classList.add('login-register__input--focus');
    event.target.classList.remove('login-register__input--danger');
    document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
  }

  handleBlur(event: any): void {
    event.target.classList.remove('login-register__input--focus');
    if(event.target.id === 'registerName' || event.target.id === 'registerSurname') {
      let error = nameSurnameValidation(event.target.name, event.target.value);
      if(error !== '') {
        event.target.classList.add('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = error;
      }
      else {
        event.target.classList.remove('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
    if(event.target.id === 'registerMail') {
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
    if(event.target.id === 'registerPassword') {
      let error = registerPasswordValidation(event.target.value);
      if(error !== '') {
        event.target.classList.add('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = error;
      }
      else {
        event.target.classList.remove('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
    if(event.target.id === 'registerPassword2') {
      if(event.target.value !== this.state.registerPassword.value ) {
        event.target.classList.add('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = 'Hasła nie zgadzają się';
      }
      else {
        event.target.classList.remove('login-register__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
    if(event.target.id === 'registerCode') {
      let error = codeValidation(event.target.value);
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
    if(nameSurnameValidation('Imię', this.state.name.value) === '' && nameSurnameValidation('Nazwisko', this.state.surname.value) === '' && mailValidation(this.state.registerMail.value) === '' && registerPasswordValidation(this.state.registerPassword.value) === '' && this.state.registerPassword.value === this.state.registerPassword2.value && codeValidation(this.state.registerCode.value) === '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.registerMail.value,
          password: this.state.registerPassword.value,
          name: this.state.name.value,
          surname: this.state.surname.value,
          classId: this.state.registerCode.value
        })
      };
      fetch(`${apiUrl}/auth/register`, requestOptions)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        document.getElementById('registerError')!.innerHTML = '';
        cookies.set('jwt', data.token, {
            // secure: true,
            sameSite: true
        });
        cookies.set('user', JSON.stringify(data.user), {
          // secure: true,
          sameSite: true
        });
        if(data.user.isTeacher === true) {
          this.props.history.push('/teacher');
        }
        else if(data.user.isTeacher === false) {
          this.props.history.push('/student');
        }
      })
      .catch(() => {
        document.getElementById('registerError')!.innerHTML = 'Podano złe dane';
      });
    }
  }

  render() {
    return (
      <div className={ 'register' }>
        <span className={ 'login-register--header' }>Rejestracja</span>
        <form className={ 'login-register__form' } onSubmit={ this.handleSubmit }>
          <input
            id={ 'registerName' }
            className={ 'register__input--text input--margin' }
            type='text'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.name.value }
            placeholder='Imię'
            name='Imię'
            required
          />
          <span
            id={ 'registerNameError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'registerSurname' }
            className={ 'register__input--text input--margin' }
            type='text'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.surname.value }
            placeholder='Nazwisko'
            name="Nazwisko"
            required
          />
          <span
            id={ 'registerSurnameError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'registerMail' }
            className={ 'register__input--text input--margin' }
            type='text'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.registerMail.value }
            placeholder='Adres email'
            required
          />
          <span
            id={ 'registerMailError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'registerPassword' }
            className={ 'register__input--text input--margin' }
            type='password'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.registerPassword.value }
            placeholder='Hasło'
            required
          />
          <span
            id={ 'registerPasswordError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'registerPassword2' }
            className={ 'register__input--text input--margin' }
            type='password'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.registerPassword2.value }
            placeholder='Powtórz hasło'
            required
          />
          <span
            id={ 'registerPassword2Error' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            id={ 'registerCode' }
            className={ 'register__input--text input--margin' }
            type='text'
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            onBlur={ this.handleBlur}
            value={ this.state.registerCode.value }
            placeholder='Kod zaproszenia'
            required
          />
          <span
            id={ 'registerCodeError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <br/>
          <input
            type="checkbox"
            required
          />
          <a
            className={ 'register__agreement--text' }
            href="https://www.youtube.com/watch?v=DLzxrzFCyOs"
            target='_blank' rel='noreferrer'
          >
            &nbsp;&nbsp;Akceptuję warunki umowy
          </a>
          <br/>
          <span
            id={ 'registerError' }
            className={ 'login-register__input--error' }
          >
          </span>
          <input
            className={ 'input--margin register__button' }
            type="submit"
            value="Rejestracja"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Register);