import React from 'react';

interface userNameTypes {
  value: string
  clicked?: boolean;
}

interface mailTypes {
  value: string
  type?: string
  clicked?: boolean;
}

interface registerPasswordTypes {
  value: string
  type?: string
  clicked?: boolean;
}

export default class register extends React.Component<{}, {userName: userNameTypes, mail: mailTypes, registerPassword: registerPasswordTypes, registerPassword2: registerPasswordTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      userName: {
        value: 'Nazwa użytkownika',
        clicked: false
      },
      mail: {
        value: 'Adres email',
        clicked: false
      },
      registerPassword: {
        type: 'text',
        value: 'Hasło',
        clicked: false
      },
      registerPassword2: {
        type: 'text',
        value: 'Hasło',
        clicked: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.usernameValidation = this.usernameValidation.bind(this);
  }

  handleChange(event: any): void {
    if(event.target.id === 'userName') {
      this.setState({userName: {value: event.target.value}});
    }
    else if(event.target.id === 'mail') {
      this.setState({mail: {value: event.target.value}});
    }
    else if(event.target.id === 'registerPassword') {
      this.setState({registerPassword: {value: event.target.value}});
    }
    else if(event.target.id === 'registerPassword2') {
      this.setState({registerPassword2: {value: event.target.value}});
    }
  }

  handleClick(event: any): void {
    // First click
    if(event.target.id === 'userName' && this.state.userName.clicked === false) {
      this.setState({userName: {clicked: true, value: ''}});
    }
    else if(event.target.id === 'mail' && this.state.mail.clicked === false) {
      this.setState({mail: {clicked: true, value: ''}});
    }
    else if(event.target.id === 'registerPassword' && this.state.registerPassword.clicked === false) {
      this.setState({registerPassword: {type: 'password', clicked: true, value: ''}});
    }
    else if(event.target.id === 'registerPassword2' && this.state.registerPassword2.clicked === false) {
      this.setState({registerPassword2: {type: 'password', clicked: true, value: ''}});
    }
    // Focus
    event.target.classList.add('login-register__input--focus')
  }

  usernameValidation(event: any): void {
    if(event.target.value === '') {
      event.target.classList.add('register__input--danger')
    }
  }

  render() {
    return (
      <div className={ 'flex-auto flex-none' }>
        <span className={ 'login-register--header' }>Rejestracja</span>
        <form>
          <input id={ 'userName' } className={ 'register__input--text' } type='text' onClick={ this.handleClick } onChange={ this.handleChange } onMouseOut={ this.usernameValidation} value={ this.state.userName.value } /><br/>
          <input id={ 'mail' } className={ 'register__input--text' } type='text' onChange={ this.handleChange } onClick={ this.handleClick } value={ this.state.mail.value } /><br/>
          <input id={ 'registerPassword' } className={ 'register__input--text' } type={ this.state.registerPassword.type } onChange={ this.handleChange } onClick={ this.handleClick } value={ this.state.registerPassword.value } /><br/>
          <input id={ 'registerPassword2' } className={ 'register__input--text' } type={ this.state.registerPassword2.type } onChange={ this.handleChange } onClick={ this.handleClick } value={ this.state.registerPassword2.value } /><br/>
          <label><input type="checkbox"/>Akceptuję warunki umowy</label>
          <input type="submit" value="Zaloguj" />
        </form>
      </div>
    );
  }
}