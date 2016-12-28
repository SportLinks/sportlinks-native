import React, {Component} from 'react'
import {connect} from 'react-redux'
import myTheme from '../../themes/base-theme'
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Content, H3, Button, Icon, Card, CardItem } from 'native-base'
import {navigateTo} from '../../reducers/navigation'

class HelpPage extends Component {
  constructor(props) {
    super(props)
  }

  renderButton(text, url) {
    return (
      <View style={{paddingBottom: 10, paddingTop: 5}}>
        <Button block info
          onPress={() => Linking.openURL(url)}>
          {text}
        </Button>
      </View>
    )
  }

  render() {
    return (
      <Container>

        <Header>
          <Title>Help</Title>
          <Button transparent onPress={() => this.props.navigateTo('home', 'home')}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>

        <Content padder>
          <View>
            <Text style={styles.titleText}>
              This application is not for profit and is part of a proof of concept of a Progressive Web App.
              The texts and links of sporting events shown in the application are collected from public webs.
            </Text>
            <Text style={styles.titleText}>
              Following are useful toolkits for displaying, as a test, the links of the application:
            </Text>
            {this.renderButton('Acestream (Google Play)', 'https://play.google.com/store/apps/details?id=org.acestream.media&hl=es')}
            {this.renderButton('Reproductor MX (Google Play)', 'https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad&hl=es')}
            {this.renderButton('SopCast (Web Site)', 'http://download.sopcast.com/download/SopCast.apk')}
          </View>
        </Content>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15
  },
  titleText: {
    fontSize: 15,
    paddingBottom: 10
  },
  titleSection: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'black'
  }
})

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  }
}

export default connect(null, bindAction)(HelpPage)
