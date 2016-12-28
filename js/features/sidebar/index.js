
import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Content, Text, List, ListItem, Icon, View, Thumbnail } from 'native-base'
import {navigateTo} from '../../reducers/navigation'
import sidebarTheme from './sidebar-theme'
import styles from './style'
import {userLogOutAction} from '../../features/login/reducers/user'
import {disableDrawer} from '../../reducers/drawer'

const drawerCover = require('../../../img/drawer-cover.png')
const version = require('../../../package.json').version
const {height, width} = Dimensions.get('window');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    }
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home')
  }

  logout() {

  }

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={drawerCover} style={styles.drawerCover} >
          <View style={{flex: 1, paddingLeft: 10, paddingTop: height/13}}>
            <Thumbnail size={65} source={{uri: this.props.user.avatar}} />
            <Text style={{paddingTop: 10, fontSize: 15, fontWeight: 'bold', color: 'white'}}>{this.props.user.name}</Text>
            <Text style={{paddingTop: -5, fontSize: 14, color: '#CACFD2'}}>{this.props.user.email}</Text>
          </View>
          <View style={{paddingTop: -30, paddingLeft: 240}}>
            <Text style={{color: 'white'}}>v{version}</Text>
          </View>
        </Image>
        <List>
          <ListItem button iconLeft onPress={() => this.navigateTo('home')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#fc2448',   paddingLeft: 8.5 }]}>
                <Icon name="logo-youtube" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Sporting Shows</Text>
            </View>
          </ListItem>
          {(this.props.user.id === undefined) ?
          <ListItem button iconLeft onPress={() => this.navigateTo('login')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#76D7C4',   paddingLeft: 10 }]}>
                <Icon name="ios-log-in" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Login</Text>
            </View>
          </ListItem>
          :
          <ListItem button iconLeft onPress={() => this.props.logout()} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#76D7C4',   paddingLeft: 12 }]}>
                <Icon name="ios-log-out" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Logout</Text>
            </View>
          </ListItem>
          }
          <ListItem button iconLeft onPress={() => this.navigateTo('help')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#62bcff',   paddingLeft: 13 }]}>
                <Icon name="md-help" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Help</Text>
            </View>
          </ListItem>
        </List>
      </Content>
    )
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    logout: () => {
      dispatch(disableDrawer())
      dispatch(userLogOutAction())
      dispatch(navigateTo('login', 'home'))
    },
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user,
})

export default connect(mapStateToProps, bindAction)(SideBar)
