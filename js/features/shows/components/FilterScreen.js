import React from 'react'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
import Colors from '../../../components/Colors'
import SportItem from './SportItem'
import Button from '../../../components/Button'
import ItemsWithSeparator from '../../../components/ItemsWithSeparator'
import { Animated, View, StyleSheet, ScrollView } from 'react-native'
import shallowEqual from 'fbjs/lib/shallowEqual'
import { applySportsFilter } from '../reducers/shows'
import { navigateTo } from '../../../reducers/navigation'

class FilterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSports: {...this.props.selectedSports},
      anim: new Animated.Value(0),
      drawer: props.drawer,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedSports !== nextProps.selectedSports) {
      this.setState({selectedSports: {...nextProps.selectedSports}});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedSports !== nextState.selectedSports) {
      const changedSports = !shallowEqual(
        nextProps.selectedSports,
        nextState.selectedSports,
      );
      const toValue = changedSports ? 1 : 0;
      Animated.spring(this.state.anim, {toValue}).start();
    }
  }

  render() {
    var bottom = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
    var sports = this.props.sports.map((sport, ii) => (
      <SportItem
        key={sport}
        sport={sport}
        color={Colors.colorForSport(sport)}
        isChecked={this.state.selectedSports[sport]}
        onToggle={this.toggleSport.bind(this, sport)}
      />
    ));
    var selectedAnysports = this.props.sports.some(
      (sport) => this.state.selectedSports[sport]
    );

    let leftItem, rightItem;
    if (this.props.navigator) {
      leftItem = {title: 'Cancel', onPress: this.close.bind(this)};
    }
    if (selectedAnysports) {
      rightItem = {
        title: 'Clear',
        icon: require('../../../../img/x-white.png'),
        onPress: this.clearFilter.bind(this),
      };
    }
    return (
      <View style={styles.container}>
        <Header
          title="Filter"
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}>
          <ItemsWithSeparator separatorStyle={styles.separator}>
            {sports}
          </ItemsWithSeparator>
        </ScrollView>
        <Animated.View style={[styles.applyButton, {bottom}]}>
          <Button
            caption="Apply filters"
            onPress={this.applyFilter.bind(this)}
          />
        </Animated.View>
      </View>
    );
  }

  toggleSport(sport: string, value: boolean) {
    var selectedSports = {...this.state.selectedSports};
    var value = !selectedSports[sport];
    if (value) {
      selectedSports[sport] = true;
    } else {
      delete selectedSports[sport];
    }
    this.setState({selectedSports});
  }

  applyFilter() {
    this.props.dispatch(applySportsFilter(this.state.selectedSports));
    this.close();
  }

  close() {
    this.props.onClose()
  }

  clearFilter() {
    this.setState({selectedSports: {}});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12336B',
  },
  scrollview: {
    padding: 20,
    paddingBottom: 20 + 49,
  },
  separator: {
    backgroundColor: '#FFFFFF26',
  },
  applyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#12336B',
  },
});

function select(store) {
  return {
    sports: ['Soccer', 'Basketball', 'Tennis', 'Football',],
    selectedSports: store.shows.filter,
  };
}

export default connect(select)(FilterScreen);
