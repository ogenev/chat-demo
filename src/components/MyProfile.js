import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from './AppContext'
import {auth, database} from "../Firebase";


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: 18,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: 20,
  },
});


class MyProfile extends React.Component {
  state = {
    UserId: "",
    address: "",
    website: "",
    phone: "",
    presentation: "",
    showBtn: 1
  }

  mountTextField = (name, nameState) => {
    if (name != null) {
      name.on('value', snapshot => {
        this.setState({[nameState]: snapshot.val()})
      })
    }
    else {
      this.setState({[nameState]: ""})
    }
  }

  componentWillMount () {
    let currentUserId = auth.currentUser.uid
    this.setState({
      UserId: currentUserId
    })
    let address = database.ref().child(`users/${currentUserId}/address`)
    let website = database.ref().child(`users/${currentUserId}/website`)
    let phone = database.ref().child(`users/${currentUserId}/phone`)
    let presentation = database.ref().child(`users/${currentUserId}/presentation`)
    this.mountTextField(address, 'address')
    this.mountTextField(website, 'website')
    this.mountTextField(phone, 'phone')
    this.mountTextField(presentation, 'presentation')

  }

  submitChanges = (event) => {
    this.setState({showBtn: 0})
    event.preventDefault()
    this.handleUpload()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  showTheButton = () => {
    this.setState({showBtn: 1})
  }

  handleUpload = () => {
    database.ref(`users/${this.state.UserId}`).update({
      address: this.state.address,
      website: this.state.website,
      phone: this.state.phone,
      presentation: this.state.presentation
    })
      setTimeout(this.showTheButton(), 1000)
  }

  render () {
    const {classes} = this.props

    const isInvalid =
      this.state.showBtn === 0

    return (
      <AppContext.Consumer>
        {(context) => (
          <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitChanges}>
              <FormControl className={classes.margin}><TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Име"
                value={context.authUser.displayName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle/>
                    </InputAdornment>
                  )
                }}
              />
              </FormControl>
              <div>
                <TextField
                  id="address"
                  name="address"
                  value={this.state.address || ""}
                  onChange={this.handleChange('address')}
                  label="Адрес"
                  className={classes.textField}
                  margin="normal"
                  multiline
                />
              </div>
              <div>
                <TextField
                  id="website"
                  name="website"
                  value={this.state.website || ""}
                  onChange={this.handleChange('website')}
                  label="Вашият уебсайт"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  name="phone"
                  id="phone"
                  value={this.state.phone || ""}
                  onChange={this.handleChange('phone')}
                  label="Телефон за връзка"
                  type="number"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="presentation"
                  name="presentation"
                  label="Представяне"
                  value={this.state.presentation || ""}
                  onChange={this.handleChange('presentation')}
                  placeholder="Представете себе си пред клиентите тук"
                  multiline
                  rows="5"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={isInvalid}>
                ЗАПАЗИ ПРОМЕНИТЕ
              </Button>
            </form>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}


MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfile);