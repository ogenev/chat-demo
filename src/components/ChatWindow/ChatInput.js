import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

const styles = theme => ({
  input: {
    margin: 7
  },
  button: {
    position: 'relative',
    bottom: '1%'
  },
  sendIcon: {
    fontSize: 36
  },
  inputContainer: {
    borderTop: '1px solid',
    borderColor: '#e6e6e6',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    background: '#fafafa',
    padding: '1%'
  },
  form: {
    width: '100%',
    display: 'inline-flex'
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
      <div className={classes.inputContainer}>
        <form onSubmit={this.submitHandler} className={classes.form}>
          <Input
            onChange={this.textChangeHandler}
            value={chatInput}
            disableUnderline
            fullWidth
            autoFocus
            placeholder='Напиши съобщение...'
            className={classes.input}
            inputProps={{
              'aria-label': 'Description'
            }}
          />
          <Button variant='text' disabled={isInvalid} color={'primary'}
            type='submit' className={classes.button} mini size='small'>
            <SendIcon className={classes.sendIcon} />
          </Button>
        </form>
      </div>
    )
  }
}

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatInput)
