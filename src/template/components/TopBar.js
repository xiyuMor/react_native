import React,{ Component } from 'react';
import { AppRegistry,StyleSheet,Text,View,TouchableOpacity,TextInput } from 'react-native';
import { S } from '../../js/init';
import  Icon  from './Icon'
export default class TopBar extends Component{
  constructor(props){
    super(props)
  }

  render(){

    switch(this.props.title){
      case '0':
        return (
          <View style={style.title}>
            <TouchableOpacity
              style={style.position}
              ref='Position'
              PositionId='10112'
              onPress={ () => {
                S.getPosition()
                S.goPage(this,'Position','PositionId')
              }}>
              <Icon iconUrl={require('../../image/icon/icon_position.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.search}
              ref="Search"
              searchVal="篮球"
              onPress={ () => {
                S.goPage(this,'Search','searchVal')
              }}>
              <Icon iconUrl={require('../../image/icon/icon_search.png')}/>
            </TouchableOpacity>
          </View>
        )
        break;
      case '1':
        return (
          <View style={style.title2}>
            <TouchableOpacity
              onPress = { () => {
                 this.props.navigation.goBack()
              }}>
              <Icon iconUrl={require('../../image/icon/icon_black.png')}/>
            </TouchableOpacity>
          </View>
        )
        break;
      case '2':
        return (
          <View style={style.title3}>
            <TouchableOpacity style={ this.props.title ? {display:'none'} : {}}
              onPress = { () => {
                 this.props.navigation.goBack()
              }}>
              <Icon iconUrl={require('../../image/icon/icon_black.png')}/>
            </TouchableOpacity>
            <View style={style.componentSearch}>
              <TextInput
                style={{height:20,width:'100%',paddingLeft:5,fontSize:14,justifyContent:'center',alignItems:'center'}}
                placeholder="请输入搜索关键字"
              />
            </View>
            <Text>取消</Text>
          </View>
        )
        break;
      default:
        return (
          <View style={style.title}>
            <TouchableOpacity
              onPress = { () => {
                 this.props.navigation.goBack()
              }}>
              <Icon iconUrl={require('../../image/icon/icon_black.png')}/>
            </TouchableOpacity>
            <Text>{this.props.title}</Text>
            <Text>分享</Text>
          </View>
        )
    }

  }
}
const style = StyleSheet.create({
  title: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:60,
    paddingTop:20,
    backgroundColor:'#84e066',
    paddingLeft:10,
    paddingRight:10,
  },
  title2: {
    position:'absolute',
    zIndex:1,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:60,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
  },
  title3: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height:60,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
  },
  position: {
    flex:1,
  },
  search: {
    flex:2,
    height:24,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:3,
    width:'100%',
  },
  componentSearch:{
    height:24,
    width:'80%',
    backgroundColor:'#efefef',
  }
})
