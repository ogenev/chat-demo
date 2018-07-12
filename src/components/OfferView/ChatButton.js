import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

class ChatButton extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    /*
     Redirect to login page if user is not logged in.
     If user is logged, redirect to chat window and pass createdUid state
      */

    if (!this.props.authUser) {
      this.props.history.push('/login')
    } else {
      this.props.history.push({
        pathname: '/chat',
        state: { chatWith: this.props.createdUid
        }
      })
    }
  }

  render () {
    return (
      <Button variant='contained' color='primary' onClick={this.onClick}>
        Чат с търговеца
      </Button>
    )
  }
}

ChatButton.propTypes = {
  authUser: PropTypes.object,
  createdUid: PropTypes.string
}

export default withRouter(ChatButton)
