import queryString from 'query-string'
import _ from 'lodash'
import Mock from 'mockjs'
import config from './config'
export const S = {};

S.host = 'http://127.0.0.1:8080/src/data/'; // 测试
// S.host = ''; // 正式

S.goPage = function(that,name,pro){ //that:前页面的this,name:跳转标识、ref标识,pro:跳转页面所用参数。比如:id等
  console.log(that)
  if(pro){
    var proValue = that.refs[name].props[pro] //获取ref中的对应属性
    that.props.navigation.navigate(name,{ [pro] : proValue} )
  }else{
    that.props.navigation.navigate(name)
  }
};
// 获取数据GET
S.get = function(url, params) {
  if (params) {
    url += '?' + queryString.stringify(params)
  }
  return fetch (url)
    .then((response)=>response.json())
    .then((response)=>Mock.mock(response))
}
// 获取数据POST
S.post = function(url, body) {
  // console.log(body)
  var options = _.extend(config.header,{
    body: JSON.stringify(body)
  })
  return fetch (url,options)
  // console.log(options)
    .then((response)=>response.json())
    .then((response)=> Mock.mock(response))
}

// 获取数据
S.getData = function (_this,port,options){//_this：调用setState,port：接口地址,options：接口参数
  const url = S.host + port + '.json';

  return fetch(url,options)
    .then((response)=>response.json())
    .then((res)=>{
      if(res.error==1000){
        _this.setState({
          data: res.data
        })
      }else{
        Alert.alert(
          '系统提示',
          res.msg,
          [
            {text: '确认', onPress: () => console.log('确定操作')},
          ],
          { cancelable: false }
        )
      }
    })
    .catch((error)=>console.log(error.message))
}

// S.getData1 = function (_this,port){
//
//   var request = new XMLHttpRequest();
//   request.onreadystatechange = (e) => {
//     if (request.readyState !== 4) {
//       return;
//     }
//
//     if (request.status === 200) {
//       console.log('成功', request.responseText);
//     } else {
//       console.warn('错误');
//     }
//   };
//
//   request.open('GET', 'http://127.0.0.1:8082/src/data/detail.json');
//   request.send();
// }

S.getPosition = function() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        alert('精度：'+position.coords.longitude+ '||' + '纬度：'+position.coords.latitude)
      },
      (error) => {
        alert("erroe"+JSON.stringify(error))
      }
    )
  }
}
