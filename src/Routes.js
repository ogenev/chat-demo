import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AddingOffer from './components/AddingOffer'
import PasswordForgetForm from './components/PasswordForget'
import NotFound from './components/NotFound'
import TestOffer from './components/Chat/TestOffer'

export default props =>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/register' component={RegisterForm} />
    <Route exact path='/login' component={LoginForm} />
    <Route exact path='/home' component={Home} />
    <Route path='/home/:userId' component={AddingOffer} />
    <Route exact path='/pw-forgot' component={PasswordForgetForm} />
    <Route exact path='/testchat' component={TestOffer} />
    <Route exact path='*' component={NotFound} />
  </Switch>
