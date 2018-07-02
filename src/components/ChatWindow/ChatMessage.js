import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Timestamp from 'react-timestamp'

const styles = () => ({
  message: {
    textAlign: 'right',
    paddingRight: '1em'
  },
  chatBubble: {
    background: '#ccedff',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '3px',
    borderRadius: 4,
    padding: '.6em'
  },
  senderName: {

  },
  chatMessage: {
    maxWidth: '65vw',
    whiteSpace: 'pre-line',
    textAlign: 'left',
    wordWrap: 'break-word'
  },
  chatTimestamp: {
    fonSize: 10,
    color: '#b3b3b3',
    display: 'inline-block'
  },
  status: {

  }

})

class ChatMessage extends React.Component {
  render () {
    const { classes } = this.props
    let time = this.props.chatTimestamp.toString()
    let newTime = Number(time.substring(0, time.length - 3))

    return (
      <div className={classes.message}>
        <div className={classes.chatBubble}>
          <div className={classes.chatMessage}>
            { this.props.chatMessage }
          </div>
          <div className={classes.chatTimestamp}>
            <div className={classes.status}>
              <Timestamp time={newTime} format={'full'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ChatMessage.defaultProps = {
  chatMessage: '',
  senderName: '',
  chatTimestamp: ''
}

ChatMessage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatMessage)
