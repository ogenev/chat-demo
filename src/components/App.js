import React, { Component, Fragment } from 'react'
import ResDrawer from './ResDrawer/index'
import firebase from 'firebase/app'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: null
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authUser: user })
      } else {
        this.setState({ authUser: null })
      }
    })
  }

  render () {
    return (
      <Fragment>
        <ResDrawer authUser={this.state.authUser} />
      </Fragment>
    )
  }
}

export default App
