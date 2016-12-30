
import React, {Component} from 'react'
import {BackAndroid, StatusBar, NavigationExperimental} from 'react-native'
import {connect} from 'react-redux'
import {Drawer} from 'native-base'
import {actions} from 'react-native-navigation-redux-helpers'
import {closeDrawer, openDrawer} from './reducers/drawer'
import SideBar from './features/sidebar'
import ShowsList from './features/shows/showsListPage'
import ShowDetail from './features/shows/showPage'
import HelpPage from './features/help'
import LoginPage from './features/login'
import statusBarColor from './themes/base-theme'

const {
  popRoute
} = actions

const {
  CardStack: NavigationCardStack,
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

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this._drawer.open()
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close()
    }
  }

  popRoute() {
    this.props.popRoute()
  }

  openDrawer() {
    setTimeout(() => this.props.openDrawer(), 50)
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      setTimeout(() => this.props.closeDrawer(), 50)
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
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref}}
        type="overlay"
        tweenDuration={200}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        acceptTap={true}
        onClose={() => this.closeDrawer()}
        onOpen={() => this.openDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          }
        }}
        negotiatePan
        disabled={this.props.drawerDisabled}
      >
        <StatusBar
          backgroundColor={statusBarColor.statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
          enableGestures={false}
        />
      </Drawer>
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
