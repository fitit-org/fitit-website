import React, { useEffect } from 'react'
import ActivityLog from '../types/ActivityLog'
import { Helmet } from 'react-helmet-async'
import { activityKcal, activityTime, msToTime } from '../utils/helpers'
import { userAction, UserAction } from '../store/modules/user/actions'
import User from '../types/User'
import { StoreState } from '../types/StoreTypes'
import { user, token, activityLog } from '../store/modules/user/selectors'
import { GET_USER_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'

type StudentPanelProps = {
  user: Partial<User>
  token: string
  activityLog: Array<ActivityLog> | Array<string> | undefined
  getUser: UserAction
}

const StudentPanel = (props: StudentPanelProps): JSX.Element => {
  const period = 7

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
        <img src="" alt="" className={'student-panel__profile-picture'} />
        <div
          className={
            'student-panel__profile-name student-panel__profile-name--text'
          }
        >
          {`${user.name} ${props.user.surname}`}
        </div>
      </div>
      <div className={'student-panel__train'}>
        <div className={'student-panel__train-kcal'}>
          <span className={'student-panel__header'}>Ostatni tydzień</span>
          <span className={'student-panel__header--highlighted'}>
            {`${activityKcal(
              props.activityLog as Array<ActivityLog>,
              period
            )} kcal`}
          </span>
          <span className={'student-panel__header'}>Spalone kalorie</span>
        </div>
        <div className={'student-panel__train-start'}>
          <span className={'student-panel__train-start--header'}>START</span>
        </div>
        <div className={'student-panel__train-time'}>
          <span className={'student-panel__header'}>Ostatni tydzień</span>
          <span className={'student-panel__header--highlighted'}>
            {msToTime(
              activityTime(props.activityLog as Array<ActivityLog>, period)
            )}
          </span>
          <span className={'student-panel__header'}>Czas aktywności</span>
        </div>
      </div>
      <div className={'student-panel__history'}>
        <span className={'student-panel__header'}>Historia treningów</span>
        <div className={'student-panel__history-activities'}></div>
      </div>
      <div className={'student-panel__footer'}>
        <span
          className={'student-panel__footer--text student-panel__footer--left'}
        >
          Warunki korzystania
        </span>
        <span className={'student-panel__footer--text'}>
          Copyright &copy; FIT Fitness IT
        </span>
        <span
          className={'student-panel__footer--text student-panel__footer--right'}
        >
          Polityka prywatności
        </span>
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
