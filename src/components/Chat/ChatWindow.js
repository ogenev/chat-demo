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

  onSend (message) {
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
    chatRef.on('value', snapshot => {
      snapshot.forEach(child => {
        allMessages.push({
          displayName: child.val().displayName,
          chatMessage: child.val().chatMessage,
          chatTimestamp: new Date(child.val().chatTimestamp)
        })
      })
    })
    this.setState({
      allMessages: allMessages})
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
