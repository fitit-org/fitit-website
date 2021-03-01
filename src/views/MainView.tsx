import React, { useState, useEffect } from 'react'
import arrow from '../img/main-view/arrowDown.svg'

const MainView = (): JSX.Element => {
  const [currentAnimation, setCurrentAnimation] = useState('slide-top')

  useEffect(() => {
    let animation: NodeJS.Timeout
    if (currentAnimation === 'slide-top') {
      animation = setInterval(() => setCurrentAnimation('slide-bottom'), 1100)
    } else {
      animation = setInterval(() => setCurrentAnimation('slide-top'), 1500)
    }
    return function cleanup() {
      clearInterval(animation)
    }
  })

  return (
    <div id={'main-view'} className={'view--full-height main-view--background'}>
      <div className={'main-view--topmenu'}>
        <p className={'text--shadow'}>
          <a href={'#login-register'}>Zaloguj się</a> &bull;{' '}
          <a href={'#login-register'}>Zarejestruj się</a>
        </p>
      </div>
      <div
        className={`main-view__arrow main-arrow--bottom-center ${currentAnimation}`}
      >
        <a href={'#info'}>
          <img src={arrow} alt={'Next page'} />
        </a>
      </div>
    </div>
  )
}

export default MainView
