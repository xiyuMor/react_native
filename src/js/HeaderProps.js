import { TabBarBottom } from 'react-navigation'
import Position from '../template/page/Position'
import Search from '../template/page/Search'
import Detail from '../template/page/Detail'

export const tabNavHeaderProps = {
    abBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    lazy:true,
    tabBarOptions:{
      activeTintColor:"#5fa410",
      inactiveTintColor:'#333',
      labelStyle: {
        fontSize: 10,
      },
    }
};

export const SearchHeaderProps = {
    screen:Search,
    navigationOptions:{
        header:null,
    }
};

export const DetailHeaderProps = {
    screen:Detail,
    navigationOptions:{
        header:null,
    }
};

export const PositionHeaderProps = {
    screen:Position,
    navigationOptions:{
        header:null,
    }
};
