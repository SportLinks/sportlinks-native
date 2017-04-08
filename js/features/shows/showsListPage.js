import React, {Component} from 'react'
import {connect} from 'react-redux'
import {showSelectedAction, fetchShowsAction} from './reducers/shows'
import dateFormat from 'dateformat'
import {View, Text, ListView, TouchableOpacity, StyleSheet, RefreshControl, DrawerLayoutAndroid} from 'react-native'
import {navigateTo} from '../../reducers/navigation'
import {Container, Header, Title, Content, Button, Icon} from 'native-base'
import myTheme from '../../themes/base-theme'
import {openDrawer} from '../../reducers/drawer'
import IconMD from 'react-native-vector-icons/MaterialIcons'
import FilterScreeen from './components/FilterScreen'
import FilterHeader from './components/FilterHeader'

class ShowsList extends Component {
  constructor(props) {
    super(props)
  }

  _onRefresh() {
    this.props.refreshShowList()
  }

  renderIcon = (sport) => {
    switch (sport.toUpperCase()) {
      case 'SOCCER':
        return <Icon name="ios-football" style={[styles.litleSportIcon, {color: 'black'}]} />
      case 'BASKETBALL':
        return <Icon name="ios-basketball" style={[styles.litleSportIcon, {color: '#a85803'}]} />
      case 'TENNIS':
        return <Icon name="ios-tennisball" style={[styles.litleSportIcon, {color: '#f2ff66'}]} />
      case 'FOOTBALL':
        return <Icon name="ios-american-football" style={[styles.litleSportIcon, {color: '#683700'}]}  />
      case 'MMA':
        return <Icon name="ios-body" style={styles.litleSportIcon} />
      default:
        return <Icon name="ios-videocam" style={styles.litleSportIcon} />
    }
  }

  dateToISO(date) {
    let year = date.substring(6, date.length)
    let month = date.substring(3, 5)
    if (month > 12) month = '02'
    let day = date.substring(0,2)
    return year + '-' + month + '-' + day
  }

  renderRow = (rowData, sectionId, rowId, highlightRow) => {
    let dateSeparator = ''
    if (rowId === '0' || (this.props.shows[rowId-1].date !== this.props.shows[rowId].date)) {
      dateSeparator = dateFormat(this.dateToISO(this.props.shows[rowId].date), 'dddd, mmmm d')
    }
    return (
      <View key={rowId}>
        {(dateSeparator !== '') ?
        <View style={{height: 35, backgroundColor: '#d1e0fc', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>{dateSeparator}</Text>
        </View>: null}
        <TouchableOpacity
          onPress={this.props.handleShowSelected(rowData)}>
          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 10}} >
            {this.renderIcon(rowData.sport)}
            <View style={{flex: 1, paddingLeft: 10, paddingBottom: 10}} >
              <Text style={styles.titleText}>{rowData.event}</Text>
              <Text style={styles.baseText}>{rowData.sport} - {rowData.competition}</Text>
              <Text style={styles.baseText}>{rowData.date} {rowData.hour}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderSeparator(sectionId, rowId) {
    return (
      <View key={sectionId + 'r' + rowId} style={styles.separator} />
    )
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    const filterHeader = Object.keys(this.props.filter).length > 0
    ? <FilterHeader />
    : null;

    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this._drawer = drawer; }}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <FilterScreeen onClose={() => this._drawer.closeDrawer()} />} >

        <Container theme={myTheme}>

          <Header style={{paddingTop: 25}}>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
            <Title>Sporting Shows</Title>
            <Button transparent onPress={() => {this._drawer.openDrawer()}}>
              <IconMD name='filter-list' size={25} color="white" />
            </Button>
          </Header>

          <View style={{flex: 1, backgroundColor: 'white'}}>
            {filterHeader}
            <ListView style={{marginLeft: 0, marginRight: 0}}
              dataSource={ds.cloneWithRows(this.props.shows)}
              keyboardShouldPersistTaps={true}
              renderRow={this.renderRow}
              enableEmptySections={true}
              renderSeparator={this.renderSeparator}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.loading}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={['blue', 'green', 'red']}
                />
              }
            />
          </View>

        </Container>

      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#404142',
  },
  baseText: {
    fontSize: 13,
    color: '#4a4b4c'
  },
  litleSportIcon: {
    color: '#000000',
    paddingTop: 11,
    fontSize: 34,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
})

function upperCase(str) {
  return str.toUpperCase();
}

function toCamelCase(str) {
  if (str === 'mma') return 'MMA'
  str = str.replace('-', ' - ')
  var firstLetterRx = /(^|\s)[a-z]/g;
  return str.replace(firstLetterRx, upperCase);
}

function sportsFilter(list, filter) {
  if (Object.keys(filter).length == 0) {
    return list
  } else {
    return list.filter((show) => {
      if (filter.hasOwnProperty(toCamelCase(show.sport.toLowerCase()))) {
        return show
      }
    })
  }
}

function mapStateToProps(state) {
  let receivedAt = state.shows.receivedAt
  return {
    sourceId: state.shows.sourceId,
    shows: sportsFilter(state.shows.list, state.shows.filter),
    filter: state.shows.filter,
    loading: state.shows.loading,
    receivedAt: (receivedAt!==undefined) ? dateFormat(receivedAt, "HH:MM:ss") : undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleShowSelected: (showDescription) => () => {
      dispatch(showSelectedAction(showDescription))
      dispatch(navigateTo('showDetail', 'home'))
    },
    openDrawer: () => dispatch(openDrawer()),
    refreshShowList: () => dispatch(fetchShowsAction('1')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsList)
