import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../hooks/use-auth'

import { msToTime, msToKcal, lastWeekActivityTime } from '../utils/helpers'

type Props = {
  title: string
}

const StudentPanel = (props: Props): JSX.Element => {
  const auth = useAuth()

  const activityLog: any =
    auth.user.activityLog_ids === undefined ? 'N/D' : auth.user.activityLog_ids

  const lastActivityTimeDelta: number =
    Date.parse(activityLog[activityLog.length - 1].endDate) -
    Date.parse(activityLog[activityLog?.length - 1].startDate)

  const lastActivityKcal: number =
    activityLog === 'N/D'
      ? 0
      : activityLog[activityLog.length - 1].activityType_id.kcalPerHour

  const lastActivityTime: string =
    activityLog === 'N/D' ? activityLog : msToTime(lastActivityTimeDelta)

  const lastTrainKcal: string =
    activityLog === 'N/D'
      ? activityLog
      : msToKcal(lastActivityTimeDelta, lastActivityKcal)

  lastWeekActivityTime()

  return (
    <div
      id={'student-panel'}
      className={'view--full-height student-panel--background'}
    >
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <div className={'student-panel__profile'}>
        <img src="" alt="" className={'student-panel__profile-picture'} />
        <div
          className={
            'student-panel__profile-name student-panel__profile-name--text'
          }
        >
          {`${auth.user.name} ${auth.user.surname}`}
        </div>
      </div>
      <div className={'student-panel__train'}>
        <div className={'student-panel__train-kcal'}>
          <span className={'student-panel__header'}>{lastTrainKcal}</span>
          <span className={'student-panel__header--highlighted'}>
            Spalone kalorie
          </span>
        </div>
        <div className={'student-panel__train-start'}>
          <span className={'student-panel__train-start--header'}>START</span>
        </div>
        <div className={'student-panel__train-time'}>
          <span className={'student-panel__header'}>{lastActivityTime}</span>
          <span className={'student-panel__header--highlighted'}>
            Czas aktywności
          </span>
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

export default StudentPanel
