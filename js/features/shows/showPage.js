import React, {Component} from 'react'
import {connect} from 'react-redux'
import dateFormat from 'dateformat'
import myTheme from '../../themes/base-theme'
import {View, Text, StyleSheet, Linking, TouchableOpacity, Alert} from 'react-native'
import {Container, Header, Title, Content, Button, Icon, Card, CardItem} from 'native-base'
import {navigateTo} from '../../reducers/navigation'
import IconMD from 'react-native-vector-icons/MaterialIcons'

class ShowDetail extends Component {
  constructor(props) {
    super(props)
  }

  openUrl(url) {
    return () => {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          Alert.alert(
            'Info',
            'To test the links you need install the apps that are shown in the help page.',
            [
              {text: 'OK', onPress: () => this.props.navigateTo("help", "home")},
            ],
          )
        } else {
          return Linking.openURL(url)
        }
      }).catch(err => console.error('An error occurred', err))
    }
  }

  renderIcon = (sport) => {
    switch (sport.toUpperCase()) {
      case 'SOCCER':
        return <Icon name="ios-football" style={styles.bigSportIcon} />
      case 'BASKETBALL':
        return <Icon name="ios-basketball" style={styles.bigSportIcon} />
      case 'TENNIS':
        return <Icon name="ios-tennisball" style={styles.bigSportIcon} />
      case 'FOOTBALL':
        return <Icon name="ios-american-football" style={styles.bigSportIcon} />
      case 'MMA':
        return <Icon name="ios-body" style={styles.bigSportIcon} />
      default:
        return <Icon name="ios-videocam" style={styles.bigSportIcon} />
    }
  }

  render() {
    return (
      <Container theme={myTheme}>

        <Header style={{paddingTop: 25}}>
          <Title>Streamings</Title>
          <Button transparent onPress={() => this.props.navigateTo('home', 'home')}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Header>

        <Content padder style={{backgroundColor:'white'}}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{flex: 4, paddingTop: 0, paddingLeft: 0}}>
              <Card>
                <CardItem >
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}} >
                    {this.renderIcon(this.props.show.sport)}
                    <View style={{flex: 1, paddingLeft: 15}} >
                      <Text style={styles.titleText}>{this.props.show.event}</Text>
                      <Text style={styles.baseText}>{this.props.show.sport} - {this.props.show.competition}</Text>
                      <Text style={styles.baseText}>{this.props.show.date} {this.props.show.hour}</Text>
                    </View>
                  </View>
                </CardItem>
              {
                this.props.show.channels.map((channel, index) => {
                  return (
                  <CardItem key={index} onPress={this.openUrl(channel.url)}>
                    <View style={{paddingTop: 10, flexDirection: 'row'}}>
                      <IconMD name="local-play" size={30} color="black" style={{paddingTop: -5}}/>
                      <View style={{paddingLeft: 10}}>
                        <Text style={styles.titleText}>
                          LINK {index + 1} ({channel.language})
                        </Text>
                      </View>
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
  baseText: {
    fontSize: 13
  },
  titleSection: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'black',
  },
  bigSportIcon: {
    color: '#000000',
    paddingTop: -2,
    paddingLeft: 0,
    fontSize: 60,
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
