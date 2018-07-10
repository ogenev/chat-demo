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

  componentWillUnmount(){
    this.setState({ ...INITIAL_STATE })
    database.ref(`usernames/`).off()
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
          ValidatorForm.addValidationRule('isUsernameLengthMin', (value) => {
            return (value.length > 2)
          })
          ValidatorForm.addValidationRule('isUsernameLengthMax', (value) => {
            return (value.length < 16)
          })
           // Regex for username symbols
          ValidatorForm.addValidationRule('isUsername', (value) => {
            const regex = /^[a-z0-9_-]{3,15}$/
            return (regex.test(value))
          })
          // Validation for dublicate username
          ValidatorForm.addValidationRule('isUsernameUsed', (value) => {
            let isUsed = null
            if (value.length > 2 && value.length < 16) {
              database.ref(`usernames/`).on('value', snapshot => {
                isUsed = snapshot.hasChild(value)
              })
            }
            return !isUsed
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
        .then(authUser => {
          // Add user to database too
          database.ref('users/' + authUser.user.uid).set({
            userId: authUser.user.uid,
            username: username,
            email: email,
          })
            .then(() => {
              // Add user to users database:
              database.ref(`usernames/${username}`).set({
                userId: authUser.user.uid
              }).then(() => {
                // Set user username in Firebase:
                authUser.user.updateProfile({
                  displayName: username,
                }).then(() => {
                  history.push('/home')
                }).catch(function(error) {
                  console.log(error)
                })

              }).catch(err => console.log(err))
            })
            .catch(error => {
              that.setState(byPropKey('error', error))
            })
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
            validators={['required', 'isUsernameLengthMin', 'isUsernameLengthMax', 'isUsername', 'isUsernameUsed']}
            errorMessages={['Въведете потребителско име!', 'Потребителското име трябва да е поне 3 символа'
              ,'Потребителското име не трябва да е повече от 15 символа'
              ,'Позволени са само малки латински букви, цифри, тире, долна черта!'
            ,'Потребителското име е заето!']}
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
