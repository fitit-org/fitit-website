import React from 'react'

type ErrorProps = {
  children: React.ReactNode
}

type ErrorState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  }

  constructor(props: ErrorProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown): ErrorState {
    return { hasError: true }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload.</p>
    }
    return this.props.children
  }
}

export default ErrorBoundary
