import React from 'react'

import ChatMessage from './ChatMessage'

class AllChatMessages extends React.Component {
  // There is a new message in the state, scroll to bottom of list
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'instant' })
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  render () {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <ChatMessage
          key={i}
          userId={this.props.userId}
          senderId={message.senderId}
          senderUsername={message.senderUsername}
          chatMessage={message.chatMessage}
          chatTimestamp={message.chatTimestamp}
        />
      )
    })

    return (
      <div style={{paddingTop: '0.5em', overflow: 'scroll', height: '68vh'}}>
        { messages }
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}

AllChatMessages.defaultProps = {
  messages: []
}

export default AllChatMessages
