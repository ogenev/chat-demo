import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = () => ({

})

class ReceiverProfileInfo extends React.Component {
  render () {
    // const { classes } = this.props

    return (
      <Typography color={'inherit'}>
        Receiver username
      </Typography>
    )
  }
}

ReceiverProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReceiverProfileInfo)
