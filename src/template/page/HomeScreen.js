import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import TopBar from '../components/TopBar'
import Banner from '../components/Banner'
import Flatlist from '../components/Flatlist'
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation} title="0"/>
        
        <Flatlist navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
