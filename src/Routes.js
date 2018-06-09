import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'

export default props =>
  <Switch>
    <Route exact path='/register' component={RegisterForm} />
    <Route exact path='/login' component={LoginForm} />
  </Switch>
