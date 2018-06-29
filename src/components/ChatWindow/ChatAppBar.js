import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BackChatBtn from './BackChatBtn'

const styles = () => ({
  toolbar: {
    paddingLeft: 0
  }
})

class ChatAppBar extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <AppBar position={'static'}>
        <Toolbar className={classes.toolbar}>
          <BackChatBtn />
        </Toolbar>
      </AppBar>
    )
  }
}

ChatAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar)
