import React from 'react'
import { ClassBubble } from './ClassBubble'
import Class from '../../../types/Class'
import User from '../../../types/User'
import { connect } from 'react-redux'
import { classes, users } from '../../../store/modules/classes/selectors'
import { StoreState } from '../../../types/StoreTypes'
import { getLastActivitiesFromUsers } from '../../../utils/helpers'

import teacherPanelStyles from '../../../styles/TeacherPanel/TeacherPanel.module.scss'

type MainViewProps = {
  classes: Array<Class>
  users: Array<User>
  ClickHandler: (id?: string) => void
}

const MainViewComponent = (props: MainViewProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, id?: string) => {
    props.ClickHandler(id)
  }

  return (
    <div>
      <div className={teacherPanelStyles.teacherPanelClasses}>
        {props.classes.map((singleClass) => {
          if (singleClass.isActive) {
            return (
              <ClassBubble
                ClickHandler={handleClick}
                key={singleClass._id}
                class={singleClass}
              />
            )
          }
          return ''
        })}
        <ClassBubble ClickHandler={handleClick} key={'new'} />
      </div>
      <div className={teacherPanelStyles.teacherPanelActivityList}>
        <span className={teacherPanelStyles.teacherPanelActivityListText}>
          Ostatnia aktywność
        </span>
        <div
          className={
            teacherPanelStyles.teacherPanelActivityListLastActivitiesWrapper
          }
        >
          {getLastActivitiesFromUsers(props.users, 4).map((obj) => {
            return (
              <div
                key={obj._id}
                className={
                  teacherPanelStyles.teacherPanelActivityListLastActivitiesGrid
                }
              >
                <span>{`${obj.name} ${obj.surname}`}</span>
                <span>{obj.activityTypeName}</span>
                <span>{obj.parsedDurationInMinutes}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  classes: classes(state),
  users: users(state),
})

const MainView = connect(stateToProps)(MainViewComponent)

export { MainView }
