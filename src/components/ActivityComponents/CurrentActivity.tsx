import React from 'react'

type CurrentActivityProps = {
  activity: string
}

const CurrentActivity = (props: CurrentActivityProps): JSX.Element => {
  return (
    <>
      <div className={'student-panel__activity-select'}>
        <span className={'student-panel__activity-start--header-sm'}>
          {props.activity}
        </span>
      </div>
    </>
  )
}

export default CurrentActivity
