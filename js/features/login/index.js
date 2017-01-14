import React, {Component} from 'react'
import {connect} from 'react-redux'
import myTheme from '../../themes/base-theme'
import {Image, View, Animated, Easing, StyleSheet} from 'react-native'
import {Container, Header, Title, Content, Button, Icon} from 'native-base'
import {navigateTo} from '../../reducers/navigation'
import {login} from './services/authService'
import {GoogleSigninButton} from 'react-native-google-signin'
import {receiveLoginAction} from './reducers/user'
import {enableDrawer} from '../../reducers/drawer'
import {colorForTopic} from '../../components/Colors'

const loginBackground = require('../../../img/login.png');

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0),
    }
    this.squareSize = 80
    this.squarePadding = 4
    this.squares = Math.round(this.props.height*this.props.width / Math.pow(this.squareSize+this.squarePadding, 2))
    this.arr = []
    for (var i = 0; i < this.squares; i++) {
      this.arr.push(i)
    }
    this.animatedValue = []
    this.arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(1)
    })
  }

  componentDidMount() {
    Animated.timing(this.state.anim,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.elastic(3)
      }
    ).start()
    this.animate()
  }

  animate() {
    const animations = this.arr.map((item) => {
      return Animated.timing(
        this.animatedValue[item],
        {
          toValue: 0,
          duration: 1500
        }
      )
    })
    Animated.stagger(10, animations).start()
  }

  render() {
    var paddingTop = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 150],
    })

    const animations = this.arr.map((a, i) => {
      return <Animated.View key={i} style={{zIndex: 1, opacity: this.animatedValue[a], height: this.squareSize, width: this.squareSize, backgroundColor: colorForTopic(this.squares, i), margin: this.squarePadding}} />
    })

    return (
      <Image source={loginBackground} style={styles.container} >
        {animations}
        <Animated.View style={[{zIndex: 10, position:'absolute', top: this.props.height/2 - 24 - 150, left: (this.props.width - 312)/2}, {paddingTop}]}>
          <GoogleSigninButton
            style={{width: 312, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.props.signIn}
          />
        </Animated.View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
    paddingTop: 13,
  },
})

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
