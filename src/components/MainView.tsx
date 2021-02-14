import React from 'react';
import arrow from '../img/main-view/arrowDown.svg';

export default class MainView extends React.Component< {}, { currentAnimation: string } > {
  animation: any = {};
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { currentAnimation: 'slide-top' };
  }

  componentDidMount() {
    if(this.state.currentAnimation === 'slide-top') {
      this.animation = setInterval(() => this.changeAnimation(), 1100);
    }
    else {
      this.animation = setInterval(() => this.changeAnimation(), 1500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.animation);
  }

  changeAnimation() {
    if(this.state.currentAnimation === 'slide-top') {
      this.setState({
        currentAnimation: 'slide-bottom'
      });
    }
    else {
      this.setState({
        currentAnimation: 'slide-top'
      });
    }
  }

  render() {
    return (
      <div id={ 'main-view' } className={ 'view--full-height main-view--background' }>
        <div className={ 'absolute right-6 top-5 text-2xl tracking-wide text-white' }>
          <p className={ 'text--shadow' }><a href={ '#login-register' }>Zaloguj się</a>  &bull;  <a href={ '#login-register' }>Zarejestruj się</a></p>
        </div>
        <div className={ `main-view__arrow main-arrow--bottom-center ${this.state.currentAnimation}` }>
          <a href={ '#info' }><img src={ arrow } alt={ 'Next page' }/></a>
        </div>
      </div>
    );
  }
}
