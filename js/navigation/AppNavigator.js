
import React, {Component} from 'react'
import {BackAndroid, StatusBar, NavigationExperimental, DrawerLayoutAndroid} from 'react-native'
import {connect} from 'react-redux'
import {actions} from 'react-native-navigation-redux-helpers'
import {closeDrawer, openDrawer} from '../reducers/drawer'
import SideBar from '../features/sidebar'
import ShowsList from '../features/shows/showsListPage'
import ShowDetail from '../features/shows/showPage'
import HelpPage from '../features/help'
import LoginPage from '../features/login'
import statusBarColor from '../themes/base-theme'
import AndroidDefaultTransitioner from './transitions/AndroidDefaultTransitioner'
import CrossFadeTransitioner from './transitions/CrossFadeTransitioner'

const {
  popRoute
} = actions

const {
  CardStack,
} = NavigationExperimental

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
        transition: 'androidDefault',
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes

      if (this.props.drawerState === 'opened') {
        this.closeDrawer()
        return true
      }

      if ((routes[routes.length - 1].key === 'home') ||
          (routes[routes.length - 1].key === 'login')) {
        return false
      }

      this.props.popRoute(this.props.navigation.key)
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener("hardwareBackPress");
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this._drawer.openDrawer()
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.closeDrawer()
    }
  }

  popRoute() {
    this.props.popRoute()
  }

  openDrawer() {
    this.props.openDrawer()
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer()
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'login':
        return <LoginPage />
      case 'home':
        return <ShowsList />
      case 'showDetail':
        return <ShowDetail />
      case 'help':
        return <HelpPage />
      default :
        return <ShowsList />
    }
  }

  render() {
    const transitionMap = {
      cardStack: CardStack,
      androidDefault: AndroidDefaultTransitioner,
      crossFade: CrossFadeTransitioner,
    }
    const Transitioner = transitionMap[this.state.transition]

    return (
        <DrawerLayoutAndroid
          ref={(drawer) => { this._drawer = drawer; }}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => <SideBar/>}
          onDrawerClose={() => this.closeDrawer()}
          onDrawerOpen={() => this.openDrawer()}
          drawerLockMode={(this.props.drawerDisabled) ? 'locked-closed' : 'unlocked'}>
          <StatusBar
            translucent={true}
            backgroundColor="rgba(0, 0, 0, 0.15)"
            barStyle="light-content"
           />
          <Transitioner
            direction="horizontal"
            renderScene={this._renderScene}
            navigationState={this.props.navigation}
            enableGestures={false}
          />
        </DrawerLayoutAndroid>
    )
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  openDrawer: () => dispatch(openDrawer()),
  popRoute: key => dispatch(popRoute(key)),
})

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  drawerDisabled: state.drawer.drawerDisabled,
  navigation: state.cardNavigation,
})

export default connect(mapStateToProps, bindAction)(AppNavigator)
