import React from 'react';
import menu from '../img/login-register/login-registerMenu.svg';

export default class LoginRegister extends React.Component {
  render() {
    return (
      <div id={ 'login-register' } className={ 'view--full-height' }>
        <img className={ '' } src={ menu } useMap="#menu" alt=""/>
        <map name="menu" style={{ color: 'red' }}>
          <area alt="" href="#main-view" coords="12,12,11" shape="circle"/>
          <area alt="" href="#info" coords="12,45,11" shape="circle"/>
          <area alt="" href="#login" coords="12,77,10" shape="circle"/>
          <area alt="" href="#contact" coords="12,110,10" shape="circle"/>
        </map>
      </div>
    );
  }
}