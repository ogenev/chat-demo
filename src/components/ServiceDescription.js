import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { database } from '../Firebase'
import { storage } from '../Firebase/config'
import firebase from 'firebase'
import ImageRes from './ImageRes'


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
  state = {
    showBtn: 1,
    UserId: "",
    name: "",
    price: "",
    promo: "",
    description: "",
    images: [],
    url: []
  };

  createOffer = (event) => {
    this.setState({showBtn: 0})
    event.preventDefault()
    this.setState({
      UserId: firebase.auth().currentUser.uid,
    });
    this.handleUpload()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  calcPrice = (price) => {
    return parseFloat(parseFloat(price).toFixed(2)) * 100
  };

  resetState = () => {
    this.setState({
      name: "",
      price: "",
      promo: "",
      description: "",
      images: [],
      url: [],
      showBtn: 1
    })
  }

  fileChangedHandler = (event) => {
    this.setState({images: event.target.files})
  }

  handleUpload = () => {
    if (this.state.images.length > 0) {
      const {images} = this.state
      //1. Upload images
      //2. Upload urls
      //const uploadTask = storage.ref(`images/${image.name}`).put(image)
      let imagePromise = (image) => {
        let uploadTask = storage.ref(`images/${image.name}`).put(image)
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {

            },
            (err) => {
              reject(err);
            },
            () => {
              storage.ref('images').child(image.name)
              uploadTask.snapshot.ref.getDownloadURL()
                .then(newUrl => {
                  this.setState({url: [...this.state.url, newUrl]})
                  if (this.state.url.length === images.length) {
                    console.log('executing one')
                    database.ref(`offers/services/${this.state.name}-${this.state.UserId}`).set({
                      UserId: this.state.UserId,
                      name: this.state.name,
                      price: this.calcPrice(this.state.price),
                      promo: this.calcPrice(this.state.promo),
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
      console.log('executing')
      database.ref(`offers/services/${this.state.name}-${this.state.UserId}`).set({
        UserId: this.state.UserId,
        name: this.state.name,
        price: parseFloat(parseFloat(this.state.price).toFixed(2)) * 100,
        promo: parseFloat(parseFloat(this.state.promo).toFixed(2)) * 100,
        description: this.state.description,
        url: 'no images'
      });
      this.resetState()
    }
  }

  render() {
    const { classes } = this.props;

    const isInvalid =
      this.state.name.length < 3 || this.state.price === 0 || this.state.showBtn === 0

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.createOffer}>
          <TextField
            name="name"
            required
            id="name"
            label= "Услуга"
            onChange={this.handleChange('name')}
            placeholder= "наименование"
            value={this.state.name}
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
            onChange={this.handleChange('promo')}
            value={this.state.promo}
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
            <ImageRes />
          </label>
        </form>
      </div>
    );
  }
}

ServiceDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceDescription);