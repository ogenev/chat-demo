import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { auth } from '../Firebase/config'


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
  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then(function(){
        history.push('/home')
      }).catch(error => {
      this.setState(byPropKey('error', error))
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

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <Fragment>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <Grid container direction='column' alignItems='center'>
          <TextField
            id="username"
            value={username}
            label="Потребителско Име"
            className={classes.textField}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            margin="normal"
          />
        <TextField
          id="email"
          value={email}
          label="Имейл адрес"
          className={classes.textField}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          margin="normal"
        />
        <TextField
          id="password-input"
          value={passwordOne}
          label="Парола"
          className={classes.textField}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <TextField
          id="confirmPassword-input"
          label="Потвърдете Паролата"
          value={passwordTwo}
          className={classes.textField}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
          <Button variant="contained" color="secondary"
                  className={classes.button} type='submit'
                  disabled={isInvalid}>
            Регистрирай се
          </Button>
          { error && <p>{error.message}</p> }
        </Grid>
      </form>
        <Grid container direction='column' alignItems='center'>

        </Grid>
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(RegisterForm);