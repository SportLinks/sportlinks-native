import {GoogleSignin} from 'react-native-google-signin';

export const configureGoogleSignIn = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
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
