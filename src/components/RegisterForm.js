import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { auth, database } from '../Firebase'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}


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
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },

});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  componentDidMount() {
    // custom rule for password match
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return (value === this.state.passwordOne)
    })
    // custom rule for password
    ValidatorForm.addValidationRule('isPassword', (value) => {
      return (value.length > 5)
    })
    // custom rule for username length
    ValidatorForm.addValidationRule('isUsernameLength', (value) => {
      return (value.length > 3)
    })
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state

    const {
      history,
    } = this.props

    const that = this

// Register user to Firebase

    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then(function(authUser){

        // Add user to database too

        database.ref('users/' + authUser.user.uid).set({
          userId: authUser.user.uid,
          username: username,
          email: email,
        })
          .then(() => {
            that.setState(() => ({ ...INITIAL_STATE }))
            // Set user username in Firebase:

            authUser.user.updateProfile({
              username: username,
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              console.log(error)
            })

            history.push('/home')
          })
          .catch(error => {
            that.setState(byPropKey('error', error))
          });

      }).catch(error => {
      that.setState(byPropKey('error', error))
    })

    event.preventDefault()
  }

  render() {
    const { classes } = this.props

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    return (
      <Fragment>
      <ValidatorForm className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <Grid container direction='column' alignItems='center'>
          <TextValidator
            id="username"
            name='username'
            value={username}
            label="Потребителско име"
            className={classes.textField}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            validators={['required', 'isUsernameLength']}
            errorMessages={['Въведете потребителско име!', 'Потребителското име трябва да е поне 4 символа']}
            margin="normal"
          />
        <TextValidator
          id="email"
          name='email'
          value={email}
          label="Имейл адрес"
          className={classes.textField}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          margin="normal"
          validators={['required', 'isEmail']}
          errorMessages={['Попълнете имейл адрес!', 'Невалиден имейл адрес!']}
        />
        <TextValidator
          id="password-input"
          value={passwordOne}
          name='password'
          label="Парола"
          className={classes.textField}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          autoComplete="current-password"
          validators={['isPassword', 'required']}
          errorMessages={['Паролата трябва да е минимум 6 символа', 'Въведете парола!']}
          margin="normal"
        />
        <TextValidator
          id="confirmPassword-input"
          label="Потвърдете Паролата"
          name='passwordTwo'
          value={passwordTwo}
          className={classes.textField}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          autoComplete="current-password"
          validators={['isPasswordMatch', 'required']}
          errorMessages={['Паролите не съвпадат!', 'Повторете паролата!']}
          margin="normal"
        />
          <Button variant="contained" color="secondary"
                  className={classes.button} type='submit'
                  >
            Регистрирай се
          </Button>
          { error &&
            <p>{error.message}</p>
          }
        </Grid>
      </ValidatorForm>
        <Grid container direction='column' alignItems='center'>

        </Grid>
      </Fragment>
    )
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(RegisterForm)
