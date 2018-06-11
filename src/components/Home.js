import React from 'react'

const doSignOut = () =>
  console.log('sign out')

export default props =>
  <div>
    <button onClick={doSignOut}>Sign out</button>
  </div>
