import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { database, storage} from '../../Firebase/index'
import ServiceName from './ServiceName'
import OfferPrice from './OfferPrice'
import PromoPrice from './PromoPrice'
import OfferDescription from './OfferDescription'
import ImageUploadButton from './ImageUploadButton'
import PublishOfferButton from './PublishOfferButton'
import pica from 'pica'
import shortid from 'shortid'

const styles = ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class AddService extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hideInputs: false,
      showBtn: true,
      UserId: sessionStorage.getItem('userId'),
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: 0,
      description: "",
      images: [],
      url: 'https://firebasestorage.googleapis.com/v0/b/chat-test-90ab1.appspot.com/o/noimage.png?alt=media&token=97bed2e7-3ac2-436b-a0c1-0224a14b3d60',
      offerId: shortid.generate()
    }

    this.resizeImages = this.resizeImages.bind(this)
  }

  createOffer = (event) => {
    event.preventDefault()
    this.setState({showBtn: false,
    hideInputs: true }, () => this.setDiscount())
  }

  handleChange = attributeName => event => {
    this.setState({
      [attributeName]: event.target.value,
    });
  }

  calcPrice = (price) => {
    if (price === "") {
      return ""
    }
    else {
      return parseFloat(parseFloat(price).toFixed(2)) * 100
    }
  }

  resetState = () => {
    this.setState({
      showBtn: true,
      hideInputs: false,
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: 0,
      description: "",
      images: [],
      url: 'https://firebasestorage.googleapis.com/v0/b/chat-test-90ab1.appspot.com/o/noimage.png?alt=media&token=97bed2e7-3ac2-436b-a0c1-0224a14b3d60',
      offerId: shortid.generate()
    })
  }

  fileChangedHandler = (event) => {
    this.setState({images: event.target.files})
  }

  setDiscount () {
    if (parseFloat(this.state.price) > parseFloat(this.state.promoPrice) && this.state.promoPrice !== "") {
      let currentDiscountPercent
      currentDiscountPercent = (this.state.price - this.state.promoPrice) / this.state.price * 100
      currentDiscountPercent = Math.round(parseFloat(currentDiscountPercent))
        this.setState({discountPercent: currentDiscountPercent, discount: true}, () => {this.resizeImages()})
    }
    else {
      this.setState({promoPrice: ""}, () => {this.resizeImages()})
    }
  }

  resizeImages () {

    if (this.state.images.length > 0){
      const { images } = this.state
     // const resizedImages = []
      const image = images[0]
      const handleUpload = this.handleUpload

      // Loading file reader and read the files from the state
        const reader = new FileReader()
        reader.onload = function (e) {

        // Creating offscreen image and copy the image from the state
          let offScreenImage = new Image()
          offScreenImage.src = e.target.result

          offScreenImage.onload = function () {

            // Getting uploaded image dimensions
            let originalWidth = offScreenImage.width
            let originalHeight = offScreenImage.height

            // Algorithm for the new size (500x500px) but keeping the aspect ratio
            let newWidth, newHeight = 0
            let width = 500
            let height = 500

            let ratioWidth = originalWidth / width
            let ratioHeight = originalHeight / height

            if (ratioWidth > ratioHeight){
              newHeight = Math.round(originalHeight / ratioWidth)
              newWidth = width
            } else {
              newWidth = Math.round(originalWidth / ratioHeight)
              newHeight = height

            }

            // Creating new canvas element with the new dimensions
            let resizedCanvas = document.createElement('canvas')

            resizedCanvas.height = newHeight
            resizedCanvas.width = newWidth

            // Resizing the image to the new canvas with Pica
            pica().resize(offScreenImage, resizedCanvas, {
                unsharpAmount: 80,
                unsharpRadius: 0.6,
                unsharpThreshold: 2
            })
              .then(result => {
                console.log('resize done')

            // Converting the resizedCanvas to Blob and send it to the upload method
                pica().toBlob(result, 'image/jpeg', 0.90).then(blob =>
                  //storage.ref(`resizeTest70`).put(blob)
                  handleUpload(blob)
                )
              })
              .catch(err => console.log(err))
          }
        }
        reader.readAsDataURL(image)

    } else {
      this.databaseUpload()
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
    }).then(this.resetState())
  }

  handleUpload = (blob) => {
    console.log(blob)

      this.setState({url: []}, () => {

        let imagePromise = (blob) => {
      let uploadTask = storage.ref(`images/12zaza`).put(blob)
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {

          },
          (err) => {
            reject(err);
          },
          () => {
            storage.ref('images').child('12zaza')
            uploadTask.snapshot.ref.getDownloadURL()
              .then(newUrl => {
                this.setState({url: [...this.state.url, newUrl]},
                  () => this.databaseUpload())
               // if (this.state.url.length === images.length) {//  this.databaseUpload()
               // }
              })
          }
        )
      })
    }
    /*
    for (let i = 0; i < images.length; i++) {
      imagePromise(images[i])
    }
      */
    imagePromise(blob)
      })
      //1. Upload images
      //2. Upload urls


  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.createOffer}>
          <ServiceName handleChange={this.handleChange} offerName={this.state.offerName} hideInputs={this.state.hideInputs}/>
          <OfferPrice handleChange={this.handleChange} price={this.state.price} hideInputs={this.state.hideInputs}/>
          <PromoPrice handleChange={this.handleChange} promoPrice={this.state.promoPrice} hideInputs={this.state.hideInputs}/>
          <OfferDescription handleChange={this.handleChange} description={this.state.description} hideInputs={this.state.hideInputs}/>
          <ImageUploadButton fileChangedHandler={this.fileChangedHandler} hideInputs={this.state.hideInputs}/>
          <PublishOfferButton offerName={this.state.offerName} price={this.state.price} showBtn={this.state.showBtn} />
        </form>
      </div>
    )
  }
}

AddService.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddService)