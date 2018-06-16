import React, { Component } from 'react'
import { auth } from '../Firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },

})


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
  message: null
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { email } = this.state

    auth.sendPasswordResetEmail(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        this.setState(byPropKey('message', 'Моля, проверете вашата поща!'))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { classes } = this.props
    const {
      email,
      error,
      message
    } = this.state

    const isInvalid = email === ''

    return (
        <form className={classes.container} onSubmit={this.onSubmit} autoComplete="off">
          <Grid container direction='column' alignItems='center'>
            <TextField
              id="email"
              value={this.state.email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              label="Имейл адрес"
              className={classes.textField}
              margin="normal"
            />
            <div style={{height: 10}}>
            </div>
            <Button variant="contained" color="primary" disabled={isInvalid} type="submit" className={classes.button}>
              Нова Парола
            </Button>
            { error && <p>{error.message}</p> }
            { message && <Typography>{message}</Typography>}
          </Grid>
        </form>
    )
  }
}

PasswordForgetForm.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(PasswordForgetForm)