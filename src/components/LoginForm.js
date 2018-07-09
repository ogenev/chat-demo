import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { auth } from '../Firebase'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

/*
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/home',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}*/

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
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
})

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push('/home')
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
      password,
      error,
    } = this.state

    const isInvalid =
      password === '' ||
      email === ''

    return (
      <Fragment>
        <form className={classes.container} onSubmit={this.onSubmit} autoComplete="off">
          <Grid container direction='column' alignItems='center'>
            <TextField
              id="email"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              label="Имейл адрес"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="password-input"
              label="Парола"
              value={password}
              className={classes.textField}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <div style={{height: 10}}>
            </div>
            <Button variant="contained" color="primary" disabled={isInvalid} type="submit" className={classes.button}>
              Вход
            </Button>

            <Typography variant="caption" gutterBottom align="center" className={classes.link} >
              <Link to={'/pw-forgot'}>
              Забравена парола?
              </Link>
            </Typography>
          </Grid>
        </form>
        <Grid container direction='column' alignItems='center'>

          <Button variant='contained' color='secondary' component={Link} to='/register' >
            Регистрирай се
          </Button>
          { error && <p>{error.message}</p> }
        </Grid>
      </Fragment>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(LoginForm)
