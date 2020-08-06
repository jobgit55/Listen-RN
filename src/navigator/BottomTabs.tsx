import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Found from '@/pages/Explore';
import Account from '@/pages/Account';
import Listen from '@/pages/Listen';
import {RootStackNavigation, RootStackParamList} from '.';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import IconFont from '@/assets/iconfont';
import HomeTabs from './HomeTabs';
import Play from '@/pages/views/Play';
import Explore from '@/pages/Explore';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Play: undefined;
  Explore: undefined;
  Account: undefined;
};

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface BottomTabProps {
  navigation: RootStackNavigation;
  route: RouteProp<RootStackParamList, 'BottomTabs'>;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

class BottomTabs extends React.Component<BottomTabProps> {
  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate() {
    this.setOptions();
  }

  setOptions = () => {
    const {
      navigation,
      route,
    }: {navigation: RootStackNavigation; route: Route} = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: routeName,
      });
    }
  };

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFont name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFont name="listing-content" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Play"
          component={Play}
          options={({navigation}) => ({
            tabBarButton: () => {
              return <Play onPress={() => navigation.navigate('Detail')} />;
            },
          })}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFont name="explore-outlined" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconFont name="account" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
