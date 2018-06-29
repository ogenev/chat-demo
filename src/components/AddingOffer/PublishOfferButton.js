import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class PublishOfferButton extends React.Component {

  render() {
    const { classes } = this.props

    const isInvalid =
      this.props.offerName.length < 3 || this.props.price === 0 || this.props.showBtn === false

    return (
      <div>
        <label htmlFor="contained-button-file">
          <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={isInvalid}>
            Публикувай офертата
          </Button>
        </label>
      </div>
    )
  }
}

PublishOfferButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublishOfferButton)