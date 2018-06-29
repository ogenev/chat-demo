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


class UserPresentation extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <div>
        <TextField
          id="presentation"
          name="presentation"
          label="Представяне"
          value={this.props.presentation || ""}
          onChange={this.props.handleChange('presentation')}
          placeholder="Представете себе си пред клиентите тук"
          multiline
          rows="5"
          className={classes.textField}
          margin="normal"
        />
      </div>
    )
  }
}

UserPresentation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPresentation)