import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

import MainView from './components/MainView';
import Info from './components/Info';
import LoginRegister from './components/LoginRegister';
import Contact from './components/Contact';
import TeacherPanel from './components/TeacherPanel';
import StudentPanel from './components/StudentPanel';
import { apiUrl, handleErrors } from './components/Helpers';

import './styles/main.scss';

const cookies = new Cookies();

class App extends React.Component {
  checkUser(token: string | undefined) : void {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    };
    fetch(`${apiUrl}/user`, requestOptions)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      if(response.email === cookies.get('user').email) {
        if(response.isTeacher === true && window.location.pathname !== '/teacher') {
          window.location.pathname = '/teacher';
        }
        else if(response.isTeacher === false && window.location.pathname !== '/student') {
          window.location.pathname = '/student';
        }
      }
    })
    .catch(() => {
      if(window.location.pathname !== '/') {
        window.location.pathname = '/';
      }
    });
  }
  render() {
    this.checkUser(cookies.get('jwt'));
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div>
                <MainView />
                <Info />
                <LoginRegister />
                <Contact />
              </div>
            )}
          />
          <Route
            path='/teacher'
            render={() => (
              <TeacherPanel title='Panel nauczyciela | Fit IT' />
            )}
          />
          <Route
            path='/student'
            render={() => (
              <StudentPanel title='Panel ucznia | Fit IT' />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);