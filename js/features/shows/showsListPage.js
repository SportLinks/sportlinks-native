import React, {Component} from 'react'
import {connect} from 'react-redux'
import {showSelectedAction, fetchShowsAction} from './reducers/shows'
import dateFormat from 'dateformat'
import {View, Text, ListView, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native'
import {navigateTo} from '../../reducers/navigation'
import {Container, Header, Title, Content, Button, Icon} from 'native-base'
import myTheme from '../../themes/base-theme'
import {openDrawer} from '../../reducers/drawer'

class ShowsList extends Component {
  constructor(props) {
    super(props)
  }

  _onRefresh() {
    this.props.refreshShowList()
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    return (
      <TouchableOpacity key={rowID}
        onPress={this.props.handleShowSelected(rowData)}>
        <View style={{flex: 1, paddingTop: 10}} >
          <Text style={styles.titleText}>{rowData.description}</Text>
          <Text style={styles.baseText}>{dateFormat(rowData.startDate + '+01:00', "dd/mm HH:MM")} - {rowData.category}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>Sporting Shows</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

          <Text style={{textAlign: 'right'}}>Update at {this.props.receivedAt}</Text>
          <View style={{flex: 1, paddingTop: 0, paddingLeft: 10}}>
            <ListView
              dataSource={ds.cloneWithRows(this.props.shows)}
              keyboardShouldPersistTaps={true}
              renderRow={this.renderRow}
              enableEmptySections={true}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.loading}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
          </View>
          
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  baseText: {
    fontSize: 14
  }
})

function mapStateToProps(state) {
  let receivedAt = state.shows.receivedAt
  return {
    sourceId: state.shows.sourceId,
    shows: state.shows.list,
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
    refreshShowList: () => dispatch(fetchShowsAction('1'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsList)
