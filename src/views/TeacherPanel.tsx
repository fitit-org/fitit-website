import React, { useEffect, useState, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { TheUserNav } from '../components/Dashboards/TheUserNav'
import PanelFooter from '../components/PanelFooter'
import { StoreState } from '../types/StoreTypes'
import { getFetched, users, classes } from '../store/modules/classes/selectors'
import { classesAction, ClassesAction } from '../store/modules/classes/actions'
import { GET_CLASSES_REQUEST } from '../utils/constants'
import { connect } from 'react-redux'
import { MainView } from '../components/Dashboards/TeacherPanel/MainView'
import { useHistory } from 'react-router-dom'

import teacherPanelStyles from '../styles/TeacherPanel/TeacherPanel.module.scss'
import Class from '../types/Class'
import User from '../types/User'

type TeacherPanelProps = {
  getFetched: boolean
  getClasses: ClassesAction
  classes: Array<Class>
  users: Array<User>
}

const TeacherPanelComponent = (props: TeacherPanelProps): JSX.Element => {
  const history = useHistory()
  const [showCreateClassModal, changeCreateClassModal] = useState(false)
  const [singleClassView, setSingleClassView] = useState(false)
  const [viewedClassId, setViewedClassId] = useState('')

  const CreateClassModal = lazy(
    () => import('../components/Dashboards/TeacherPanel/CreateClassModal')
  )
  const SingleClassView = lazy(
    () => import('../components/Dashboards/TeacherPanel/SingleClassView')
  )

  const { getFetched, getClasses } = props

  const handleBack = (e: React.MouseEvent<SVGSVGElement>) => {
    setSingleClassView(false)
    history.push('/teacher')
    setViewedClassId('')
  }

  const handleClickMainView = (id?: string) => {
    if (id === undefined) {
      changeCreateClassModal(true)
      return
    }
    setViewedClassId(id)
    changeCreateClassModal(false)
    history.push(`/teacher/${id}`)
    setSingleClassView(true)
  }

  const getUsersInClass = (id: string) => {
    const usersFiltered: Array<User> = []
    props.users.forEach((user) => {
      if ((user.class_ids as Array<string>).includes(id) && !user.isTeacher) {
        usersFiltered.push(user)
      }
    })
    return usersFiltered
  }

  const getSingleClass = (id: string) =>
    props.classes.filter((singleClass) => singleClass._id === id)[0]

  useEffect(() => {
    if (!getFetched) getClasses(GET_CLASSES_REQUEST, undefined)
  }, [getFetched, getClasses])

  return (
    <div
      className={`view--full-height ${teacherPanelStyles.teacherPanelBackground}`}
    >
      <Helmet>
        <title>Panel nauczyciela | Fit IT</title>
      </Helmet>
      <TheUserNav BackHandler={handleBack} showArrow={singleClassView} />
      {!singleClassView ? (
        <MainView ClickHandler={handleClickMainView} />
      ) : (
        <SingleClassView
          class={getSingleClass(viewedClassId)}
          users={getUsersInClass(viewedClassId)}
        />
      )}
      <div className={teacherPanelStyles.teacherPanelFooterContainer}>
        <div className={teacherPanelStyles.teacherPanelFooterContainerFooter}>
          <PanelFooter />
        </div>
      </div>
      {showCreateClassModal ? (
        <CreateClassModal CloseHandler={() => changeCreateClassModal(false)} />
      ) : (
        ''
      )}
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  getFetched: getFetched(state),
  classes: classes(state),
  users: users(state),
})

const dispatchToProps = {
  getClasses: classesAction,
}

const TeacherPanel = connect(
  stateToProps,
  dispatchToProps
)(TeacherPanelComponent)

export default TeacherPanel
