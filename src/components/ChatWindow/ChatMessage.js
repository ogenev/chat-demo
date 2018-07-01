import React from 'react'

class ChatMessage extends React.Component {
  render () {
    return (
      <div className={`message`}>
        <div className='username'>
          { this.props.senderName}
        </div>
        <div className='message-body'>
          { this.props.chatMessage }
        </div>
      </div>
    )
  }
}

ChatMessage.defaultProps = {
  chatMessage: '',
  senderName: ''
}

export default ChatMessage
