import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import AccountCircle from '@material-ui/icons/AccountCircle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {database} from "../Firebase"


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
})


class MyProfile extends React.Component {
  state = {
    UserId: '',
    address: '',
    website: '',
    phone: '',
    presentation: ''
  }

  componentWillMount () {
    let currentUserId = sessionStorage.getItem('userId')
    this.setState({
      UserId: currentUserId
    })
    database.ref(`users/${currentUserId}/`).once('value')
      .then(snapshot => {
          let address = snapshot.val().address
          let website = snapshot.val().website
          let phone = snapshot.val().phone
          let presentation = snapshot.val().presentation

        this.setState({address: address,
          website: website,
          phone: phone,
          presentation: presentation })
      })
  }

  submitChanges = (event) => {
    event.preventDefault()
    this.handleUpload()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }


  handleUpload = () => {
    database.ref(`users/${this.state.UserId}`).update({
      address: this.state.address,
      website: this.state.website,
      phone: this.state.phone,
      presentation: this.state.presentation
    })
  }

  render () {
    const {classes} = this.props
    const displayName = sessionStorage.getItem('displayName')

    return (
          <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitChanges}>
              <FormControl className={classes.margin}><TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Име"
                value={displayName}
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
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                ЗАПАЗИ ПРОМЕНИТЕ
              </Button>
            </form>
          </div>
    )
  }
}


MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyProfile)