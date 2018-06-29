import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'

const styles = () => ({
  btn: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 0
  },
  arrowBack: {
    color: 'white',
    fontSize: 42
  }
})

class BackChatBtn extends React.Component {
  constructor (props){
    super (props)
    this.onClickBack = this.onClickBack.bind(this)
  }
  onClickBack () {
    this.props.history.goBack()
  }
  render () {
    const { classes } = this.props

    return (
      <Button onClick={this.onClickBack} className={classes.btn} color={'primary'} size={'small'}>
        <ArrowBack className={classes.arrowBack} />
      </Button>
    )
  }
}

BackChatBtn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(BackChatBtn))
