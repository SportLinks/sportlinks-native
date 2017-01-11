import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import CodePush from 'react-native-code-push'
import AppNavigator from './navigation/AppNavigator'
import CodePushModal from './update/CodePushModal'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
})

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    }
  }

  _onLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    })
  }

  render() {
    return (
      <View style={styles.container} onLayout={this._onLayout.bind(this)}>
        <CodePushModal height={this.state.height} />
        <AppNavigator height={this.state.height} width={this.state.width} />
      </View>
    )
  }
}
