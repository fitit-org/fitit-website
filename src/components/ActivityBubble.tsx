import React from 'react'
import ActivityLog from '../types/ActivityLog'
import { ActivityType } from '../types/ActivityType'

type Props = {
  activity: ActivityLog | string
  kcal: string
  time: string
}

const ActivityBubble = (props: Props): JSX.Element => {
  if (props.activity !== undefined) {
    const activityType: ActivityType | string = (props.activity as ActivityLog)
      .activityType_id
    return (
      <div className={'student-panel__bubble'}>
        <img
          src={`../img/activities/${(activityType as ActivityType).name}.svg`}
          alt=""
        />
        <span>{(activityType as ActivityType).name}</span>
        <hr />
        <span>{`${props.kcal} kcl`}</span>
        <span>{`${props.time}`}</span>
      </div>
    )
  } else {
    return <span>{'Brak aktywności'}</span>
  }
}

export default ActivityBubble
