import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  input: {
    margin: 7
  },
  button: {
    position: 'absolute',
    right: '1em',
    bottom: 10
  },
  rightIcon: {
  },
  inputContainer: {
    borderTop: '1px solid',
    borderColor: '#e6e6e6',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    background: '#fafafa',
    padding: 5
  },
  btnText:{
    color: '#3f51b5',
    fontSize: 13
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
        <div className={classes.inputContainer}>
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
            <span className={classes.btnText}>Изпрати</span>
          </Button>
        </div>
      </form>
    )
  }
}

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatInput)
