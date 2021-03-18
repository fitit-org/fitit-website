import React, { useEffect, useState } from 'react'
import ActivityLog from '../types/ActivityLog'

import { Helmet } from 'react-helmet-async'
import { userAction, UserAction } from '../store/modules/user/actions'
import User from '../types/User'
import { StoreState } from '../types/StoreTypes'
import { user, token, activityLog } from '../store/modules/user/selectors'
import { GET_USER_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'
import PanelFooter from '../components/PanelFooter'
import SaveActivity from '../components/ActivityComponents/SaveActivity'
import { TheUserNav } from '../components/Dashboards/TheUserNav'
import CurrentActivity from '../components/ActivityComponents/CurrentActivity'
import ActivityHistory from '../components/ActivityComponents/ActivityHistory'
import ActivitySelect from '../components/ActivityComponents/ActivitySelect'
import ActivityTypes from '../components/ActivityComponents/ActivityTypes'
import StartActivity from '../components/ActivityComponents/StartActivity'

type StudentPanelProps = {
  user: Partial<User>
  token: string
  activityLog: Array<ActivityLog> | Array<string> | undefined
  getUser: UserAction
}

const StudentPanel = (props: StudentPanelProps): JSX.Element => {
  const period = 7
  const count = 15

  const [currentView, setCurrentView] = useState('start')

  const beginning = () => {
    setCurrentView('start')
  }

  const start = () => {
    setCurrentView('workout')
  }

  const select = (event: React.MouseEvent) => {
    const t = event.target as Element
    if (t !== null) {
      if (t.id === '') {
        setCurrentView(t.parentElement?.id as string)
      } else {
        setCurrentView(t.id)
      }
    }
  }

  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      props.getUser(GET_USER_REQUEST, undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      id={'student-panel'}
      className={'view--full-height student-panel--background'}
    >
      <Helmet>
        <title>Panel ucznia | Fit IT</title>
      </Helmet>
      <div className={'student-panel__profile'}>
        <TheUserNav showArrow={false} />
      </div>
      <div id={'student-panel__activity'} className={'student-panel__activity'}>
        {currentView === 'start' && (
          <StartActivity
            activityLog={props.activityLog}
            period={period}
            start={start}
          />
        )}

        {currentView === 'workout' && <ActivitySelect />}

        {currentView !== 'start' && currentView !== 'workout' && (
          <CurrentActivity activity={currentView} />
        )}
      </div>
      <div className={'student-panel__history'}>
        {currentView === 'start' && (
          <ActivityHistory activityLog={props.activityLog} count={count} />
        )}

        {currentView === 'workout' && <ActivityTypes select={select} />}

        {currentView !== 'start' && currentView !== 'workout' && (
          <SaveActivity
            activity={currentView}
            token={props.token}
            goBack={beginning}
          />
        )}
      </div>
      <div className={'student-panel__footer'}>
        <PanelFooter />
      </div>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  user: user(state),
  token: token(state),
  activityLog: activityLog(state),
})

const dispatchToProps = {
  getUser: userAction,
}

export default connect(stateToProps, dispatchToProps)(StudentPanel)
