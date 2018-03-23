import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TopBar from '../components/TopBar'

import BaiduMap from '../components/BaiduMap'


export default class Position extends Component {
  render() {
    return (
      <View>
        <TopBar navigation={this.props.navigation} title="位置" />
        <BaiduMap />
        <Text style={styles.welcome}>
          Position:{this.props.navigation.state.params.PositionId}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
