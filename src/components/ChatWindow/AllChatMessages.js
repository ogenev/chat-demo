import React from 'react'

import ChatMessage from './ChatMessage'

class AllChatMessages extends React.Component {
  componentDidUpdate () {
    // There is a new message in the state, scroll to bottom of list
    // const objDiv = document.getElementById('messageList')
  //  objDiv.scrollTop = objDiv.scrollHeight
  }

  render () {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <ChatMessage
          key={i}
          displayName={message.displayName}
          chatMessage={message.chatMessage}
        />
      )
    })

    return (
      <div>
        { messages }
      </div>
    )
  }
}

AllChatMessages.defaultProps = {
  messages: []
}

export default AllChatMessages
