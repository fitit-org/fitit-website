import React from 'react'
import ActivityLog from '../../types/ActivityLog'
import { renderLastActivities } from '../../utils/helpers'

type ActivityHistoryProps = {
  activityLog: Array<ActivityLog> | Array<string> | undefined
  count: number
}

const ActivityHistory = (props: ActivityHistoryProps): JSX.Element => {
  return (
    <>
      <span className={'student-panel__header'}>Historia treningów</span>
      <div className={'student-panel__history-activities'}>
        {renderLastActivities(
          props.activityLog as Array<ActivityLog>,
          props.count
        )}
      </div>
    </>
  )
}

export default ActivityHistory
