import React from 'react';

import { nameSurnameValidation,mailValidation, handleErrors, apiUrl } from './Helpers';

import menu from '../img/contact/contactMenu.svg';

interface mailTypes {
  value: string;
}
interface nameTypes {
  value: string;
}

export default class Contact extends React.Component <{}, {name: nameTypes, contactMail: mailTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      name: {
        value: ''
      },
      contactMail: {
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
      case 'contactName' : this.setState({name: {value: event.target.value}}); break;
      case 'contactMail' : this.setState({contactMail: {value: event.target.value}}); break;
    }
  }
  handleClick(event: any): void {
    event.target.classList.add('contactBox__form__input--focus');
    event.target.classList.remove('contactBox__form__input--danger');
    document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
  }
  handleBlur(event: any): void {
    event.target.classList.remove('contactBox__form__input--focus');
    if(event.target.id === 'contactName') {
      let error = nameSurnameValidation(event.target.name, event.target.value);
      if(error !== '') {
        event.target.classList.add('contactBox__form__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = error;
      }
      else {
        event.target.classList.remove('contactBox__form__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
    if(event.target.id === 'contactMail') {
      let error = mailValidation(event.target.value);
      if(error !== '') {
        event.target.classList.add('contactBox__form__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = error;
      }
      else {
        event.target.classList.remove('contactBox__form__input--danger');
        document.getElementById(`${event.target.id}Error`)!.innerHTML = '';
      }
    }
  }
  handleSubmit(event: any) : void {
    event.preventDefault();
    if(mailValidation(this.state.contactMail.value) === '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.contactMail.value,
          name: this.state.name.value,
        })
      };
      fetch(`${apiUrl}auth/register`, requestOptions)
      .then(handleErrors)
      .then(response => response.json())
      .catch(() => {
        document.getElementById('registerError')!.innerHTML = 'Podano złe dane';
      });
    }
  }
  render() {
    return (
      <div id={ 'contact' } className={ 'contact--background view--full-height' }>
        <div className={'contactBox'}>
            <form className={'contactBox__form'} id={'contactForm'}>
            <span className={'contactBox--header'}>Skontaktuj się z nami</span>
              <input
              id={'contactName'}
              className={ 'contactBox__form__input--text input--margin' }
              type='text'
              placeholder='Imię'
              name='Imię'
              onClick={ this.handleClick }
              onChange={ this.handleChange }
              onBlur={ this.handleBlur}
              value={ this.state.name.value }
              required
              />
              <span
              id={ 'contactNameError' }
              className={ 'contactBox__form__input--error' }
              ></span>
              <input
              id={'contactMail'}
              className={ 'contactBox__form__input--text input--margin' }
              type='text'
              placeholder='Adres email'
              name='Adres email'
              onClick={ this.handleClick }
              onChange={ this.handleChange }
              onBlur={ this.handleBlur}
              value={ this.state.contactMail.value }
              required
              />
              <span
              id={ 'contactMailError' }
              className={ 'contactBox__form__input--error' }
              ></span><br/>
              <input
              className={ 'contactBox__form__button input--margin' }
              type="submit"
              value="Wyślij"
              onSubmit={ event => event.preventDefault() }
              />
            </form>
            <textarea
              id={'contactMsg'}
              form={'contactForm'}
              className={ 'contactBox--textarea input--margin' }
              placeholder='Wiadomość'
              required
              />
        </div>
        <img className={ 'menu-contact--bottom-right' } src={ menu } useMap="#menu" alt=""/>
        <map name="menu">
          <area alt="" href="#main-view" coords="12,12,11" shape="circle"/>
          <area alt="" href="#info" coords="12,45,11" shape="circle"/>
          <area alt="" href="#login-register" coords="12,77,10" shape="circle"/>
          <area alt="" href="#contact" coords="12,110,10" shape="circle"/>
        </map>
      </div>
    );
  }
}