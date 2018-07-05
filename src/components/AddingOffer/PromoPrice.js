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

class PromoPrice extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <TextField
        name="promo"
        id="number"
        label="Промоционална цена"
        onChange={this.props.handleChange('promoPrice')}
        disabled={this.props.hideInputs}
        value={this.props.promoPrice}
        type="number"
        className={classes.textField}
        margin="normal"
      />
    )
  }
}

PromoPrice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromoPrice)