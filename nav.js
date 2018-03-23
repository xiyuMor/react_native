import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { tabNavHeaderProps , SearchHeaderProps ,PositionHeaderProps ,DetailHeaderProps } from './src/js/HeaderProps'
import { StackNavigator,TabNavigator} from 'react-navigation'
import HomeScreen from './src//template/page/HomeScreen'
import MineScreen from './src/template/page/MineScreen'
import CarScreen  from './src/template/page/CarScreen'
import { TabBarIcon } from './src/template/components/Icon'
const Tab = TabNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:({navigation}) => ({
        tabBarLabel:'首页',
        tabBarIcon:({focused,tintColor}) => (<TabBarIcon
          focused = {focused}
          tintColor={tintColor}
          normalImage = {require('./src/image/icon/icon_1.2.png')}
          selectImage = {require('./src/image/icon/icon_1.png')}
        />),
        activeTintColor:'#fff'
      }),
    },

    Car:{
      screen:CarScreen,
      navigationOptions:({navigation}) => ({
        tabBarLabel:'购物车',
        tabBarIcon:({focused,tintColor}) => (<TabBarIcon
          focused = {focused}
          tintColor={tintColor}
          normalImage = {require('./src/image/icon/icon_2.2.png')}
          selectImage = {require('./src/image/icon/icon_2.png')}
        />)
      }),
    },

    Mine:{
      screen:MineScreen,
      navigationOptions:({navigation}) => ({
        tabBarLabel:'我的',
        tabBarIcon:({focused,tintColor}) => (<TabBarIcon
          focused = {focused}
          tintColor={tintColor}
          normalImage = {require('./src/image/icon/icon_3.2.png')}
          selectImage = {require('./src/image/icon/icon_3.png')}
        />)
      }),
    },
  },
  tabNavHeaderProps
);
const Navigator = StackNavigator(
    {
        Tab:{
          screen:Tab,
          navigationOptions:{
            header:null,
          },
        },
        Product:{screen:CarScreen},
        Position:PositionHeaderProps,
        Search:SearchHeaderProps,
        Detail:DetailHeaderProps
    });
export default class Nav extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Navigator />
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
