import React from 'react'

const PanelFooter = (): JSX.Element => {
  return (
    <>
      <span
        className={'student-panel__footer--text student-panel__footer--left'}
      >
        Warunki korzystania
      </span>
      <span className={'student-panel__footer--text'}>
        Copyright &copy; FIT Fitness IT
      </span>
      <span
        className={'student-panel__footer--text student-panel__footer--right'}
      >
        Polityka prywatności
      </span>
    </>
  )
}

export default PanelFooter
