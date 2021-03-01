import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'

import MainView from './views/MainView'
import Info from './views/Info'
import LoginRegister from './views/LoginRegister'
import Contact from './views/Contact'
import TeacherPanel from './views/TeacherPanel'
import StudentPanel from './views/StudentPanel'
import ProvideAuth from './components/ProvideAuth'
import StudentRoute from './components/StudentRoute'
import TeacherRoute from './components/TeacherRoute'
import { store } from './store/store'

import validateEnv from './utils/validateEnv'

import './styles/main.scss'

validateEnv()

const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <ProvideAuth>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <div>
                      <MainView />
                      <Info />
                      <LoginRegister />
                      <Contact />
                    </div>
                  )}
                />
                <TeacherRoute path="/teacher">
                  <TeacherPanel title="Panel nauczyciela | Fit IT" />
                </TeacherRoute>
                <StudentRoute path="/student">
                  <StudentPanel title="Panel ucznia | Fit IT" />
                </StudentRoute>
              </Switch>
            </BrowserRouter>
          </ProvideAuth>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')

if ((rootElement as HTMLElement).hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement)
} else {
  ReactDOM.render(<App />, rootElement)
}
