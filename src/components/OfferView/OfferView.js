import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {database} from '../../Firebase/index'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment';
import 'moment/locale/bg';
import { Schedule, AttachMoney, Redeem, Announcement } from '@material-ui/icons'


const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 20,
    float: 'left',
    marginTop: '1%',
    marginLeft: '0%',
    marginRight: '3%',
  },
});

class OfferView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      offer: null,
      sellerPhone: ""
    }
  }


  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({offer: this.props.location.state.offer})
      database.ref(`users/${this.props.location.state.offer.UserId}/phone`).once('value')
        .then(snapshot => {
          let sellerPhone = snapshot.val()
          this.setState({sellerPhone: sellerPhone})
        })
    }
    else {
      database.ref(`offers/services/${this.props.match.params.id}`).once('value')
        .then(snapshot => {
          let offer = snapshot.val()
          this.setState({offer: offer},
            //callback to set User related states only after offerstate is ready
            () => {
            database.ref(`users/${this.state.offer.UserId}/phone`).once('value')
              .then(snapshot => {
                let sellerPhone = snapshot.val()
                this.setState({sellerPhone: sellerPhone})
              })
          })
        })
    }
  }

  render() {
    const { classes } = this.props;
    let currentOffer = this.state.offer
    if (this.state.offer === null) {
      return null
    }
    else {
      console.log(this.state.offer)
      return (
        <div>
          <div style={{
            maxWidth: '24em', marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={80}
              totalSlides={this.state.offer.url.length}
            >
              <div>
              <Slider className='container'>
                {currentOffer.url.map((e, i)=> (
                  <Slide index={i} key={i}>
                  <img
                    src={e} alt={'оферта'}/>
                </Slide>))}
              </Slider>
              <ButtonBack style={{position: 'relative', marginTop: '-40%' , float: 'left'}}>Back</ButtonBack>
              <ButtonNext style={{position: 'relative', marginTop: '-40%' , float: 'right'}}>Next</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          <div style={{padding: '1em'}}>
            <Typography style={{color: 'EEE'}} variant="title">{currentOffer.offerName}</Typography>
            <div style={{marginTop: '1em'}}>
            <Schedule className={classes.icon}/>
            <Typography style={{color: 'EEE'}} variant="subheading">
              <Moment locale="bg" fromNow>{currentOffer.timeStamp}
              </Moment> от
              <span style={{color: 'blue'}}> Пешо
              </span>
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <AttachMoney className={classes.icon}/>
            <Typography style={{color: 'EEE',
             }} variant="title">{currentOffer.promoPrice/100} лв.
              <span style={{color: 'EEE', fontSize: '80%'
                }}> (редовна цена {currentOffer.price/100} лв.)
              </span>
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
            <Redeem className={classes.icon}/>
            <Typography style={{color: 'EEE',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              position: 'left'}} variant="title">Oтсъпка: -{currentOffer.discountPercent}%
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <Announcement className={classes.icon}/>
            <Typography style={{color: 'EEE'}} variant="subheading">{currentOffer.description}
            </Typography>
            <div>
              <Typography style={{color: 'EEE'}} variant="subheading">{this.state.sellerPhone}
              </Typography>
            </div>
            </div>
          </div>
          <button style={{position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'green',
            color: 'white',
            fontSize: '16px',
            padding: '12px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            textAlign: 'center'}} >
            Чат с търговеца
          </button>
        </div>
      );
    }
  }
}

OfferView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OfferView);