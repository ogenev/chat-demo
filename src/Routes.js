import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AddingOffer from './components/AddingOffer/AddingOffer'
import PasswordForgetForm from './components/PasswordForget'
import NotFound from './components/NotFound'
import TestOffer from './components/Chat/TestOffer'
import AllUserChats from './components/Chat/AllUserChats'
import AppContext from './components/AppContext'
import UserProfile from './components/UserProfile/UserProfile'
import OfferView from './components/OfferView/OfferView'

class Routes extends React.Component {
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
        <Route path='/offer/:id/:offerName' component={OfferView} />
        <Route
          exact path='/addoffer'
          component={AddingOffer}
        />
        <Route exact path='/myprofile' component={UserProfile} />
        <Route exact path='/pw-forgot' component={PasswordForgetForm} />
        <Route
          exact
          path='/testchat'
          component={TestOffer}
        />
        <AppContext.Consumer>
          {(context) => {
            // Redirect user if not registered to login when click "chats button"
            return (
              <Route exact path='/mychats' render={() => {
                if (context.authUser == null) {
                  return <Redirect to='/login' />
                } else {
                  return <AllUserChats authUser={context.authUser} />
                }
              }}
              />)
          }}
        </AppContext.Consumer>
        <Route exact path='*' component={NotFound} />
      </Switch>
    )
  }
}

export default Routes
