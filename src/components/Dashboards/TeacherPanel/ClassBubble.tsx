import React from 'react'
import Class from '../../../types/Class'

import classBubbleStyles from '../../../styles/TeacherPanel/ClassBubble.module.scss'

type ClassBubbleProps = {
  class?: Class
}

const ClassBubble = (props: ClassBubbleProps): JSX.Element => {
  return (
    <div className={classBubbleStyles.bubble}>
      <span className={classBubbleStyles.bubbleText}>
        {props.class !== undefined ? props.class.name : '+'}
      </span>
    </div>
  )
}

export { ClassBubble }
