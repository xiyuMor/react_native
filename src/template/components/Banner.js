import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native'

import Swiper from 'react-native-swiper'
import { S } from '../../js/init'
const {width} = Dimensions.get('window')

export default class Banner extends Component{
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    S.getData(this,'banner')
  }

  rerderItem(item,i) {
    return (
      <View style={styles.slide1} key={i} >
        <Image
        style={{width:'100%',height:200,}}
        source={{uri:item.imgUrl}}/>
      </View>
    )
  }

  render() {
    return (
      <Swiper style={styles.wrapper}
              height={200}
              autoplay
              showsButtons={false}
              dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
              activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />} loop>
        {
          this.state.data.map( (item,i) => this.rerderItem(item,i))
        }
      </Swiper>
    )
  }
};

var styles = StyleSheet.create({
  slide1: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide3: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
