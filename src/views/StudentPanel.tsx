import React from 'react'
import { useSelector } from 'react-redux'
import { selectActivities, selectUser } from '../store/user'
import ActivityLog from '../types/ActivityLog'

import {
  activityKcal,
  activityTime,
  renderLastActivities,
  msToTime,
} from '../utils/helpers'

type Props = {
  title: string
}

const StudentPanel = (props: Props): JSX.Element => {
  document.title = props.title

  const user = useSelector(selectUser)
  const activities = useSelector(selectActivities)
  const period = 7
  const count = 5

  return (
    <div
      id={'student-panel'}
      className={'view--full-height student-panel--background'}
    >
      <div className={'student-panel__profile'}>
        <img src="" alt="" className={'student-panel__profile-picture'} />
        <div
          className={
            'student-panel__profile-name student-panel__profile-name--text'
          }
        >
          {`${user.name} ${user.surname}`}
        </div>
      </div>
      <div className={'student-panel__train'}>
        <div className={'student-panel__train-kcal'}>
          <span className={'student-panel__header'}>Ostatni tydzień</span>
          <span className={'student-panel__header--highlighted'}>
            {`${activityKcal(activities as Array<ActivityLog>, period)} kcal`}
          </span>
          <span className={'student-panel__header'}>Spalone kalorie</span>
        </div>
        <div className={'student-panel__train-start'}>
          <span className={'student-panel__train-start--header'}>START</span>
        </div>
        <div className={'student-panel__train-time'}>
          <span className={'student-panel__header'}>Ostatni tydzień</span>
          <span className={'student-panel__header--highlighted'}>
            {msToTime(activityTime(activities as Array<ActivityLog>, period))}
          </span>
          <span className={'student-panel__header'}>Czas aktywności</span>
        </div>
      </div>
      <div className={'student-panel__history'}>
        <span className={'student-panel__header'}>Historia treningów</span>
        <div className={'student-panel__history-activities'}>
          {renderLastActivities(activities as Array<ActivityLog>, count)}
        </div>
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

export default StudentPanel
