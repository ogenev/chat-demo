import React, { Component, Fragment } from 'react'
import '../styles/App.css'
import Header from './Header'
import Footer from './Footer'
import RegisterForm from './RegisterForm'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <RegisterForm />
        <Footer />
      </Fragment>
    )
  }
}

export default App
