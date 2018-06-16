import React from 'react'

class Home extends React.Component {

  goToAddOffer = event => {

    event.preventDefault()
    this.props.history.push(`/home/1`)
  }

  render() {
    return (
      <div>
        <button
          type='button'
          onClick={() => (firebase.auth().signOut().then(function () {
            console.log('sign in success')
          }).catch(function (error) {
            console.log(error)
          }))}
        >
          Sign Out
        </button>
        <button onClick={ this.goToAddOffer }>Add Offer</button>
      </div>
    )
  }
}

export default Home
