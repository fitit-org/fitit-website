import React from 'react'
import ActivityLog from '../types/ActivityLog'
import { ActivityType } from '../types/ActivityType'
import boxing from '../img/activities/boxing.svg'

type Props = {
  activity: ActivityLog | string
  kcal: string
  time: string
}

const ActivityBubble = (props: Props): JSX.Element => {
  const activityType: ActivityType | string = (props.activity as ActivityLog)
    .activityType_id

  if (props.activity !== undefined) {
    return (
      <div className={'student-panel__history-bubble'}>
        <img
          className={'student-panel__history-bubble--img'}
          src={boxing}
          alt=""
        />
        <span className={'student-panel__history-bubble--text'}>
          {(activityType as ActivityType).name}
        </span>
        <hr className={'student-panel__history-bubble--hr'} />
        <span
          className={'student-panel__history-bubble--text'}
        >{`${props.kcal}`}</span>
        <span
          className={'student-panel__history-bubble--text'}
        >{`${props.time}`}</span>
      </div>
    )
  } else {
    return <span>{'Brak aktywności'}</span>
  }
}

export default ActivityBubble
