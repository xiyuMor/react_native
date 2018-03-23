
import React, {
  Component,
  PropTypes
} from 'react';

import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

export default class BaiduMap extends Component {

  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 116.403972,
        latitude: 39.915122
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [{
        longitude: 116.403972,
        latitude: 39.915122,
        title: "中心位置"
      },{
        longitude: 116.437807,
        latitude: 39.847077,
        title: "家"
      }]
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={styles.map}
          onMarkerClick={(e) => {
            console.log(JSON.stringify(e));
          }}
          onMapClick={(e) => {
            console.log(JSON.stringify(e))
          }}
        >
        </MapView>

        <View style={styles.row}>
          <Button title="普通地图" onPress={() => {
            this.setState({
              mapType: MapTypes.NORMAL
            });
          }} />
          <Button style={styles.btn} title="卫星地图" onPress={() => {
            this.setState({
              mapType: MapTypes.SATELLITE
            });
          }} />

          <Button style={styles.btn} title="获取当前位置" onPress={() => {
            console.log('中心位置', this.state.center);
            Geolocation.getCurrentPosition()
              .then(data => {
                console.log(JSON.stringify(data));
                this.setState({
                  zoom: 15,
                  marker: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: '你的位置'
                  },
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    rand: Math.random()
                  }
                });
              })
              .catch(e =>{
                // console.warn(e, 'error');
              })
          }} />
        </View>

        <View style={styles.row}>
          <Button style={styles.btn} title="放大" onPress={() => {
            this.setState({
              zoom: this.state.zoom + 1
            });
          }} />
          <Button style={styles.btn} title="缩小" onPress={() => {
            if(this.state.zoom > 0) {
              this.setState({
                zoom: this.state.zoom - 1
              });
            }

          }} />
        </View>

        <View style={styles.row}>
          <Button title="交通" onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }} />

          <Button title="路况" onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
            });
          }} />
          <Button style={styles.btn} title="测试" onPress={() => {
            Geolocation.reverseGeoCode(85.090992,39.942598)
              .then((data)=>{
                console.log(data)
                var a = JSON.parse(data)
                this.setState({
                  zoom: 15,
                  marker: {
                    latitude: a.latitude,
                    longitude: a.longitude,
                    title: '你的位置'
                  }
                })
              })
              .catch(e =>{
                console.log(e, 'error');
              })
          }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginBottom: 16,
    borderColor:'#efefef'
  },
  btn:{
    fontSize:10
  }
});
