import React, { PureComponent, Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  AlertIOS
} from 'react-native'

import { ShoppingIcon } from './Icon'
import { S } from '../../js/init'
import config from '../../js/config'

const {width,height}=Dimensions.get('window')
var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}
//子组件
class Ishow extends Component{
  constructor(props) {
    super(props)
    let item = this.props.item
    this.state = {
      item: item,
      voted: item.voted,
    }
  }
  render (){
    let item = this.state.item
    return(
      <TouchableOpacity activeOpacity={.9} id={item._id} onPress={this._goPage.bind(this,item)}>
        <View style={styles.listItem} index = {item._id}>
          <View style={styles.itemLift}>
            <Image style={styles.itemImage} source={{uri:item._thumb}}/>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemTitle}>{item._title}</Text>
            <Text style={styles.itemTxt}>{item._txt}</Text>
            <Text style={styles.itemDownPrice}>{item._upSong}元起送</Text>
            <Text style={styles.itemPrice}>价格￥<Text style={{fontSize:15,}}>{item._price}</Text></Text>
          </View>
          <TouchableOpacity
            activeOpacity={.8}
            style={styles.shoppingBtn}
            onPress={()=>{this._appendShoppingCar(item._id)}}>
            <ShoppingIcon
              index = {item._id}
              normalImage = {require('../../image/icon/icon_shopping_no.png')}
              selectImage = {require('../../image/icon/icon_shopping_sel.png')}
              voted = { this.state.voted }
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
  _goPage(v) {
    console.log('跳转参数：'+v)
    this.props.navigation.navigate('Detail',{item: v});
  }
  // 加入购物车
  _appendShoppingCar(value) {
    let that = this
    let voted = !this.state.voted
    let item = this.state.item
    let url = config.api.base + config.api.up
    let body = {
      id: item._id,
      voted: voted ? 'yes' : 'no',
      accessToken: '123'
    }
    S.post(url,body)
      .then((data) => {
        if(data && data.success){
          that.setState({
            voted : voted
          })
        }else{
          AlertIOS.alert('加入购物车失败,请稍后重试')
        }
      })
      .catch((err) =>{
        console.log(err)
        AlertIOS.alert('加入购物车失败，请稍后重试')
      })
    // console.log(value)
  }
}

export default class Llatlist extends PureComponent{

  // 页面跳转
  _goPage(v) {
    console.log('跳转参数：'+v)
    this.props.navigation.navigate('Detail',{index:v});
  }
  // 加入购物车
  _appendShoppingCar(value) {
    alert(value)
  }

  // 设置item唯一标识
  _keyExtractor = (item,index) => index

  // list头部
  _header = () => {
    return <Text style={styles.heightItem}>这是ListHeader</Text>
  }

  // item分割线
  _line = () =>{
    return <View style={{ height:1,backgroundColor:'#ececec'}}></View>
  }

  // 空列表显示内容
  _empty = () => {
    return <Text style={[ styles.heightItem ,{ height:300 }]}>数据正在加载中...</Text>
  }



  // list尾部
  _footer = () => {
    if(!this._hasMore() && cachedResults.total !==0 ) {
      return (
        <View style={styles.waitUpdate}>
        <Text style={{marginTop:10}}>没有更多了</Text>
        </View>
      )
    }
    // if(this.state.isFirst){
    //   return (
    //     <View style={styles.waitUpdate1}>
    //       <ActivityIndicator /><Text style={{marginLeft:10}}>数据加载中...</Text>
    //     </View>
    //   )
    // }else{
      return (
        <View style={ this.state.isFirst ? styles.waitUpdate1 : styles.waitUpdate }>
          <ActivityIndicator /><Text style={{marginLeft:10}}>数据加载中...</Text>
        </View>
      )
    // }

  }


  // item
  // _renderItem = ({item}) => {
  //   return(
  //   <TouchableOpacity activeOpacity={.9} id={item._id} onPress={this._goPage.bind(this,item._id)}>
  //     <View style={styles.listItem} index = {item._id}>
  //       <View style={styles.itemLift}>
  //         <Image style={styles.itemImage} source={{uri:item._thumb}}/>
  //       </View>
  //       <View style={styles.itemRight}>
  //         <Text style={styles.itemTitle}>{item._title}</Text>
  //         <Text style={styles.itemTxt}>{item._txt}</Text>
  //         <Text style={styles.itemDownPrice}>{item._upSong}元起送</Text>
  //         <Text style={styles.itemPrice}>价格￥<Text style={{fontSize:15,}}>{item._price}</Text></Text>
  //       </View>
  //       <TouchableOpacity
  //         activeOpacity={.8}
  //         style={styles.shoppingBtn}
  //         onPress={()=>{this._appendShoppingCar(item._id)}}>
  //         <ShoppingIcon
  //           index = {item._id}
  //           normalImage = {require('../../image/icon/icon_shopping_no.png')}
  //           selectImage = {require('../../image/icon/icon_shopping_sel.png')}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   </TouchableOpacity>
  // )}
  _renderItem = ({item}) => {
    return <Ishow item = {item} navigation={this.props.navigation} />
  }


  // 请求网络数据
  _getFetch(page) {

    if(page!==0){
      this.setState({
        isLoadTail:true
      })
    }else{
      this.setState({
        refreshing: true
      })
    }

    S.get(config.api.base + config.api.creations, {
      accessToken: '123',
      page: page
    })
    .then((data) => {

      if(data.success){

        var items = cachedResults.items.slice()
        if(page !==0){
          items = items.concat(data.data)
          cachedResults.nextPage ++
        }else{
          items = data.data.concat(items)
        }

        cachedResults.items = items
        cachedResults.total = data.total

        if(page !==0){
          this.setState({
            isLoadTail: false,
            data: cachedResults.items,
            isFirst:false
          })
        }else{
          this.setState({
            refreshing: false,
            data: cachedResults.items,
            isFirst:false
          })
        }

      }
    })
    .catch((error) => {

      if(page !==0){
        this.setState({
          isLoadTail: false
        })
      }else{
        this.setState({
          refreshing: false
        })
      }

      console.error(error);
    });
  }


  // 下拉刷新
  _onRefresh = () => {

    if(!this._hasMore() || this.state.refreshing){
      return
    }

    this._getFetch(0)
  }


  // 加载更多
  _onload = () => {

    if(!this._hasMore() || this.state.isLoadTail) {
      return
    }

    if( cachedResults.items.length < cachedResults.total){
      var page = cachedResults.nextPage
      this._getFetch(page)
    }

  }


  //判断时候还有新数据
  _hasMore() {
    return cachedResults.items.length !== cachedResults.total
  }


  // 初始化，设置props、state
  constructor(props) {

    super(props)

    this.state = {
      isFirst: true,
      refreshing: false,
      data: [],
      page: 10,
      isLoadTail: false
    }

  }

  //初始化页面内容
  componentDidMount() {
    this._getFetch(1)
  }

  // 渲染
  render() {
    return(
      <FlatList
        data={this.state.data}
        keyExtractor={this._keyExtractor}
        // ListHeaderComponent={this._header}
        // ListEmptyComponent={this._empty}
        ListFooterComponent={this._footer}
        ItemSeparatorComponent={this._line}
        renderItem={this._renderItem}
        onRefresh={this._onRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this._onload}
        onEndReachedThreshold={.5}
        showVerticalScrollIndicator={false}
        getItemLayout={(data,index)=>(
          {length: 170, offset: (170+1) * index, index}
        )}
      />
    )
  }
};

const styles = StyleSheet.create({
  heightItem:{
    flex: 1,
    height: 50,
    backgroundColor: '#eaeaea',
    color:'#444',
    paddingTop:20,
    textAlign:'center'
  },
  listItem:{
    // height:100,
    backgroundColor:'#fff',
    width:'100%',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    flexDirection:'row',
    justifyContent:'center',
    position:'relative'
  },
  itemLift:{
    justifyContent:'flex-start',
    alignItems:'center',
    flex:1,
    paddingTop:10,
  },
  itemRight:{
    flex:3,
    paddingLeft:10,
  },
  itemImage:{
    width:75,
    height:75,
  },
  itemTitle:{
    marginTop:4,
    fontSize:15,
    color:'#131313'
  },
  itemTxt:{
    fontSize:10,
    color:'#878786',
    marginTop:5,
  },
  itemDownPrice:{
    width:45,
    paddingTop:1,
    marginTop:6,
    textAlign:'center',
    fontSize:9,
    color:'#878786',
    borderWidth:1,
    borderColor:'#878786',
    borderRadius:5,
  },
  itemPrice:{
    fontSize:10,
    color:'#fd9500',
    marginTop:5,
  },
  shoppingBtn:{
    position:'absolute',
    bottom:10,
    right:20
  },
  waitUpdate:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  waitUpdate1:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: height,
    paddingTop: 20,
  }
})
