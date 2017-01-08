var React = require('React');
var StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const Image = require('Image');
const { connect } = require('react-redux');
import { applySportsFilter } from '../reducers/shows'

class FilterHeader extends React.Component {
  render() {
    var topics = Object.keys(this.props.filter);
    if (topics.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {'Filters: '}
          <Text style={styles.filters}>
            {topics.join(', ')}
          </Text>
        </Text>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={this.props.onClearFilter}>
          <Image source={require('../../../../img/x-white.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12336B',
    paddingLeft: 16,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
  clear: {
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  filters: {
    color: 'rgba(255, 255, 255, 0.65)',
  }
});

function select(store) {
  return {
    filter: store.shows.filter,
  };
}

function actions(dispatch) {
  return {
    onClearFilter: () => dispatch(applySportsFilter({})),
  };
}

module.exports = connect(select, actions)(FilterHeader);
