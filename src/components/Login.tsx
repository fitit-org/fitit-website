import React from 'react';

interface userNameTypes {
  value: string;
  clicked?: boolean;
}

interface loginPasswordTypes {
  value: string;
  clicked?: boolean;
}

export default class Login extends React.Component<{}, {userName: userNameTypes, loginPassword: loginPasswordTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      userName: {
        value: '',
        clicked: false
      },
      loginPassword: {
        value: '',
        clicked: false
        }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event: any): void {
    if(event.target.id === 'userName') {
      this.setState({userName: {value: event.target.value}});
    }
    else if(event.target.id === 'loginPassword') {
      this.setState({loginPassword: {value: event.target.value}});
    }
  }

  handleClick(event: any): void {
    event.target.classList.add('login-register__input--focus');
  }

  handleBlur(event: any): void {
    event.target.classList.remove('login-register__input--focus')
    if(event.target.value === '') {
      event.target.classList.add('login-register__input--danger')
    }
    else {
      event.target.classList.remove('login-register__input--danger')
    }
  }

  render() {
    return (
      <div className={ 'login' }>
        <span className={ 'login-register--header' }>Logowanie</span>
        <form className={ 'login-register__form' }>
          <input id={ 'userName' } className={ 'login__input--text input--margin' } type='text' onClick={ this.handleClick } onChange={ this.handleChange } onBlur={ this.handleBlur} value={ this.state.userName.value } placeholder='Adres email'/>

          <input id={ 'loginPassword' } className={ 'login__input--text input--margin' } type='password' onChange={ this.handleChange } onClick={ this.handleClick } onBlur={ this.handleBlur} value={ this.state.loginPassword.value } placeholder='Hasło'/><br/>

          <a className={ 'login__forget--text' } href="#register" onClick={ ()=>{ alert('No to dupa'); } }>Nie pamiętasz hasła?</a><br/>

          <input className={ 'login__button input--margin' } type="submit" value="Zaloguj" />
        </form>
      </div>
    );
  }
}