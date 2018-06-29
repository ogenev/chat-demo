import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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


class UserAddress extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <div>
        <TextField
          id="address"
          name="address"
          value={this.props.address || ""}
          onChange={this.props.handleChange('address')}
          label="Адрес"
          className={classes.textField}
          margin="normal"
          multiline
        />
      </div>
    )
  }
}

UserAddress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAddress)