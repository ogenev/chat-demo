import firebase from 'firebase/app'
import React from 'react'

const Home = () =>
  <button
    type='button'
    onClick={() => (firebase.auth().signOut().then(function () {
      console.log('sign in success')
    }).catch(function (error) {
      console.log(error)
    }))}
  >
    Sign Out
  </button>

export default Home
