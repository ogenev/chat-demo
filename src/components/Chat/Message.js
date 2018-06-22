import React from 'react'

class Message extends React.Component {
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

Message.defaultProps = {
  chatMessage: '',
  displayName: '',
}

export default Message
