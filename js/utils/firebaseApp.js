import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDzRBJApxvAolyIan4_FA8byfd6dbcUwVs",
  authDomain: "sportlinks-997d1.firebaseapp.com",
  databaseURL: "https://sportlinks-997d1.firebaseio.com",
  storageBucket: "sportlinks-997d1.appspot.com",
  messagingSenderId: "631365010339"
}

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
