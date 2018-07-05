import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  online: {
    display: 'inline-block',
    color: '#e6e6e6',
    fontSize: '0.85rem',
    fontWeight: 300
  },
  icon: {
    display: 'inline-block',
    paddingLeft: 2
  },
  onlineContainer: {
    textAlign: 'center',
    position: 'relative',
    bottom: '0.4em'
  },
  username: {
    fontSize: '1.3rem',
    position: 'relative',
    bottom: 6
  },
  circle: {
    background: '#34E614',
    display: 'inline-block',
    height: 8,
    width: 8,
    borderRadius: 4
  }

})

class ReceiverProfileInfo extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <div>
        <Typography color={'inherit'} variant={'subheading'} align={'center'}
          className={classes.username}>
        palqkat
        </Typography>
        <div className={classes.onlineContainer}>
          <Typography className={classes.online} >
          online 3m ago
          </Typography>
          <div className={classes.icon} />
          <span className={classes.circle} />
        </div>
      </div>
    )
  }
}

ReceiverProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReceiverProfileInfo)
