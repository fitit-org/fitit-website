import React from 'react'
import teacherPanelStyles from '../../../styles/TeacherPanel/TeacherPanel.module.scss'

type ActivityBubbleProps = {
  name: string
  date: Date
  time: string
}

const ActivityBubble = (props: ActivityBubbleProps): JSX.Element => {
  return (
    <div
      className={
        teacherPanelStyles.teacherPanelSingleClassPupilActivitiesBubble
      }
    >
      <span>{props.name}</span>
      <hr />
      <span>{`${props.date.getUTCDay()}.${props.date.getMonth()}.${props.date.getFullYear()}`}</span>
      <span>{props.time}</span>
    </div>
  )
}

export default ActivityBubble
