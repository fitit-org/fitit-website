import React, { useState } from 'react'
import createClassModalStyles from '../../../../styles/TeacherPanel/CreateClassModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  classesAction,
  ClassesAction,
} from '../../../../store/modules/classes/actions'
import { connect } from 'react-redux'
import { CREATE_CLASS_REQUEST } from '../../../../utils/constants'
import { StoreState } from '../../../../types/StoreTypes'
import { getCreateError } from '../../../../store/modules/classes/selectors'

type StepOneProps = {
  CloseHandler: (event: React.MouseEvent<HTMLSpanElement>) => void
  createClass: ClassesAction
  error: boolean
}

const StepOne = (props: StepOneProps): JSX.Element => {
  const [name, setName] = useState('')

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const handleCreate = (event: React.MouseEvent<HTMLSpanElement>) => {
    props.createClass(CREATE_CLASS_REQUEST, { name: name })
  }

  return (
    <div>
      <span className={createClassModalStyles.modalTitle}>
        Dodaj nową klasę
      </span>
      <div className={createClassModalStyles.modalInputContainer}>
        <input
          type="text"
          className={createClassModalStyles.modalInputContainerInput}
          placeholder="Nazwa klasy"
          value={name}
          onChange={handleChange}
          required
        />
        <FontAwesomeIcon
          icon={['fas', 'user-friends']}
          size="2x"
          className={createClassModalStyles.modalInputContainerFriendsIcon}
        />
      </div>
      {props.error ? (
        <p className={createClassModalStyles.modalError}>
          Wystąpił błąd podczas tworzenia klasy
        </p>
      ) : (
        ''
      )}
      <div className={createClassModalStyles.modalButtonsContainer}>
        <span onClick={props.CloseHandler}>Anuluj</span>
        <span onClick={handleCreate}>Utwórz</span>
      </div>
    </div>
  )
}

const stateToProps = (state: StoreState) => ({
  error: getCreateError(state),
})

const dispatchToProps = {
  createClass: classesAction,
}

const StepOneConnected = connect(stateToProps, dispatchToProps)(StepOne)

export default StepOneConnected
