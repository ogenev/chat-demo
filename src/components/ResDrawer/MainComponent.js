import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Main from '../Main'
import Footer from '../Footer'
import AppBarButton from './AppBar/AppBarButton'

const styles = () => ({
  appBar: {
    position: 'static'
  }
})

class ResDrawer extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <div >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <AppBarButton />
          </Toolbar>
        </AppBar>
        <Main />
        <Footer />
      </div>
    )
  }
}

ResDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ResDrawer)
