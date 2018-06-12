import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

const LoginLink = props => <Link to='/login' {...props} />

const AppBarButton = () =>
  <Button
    color='inherit'
    component={LoginLink}
    style={{position: 'absolute', top: 10, right: 10}}>
    Вход
  </Button>

export default AppBarButton
