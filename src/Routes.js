import React from 'react'
import RegisterForm from './components/RegisterForm'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

export default props =>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/register' component={RegisterForm} />
    <Route exact path='/login' component={LoginForm} />
    <Route exact path='/home' component={Home} />
  </Switch>
