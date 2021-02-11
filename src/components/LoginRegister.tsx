import React from 'react';
import menu from '../img/login-register/login-registerMenu.svg';
import Login from './Login';
import Register from './Register';

export default class LoginRegister extends React.Component {
  render() {
    return (
      <div id={ 'login-register' } className={ 'flex flex-row flex-nowrap justify-center content-center login-register--background view--full-height' }>
        <Login />
        <Register />

        <img className={ 'menu--bottom-right' } src={ menu } useMap="#menu" alt=""/>
        <map name="menu" style={{ color: 'red' }}>
          <area alt="" href="#main-view" coords="12,12,11" shape="circle"/>
          <area alt="" href="#info" coords="12,45,11" shape="circle"/>
          <area alt="" href="#login-register" coords="12,77,10" shape="circle"/>
          <area alt="" href="#contact" coords="12,110,10" shape="circle"/>
        </map>
      </div>
    );
  }
}