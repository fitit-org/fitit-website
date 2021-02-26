import React from 'react';

export default class Contact extends React.Component<{ title: string }, {}> {
  componentDidMount() {
    document.title = this.props.title
  }

  render() {
    return (
      <div className={ 'view--full-height teacher-panel--background' }>
        <div
          className={ 'teacher-panel__header' }
        >

        </div>
      </div>
    );
  }
}