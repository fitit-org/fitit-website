import React, { lazy, Suspense } from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import ProvideAuth from './components/ProvideAuth'
import ErrorBoundary from './components/ErrorBoundary'
import { store } from './store/store'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import validateEnv from './utils/validateEnv'

import './styles/main.scss'

const MainView = lazy(() => import('./views/MainView'))
const Info = lazy(() => import('./views/Info'))
const LoginRegister = lazy(() => import('./views/LoginRegister'))
const Contact = lazy(() => import('./views/Contact'))
const TeacherPanel = lazy(() => import('./views/TeacherPanel'))
const StudentPanel = lazy(() => import('./views/StudentPanel'))
const StudentRoute = lazy(() => import('./components/StudentRoute'))
const TeacherRoute = lazy(() => import('./components/TeacherRoute'))

const renderLoader = () => <p>Loading...</p>

validateEnv()

const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ProvideAuth>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={renderLoader()}>
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
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </ProvideAuth>
      </Provider>
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

serviceWorkerRegistration.register()
reportWebVitals(console.log)
