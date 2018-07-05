import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ItemName extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <TextField
        name="name"
        required
        id="name"
        label= "Предмет"
        onChange={this.props.handleChange('offerName')}
        disabled={this.props.hideInputs}
        placeholder= "наименование"
        value={this.props.offerName}
        className={classes.textField}
        margin="normal"
      />
    )
  }
}

ItemName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemName)