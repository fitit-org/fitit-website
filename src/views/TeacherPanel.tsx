import React from 'react'
import { Helmet } from 'react-helmet-async'

const Contact = (): JSX.Element => {
  return (
    <div className={'view--full-height student-panel--background'}>
      <Helmet>
        <title>Panel nauczyciela | Fit IT</title>
      </Helmet>
      <div className={'student-panel__header'}></div>
    </div>
  )
}

export default Contact
