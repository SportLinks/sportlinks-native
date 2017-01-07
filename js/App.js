import React, { Component } from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Button, TouchableHighlight, Modal, Text, View } from 'react-native'
import CodePush from 'react-native-code-push'
import AppNavigator from './navigation/AppNavigator'
import ProgressBar from './components/loaders/ProgressBar'
import theme from './themes/base-theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
})

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    }
  }

  setModalVisible(visible) {
    this.setState({showDownloadingModal: visible});
  }

  componentDidMount() {
    CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true })
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true })
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ showDownloadingModal: false })
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 })
      }
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.showDownloadingModal}
          onRequestClose={() => {}}
          >
          <View style={{flex:100, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <View style={{borderRadius: 10, elevation: 10, backgroundColor: 'white', marginTop: 225, margin: 20, height: 150}}>
             {this.state.showInstalling ?
               <Text style={{textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                 Installing update...
               </Text> :
               <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
                 <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                   Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                 </Text>
                 <ProgressBar color="theme.brandPrimary" progress={parseInt(this.state.downloadProgress, 10)} />
               </View>
             }
            </View>
          </View>
        </Modal>
        <AppNavigator />
      </View>
    )
  }
}
