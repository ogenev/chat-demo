import React from 'react'

class ChatMessage extends React.Component {
  render () {
    return (
      <div className={`message`}>
        <div className='username'>
          { this.props.displayName}
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
  displayName: ''
}

export default ChatMessage
