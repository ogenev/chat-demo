import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { database, storage} from '../../Firebase/index'
import ItemName from './ItemName'
import OfferPrice from './OfferPrice'
import PromoPrice from './PromoPrice'
import OfferDescription from './OfferDescription'
import ImageUploadButton from './ImageUploadButton'
import PublishOfferButton from './PublishOfferButton'
let shortid = require('shortid');

const styles = ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class AddItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBtn: true,
      UserId: sessionStorage.getItem('userId'),
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: 0,
      description: "",
      images: [],
      url: [],
      offerId: shortid.generate(),
    }
  }

  createOffer = (event) => {
    event.preventDefault()
    this.setState({showBtn: false})
    this.setState({offerId: shortid.generate()})
    this.setDiscount()
  }

  handleChange = attributeName => event => {
    this.setState({
      [attributeName]: event.target.value,
    });
  };

  calcPrice = (price) => {
    if (price === "") {
      return ""
    }
    else {
      return parseFloat(parseFloat(price).toFixed(2)) * 100
    }
  };

  resetState = () => {
    this.setState({
      showBtn: true,
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: 0,
      description: "",
      images: [],
      url: [],
      offerId: ""
    })
    this.setState({offerId: shortid.generate()})
  }

  fileChangedHandler = (event) => {
    this.setState({images: event.target.files})
  }

  setDiscount () {
    if (this.state.promoPrice.length > 0 && this.state.price > this.state.promoPrice) {
      this.setState({discount: true})
      let currentDiscountPercent
      currentDiscountPercent = (this.state.price - this.state.promoPrice) / this.state.price * 100
      currentDiscountPercent = Math.round(parseFloat(currentDiscountPercent))
      this.setState({discountPercent: currentDiscountPercent}, () => {this.handleUpload()})
    }
    else {
      this.setState({promoPrice: ""}, () => {this.handleUpload()})
    }
  }

  databaseUpload () {
    database.ref(`offers/services/${this.state.offerId}`).set({
      UserId: this.state.UserId,
      offerId: this.state.offerId,
      offerName: this.state.offerName,
      description: this.state.description,
      price: this.calcPrice(this.state.price),
      promoPrice: this.calcPrice(this.state.promoPrice),
      discount: this.state.discount,
      discountPercent: this.state.discountPercent,
      url: this.state.url
    });
  }

  handleUpload = () => {

    if (this.state.images.length > 0) {
      const {images} = this.state
      //1. Upload images
      //2. Upload urls
      let imagePromise = (offerImage) => {
        let uploadTask = storage.ref(`images/${offerImage.name}`).put(offerImage)
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {

            },
            (err) => {
              reject(err);
            },
            () => {
              storage.ref('images').child(offerImage.name)
              uploadTask.snapshot.ref.getDownloadURL()
                .then(newUrl => {
                  this.setState({url: [...this.state.url, newUrl]})
                  if (this.state.url.length === images.length) {
                    this.databaseUpload()
                    this.resetState()
                  }
                })
            }
          )
        })
      }
      for (let i = 0; i < images.length; i++) {
        imagePromise(images[i])
      }
    }
    if (this.state.images.length === 0) {
      this.setState({url: 'no images'}, () => {this.databaseUpload()})
      this.resetState()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.createOffer}>
          <ItemName handleChange={this.handleChange} offerName={this.state.offerName} />
          <OfferPrice handleChange={this.handleChange} price={this.state.price}/>
          <PromoPrice handleChange={this.handleChange} promoPrice={this.state.promoPrice}/>
          <OfferDescription handleChange={this.handleChange} description={this.state.description} />
          <ImageUploadButton fileChangedHandler={this.fileChangedHandler} />
          <PublishOfferButton offerName={this.state.offerName} price={this.state.price} showBtn={this.state.showBtn} />
        </form>
      </div>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddItem)