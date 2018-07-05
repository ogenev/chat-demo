import React, { Fragment } from 'react'
import {database} from '../../Firebase'
import AllChatMessages from './AllChatMessages'
import ChatAppBar from './ChatAppBar'
import ChatInputContainer from './ChatInputContainer'
import ChatOfferPanel from './ChatOfferPanel'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allMessages: []
    }

    this.userId = sessionStorage.getItem('userId')

    this.createdUid = this.props.location.state.createdUid

    this.chatRef = database.ref().child(`/chatThreads/${this.generateChatId()}`)
    this.chatRefData = this.chatRef.orderByChild('orders')
    this.listenForMessages = this.listenForMessages.bind(this)
  }
  generateChatId () {
    if (this.userId > this.createdUid) return `${this.userId}-${this.createdUid}`
    else return `${this.createdUid}-${this.userId}`
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
      <Fragment>
        <ChatAppBar />
        <ChatOfferPanel />
        <AllChatMessages messages={this.state.allMessages} />
        <ChatInputContainer
          createdUid={this.createdUid}
          allMessages={this.state.allMessages.length}
          chatRef={this.chatRef}
          chatId={this.generateChatId()} />
      </Fragment>
    )
  }
}

export default ChatWindow
