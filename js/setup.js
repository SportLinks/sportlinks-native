import React, {Component} from 'react'
import {Provider} from 'react-redux'
import App from './App'
import configureStore from './configureStore'
import SplashScreen from 'react-native-splash-screen'
import {fetchShowsAction} from './features/shows/reducers/shows'
import {Alert} from 'react-native'
import {configureGoogleSignIn} from './features/login/services/authService'
import {receiveLoginAction} from './features/login/reducers/user'
import {getUser} from './features/login/services/authService'
import {navigateTo} from './reducers/navigation'
import {enableDrawer, disableDrawer} from './reducers/drawer'

function setup():React.Component {

  class Root extends Component {

    constructor() {
      super()
      this.state = {
        loading: true,
      }
      this.initialize()
    }

    async initialize() {
      try {
        const store = await configureStore()
        const configGSI = await configureGoogleSignIn()
        const user = await getUser()

        if (!user) {
          store.dispatch(disableDrawer())
          navigateTo('login', 'home')
        } else {
          store.dispatch(enableDrawer())
          store.dispatch(receiveLoginAction(user))
        }

        if (store.getState().shows.list.length === 0) {
          store.dispatch(fetchShowsAction())
        }

        this.setState({loading: false, store: store})
        SplashScreen.hide()
      }
      catch(error) {
        console.log(error)
        Alert.alert('Warning', 'Error in the application: ' + error)
      }
    }

    render() {
      if (this.state.loading) {
        return null
      } else {
        return (
          <Provider store={this.state.store}>
            <App />
          </Provider>
        )
      }
    }
  }

  return Root
}

export default setup
