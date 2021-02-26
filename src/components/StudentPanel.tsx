import React from 'react'
import { Helmet } from 'react-helmet'

export default class Contact extends React.Component<{ title: string }> {
  render(): React.ReactElement {
    return (
      <div className={'view--full-height teacher-panel--background'}>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <div className={'teacher-panel__header'}></div>
      </div>
    )
  }
}
