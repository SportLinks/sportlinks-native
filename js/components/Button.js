import React from 'react'
import Colors from './Colors'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from './Text'

class Button extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered';
    icon?: number;
    caption: string;
    style?: any;
    onPress: () => mixed;
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const caption = this.props.caption.toUpperCase();
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    if (this.props.type === 'primary') {
      content = (
        <LinearGradient
          start={{x: 0.5, y: 1}} end={{x: 1, y: 1}}
          colors={['#6A6AD5', '#6F86D9']}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    } else {
      var border = this.props.type === 'bordered' && styles.border;
      content = (
        <View style={[styles.button, border]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    // borderRadius: HEIGHT / 2,
    // borderWidth: 1 / PixelRatio.get(),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: Colors.lightText,
  }
});

module.exports = Button;
