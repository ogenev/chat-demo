import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import AppContext from '../../AppContext'
import ButtonMenu from './ButtonMenu'

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
              <div style={{position: 'absolute', top: 5, right: 10}}>
                <ButtonMenu />
              </div>
            )
          }
        }}
      </AppContext.Consumer>
    )
  }
}

export default AppBarButton
