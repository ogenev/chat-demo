import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/red';
import {database} from '../../Firebase/index'


const cardMedia = {
  margin: '10px',
  //width: '200px',
  //height: '100px',

};

const card = {
  display: 'inline-block',

}

const styles = theme => ({
  card: {
    display: 'grid',
    border:'1px solid #eee',
  },

  media: {
    height: 0,
    paddingTop: '100%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  avatar: {
    backgroundColor: green[500],
    width: 70,
    height: 70,
  },
  cardHeader: {
    maxHeight: 50,
  }
});



class Cards extends React.Component {
  state = {
    expanded: false,
    cards: []
  };

  componentDidMount() {
    database.ref(`offers/services/`).once('value')
      .then(snapshot => {
        let cards = snapshot.val()
        let cardsArray = Object.values(cards)
        this.setState({cards: cardsArray})
        console.log(this.state.cards)
      })
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.cards.map(e => (
          <Card style={card} className={classes.card} >
            <Typography style={{color: 'EEE', marginLeft: '10px', marginTop: '5px'}} variant="body1">{e.UserId}</Typography>
            <CardMedia style={cardMedia}
                       className={classes.media}
                       image={e.url[0]}
            />
            <div>
              <Typography style={{color: 'EEE', marginLeft: '10px', marginRight: '10px', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="headline">{e.offerName}</Typography>
              <Typography style={{color: 'EEE', marginLeft: '10px', marginRight: '10px', marginBottom: '5px', textAlign: 'right', float: 'right'}} variant="headline">{e.price}</Typography>
              <Typography style={{color: 'red', marginLeft: '10px', marginBottom: '5px'}} variant="headline">{e.discountPercent}</Typography>
              <Typography style={{color: 'EEE', marginLeft: '10px', marginRight: '10px', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="caption">{e.description}</Typography>
            </div>
          </Card>
        ))}

      </div>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cards);