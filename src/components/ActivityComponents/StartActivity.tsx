import React, { MouseEventHandler } from 'react'
import ActivityLog from '../../types/ActivityLog'
import { activityKcal, msToTime, activityTime } from '../../utils/helpers'

type StartActivityProps = {
  activityLog: Array<ActivityLog> | Array<string> | undefined
  period: number
  start: MouseEventHandler
}

const StartActivity = (props: StartActivityProps): JSX.Element => {
  return (
    <>
      <div className={'student-panel__activity-kcal'}>
        <span className={'student-panel__header'}>Ostatni tydzień</span>
        <span className={'student-panel__header--highlighted'}>
          {`${activityKcal(
            props.activityLog as Array<ActivityLog>,
            props.period
          )} kcal`}
        </span>
        <span className={'student-panel__header'}>Spalone kalorie</span>
      </div>
      <div className={'student-panel__activity-start'} onClick={props.start}>
        <span className={'student-panel__activity-start--header'}>
          {'START'}
        </span>
      </div>
      <div className={'student-panel__activity-time'}>
        <span className={'student-panel__header'}>Ostatni tydzień</span>
        <span className={'student-panel__header--highlighted'}>
          {msToTime(
            activityTime(props.activityLog as Array<ActivityLog>, props.period)
          )}
        </span>
        <span className={'student-panel__header'}>Czas aktywności</span>
      </div>
    </>
  )
}

export default StartActivity
