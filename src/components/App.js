import React, { Component } from 'react'
import MainComponent from './MainComponent'
import { auth, database } from '../Firebase'
import AppContext from './AppContext'
import { Switch, Route } from 'react-router-dom'
import ChatWindow from './ChatWindow'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: null,
      createdId: null
    }
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Store current user info in Session Storage
        const ref = database.ref(`/users/${user.uid}`)
        ref.once('value', data => {
          sessionStorage.setItem('username', data.val().username)
        })
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
