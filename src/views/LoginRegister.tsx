import React from 'react'
import menu from '../img/login-register/login-registerMenu.svg'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginRegister = (): JSX.Element => {
  return (
    <div className={'info--background view--full-height'}>
      <div
        id={'login-register'}
        className={'view--full-height login-register__container'}
      >
        <Login />
        <hr className={'hr--vertical'} />
        <Register />
      </div>
      <img
        className={'menu-login-register--bottom-right'}
        src={menu}
        useMap="#menu"
        alt=""
      />
      <map name="menu">
        <area alt="" href="#main-view" coords="12,12,11" shape="circle" />
        <area alt="" href="#info" coords="12,45,11" shape="circle" />
        <area alt="" href="#login-register" coords="12,77,10" shape="circle" />
        <area alt="" href="#contact" coords="12,110,10" shape="circle" />
      </map>
    </div>
  )
}

export default LoginRegister
