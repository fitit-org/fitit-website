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
        <div id={ 'box' }>
        <div id={'follow'} className={'items'}><img className={'pics'} src={ follow }/><p>Śledź wszystko</p></div>
        <div id={'train'} className={'items'}><img className={'pics'} src={ train }/><p>Trenuj mądrze</p></div>
        <div id={'activities'} className={'items'}><img className={'pics'} src={ monitor }/><p>Monitoruj aktywność</p></div>
        <div id={'analyze'} className={'items'}><img className={'pics'} src={ analyze }/><p>Analizuj aktywność</p></div>
        <div id={'notify'} className={'items'}><img className={'pics'} src={ notify }/><p>Ustawiaj powiadomienia</p></div>
        <div id={'motivation'} className={'items'}><img className={'pics'} src={ motivation }/><p>Większa motywacja</p></div>
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