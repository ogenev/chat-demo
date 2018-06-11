import firebase from 'firebase'
import firebaseui from 'firebaseui'

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    }
  ]
})