import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {database} from '../../Firebase'


class OfferView extends React.Component {
  state = {
    offer: null
  }


  componentDidMount() {
    database.ref(`offers/services/${this.props.match.params.id}`).once('value')
      .then(snapshot => {
        let offer = snapshot.val()
        this.setState({offer: offer})
        console.log(this.props.match.params.id)
      })
  }

  render() {
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
              style={{padding: '1em'}}
              naturalSlideWidth={100}
              naturalSlideHeight={80}
              totalSlides={this.state.offer.url.length}
            >
              <Slider className='container'>
                {this.state.offer.url.map((e, i)=> (
                  <Slide index={i} key={i}>
                  <img
                    src={e} alt={'оферта'}/>
                </Slide>))}
              </Slider>
              <ButtonBack style={{float: 'left'}}>Back</ButtonBack>
              <ButtonNext style={{float: 'right'}}>Next</ButtonNext>
            </CarouselProvider>
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
            textAlign: 'center'}}>
            Чат с търговеца
          </button>
        </div>
      );
    }
  }
}

export default OfferView