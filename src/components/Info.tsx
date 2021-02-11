import React from 'react';
import menu from '../img/info/infoMenu.svg';

export default class Info extends React.Component {
  render() {
    return (
      <div id={ 'info' } className={ 'info--background view--full-height' }>

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