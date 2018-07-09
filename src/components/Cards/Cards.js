import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/red'
import {database} from '../../Firebase/index'
import Image from './../../images/cross.png'
import Link from 'react-router-dom/Link'


const cardMedia = {
  display: 'block',
  width: '90%',
  height: '70%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 'auto',
};

const textArea = {
  display: 'block',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const card = {
  display: 'inline-block',
  float: 'right',
  width: '100%',
  maxHeight: '30em',
  maxWidth: '30em',
  marginLeft: 'auto',
  marginRight: 'auto',
  textDecoration: 'none'
}

const styles = theme => ({
  card: {
    display: 'grid',
    border:'1px solid #eee',
  },
  media: {
    height: 0,
    paddingTop: '50%',
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
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{paddingTop: '0.3em', overflow: 'scroll', height: '92vh'}} >
        {this.state.cards.map(offer => (
          <Link key={offer.offerId} to={{pathname: `/offer/${offer.offerId}/${offer.offerName}`, state: { offer: offer }} }>
          <Card style={card} className={classes.card} key={offer.offerId}>
            <Typography style={{color: 'EEE', width: '95%', marginLeft: 'auto', marginTop: 'auto'}} variant="body1" >Пешо</Typography>
            <CardMedia style={cardMedia}
                       className={classes.media}
                       image={offer.url[0]}
            />
            <div style={textArea}>
              {offer.price !== offer.promoPrice
                ? <div> <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="title">{offer.offerName}</Typography>
                  <Typography style={{color: 'green', textAlign: 'right', float: 'right', fontWeight: 'bold'}} variant="title">{offer.promoPrice/100} лв.</Typography>
                  <Typography style={{textAlign: 'right', float: 'right',
                    backgroundImage: `url(${Image})`}} variant="subheading">{offer.price/100} лв.</Typography>
                  <Typography style={{color: 'red', marginBottom: 'auto'}} variant="title">-{offer.discountPercent}%</Typography>
                  <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="subheading">{offer.description}</Typography>
                </div>
                : <div> <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="title">{offer.offerName}</Typography>
                  <Typography style={{color: 'green', textAlign: 'right', float: 'right', fontWeight: 'bold'}} variant="title">{offer.promoPrice/100} ??.</Typography>
                  <Typography style={{textAlign: 'right', float: 'right'}} variant="subheading"> </Typography>
                  <Typography style={{color: 'red', marginBottom: 'auto', display: 'none'}} variant="title">YES </Typography>
                  <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '1.5em'}} variant="subheading">{offer.description}</Typography>
                </div>
              }
            </div>
          </Card>
          </Link>
        ))}

      </div>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cards);