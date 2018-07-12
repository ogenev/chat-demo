import React from 'react'
import { database } from '../../Firebase/index'
import { withRouter } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'

class UserMetaChat extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      chatWith: ''
    }
    // Set database reference for the meta data for the chat thread

    this.metaRef = database.ref(`/chatThreadMeta/${this.props.threadId}`)
    this.userId = this.props.authUser.uid

    this.onClick = this.onClick.bind(this)
  }
  componentDidMount () {
    // Get meta from database onetime and set the current state
    this.metaRef.once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          if (this.userId === snapshot.val().startedByUserId) {
            this.setState({chatWith: snapshot.val().receivedByUserId})
          } else {
            this.setState({chatWith: snapshot.val().startedByUserId})
          }
        }
      })
      .catch(err => console.log(err))
  }

  onClick () {
    // Send to the appropriate chatWindow when clicking on the thread list
    this.props.history.push({
      pathname: '/chat',
      state: { chatWith: this.state.chatWith }
    })
  }

  render () {
    if (this.state.chatWith) {
      return (<ListItem button onClick={this.onClick} style={{border: 'outset', width: '80%'}}>
          Chat with: {this.state.chatWith}
      </ListItem>
      )
    } else {
      return <div />
    }
  }
}

UserMetaChat.defaultProps = {
  threadId: '',
  authUser: ''
}

export default withRouter(UserMetaChat)
