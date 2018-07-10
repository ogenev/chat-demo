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


class UserCity extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <div>
        <TextField
          id="city"
          name="city"
          value={this.props.city || ""}
          onChange={this.props.handleChange('city')}
          label="Град"
          className={classes.textField}
          margin="normal"
          multiline
        />
      </div>
    )
  }
}

UserCity.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCity)