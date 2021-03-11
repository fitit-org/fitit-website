import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { TheUserNav } from '../components/Dashboards/TheUserNav'
import PanelFooter from '../components/PanelFooter'
import { StoreState } from '../types/StoreTypes'
import { token } from '../store/modules/user/selectors'
import { classes, getFetched, users } from '../store/modules/classes/selectors'
import { classesAction, ClassesAction } from '../store/modules/classes/actions'
import Class from '../types/Class'
import User from '../types/User'
import { GET_CLASSES_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'
import { ClassBubble } from '../components/Dashboards/TeacherPanel/ClassBubble'
import { getLastActivitiesFromUsers } from '../utils/helpers'

import teacherPanelStyles from '../styles/TeacherPanel/TeacherPanel.module.scss'

type TeacherPanelProps = {
  classes: Array<Class>
  users: Array<User>
  getFetched: boolean
  token: string
  getClasses: ClassesAction
}

const TeacherPanelComponent = (props: TeacherPanelProps): JSX.Element => {
  const [hasArrow, changeArrow] = useState(false)

  useEffect(() => {
    if (!props.getFetched) props.getClasses(GET_CLASSES_REQUEST, undefined)
  }, [props.classes])

  return (
    <div
      className={`view--full-height ${teacherPanelStyles.teacherPanelBackground}`}
    >
      <Helmet>
        <title>Panel nauczyciela | Fit IT</title>
      </Helmet>
      <TheUserNav showArrow={hasArrow} />
      <div className={teacherPanelStyles.teacherPanelClasses}>
        {props.classes.map((singleClass) => {
          if (singleClass.isActive) {
            return <ClassBubble key={singleClass._id} class={singleClass} />
          }
          return ''
        })}
        <ClassBubble key={'new'} />
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
      <div className={teacherPanelStyles.teacherPanelFooterContainer}>
        <div className={teacherPanelStyles.teacherPanelFooterContainerFooter}>
          <PanelFooter />
        </div>
      </div>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  token: token(state),
  classes: classes(state),
  users: users(state),
  getFetched: getFetched(state),
})

const dispatchToProps = {
  getClasses: classesAction,
}

const TeacherPanel = connect(
  stateToProps,
  dispatchToProps
)(TeacherPanelComponent)

export default TeacherPanel
