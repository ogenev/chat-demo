import React from 'react'
import ChatButton from './ChatButton'
import AppContext from '../AppContext'

export default props =>
  <div>
    <h3>
      Тест оферта
    </h3>
    <div>
      <AppContext.Consumer>
        {(context) => {
          // createdUid is hard coded for the user who created the offer
          return <ChatButton authUser={context.authUser} createdUid={'5oeCQdKgrCXOohwRnB4fPgwnFE23'} />
        }}
      </AppContext.Consumer>
    </div>
  </div>