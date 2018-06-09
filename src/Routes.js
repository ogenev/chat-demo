import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route } from 'react-router-dom'

export default props =>
  <Switch>
    <Route exact path='/register' component={RegisterForm} />
  </Switch>
