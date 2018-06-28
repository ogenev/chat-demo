import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { database, storage} from '../Firebase'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

class ServiceDescription extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBtn: true,
      UserId: sessionStorage.getItem('userId'),
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: null,//
      description: "",
      images: [],
      url: []
    }

  }

// componentDidMount () {
//   this.userId = sessionStorage.getItem('userId')
//   this.setState({
//     UserId: this.userId,
//   })
// }

  createOffer = (event) => {
    this.setState({showBtn: false})
    event.preventDefault()
    this.handleUpload()
  }

  handleChange = attributeName => event => {
    this.setState({
      [attributeName]: event.target.value,
    });
  };

  calcPrice = (price) => {
    return parseFloat(parseFloat(price).toFixed(2)) * 100
  };

  resetState = () => {
    this.setState({
      showBtn: true,
      UserId: "",
      offerName: "",
      price: "",
      promoPrice: "",
      discount: false,
      discountPercent: null,
      description: "",
      images: [],
      url: []
    })
  }

  fileChangedHandler = (event) => {
    this.setState({images: event.target.files})
  }

  handleUpload = () => {
    if(this.state.promoPrice.length > 0) {
      this.setState({discount: true})
        let currentDiscountPercent
      currentDiscountPercent = (this.state.price - this.state.promoPrice) / this.state.price * 100
      currentDiscountPercent = Math.round(parseFloat(currentDiscountPercent))
      this.setState({discountPercent: currentDiscountPercent})
    }
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
                    database.ref(`offers/services/${this.state.offerName}-${this.state.UserId}`).set({
                      UserId: this.state.UserId,
                      offerName: this.state.offerName,
                      price: this.calcPrice(this.state.price),
                      promoPrice: this.calcPrice(this.state.promoPrice),
                      discount: this.state.discount,
                      discountPercent: this.state.discountPercent,
                      description: this.state.description,
                      url: this.state.url
                    });
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
      database.ref(`offers/services/${this.state.offerName}-${this.state.UserId}`).set({
        UserId: this.state.UserId,
        offerName: this.state.offerName,
        price: parseFloat(parseFloat(this.state.price).toFixed(2)) * 100,
        promoPrice: parseFloat(parseFloat(this.state.promoPrice).toFixed(2)) * 100,
        discount: this.state.discount,
        discountPercent: this.state.discountPercent,
        description: this.state.description,
        url: 'no images'
      });
      this.resetState()
    }
  }

  render() {
    const { classes } = this.props

    const isInvalid =
      this.state.offerName.length < 3 || this.state.price === 0 || this.state.showBtn === false

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.createOffer}>
          <TextField
            name="name"
            required
            id="name"
            label= "Услуга"
            onChange={this.handleChange('offerName')}
            placeholder= "наименование"
            value={this.state.offerName}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            name="price"
            required
            id="number"
            label="Редовна цена в лева"
            onChange={this.handleChange('price')}
            value={this.state.price}
            type="number"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            name="promo"
            id="number"
            label="Промоционална цена"
            onChange={this.handleChange('promoPrice')}
            value={this.state.promoPrice}
            type="number"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            name="description"
            required
            id="description"
            label="Описание"
            onChange={this.handleChange('description')}
            placeholder= "опишете подробно"
            multiline
            className={classes.textField}
            margin="normal"
            value={this.state.description}
          />
          <input
            name="image"
            accept="image/*"
            onChange={this.fileChangedHandler}
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Прикачи снимка
            </Button>
            <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={isInvalid}>
              Публикувай офертата
            </Button>
          </label>
        </form>
      </div>
    );
  }
}

ServiceDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceDescription)