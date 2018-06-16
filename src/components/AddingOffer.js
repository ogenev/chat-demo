import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ServiceDescription from './ServiceDescription';
import ItemDescription from './ItemDescription';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class AddingOffer extends React.Component {
  state = {
    value: 0,
  };



  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    let offerType
    if (this.state.value === 0) {
      offerType = <ItemDescription />
    }
    else {
      offerType = <ServiceDescription />
    }

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Услуга" />
            <Tab label="Предмет" />
          </Tabs>
        </Paper>
        <div>
          {offerType}
        </div>
      </div>
    );
  }
}

AddingOffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddingOffer);