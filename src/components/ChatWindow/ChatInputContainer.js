import React, { Fragment } from 'react'
import { database } from '../../Firebase'
import ChatInput from './ChatInput'
import PropTypes from 'prop-types'

class ChatInputContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onSend = this.onSend.bind(this)
  }

  // Generate unique threadId for the database:

  onSend (message) {
    /*
    Check if this is the first message between users and
    add the threadId to both users in the database if true
    */
    const now = new Date().getTime()
    if (this.props.allMessages === 0) {
      const chatId = this.props.chatId
      database.ref(`users/${this.props.userId}/activeThreads/${chatId}`).set({
        threadId: chatId
      }).then(
        database.ref(`users/${this.props.chatWith}/activeThreads/${chatId}`).set({
          threadId: chatId
        }).catch(err => console.log(err))
      )
        .catch(err => console.log(err))
      // Making chatThreadMeta with the chat details:
      // Need to fix the meta
      database.ref(`chatThreadMeta/${chatId}`).set({
        createdAt: now,
        startedByUserId: this.props.userId,
        threadId: chatId,
        receivedByUserId: this.props.chatWith
      }).catch(err => console.log(err))
    }
    // Get massage from ChatInput and send it to database:
    let messageData = {
      senderId: this.props.userId,
      senderUsername: this.props.senderUsername,
      receiverId: this.props.chatWith,
      chatMessage: message,
      chatTimestamp: now
    }
    // Database path:
    // chatThread/threadId(generateChatId)/messageId(firebase generated)/messageData
    this.props.chatRef.push(messageData)
  }

  render () {
    return (
      <Fragment>
        <ChatInput onSend={this.onSend} />
      </Fragment>
    )
  }
}

ChatInputContainer.propTypes = {
  chatWith: PropTypes.string.isRequired,
  allMessages: PropTypes.number.isRequired,
  chatRef: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired
}

export default ChatInputContainer
