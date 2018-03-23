import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import TopBar from '../components/TopBar'
const {width,height} = Dimensions.get('window')
import { S } from '../../js/init'

export default class Search extends Component {
  render() {
    return (
      <View style={styles.pageSearch}>
        <TopBar navigation={this.props.navigation} title="2"/>

        <Text>默认搜索关键字：{this.props.navigation.state.params.searchVal}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageSearch:{
    height,
    backgroundColor:'#fff',
  },
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
