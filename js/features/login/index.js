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

const splashscreen = require('../../../img/splashscreen.png');
const {height, width} = Dimensions.get('window');

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
    }
  }

  componentWillMount() {
    setTimeout(() => {
      if (this.props.user && this.props.user.id) {
        this.props.enableDrawer()
        this.props.navigateTo('home')
      } else {
        this.setState({
          login: true,
        })
        this.props.navigateTo('login')
      }
    }, 1000);
  }

  handleSingIn() {
    this.setState({
      login: false,
    })
    this.props.singIn()
  }

  render() {
    return (
      <Image source={splashscreen} style={{ flex: 1, height: null, width: null }} >
        {(this.state.login) ?
        <View style={{flex: 1, alignItems: 'center', paddingTop: height/2 - 40}}>
          <GoogleSigninButton
            style={{width: 312, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this.handleSingIn()}
          />
        </View> : <View/>}
      </Image>
    )
  }
}

function singIn(dispatch) {
  login().then(
    (user) => {
      dispatch(receiveLoginAction(user))
      dispatch(enableDrawer())
      dispatch(navigateTo('home'))
    },
    (error) => {
      console.log(error)
    })
}

const mapStateToProps = state => ({
  user: state.user,
})

const bindAction = dispatch => ({
  singIn: () => singIn(dispatch),
  navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  enableDrawer: () => dispatch(enableDrawer()),
})

export default connect(mapStateToProps, bindAction)(LoginPage)
