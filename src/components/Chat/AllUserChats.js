import React from 'react'
import UserMetaChat from './UserMetaChat'
import { database } from '../../Firebase/index'

class AllUserChats extends React.Component {
  constructor (props) {
    super(props)

    this.userId = this.props.authUser.uid
    this.state = {allChats: []}
    this.allChatRef = database.ref().child(`/users/${this.userId}/activeThreads`)
    this.listenForChats = this.listenForChats.bind(this)
  }

  listenForChats (allChatRef) {
    const allChats = []
    // Get all chats from database and set the state
    allChatRef.on('child_added', snapshot => {
      allChats.push(snapshot.val())
      this.setState({
        allChats: allChats})
    })
  }

  componentWillUnmount () {
    // Stop listen to data changes on unmount
    this.allChatRef.off()
  }

  componentDidMount () {
    this.listenForChats(this.allChatRef)
  }

  render () {
    const userChats = this.state.allChats.map((chat, index) => {
      return (
        <UserMetaChat
          authUser={this.props.authUser}
          threadId={chat.threadId}
          key={index}
        />
      )
    })
    return (
      <div>
        <h3>Моите чатове </h3>
        <div>
          {userChats}
        </div>
      </div>
    )
  }
}

AllUserChats.defaultProps = {
  authUser: ''
}

export default AllUserChats
