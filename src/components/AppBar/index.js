import React from 'react'
import AppBarButton from './AppBarButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

export default () =>
  <AppBar style={{position: 'static'}}>
    <Toolbar>
      <AppBarButton />
    </Toolbar>
  </AppBar>
