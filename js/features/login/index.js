import React, {Component} from 'react'
import {connect} from 'react-redux'
import myTheme from '../../themes/base-theme'
import {Image, View, Dimensions} from 'react-native'
import {Container, Header, Title, Content, Button, Icon} from 'native-base'
import {navigateTo} from '../../reducers/navigation'
import {login} from './services/authService'
import {GoogleSigninButton} from 'react-native-google-signin'
import {receiveLoginAction} from './reducers/user'
import { enableDrawer } from '../../reducers/drawer'

const loginBackground = require('../../../img/login.png');
const {height, width} = Dimensions.get('window');

class LoginPage extends Component {

  render() {
    return (
      <Image source={loginBackground} style={{ flex: 1, height: null, width: null }} >
        <View style={{flex: 1, alignItems: 'center', paddingTop: height/2 - 40}}>
          <GoogleSigninButton
            style={{width: 312, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.props.signIn}
          />
        </View>
      </Image>
    )
  }
}

function signIn(dispatch) {
  login().then(
    (user) => {
      dispatch(receiveLoginAction(user))
      dispatch(enableDrawer())
      dispatch(navigateTo('help', 'home'))
    },
    (error) => {
      console.log(error)
    })
}

const mapStateToProps = state => ({
  user: state.user,
})

const bindAction = dispatch => ({
  signIn: () => signIn(dispatch),
  navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  enableDrawer: () => dispatch(enableDrawer()),
})

export default connect(mapStateToProps, bindAction)(LoginPage)
