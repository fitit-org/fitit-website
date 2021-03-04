import React, { lazy, Suspense } from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Store } from 'redux'
import { StoreAction } from './types/StoreTypes'

import ErrorBoundary from './components/ErrorBoundary'
import { store } from './store/store'
import { rootSagas } from './store/modules/moduleRoot'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import validateEnv from './utils/validateEnv'

import './styles/index.scss'

const theStore = store()
theStore.runSaga(rootSagas)

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
      <Provider
        store={
          (theStore as unknown) as Store<unknown, StoreAction<string, unknown>>
        }
      >
        <HelmetProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Helmet>
                <meta charSet="utf-8" />
                <link
                  rel="icon"
                  href={`${process.env.PUBLIC_URL}/favicon.ico`}
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <title>Fit IT</title>
                <meta
                  name="description"
                  content="Aplikacja Fit - szkolne endomondo"
                />
                <link
                  rel="apple-touch-icon"
                  href={`${process.env.PUBLIC_URL}/logo192.png`}
                />
                <link
                  rel="manifest"
                  href={`${process.env.PUBLIC_URL}/manifest.json`}
                />
              </Helmet>
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
                    <TeacherPanel />
                  </TeacherRoute>
                  <StudentRoute path="/student">
                    <StudentPanel />
                  </StudentRoute>
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </HelmetProvider>
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
