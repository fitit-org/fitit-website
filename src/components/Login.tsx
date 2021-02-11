import React from 'react';

interface userNameTypes {
  value: string
  clicked?: boolean;
}

interface loginPasswordTypes {
  value: string
  type?: string
  clicked?: boolean;
}

export default class Login extends React.Component<{}, {userName: userNameTypes, loginPassword: loginPasswordTypes}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      userName: {
        value: 'Nazwa użytkownika',
        clicked: false
      },
      loginPassword: {
        type: 'text',
        value: 'Hasło',
        clicked: false
        }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  handleChange(event: any): void {
    if(event.target.id === 'userName') {
      this.setState({userName: {value: event.target.value}});
    }
    else if(event.target.id === 'loginPassword') {
      this.setState({loginPassword: {value: event.target.value}});
    }
  }

  handleFirstClick(event: any): void {
    if(event.target.id === 'userName' && this.state.userName.clicked === false) {
      this.setState({userName: {clicked: true, value: ''}});
    }
    else if(event.target.id === 'loginPassword' && this.state.loginPassword.clicked === false) {
      this.setState({loginPassword: {type: 'password', clicked: true, value: ''}});
    }
  }

  render() {
    return (
      <div className={ 'flex-auto flex-none' }>
        <span className={ 'login-register--header' }>Logowanie</span>
        <form>
          <input id={ 'userName' } className={ 'login__input--text' } type='text' onClick={ this.handleFirstClick } onChange={ this.handleChange } value={ this.state.userName.value } /><br/>
          <input id={ 'loginPassword' } className={ 'login__input--text' } type={ this.state.loginPassword.type } onChange={ this.handleChange } onClick={ this.handleFirstClick } value={ this.state.loginPassword.value } /><br/>
          <a className={ 'login__forget--text' } href=" ">Nie pamiętasz hasła?</a>
          <input type="submit" value="Zaloguj" />
        </form>
      </div>
    );
  }
}