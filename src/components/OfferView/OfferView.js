import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import {database} from '../../Firebase/index'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import 'moment/locale/bg';
import { Schedule, AttachMoney, Redeem, Announcement, Call, LocationCity, LocationOn, InsertLink } from '@material-ui/icons'
import ChatButton from './ChatButton'
import AppContext from '../AppContext'

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 20,
    float: 'left',
    marginTop: '1%',
    marginLeft: '0%',
    marginRight: '3%',
  },
  chatButtonPlace: {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    color: 'white',
    textAlign: 'center'
  },
  chatButton: {
   position: 'relative',
   backgroundColor: 'green',
   color: 'white',
   width: '100%',
   fontSize: '16px',
   padding: '12px',
   border: 'none',
   cursor: 'pointer',
   borderRadius: '5px',
   textAlign: 'center'

}})

class OfferView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      offer: null,
      sellerPhone: "Не е посочен",
      sellerCity: "Не е посочен",
      sellerAddress: "Не е посочен",
      sellerWebsite: "Не е посочен"
    }
  }

  addSellerInfo = () => {
    database.ref(`users/${this.state.offer.UserId}`).once('value')

      .then(snapshot => {
        let userDataFirebase = [
          snapshot.val().phone,
          snapshot.val().city,
          snapshot.val().address,
          snapshot.val().website
        ]
        let SellerData =[]
        SellerData = userDataFirebase.map((data, i) => {
          if (data && data !== "") {
            return SellerData[i] = data
          }
          else {
            return SellerData[i] = "Не е посочен"
          }
        })
        this.setState({sellerPhone: SellerData[0],
          sellerCity: SellerData[1],
          sellerAddress: SellerData[2],
          sellerWebsite: SellerData[3]})
      })
  }


  componentDidMount() {
    if (this.props.location.state) {
      this.setState({offer: this.props.location.state.offer}, () => {this.addSellerInfo()})

    }
    else {
      database.ref(`offers/services/${this.props.match.params.id}`).once('value')
        .then(snapshot => {
          let offer = snapshot.val()
          this.setState({offer: offer},
            //callback to set User related states only after offerstate is ready
            () => {this.addSellerInfo()})
        })
    }
  }

  render() {
    const { classes } = this.props;
    let currentOffer = this.state.offer
    if (!this.state.offer) {
      return null
    }
    else {
        return (
        <div>
        <div style={{paddingBottom: '3em', overflow: 'scroll', height: '92vh'}}>
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
            <Typography style={{color: 'EEE', marginLeft: '2em'}} variant="subheading">
              <Moment locale="bg" fromNow>{currentOffer.timeStamp}
              </Moment> от
              <span style={{color: 'blue'}}> {currentOffer.username}
              </span>
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <AttachMoney className={classes.icon}/>
            <Typography style={{color: 'EEE',
             }} variant="title">{currentOffer.promoPrice/100} лв.
              <span style={{color: 'EEE', fontSize: '80%'}}> (редовна цена {currentOffer.price/100} лв.)
              </span>
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
            <Redeem className={classes.icon}/>
            <Typography style={{color: 'EEE', }} variant="title">Oтсъпка: -{currentOffer.discountPercent}%
            </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <Announcement className={classes.icon}/>
            <Typography style={{color: 'EEE', marginLeft: '2em'}} variant="subheading">{currentOffer.description}
            </Typography>
             </div>
                <div style={{marginTop: '1em'}}>
                <LocationCity className={classes.icon}/>
                <Typography style={{color: 'EEE'}} variant="subheading">{this.state.sellerCity}
                </Typography>
              </div>
            <div style={{marginTop: '1em'}}>
              <LocationOn className={classes.icon}/>
              <Typography style={{color: 'EEE'}} variant="subheading">{this.state.sellerAddress}
              </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <Call className={classes.icon}/>
              <Typography style={{color: 'EEE'}} variant="subheading">{this.state.sellerPhone}
              </Typography>
            </div>
            <div style={{marginTop: '1em'}}>
              <InsertLink className={classes.icon}/>
              <Typography style={{color: 'EEE'}} variant="subheading">{this.state.sellerWebsite}
              </Typography>
            </div>
          </div>
          <div style={{width: '90%', margin: 'auto', border:'3px solid #eee', marginBottom: '1em'}}>
            <Typography style={{color: 'EEE', textAlign: 'center'}} variant="subheading">Виж профила и всички оферти от
              <span style={{color: 'blue'}}> {currentOffer.username}
              </span>
            </Typography>
          </div>
        </div>
          <AppContext.Consumer>
            {(context) => {
              // createdUid is hard coded for the user who created the offer
              return (
                <div className={classes.chatButtonPlace}>
                  <ChatButton className={classes.chatButton} authUser={context.authUser} createdUid={currentOffer.UserId} />
                </div>
              )
            }}
          </AppContext.Consumer>
        </div>
          )
    }
  }
}

OfferView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(OfferView)
