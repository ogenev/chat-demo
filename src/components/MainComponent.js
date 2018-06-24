import React, {Fragment} from 'react'
import Routes from '../Routes'
import AppBar from './AppBar'
import Footer from './Footer'

class MainComponent extends React.Component {
  render () {
    return (
      <Fragment>
        <AppBar />
        <Routes />
        <Footer />
      </Fragment>
    )
  }
}


export default MainComponent
