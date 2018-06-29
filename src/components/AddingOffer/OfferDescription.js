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

class OfferDescription extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <TextField
        name="description"
        required
        id="description"
        label="Описание"
        onChange={this.props.handleChange('description')}
        placeholder= "опишете подробно"
        multiline
        className={classes.textField}
        margin="normal"
        value={this.props.description}
      />
    )
  }
}

OfferDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OfferDescription)