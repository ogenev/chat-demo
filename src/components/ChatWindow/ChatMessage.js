import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'
import 'moment/locale/bg'

const styles = () => ({
  myMessage: {
    textAlign: 'right',
    paddingRight: '1em'
  },
  otherMessage: {
    textAlign: 'left',
    paddingLeft: '1em'
  },
  myChatBubble: {
    background: '#ccedff',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '3px',
    borderRadius: 4,
    padding: '.6em'
  },
  otherChatBubble: {
    background: '#f2f2f2',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '3px',
    borderRadius: 4,
    padding: '.6em'
  },
  senderUsername: {
    paddingBottom: '5px',
    color: '#0000008a',
    display: 'block'
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
  }

})

class ChatMessage extends React.Component {
  render () {
    const { classes } = this.props

    const isUser = this.props.userId === this.props.senderId

    if (isUser) {
      return (
        <div className={classes.myMessage}>
          <div className={classes.myChatBubble}>
            <div className={classes.chatMessage}>
              { this.props.chatMessage }
            </div>
            <div className={classes.chatTimestamp}>
              <div>
                <Moment locale='bg' fromNow>
                  {this.props.chatTimestamp}
                </Moment>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.otherMessage}>
          <div className={classes.senderUsername}>
            {this.props.senderUsername}
          </div>
          <div className={classes.otherChatBubble}>
            <div className={classes.chatMessage}>
              { this.props.chatMessage }
            </div>
            <div className={classes.chatTimestamp}>
              <div>
                <Moment locale='bg' fromNow>
                  {this.props.chatTimestamp}
                </Moment>
              </div>
            </div>
          </div>
        </div>
      )
    }
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
