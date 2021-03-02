import React from 'react'

const Contact = ({ title }: { title: string }): JSX.Element => {
  document.title = title
  return (
    <div className={'view--full-height student-panel--background'}>
      <div className={'student-panel__header'}></div>
    </div>
  )
}

export default Contact
