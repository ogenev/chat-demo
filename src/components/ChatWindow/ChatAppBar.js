import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BackChatBtn from './BackChatBtn'
import ReceiverProfileInfo from './ReceiverProfileInfo'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  toolbar: {
    padding: 0
  },
  centerGrid: {
    position: 'relative',
    right: '8%'
  }
})

class ChatAppBar extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <AppBar position={'static'}>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems={'center'} justify={'space-between'} >
            <Grid item >
              <BackChatBtn />
            </Grid>
            <Grid item className={classes.centerGrid}>
              <ReceiverProfileInfo />
            </Grid>
            <Grid item />
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

ChatAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar)
