import React, { Component } from 'react'
import ResDrawer from './ResDrawer/MainComponent'
import firebase from 'firebase/app'
import AppContext from './AppContext'
import { Switch, Route } from 'react-router-dom'
import ChatWindow from './Chat/ChatWindow'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: null,
      createdId: null
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
        <Switch>
          <Route path='/chat' component={ChatWindow} />
          <Route path='/' component={ResDrawer} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
