import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import AppContext from '../AppContext'
import ButtonMenu from './ButtonMenu'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'

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
              <Fragment>
                <IconButton color='inherit'
                  component={Link}
                  to='/mychats'
                  style={{
                    position: 'absolute',
                    right: 70,
                    top: 7
                  }}>
                  <ChatIcon style={{ fontSize: 36}} />
                </IconButton>
                <div style={{position: 'absolute', top: 5, right: 10}}>
                  <ButtonMenu />
                </div>
              </Fragment>
            )
          }
        }}
      </AppContext.Consumer>
    )
  }
}

export default AppBarButton
