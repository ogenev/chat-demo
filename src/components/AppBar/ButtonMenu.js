// Button menu when user is logged in

import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import firebase from 'firebase/app'
import Link from "react-router-dom/Link";

class ButtonMenu extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  render () {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup='true'
          onClick={this.handleMenu}
          color='inherit'
        >
          <AccountCircle style={{ fontSize: 36}}/>
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem component={Link} to="/myprofile">Моят Профил</MenuItem>
          <MenuItem component={Link} to="/" onClick={() => (firebase.auth().signOut().then(function () {
          }).catch(function (error) {
            console.log(error)
          }))}>Излез</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default ButtonMenu
