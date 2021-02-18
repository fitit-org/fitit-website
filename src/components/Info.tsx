import React from 'react';
import menu from '../img/info/infoMenu.svg';
import analyze from '../img/info/analizuj.svg';
import monitor from '../img/info/monitoruj.svg';
import follow from '../img/info/sledz.svg';
import train from '../img/info/trenuj.svg';
import notify from '../img/info/ustawiaj.svg';
import motivation from '../img/info/wieksza.svg';

export default class Info extends React.Component {
  render() {
    return (
      <div id={ 'info' } className={ 'info--background view--full-height' }>
        <div className={ 'box' }>
        <div id={'box__items__follow'} className={'box__items'}><img className={'box__pics'} src={ follow } alt=""/><p>Śledź wszystko</p></div>
        <div id={'box__items__train'} className={'box__items'}><img className={'box__pics'} src={ train } alt=""/><p>Trenuj mądrze</p></div>
        <div id={'box__items__activities'} className={'box__items'}><img className={'box__pics'} src={ monitor } alt=""/><p>Monitoruj aktywność</p></div>
        <div id={'box__items__analyze'} className={'box__items'}><img className={'box__pics'} src={ analyze } alt=""/><p>Analizuj aktywność</p></div>
        <div id={'box__items__notify'} className={'box__items'}><img className={'box__pics'} src={ notify } alt=""/><p>Ustawiaj powiadomienia</p></div>
        <div id={'box__items__motivation'} className={'box__items'}><img className={'box__pics'} src={ motivation } alt=""/><p>Większa motywacja</p></div>
        </div>
        <img className={ 'menu-info--bottom-right' } src={ menu } useMap="#menu" alt=""/>
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