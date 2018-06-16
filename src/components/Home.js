import React from 'react'

class Home extends React.Component {

  goToAddOffer = event => {

    event.preventDefault()
    this.props.history.push(`/home/1`)
  }

  render() {
    return (
      <div>
        <button onClick={ this.goToAddOffer }>Add Offer</button>
      </div>
    )
  }
}

export default Home
