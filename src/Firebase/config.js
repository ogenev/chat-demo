import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBUP3qmUuG1G32cGago9duVsb4RxQJWnVA',
  authDomain: 'chat-test-90ab1.firebaseapp.com',
  databaseURL: 'https://chat-test-90ab1.firebaseio.com',
  projectId: 'chat-test-90ab1',
  storageBucket: 'chat-test-90ab1.appspot.com',
  messagingSenderId: '672625038342'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
  config
};
