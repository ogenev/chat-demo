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


class UserPhone extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <div>
        <TextField
          name="phone"
          id="phone"
          value={this.props.phone || ""}
          onChange={this.props.handleChange('phone')}
          label="Телефон за връзка"
          type="number"
          className={classes.textField}
          margin="normal"
        />
      </div>
    )
  }
}

UserPhone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPhone)