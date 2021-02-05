import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';
import Articles from './components/Articles';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import './styles/style.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <MainView />
        <Articles />
        <Login />
        <Register />
        <Contact />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);