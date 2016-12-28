import React, {Component} from 'react'
import {connect} from 'react-redux'
import dateFormat from 'dateformat'
import myTheme from '../../themes/base-theme'
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native'
import {Container, Header, Title, Content, Button, Icon, Card, CardItem} from 'native-base'
import {navigateTo} from '../../reducers/navigation'

openUrl = (url) => {
  return () => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))
  }
}

class ShowDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>Streamings</Title>
          <Button transparent onPress={() => this.props.navigateTo('home', 'home')}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>

        <Content padder>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{flex: 4, paddingTop: 0, paddingLeft: 0}}>
              <Card>
                <CardItem >
                  <View style={{flex: 1, paddingTop: 10}} >
                    <Text style={styles.titleSection}>{this.props.show.description}</Text>
                    <Text style={styles.baseText}>{dateFormat(this.props.show.startDate + '+01:00', "dd/mm HH:MM")} - {this.props.show.category}</Text>
                  </View>
                </CardItem>
              {
                this.props.show.streamings.map(function(streaming, index) {
                  return (
                  <CardItem key={index} onPress={openUrl(streaming.urlAcestream)}>
                    <Icon name="ios-play" style={{ color: '#000000', paddingTop: 10}} />
                      <View style={{paddingTop: 5, paddingBottom: 10}}>
                        <Text style={styles.titleText}>
                          {streaming.name}
                        </Text>
                        <Text>
                          {streaming.type} -- {streaming.kbps} kbps
                        </Text>
                      </View>
                  </CardItem>
                  )
                })
              }
              </Card>
            </View>
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
    fontSize: 14,
    fontWeight: 'bold'
  },
  titleSection: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'black'
  }
})

function mapStateToProps(state) {
  let receivedAt = state.shows.receivedAt
  return {
    show: state.shows.seletetedShow,
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  }
}

export default connect(mapStateToProps, bindAction)(ShowDetail)
