import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';

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

class RegisterForm extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper>
      <form className={classes.container} noValidate autoComplete="off">
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
        <TextField
          id="confirmPassword-input"
          label="Потвърдете Паролата"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
      </form>
        <Button variant="contained" color="secondary" className={classes.button}>
          Регистрирай се
        </Button>
      </Paper>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(RegisterForm);