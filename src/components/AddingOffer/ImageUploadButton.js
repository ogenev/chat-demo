import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

class ImageUploadButton extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <div>
        <input
          name="image"
          accept="image/*"
          onChange={this.props.fileChangedHandler}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" className={classes.button}>
            Прикачи снимка
          </Button>
        </label>
      </div>
    )
  }
}

ImageUploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageUploadButton)