import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {database} from '../../Firebase/index'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment';
import 'moment/locale/bg';


class OfferView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      offer: null
    }
  }





  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({offer: this.props.location.state.offer})
    }
    else {
      database.ref(`offers/services/${this.props.match.params.id}`).once('value')
        .then(snapshot => {
          let offer = snapshot.val()
          this.setState({offer: offer})
        })
    }
  }

  render() {
    let currentOffer = this.state.offer
    if (this.state.offer === null) {
      return null
    }
    else {
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
            <Typography style={{color: 'EEE'}} variant="subheading"><Moment locale="bg" fromNow>{currentOffer.timeStamp}</Moment> от <span style={{color: 'blue'}}>Пешо</span></Typography>
            <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', float: 'left'}} variant="title">{currentOffer.promoPrice/100} лв.</Typography>
            <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="subheading">(намалено от {currentOffer.price/100} лв.)</Typography>
            <Typography style={{color: 'EEE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', position: 'left'}} variant="title">Oтсъпка: -{currentOffer.discountPercent}%</Typography>
            <Typography style={{color: 'EEE'}} variant="subheading">{currentOffer.description}</Typography>
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

export default OfferView