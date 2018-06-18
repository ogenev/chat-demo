import React from 'react'
import {auth} from '../../Firebase'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: []
    }

    this.user = auth.currentUser
    const createdUid = this.props.location.state.createdUid
  }

  generateChatId () {
   // if (this.user.uid > createdUid)
  }

  componentDidMount () {
    console.log(this.user)
  }

  render () {
    return (
      <div>
        <h3>
          Chat window
        </h3>
      </div>
    )
  }
}

export default ChatWindow
