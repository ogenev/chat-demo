import React, { Fragment } from 'react'

class ChatAppBar extends React.Component {
  render () {
    return (
      <Fragment>
        template
      </Fragment>
    )
  }
}

export default ChatAppBar

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  input: {
    margin: 7
  }

})

class ChatAppBar extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <AppBar position={'static'}>
        <Toolbar>
          App bar
        </Toolbar>
      </AppBar>
    )
  }
}

ChatAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatAppBar)



import React from 'react'

export default props => (
  <div></div>
)