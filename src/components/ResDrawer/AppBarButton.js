import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import firebase from 'firebase/app'
import AppContext from '../AppContext'

const LoginLink = props => <Link to='/login' {...props} />

class AppBarButton extends React.Component {
  render () {
    return (
      <AppContext.Consumer>
        {(context) => {
          if (!context.authUser) {
            return (
              <Button
                color='inherit'
                component={LoginLink}
                style={{position: 'absolute', top: 10, right: 10}}>
                Вход
              </Button>
            )
          } else {
            return (
              <Button
                color='inherit'
                onClick={() => (firebase.auth().signOut().then(function () {
                }).catch(function (error) {
                  console.log(error)
                }))}
                style={{position: 'absolute', top: 10, right: 10}}>
                Изход
              </Button>
            )
          }
        }}
      </AppContext.Consumer>
    )
  }
}

export default AppBarButton
