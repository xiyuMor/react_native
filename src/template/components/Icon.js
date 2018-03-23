import React , { Component } from 'react'
import { StyleSheet,Image,TouchableOpacity } from 'react-native'

export class TabBarIcon extends Component {

  render() {
    return(
      <Image source={this.props.focused ? this.props.selectImage : this.props.normalImage}
          style={{width:20,height:20,tintColor:this.props.tintColor}}
      />
    )
  }
}

export class ShoppingIcon extends Component {

  render() {
    return (
      <Image
        source={ this.props.voted ? this.props.selectImage : this.props.normalImage}
        style={{width:26,height:26}}
      />
    )
  }
}

// export class ShoppingIcon extends Component {
//
//   render() {
//     return (
//       <TouchableOpacity
//         activeOpacity={.8}
//         style={styles.container}
//         onPress={()=>{this.appendShoppingCar()}}>
//         <Image
//           source={ true ? this.props.selectImage : this.props.normalImage}
//           style={{width:26,height:26}}
//         />
//       </TouchableOpacity>
//     )
//   }
//
//   appendShoppingCar() {
//     alert(this.props.index)
//   }
// }
export default class Icon extends Component {
  render() {
    return(
      <Image source={ this.props.iconUrl }
          style={{width:20,height:20}}
      />
    )
  }
}
//
// const styles = StyleSheet.create({
//   container:{
//     position:'absolute',
//     bottom:10,
//     right:20
//   }
// })
