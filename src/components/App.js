import React, { Component } from 'react'
import MainComponent from './MainComponent'
import { auth, database } from '../Firebase'
import firebase from 'firebase/app'
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
        const lastOnlineRef = database.ref(`users/${user.uid}/lastOnline`)
        // Store current user info in Session Storage
        const ref = database.ref(`/users/${user.uid}`)
        ref.once('value', data => {
          sessionStorage.setItem('username', data.val().username)
        })
        sessionStorage.setItem('userId', user.uid)
        this.setState({ authUser: user })

        // Set user status to online if logged-in
        const connectedRef = database.ref('.info/connected')
        connectedRef.on('value', function (snap) {
          if (snap.val() === true) {
            lastOnlineRef.set('online')
            // When user disconnect, update the last time user was seen online
            // When user log out, the update function is in the logout component(button)
            lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
          }
        })
      } else {
        this.setState({ authUser: null })
      }
    }

    )
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
