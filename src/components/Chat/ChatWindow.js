import React from 'react'
import {auth, database} from '../../Firebase'
import ChatInput from './ChatInput'
import AllMessages from './AllMessages'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allMessages: []
    }

    this.user = auth.currentUser

    this.createdUid = this.props.location.state.createdUid

    this.chatRef = database.ref().child(`/chatThreads/${this.generateChatId()}`)
    this.chatRefData = this.chatRef.orderByChild('orders')
    this.onSend = this.onSend.bind(this)
    this.listenForMessages = this.listenForMessages.bind(this)
  }
  // Generate unique threadId for the database:
  generateChatId () {
    if (this.user.uid > this.createdUid) return `${this.user.uid}-${this.createdUid}`
    else return `${this.createdUid}-${this.user.uid}`
  }

  componentDidMount () {
    // start listen to data changes on mount
    this.listenForMessages(this.chatRefData)
  }

  componentWillUnmount () {
    // Stop listen to data changes on unmount
    this.chatRefData.off()
  }

  // Logic when sending message in ChatInput:
  onSend (message) {
    /*
    Check if this is the first message between users and
    add the threadId to both users in the database if true
    */
    if (this.state.allMessages.length === 0) {
      const chatId = this.generateChatId()
      database.ref(`users/${this.user.uid}/activeThreads/${chatId}`).set({
        threadId: chatId
      }).then(
        database.ref(`users/${this.createdUid}/activeThreads/${chatId}`).set({
          threadId: chatId
        }).catch(err => console.log(err))
      )
        .catch(err => console.log(err))
      // Making chatThreadMeta with the chat details:
      let now = new Date().getTime()
      database.ref(`chatThreadMeta/${chatId}`).set({
        createdAt: now,
        createdByUserId: this.user.uid,
        threadId: chatId
      }).catch(err => console.log(err))
    }
    // Get massage from ChatInput and send it to database:
    let now = new Date().getTime()
    let messageData = {
      userId: this.user.uid,
      displayName: this.user.displayName,
      chatMessage: message,
      chatTimestamp: now
      // order: -1 * now
    }
    // Database path:
    // chatThread/threadId(generateChatId)/messageId(firebase generated)/messageData
    this.chatRef.push(messageData)
  }

  listenForMessages (chatRef) {
    const allMessages = []
    // Get all messages from database and set the state
    chatRef.on('child_added', snapshot => {
      allMessages.push(snapshot.val())
      this.setState({
        allMessages: allMessages})
    })
  }

  render () {
    return (
      <div>
        <h3>
          Chat window
        </h3>
        <AllMessages messages={this.state.allMessages} />
        <ChatInput onSend={this.onSend} />
      </div>
    )
  }
}

export default ChatWindow
