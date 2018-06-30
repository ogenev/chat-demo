import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = () => ({
  container: {
    height: '4em',
    borderBottom: '1px solid #e6e6e6;',
    background: '#fafafa'
  }
})

class ChatOfferPanel extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <Grid className={classes.container} container>
        <Grid item xs>
        Offer description
        </Grid>
        <Grid item xs>
          Btn
        </Grid>
      </Grid>
    )
  }
}

ChatOfferPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatOfferPanel)
