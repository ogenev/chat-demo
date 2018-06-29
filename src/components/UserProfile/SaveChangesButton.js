import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: 18,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: 20,
  }
});


class SaveChangesButton extends React.Component {

  render () {
    const {classes} = this.props

    return (
      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Запази промените
      </Button>
    )
  }
}

SaveChangesButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaveChangesButton)