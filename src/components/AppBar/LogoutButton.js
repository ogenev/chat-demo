import React from 'react'
import Link from 'react-router-dom/Link'
import { auth, database } from '../../Firebase'
import firebase from 'firebase/app'
import MenuItem from '@material-ui/core/MenuItem'

export default props => (
  <MenuItem component={Link} to="/" onClick={() => {
    // Set last time online in database before sign-out
    let UserId = sessionStorage.getItem('userId')
    const lastOnlineRef = database.ref(`users/${UserId}/lastOnline`)
    lastOnlineRef.set(firebase.database.ServerValue.TIMESTAMP)
      .then( () => {
        auth.signOut().then(function () {
        }).catch(function (error) {
          console.log(error)
        })}).catch(err => console.log(err))
  }
  }>Излез</MenuItem>
)
