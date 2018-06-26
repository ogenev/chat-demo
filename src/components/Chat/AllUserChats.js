import React from 'react'
import UserMetaChat from './UserMetaChat'
import { database } from '../../Firebase'

class AllUserChats extends React.Component {
  constructor (props) {
    super(props)

    this.userId = this.props.user.uid
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

export default AllUserChats
