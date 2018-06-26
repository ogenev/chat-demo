import React from 'react'

class UserMetaChat extends React.Component {
  render () {
    return (
      <div className={`chatId`}>
        chat: {this.props.threadId}
        <div className='chatWith'>
        </div>
      </div>
    )
  }
}

UserMetaChat.defaultProps = {
  threadId: ''
}

export default UserMetaChat
