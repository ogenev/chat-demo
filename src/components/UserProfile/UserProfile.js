import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {database} from '../../Firebase/index'
import UserName from './UserName'
import UserAddress from './UserAddress'
import UserCity from './UserCity'
import UserWebsite from './UserWebsite'
import UserPhone from './UserPhone'
import UserPresentation from './UserPresentation'
import SaveChangesButton from './SaveChangesButton'


const styles = ({
});

class UserProfile extends React.Component {
  state = {
    UserId: null,
    username: null,
    address: null,
    city: null,
    website: null,
    phone: null,
    presentation: null
  }

  componentDidMount () {
    let currentUserId = sessionStorage.getItem('userId')
    let currentUserName= sessionStorage.getItem('username')
    this.setState({
      UserId: currentUserId, username: currentUserName
    })

    database.ref(`users/${currentUserId}/`).once('value')
    // If database.ref returns undefined, set state to ""
      .then(snapshot => {
        let userDataFirebase = [snapshot.val().address,
          snapshot.val().city,
          snapshot.val().website,
          snapshot.val().phone,
          snapshot.val().presentation
        ]
        let userDataReady =[]
        userDataReady = userDataFirebase.map((data, i) => {
          if (data !== undefined) {
            return userDataReady[i] = data
          }
          else {
            return userDataReady[i] = ""
          }
        })

      this.setState({address: userDataReady[0],
        city: userDataReady[1],
      website: userDataReady[2],
      phone: userDataReady[3],
      presentation: userDataReady[4] })
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
      city: this.state.city,
      website: this.state.website,
      phone: this.state.phone,
      presentation: this.state.presentation
    })
  }

  render () {
    const {classes} = this.props

    return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitChanges}>
              <UserName username={this.state.username} handleChange={this.handleChange}/>
              <UserAddress address={this.state.address} handleChange={this.handleChange} />
              <UserCity city={this.state.city} handleChange={this.handleChange} />
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