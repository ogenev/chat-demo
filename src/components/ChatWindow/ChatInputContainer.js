import React, { Fragment } from 'react'
import { database } from '../../Firebase'
import ChatInput from './ChatInput'
import PropTypes from 'prop-types'

class ChatInputContainer extends React.Component {
  constructor (props) {
    super(props)

    this.userId = sessionStorage.getItem('userId')
    this.senderName = sessionStorage.getItem('displayName')
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
      database.ref(`users/${this.userId}/activeThreads/${chatId}`).set({
        threadId: chatId
      }).then(
        database.ref(`users/${this.props.createdUid}/activeThreads/${chatId}`).set({
          threadId: chatId
        }).catch(err => console.log(err))
      )
        .catch(err => console.log(err))
      // Making chatThreadMeta with the chat details:
      // Need to fix the meta
      database.ref(`chatThreadMeta/${chatId}`).set({
        createdAt: now,
        startedByUserId: this.userId,
        threadId: chatId,
        receivedByUserId: this.props.createdUid
      }).catch(err => console.log(err))
    }
    // Get massage from ChatInput and send it to database:
    let messageData = {
      senderId: this.userId,
      senderName: this.senderName,
      receiverId: this.props.createdUid,
      chatMessage: message,
      chatTimestamp: now
      // order: -1 * now
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
  createdUid: PropTypes.string.isRequired,
  allMessages: PropTypes.number.isRequired,
  chatRef: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired
}

export default ChatInputContainer
