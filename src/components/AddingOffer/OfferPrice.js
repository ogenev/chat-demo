import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class OfferPrice extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <TextField
        name='price'
        required
        id='number'
        label='Редовна цена в лева'
        onChange={this.props.handleChange('price')}
        disabled={this.props.hideInputs}
        value={this.props.price}
        type='number'
        className={classes.textField}
        margin='normal'
      />
    )
  }
}

OfferPrice.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OfferPrice)
