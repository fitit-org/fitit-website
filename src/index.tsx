import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';
import Info from './components/Info';
import LoginRegister from './components/LoginRegister';
import Contact from './components/Contact';
import './styles/style.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <MainView />
        <Info />
        <LoginRegister />
        <Contact />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);