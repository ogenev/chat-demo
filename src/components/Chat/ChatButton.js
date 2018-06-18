import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class ChatButton extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    /*
     Redirect to login page if user is not logged in.
     If user is logged, redirect to chat window with the createdUid
      */

    if (!this.props.authUser) {
      this.props.history.push('/login')
    } else {
      console.log(this.props.authUser.uid)
      console.log(this.props.createdUid)
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant='contained' color='primary' className={classes.button} onClick={this.onClick}>
        Чат
        <Icon className={classes.rightIcon} />
      </Button>
    )
  }
}

ChatButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(ChatButton))
