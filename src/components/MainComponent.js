import React, {Fragment} from 'react'
import Routes from '../Routes'
import AppBar from './AppBar'

class MainComponent extends React.Component {
  render () {
    return (
      <Fragment>
        <AppBar />
        <Routes />
      </Fragment>
    )
  }
}


export default MainComponent
