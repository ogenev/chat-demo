import React, { Component } from 'react'
import ResDrawer from './ResDrawer/index'
import firebase from 'firebase/app'
import AppContext from './AppContext'

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
      <AppContext.Provider value={this.state}>
        <ResDrawer />
      </AppContext.Provider>
    )
  }
}

export default App
