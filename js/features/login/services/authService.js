import {GoogleSignin} from 'react-native-google-signin'
import * as firebase from 'firebase'
import firebaseApp from '../../../utils/firebaseApp'

export const configureGoogleSignIn = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        webClientId: '631365010339-rtlubtpc2a2jdcmo4s19hk0c736ecj4t.apps.googleusercontent.com'
      })
      .then(() => {
        resolve()
      });
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
      reject()
    })
  })
}

export const getUser = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.currentUserAsync()
    .then((user) => {
      resolve(user)
    })
    .catch((err) => {
      console.log("Error get user", err.code, err.message)
      reject()
    })
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.signIn()
    .then((user) => {
      firebaseApp.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, user.accessToken))
      resolve(user)
    })
    .catch((err) => {
      console.log('Wrong Singin', err);
      reject()
    })
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.signOut()
    .then(() => {
      resolve()
    })
    .catch((err) => {
      console.log('Wrong Logout', err);
      reject()
    });
  })
}
