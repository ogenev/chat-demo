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


class UserWebsite extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <div>
        <TextField
          id="website"
          name="website"
          value={this.props.website || ""}
          onChange={this.props.handleChange('website')}
          label="Вашият уебсайт"
          className={classes.textField}
          margin="normal"
        />
      </div>
    )
  }
}

UserWebsite.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserWebsite)