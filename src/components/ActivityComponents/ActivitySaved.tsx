import React, { MouseEventHandler } from 'react'

type ActivitySavedProps = {
  goBack: MouseEventHandler
}

const ActivitySaved = (props: ActivitySavedProps): JSX.Element => {
  return (
    <>
      <div className={'student-panel__activity-saved'}>
        <span className={'student-panel__activity-saved--header'}>
          {'Trening zapisany!'}
        </span>
        <span
          className={'student-panel__activity-saved--back'}
          onClick={props.goBack}
        >
          {'Powrót'}
        </span>
      </div>
    </>
  )
}

export default ActivitySaved
