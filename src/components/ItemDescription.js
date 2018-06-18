import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { database } from '../Firebase'
import firebase from 'firebase'


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


class ItemDescription extends React.Component {
  state = {
    UserId: "",
    name: "",
    price: 0,
    promo: 0,
    description: "",
    image: null
  };


  createOffer = (event) => {
    event.preventDefault()
    database.ref('offers/items').set({
      UserId: this.state.UserId,
      name: this.state.name,
      price: this.state.price,
      promo: this.state.promo,
      description: this.state.description,
      image: this.state.image
    })
    console.log(this.state);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.setState({
      UserId: firebase.auth().currentUser.uid,
    });
  };

  handleChangeNum = name => event => {
    this.setState({
      [name]: parseFloat(parseFloat(event.target.value).toFixed(2)) * 100,
    });
  };


  fileChangedHandler = (event) => {
    this.setState({image: event.target.files[0]})
  }



  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.createOffer}>
          <TextField
            name="name"
            required
            id="name"
            label= "Предмет"
            onChange={this.handleChange('name')}
            defaultValue=""
            className={classes.textField}
            margin="normal"
          />
          <TextField
            name="price"
            required
            id="number"
            label="Редовна цена в лева"
            onChange={this.handleChangeNum('price')}
            type="number"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            name="promo"
            id="number"
            label="Промоционална цена"
            onChange={this.handleChangeNum('promo')}
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
              Качи снимка
            </Button>
            <Button variant="contained" href="#contained-buttons" className={classes.button}>
              Добави линк
            </Button>
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
              Публикувай офертата
            </Button>
          </label>
        </form>
      </div>
    );
  }
}

ItemDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDescription);