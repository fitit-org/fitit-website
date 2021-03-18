import React, { useState, useEffect, lazy } from 'react'
import createClassModalStyles from '../../../styles/TeacherPanel/CreateClassModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StepOne from './CreateClass/StepOne'
import {
  getCreateSuccess,
  lastClass,
} from '../../../store/modules/classes/selectors'
import { StoreState } from '../../../types/StoreTypes'
import { connect } from 'react-redux'
import {
  classesAction,
  ClassesAction,
} from '../../../store/modules/classes/actions'
import { CREATE_CLASS_UNSUCCESS } from '../../../utils/constants'
import Class from '../../../types/Class'

type CreateClasModalProps = {
  CloseHandler: (
    event: React.MouseEvent<HTMLSpanElement | HTMLDivElement | SVGSVGElement>
  ) => void
  isNewClass: boolean
  unsuccess: ClassesAction
  latestClass: Class
}

const CreateClassModal = (props: CreateClasModalProps): JSX.Element => {
  const [step, setStep] = useState(1)

  const StepTwo = lazy(() => import('./CreateClass/StepTwo'))

  const { isNewClass, unsuccess } = props

  useEffect(() => {
    if (isNewClass) {
      console.log('New class created?')
      setStep(2)
      unsuccess(CREATE_CLASS_UNSUCCESS, undefined)
    }
  }, [isNewClass, unsuccess])

  return (
    <div>
      <div
        className={createClassModalStyles.overlayShadow}
        onClick={props.CloseHandler}
      ></div>
      <div className={createClassModalStyles.modal}>
        {step === 1 ? (
          <StepOne CloseHandler={props.CloseHandler} />
        ) : (
          <StepTwo
            CloseHandler={props.CloseHandler}
            code={props.latestClass.humanReadable as string}
          />
        )}
        <FontAwesomeIcon
          onClick={props.CloseHandler}
          icon={['far', 'times-circle']}
          size="2x"
          className={createClassModalStyles.modalCloseIcon}
        />
      </div>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  isNewClass: getCreateSuccess(state),
  latestClass: lastClass(state),
})

const dispatchToProps = {
  unsuccess: classesAction,
}

export default connect(stateToProps, dispatchToProps)(CreateClassModal)
