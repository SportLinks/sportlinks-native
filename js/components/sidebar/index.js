
import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, Text, List, ListItem, Icon, View } from 'native-base'

import {navigateTo} from '../../reducers/navigation'
import sidebarTheme from './sidebar-theme'
import styles from './style'

const drawerCover = require('../../../img/drawer-cover.png')

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

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={drawerCover} style={styles.drawerCover} />
        <List>
          <ListItem button iconLeft onPress={() => this.navigateTo('home')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#fc2448',   paddingLeft: 8.5 }]}>
                <Icon name="logo-youtube" style={styles.sidebarIcon} />
              </View>
              <Text style={styles.text}>Sporting Shows</Text>
            </View>
          </ListItem>
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
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
})

export default connect(mapStateToProps, bindAction)(SideBar)
