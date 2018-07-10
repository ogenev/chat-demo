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

class ServiceName extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <TextField
        name='name'
        required
        id='name'
        label='Услуга'
        onChange={this.props.handleChange('offerName')}
        placeholder='наименование'
        value={this.props.offerName}
        className={classes.textField}
        margin='normal'
        disabled={this.props.hideInputs}
        multiline
      />
    )
  }
}

ServiceName.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ServiceName)
