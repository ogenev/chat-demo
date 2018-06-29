import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {database} from '../../Firebase/index'
import UserName from './UserName'
import UserAddress from './UserAddress'
import UserWebsite from './UserWebsite'
import UserPhone from './UserPhone'
import UserPresentation from './UserPresentation'
import SaveChangesButton from './SaveChangesButton'


const styles = ({
});

class UserProfile extends React.Component {
  state = {
    UserId: "",
    address: "",
    website: "",
    phone: "",
    presentation: ""
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
    });
  };

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

    return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitChanges}>
              <UserName />
              <UserAddress address={this.state.address} handleChange={this.handleChange} />
              <UserWebsite website={this.state.website} handleChange={this.handleChange} />
              <UserPhone phone={this.state.phone} handleChange={this.handleChange} />
              <UserPresentation presentation={this.state.presentation} handleChange={this.handleChange} />
              <SaveChangesButton/>
            </form>
    )
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile)