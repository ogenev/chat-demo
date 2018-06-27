import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class AddOfferButton extends React.Component {

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Button variant="contained" color="secondary" component={Link} to="/addoffer"
                className={classes.button}>
          Добави Оферта
        </Button>
      </div>

    )
  }
}

AddOfferButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOfferButton)