import React, { useState, lazy } from 'react'
import User from '../../../types/User'
import Class from '../../../types/Class'

import teacherPanelStyles from '../../../styles/TeacherPanel/TeacherPanel.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLastActivityFromUser } from '../../../utils/helpers'
import ActivityLog from '../../../types/ActivityLog'

import { getClassCode } from '../../../services/APIService'

type SingleClassViewProps = {
  class: Class
  users: Array<User>
}

const SingleClassView = (props: SingleClassViewProps): JSX.Element => {
  const [currentStudent, setCurrentStudent] = useState(0)
  const [classCode, setClassCode] = useState('')

  const handleStudentChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id
    const index = props.users.findIndex((user) => user._id === id)
    setCurrentStudent(index)
  }

  const ActivityBubble = lazy(() => import('./ActivityBubble'))

  const handleShowCode = (e: React.MouseEvent<HTMLSpanElement>) => {
    getClassCode(localStorage.getItem('token') as string, props.class._id).then(
      (obj) => {
        setClassCode(obj.code)
      }
    )
  }

  return (
    <article>
      <div className={teacherPanelStyles.teacherPanelSingleClassBubble}>
        <span className={teacherPanelStyles.teacherPanelSingleClassBubbleText}>
          {props.class.name}
        </span>
      </div>
      <section className={teacherPanelStyles.teacherPanelSingleClassPupilList}>
        <span>Lista uczniów</span>
        {props.users.map((user) => {
          return (
            <div
              onClick={handleStudentChange}
              className={
                teacherPanelStyles.teacherPanelSingleClassPupilListSinglePupil
              }
              key={user._id}
              id={user._id}
            >
              {user.name} {user.surname}{' '}
              <FontAwesomeIcon icon={['fas', 'ellipsis-v']} size="xs" />
            </div>
          )
        })}
        {classCode === '' ? (
          <span
            style={{ cursor: 'pointer', fontSize: '2rem' }}
            onClick={handleShowCode}
          >
            Pokaż kod klasy
          </span>
        ) : (
          <span>{classCode}</span>
        )}
      </section>
      <section
        className={teacherPanelStyles.teacherPanelSingleClassPupilActivities}
      >
        <span>
          {props.users[currentStudent].name}{' '}
          {props.users[currentStudent].surname}
        </span>
        <div
          className={
            teacherPanelStyles.teacherPanelSingleClassPupilActivitiesBubbleContainer
          }
        >
          {props.users[currentStudent].activityLog_ids !== undefined &&
          (props.users[currentStudent].activityLog_ids as Array<ActivityLog>)
            .length > 0 ? (
            <div
              className={
                teacherPanelStyles.teacherPanelSingleClassPupilActivitiesGrid
              }
            >
              {getLastActivityFromUser(props.users[currentStudent]).map(
                (obj) => {
                  return (
                    <ActivityBubble
                      key={obj._id}
                      name={obj.activityTypeName}
                      date={new Date(obj.endDate)}
                      time={obj.parsedDurationInMinutes}
                    />
                  )
                }
              )}
            </div>
          ) : (
            <p>Brak aktywności</p>
          )}
        </div>
      </section>
    </article>
  )
}

export default SingleClassView
