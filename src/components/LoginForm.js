import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import config from '../Firebase/config'

firebase.initializeApp(config)
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

class LoginForm extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container direction='column' alignItems='center'>
            <TextField
              id="email"
              label="Имейл адрес"
              className={classes.textField}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="password-input"
              label="Парола"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </Grid>
        </form>
        <Grid container direction='column' alignItems='center'>
          <div style={{height: 10}}>
          </div>
          <Button variant="contained" color="primary" className={classes.button}>
            Вход
          </Button>
          <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
          <div style={{height: 20}}>
          </div>
          <Button variant='contained' color='secondary' component={Link} to='/register' >
            Регистрирай се
          </Button>
        </Grid>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoginForm);
