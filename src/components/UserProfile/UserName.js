import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import AccountCircle from '@material-ui/icons/AccountCircle'
import TextField from '@material-ui/core/TextField'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: 18,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


class UserName extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <Fragment>
          <FormControl className={classes.margin}>
            <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="потребител"
            value={this.props.username || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle/>
                </InputAdornment>
              )
            }}
          />
          </FormControl>
      </Fragment>
    )
  }
}

UserName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserName)