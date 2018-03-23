import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  AlertIOS
} from 'react-native';
import TopBar from '../components/TopBar'
import Banner from '../components/Banner'
import { S } from '../../js/init.js'
const {height,width}  = Dimensions.get('window')

export default class Detail extends Component {

  constructor(props){
    super(props);
    let item = this.props.navigation.state.params.item
    this.state = {
      width: width,
      height: 300,
      data: item
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.detail}>
        <TopBar title="1" navigation = {this.props.navigation} />
        <ScrollView>
          <Image style={{width:this.state.width,height:this.state.height}} source={{uri:this.state.data._thumb}}/>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>{this.state.data._title}</Text>
            <View style={styles.detailItemPrice}>
              <Text style={styles.t1}>￥</Text>
              <Text style={styles.t2}>{this.state.data._price}</Text>
              <Text style={styles.t3}>|</Text>
              {this.state.data.isReserve ? <Text style={styles.t4}>可预订</Text> : <Text style={styles.t4}>暂不支持预订</Text> }
            </View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.t5}>来源：{this.state.data.source}</Text>
            <Text style={styles.t5}>口感：{this.state.data.texture}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={{width:'100%',textAlign:'center',fontSize:16}}>商品详情</Text>
            <Text style={styles.t5}>规格：{this.state.data.specifical}</Text>
            <Text style={styles.t5}>重量：{this.state.data.weight}</Text>
            <Text style={styles.t5}>包装：{this.state.data.packing}</Text>
            <Text style={styles.t5}>保质期：{this.state.data.QGP}</Text>
            <Text style={styles.t5}>储存方式：{this.state.data.storageWay}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={{width:'100%',textAlign:'center',fontSize:16}}>配送方式</Text>
            <View style={styles.v1}><Text style={{marginTop:4,}}>{this.state.data.sjzs}</Text><Text style={styles.t6}>{this.state.data.xs2}</Text></View>
          </View>
          <Text>
            // detail中得到的index为：{this.props.navigation.state.params.index}
          </Text>
          <View style={{height:28,}}></View>
        </ScrollView>
        <View style={styles.fixedBar}>
          <Text style={styles.Bar1}>购物车</Text>
          <Text style={styles.Bar2}>抢先预订</Text>
          <Text style={styles.Bar3}>加入购物车</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detail:{
    position:'relative',
  },
  detailItem:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:22,
    paddingRight:22,
    borderBottomWidth:1,
    borderColor:'#eee',
    backgroundColor:'#fff',
  },
  detailItemTitle:{
    width:'100%',
    textAlign:'center',
    fontSize:18,
  },
  detailItemPrice:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  t1:{
    color:'#fd9500',
  },
  t2:{
    position:'relative',
    color:'#fd9500',
    fontSize:22,
    bottom:-4,
  },
  t3:{
    color:'#fd9500',
    paddingRight:10,
    paddingLeft:10,
    fontSize:20,
  },
  t4:{
    color:'#fd9500',
    borderWidth:.5,
    borderColor:'#fd9500',
    fontSize:12,
    paddingTop:4,
    paddingBottom:2,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:10,
  },
  t5:{
    lineHeight:24,
    color:'#2c2c2c'
  },
  t6:{
    borderWidth:.5,
    borderColor:'#000',
    paddingTop:1,
    paddingBottom:1,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#000',
    color:'#fff',
    borderRadius:100,
    marginLeft:20,
  },
  v1:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:10,
  },
  fixedBar:{
    position:'absolute',
    bottom:0,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'#fff',
    borderTopWidth:1,
    borderColor:'#eee',
  },
  Bar1:{
    flex:2,
    textAlign:'center',
    paddingTop:15,
    paddingBottom:15,
  },
  Bar2:{
    flex:4,
    textAlign:'center',
    fontSize:14,
    color:'#fff',
    backgroundColor:'#a9cf48',
    paddingTop:15,
    paddingBottom:15,
  },
  Bar3:{
    flex:4,
    textAlign:'center',
    color:'#fff',
    backgroundColor:'#80cf48',
    paddingTop:15,
    paddingBottom:15,
  }

});
