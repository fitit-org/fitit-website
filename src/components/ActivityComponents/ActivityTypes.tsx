import React, { MouseEventHandler, useState } from 'react'
import { getActivityTypes } from '../../services/APIService'
import { ActivityType } from '../../types/ActivityType'

type SelectActivityProps = {
  select: MouseEventHandler
}

const ActivityTypes = (props: SelectActivityProps): JSX.Element => {
  const activityTypes: Array<ActivityType> = []
  const [types, setTypes] = useState(activityTypes)
  const bubbles: Array<JSX.Element> = []

  if (types.length === 0) {
    getActivityTypes().then((data) => setTypes(data))
  }
  types.forEach((activity: ActivityType) => {
    bubbles.push(
      <div
        key={activity._id}
        id={activity.name}
        className={'student-panel__activity-bubble'}
        onClick={(event) => {
          props.select(event)
        }}
      >
        {/* <img
          className={'student-panel__activity-bubble--img'}
          src={img}
          alt=""
        /> */}
        <span className={'student-panel__activity-bubble--text'}>
          {activity.name}
        </span>
      </div>
    )
  })

  return (
    <>
      <span className={'student-panel__header'}>Dostępne aktywności</span>
      <div className={'student-panel__activity-container'}>{bubbles}</div>
    </>
  )
}

export default ActivityTypes
