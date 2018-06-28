import React, { Component } from 'react'
import MainComponent from './MainComponent'
import {auth} from '../Firebase'
import AppContext from './AppContext'
import { Switch, Route } from 'react-router-dom'
import ChatWindow from './ChatWindow/ChatWindow'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: null,
      createdId: null
    }
  }

  componentWillMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Store current user info in Session Storage
        sessionStorage.setItem('displayName', user.displayName)
        sessionStorage.setItem('userId', user.uid)
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
          <Route exact path='/chat' component={ChatWindow} />
          <Route path='/' component={MainComponent} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
