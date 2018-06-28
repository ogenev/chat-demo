import React, { Fragment } from 'react'
import { database } from '../../Firebase'
import ChatInput from './ChatInput'

class ChatInputContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allMessages: []
    }
    this.userId = sessionStorage.getItem('userId')
    this.displayName = sessionStorage.getItem('displayName')
    this.chatRef = database.ref().child(`/chatThreads/${this.generateChatId()}`)
    this.onSend = this.onSend.bind(this)
  }

  // Generate unique threadId for the database:
  generateChatId () {
    if (this.userId > this.props.createdUid) return `${this.userId}-${this.props.createdUid}`
    else return `${this.props.createdUid}-${this.userId}`
  }

  onSend (message) {
    /*
    Check if this is the first message between users and
    add the threadId to both users in the database if true
    */
    if (this.state.allMessages.length === 0) {
      const chatId = this.generateChatId()
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
      let now = new Date().getTime()
      database.ref(`chatThreadMeta/${chatId}`).set({
        createdAt: now,
        startedByUserId: this.userId,
        threadId: chatId,
        receivedByUserId: this.props.createdUid
      }).catch(err => console.log(err))
    }
    // Get massage from ChatInput and send it to database:
    let now = new Date().getTime()
    let messageData = {
      userId: this.userId,
      displayName: this.displayName,
      chatMessage: message,
      chatTimestamp: now
      // order: -1 * now
    }
    // Database path:
    // chatThread/threadId(generateChatId)/messageId(firebase generated)/messageData
    this.chatRef.push(messageData)
  }

  render () {
    return (
      <Fragment>
        <ChatInput onSend={this.onSend} />
      </Fragment>
    )
  }
}

export default ChatInputContainer
