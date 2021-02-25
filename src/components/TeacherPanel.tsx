import React from 'react';

export default class Contact extends React.Component<{ title: string }, {}> {
  componentDidMount() {
    document.title = this.props.title
  }

  render() {
    return (
      <div>
        Panel nauczyciela
      </div>
    );
  }
}