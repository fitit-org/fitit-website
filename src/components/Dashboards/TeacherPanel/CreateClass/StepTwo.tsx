import React from 'react'
import createClassModalStyles from '../../../../styles/TeacherPanel/CreateClassModal.module.scss'

type StepTwoProps = {
  CloseHandler: (event: React.MouseEvent<HTMLSpanElement>) => void
  code: string
}

const StepTwo = (props: StepTwoProps): JSX.Element => {
  return (
    <div>
      <span className={createClassModalStyles.modalTitle}>
        Nowa klasa dodana
      </span>
      <div className={createClassModalStyles.modalInputContainer}>
        <span className={createClassModalStyles.modalInputContainerCode}>
          {props.code}
        </span>
        <p className={createClassModalStyles.modalInputContainerKodDostepu}>
          Kod dostępu
        </p>
      </div>
      <div className={createClassModalStyles.modalButtonsContainer}>
        <span onClick={props.CloseHandler}>Zamknij</span>
      </div>
    </div>
  )
}

export default StepTwo
