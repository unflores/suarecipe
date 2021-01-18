import { log } from 'frontapp/libs/logger'
import * as React from 'react'
import { ErrorInfo } from 'react'

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true })
    // TODO: Add logging
    log('error', { error, info })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Momma Mía! That's a spicy meatball! We blew something up but don't worry, we're looking into it.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
