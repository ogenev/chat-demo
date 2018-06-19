import React from 'react'

import Message from './Message'

class AllMessages extends React.Component {
  componentDidMount(){
    console.log(this.props)
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          username={message.username}
          message={message.message}
          fromMe={message.fromMe} />
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
