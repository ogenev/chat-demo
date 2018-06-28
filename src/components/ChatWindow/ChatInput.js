import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class ChatInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { chatInput: '' }

    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
  }

  submitHandler (event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault()

    // Clear the input box
    this.setState({ chatInput: '' })

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput)
  }

  textChangeHandler (event) {
    this.setState({ chatInput: event.target.value })
  }

  render () {
    const { classes } = this.props
    const chatInput = this.state.chatInput
    const isInvalid =
      chatInput === ''
    return (
      <form className='chat-input' onSubmit={this.submitHandler} >
        <Input
          onChange={this.textChangeHandler}
          value={chatInput}
          placeholder='Напиши твоето съобщение...'
          className={classes.input}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
        <Button variant='contained' color='primary' disabled={isInvalid}
          type='submit' className={classes.button} size='small'>
          Изпрати
        </Button>
      </form>
    )
  }
}

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatInput)
