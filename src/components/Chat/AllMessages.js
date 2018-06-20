import React from 'react'

import Message from './Message'

class AllMessages extends React.Component {
  componentDidUpdate () {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  render () {
    console.log(this.props.messages)
    console.log(this.props.messages[0])
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          displayName={message.displayName}
          chatMessage={message.chatMessage}
        />
      )
    })

    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    )
  }
}

AllMessages.defaultProps = {
  messages: []
}

export default AllMessages
