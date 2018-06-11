import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Link from 'react-router-dom/Link'

const styles = {
  root: {
    width: '100%',
    backgroundColor: '#e8eaf7',
  },
};

class Footer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{position: 'absolute',bottom: 0, right: 0}}
      >
        <BottomNavigationAction component={Link} to="/home" label="Начало" icon={<HomeIcon />} />
        <BottomNavigationAction label="Любими" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="До мен" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);

