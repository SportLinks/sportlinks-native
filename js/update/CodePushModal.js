import React, { Component } from 'react'
import { StyleSheet, Modal, Text, View } from 'react-native'
import CodePush from 'react-native-code-push'
import ProgressBar from '../components/loaders/ProgressBar'

const styles = StyleSheet.create({
  modal: {
    flex:100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  updatingView: {
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    height: 150,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  updatingText: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15,
  },
})

export default class CodePushModal extends Component {

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
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.showDownloadingModal}
        onRequestClose={() => {}}
        >
        <View style={styles.modal}>
          <View style={[styles.updatingView, {marginTop: (this.props.height/2)-85}]}>
           {this.state.showInstalling ?
             <Text style={styles.updatingText}>
               Installing update...
             </Text> :
             <View>
               <Text style={styles.updatingText}>
                 Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
               </Text>
               <ProgressBar color="theme.brandPrimary" progress={parseInt(this.state.downloadProgress, 10)} />
             </View>
           }
          </View>
        </View>
      </Modal>
    )
  }
}
