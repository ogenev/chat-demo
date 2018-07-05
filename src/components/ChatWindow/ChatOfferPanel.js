import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'

const styles = () => ({
  container: {
    height: '4em',
    borderBottom: '1px solid #e6e6e6;',
    background: '#fafafa'
  },
  arrow: {
    fontSize: 36
  },
  price: {
    fontSize: '0.85rem'

  }
})

class ChatOfferPanel extends React.Component {
  onClick () {
    console.log('redirect to offer')
  }

  render () {
    const { classes } = this.props

    return (
      <Grid className={classes.container} container alignItems={'center'}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8} sm={11} >
          <Typography align={'center'} variant={'subheading'} >
        Монитор Samsung E345G
          </Typography>
          <Typography align={'center'} variant={'caption'} className={classes.price}>
            ЦЕНА: 400 ЛВ.
          </Typography>
        </Grid>
        <Grid item xs={2} sm={1} >
          <Button onClick={this.onClick} className={classes.btn} size={'small'}>
            <ArrowForward color={'disabled'} className={classes.arrow} />
          </Button>
        </Grid>
      </Grid>
    )
  }
}

ChatOfferPanel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatOfferPanel)
