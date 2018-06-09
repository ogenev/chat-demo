import React, { Component, Fragment } from 'react'
import '../styles/App.css'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <Main />
        <Footer />
      </Fragment>
    )
  }
}

export default App
