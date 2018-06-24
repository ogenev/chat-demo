import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AddingOffer from './components/AddingOffer'
import PasswordForgetForm from './components/PasswordForget'
import NotFound from './components/NotFound'
import TestOffer from './components/Chat/TestOffer'
import ChatWindow from './components/Chat/ChatWindow'
import UserChats from './components/Chat/UserChats'
import {auth} from './Firebase'

const zaza = auth.currentUser

class Routes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {authUser: auth.currentUser}
  }

  componentDidMount () {
    console.log(zaza)
  }
  render () {
    return (
      <Switch>
        <Route
          exact
          path='/'
          component={Home}
        />
        <Route exact path='/register' component={RegisterForm} />
        <Route
          exact
          path='/login'
          component={LoginForm}
        />
        <Route exact path='/home' component={Home} />
        <Route
          path='/home/:userId'
          component={AddingOffer}
        />

        <Route exact path='/pw-forgot' component={PasswordForgetForm} />
        <Route
          exact
          path='/testchat'
          component={TestOffer}
        />
        <Route exact path='/mychats' render={() => {
          if (this.state.authUser == null) {
            return <Redirect to='/login' />
          } else {
            return <UserChats />
          }
        }}
        />
        <Route
          exact
          path='/chat'
          component={ChatWindow}
        />
        <Route exact path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default Routes
