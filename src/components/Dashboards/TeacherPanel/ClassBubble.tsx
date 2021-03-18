import React from 'react'
import Class from '../../../types/Class'

import classBubbleStyles from '../../../styles/TeacherPanel/ClassBubble.module.scss'

type ClassBubbleProps = {
  ClickHandler?: (event: React.MouseEvent<HTMLDivElement>, id?: string) => void
  class?: Class
}

const ClassBubble = (props: ClassBubbleProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.ClickHandler !== undefined) {
      if (e.currentTarget.textContent === '+') {
        props.ClickHandler(e)
        return
      }
      if (props.class !== undefined) {
        props.ClickHandler(e, props.class._id)
      }
    }
  }

  return (
    <div onClick={handleClick} className={classBubbleStyles.bubble}>
      <span className={classBubbleStyles.bubbleText}>
        {props.class !== undefined ? props.class.name : '+'}
      </span>
    </div>
  )
}

export { ClassBubble }
