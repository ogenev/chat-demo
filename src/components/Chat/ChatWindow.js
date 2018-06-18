import React from 'react'
import {auth, database} from '../../Firebase'

class ChatWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: []
    }

    this.user = auth.currentUser
    this.createdUid = this.props.location.state.createdUid
    this.chatRef = database.ref().child('/chat' + this.generateChatId())
    this.chatRefData = this.chatRef.orderByChild('orders')
    this.onSend = this.onSend.bind(this)
    this.listenForItems = this.listenForItems.bind(this)
  }

  generateChatId () {
    if (this.user.uid > this.createdUid) return `${this.user.uid}-${this.createdUid}`
    else return `${this.createdUid}-${this.user.uid}`
  }

  componentDidMount () {
    this.listenForItems(this.chatRefData)
  }

  componentWillUnmount () {
    this.chatRefData.off()
  }

  onSend (messages = []) {
    messages.forEach(message => {
      let now = new Date().getTime()
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        order: -1 * now
      })
    })
  }

  listenForItems (chatRef) {
    chatRef.on('value', snap => {
      let items = []
      snap.forEach(child => {
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid
          }

        })
      })
      this.setState({
        loading: false,
        messages: items
      })
    })
  }

  render () {
    return (
      <div>
        {/*
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.user.uid
        }}
      */}
        <h3>
          Chat window
        </h3>
      </div>
    )
  }
}

export default ChatWindow
