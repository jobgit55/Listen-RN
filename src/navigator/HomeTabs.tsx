import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter'
import {View, StyleSheet} from 'react-native';
import TobTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import {CategoryProps} from '@/models/category';
import { createHomeModel } from '@/config/dva';

export type HomeParamList = {
  [key: string]: {
    namespace: string
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategories: category.myCategories,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface HomeTabsProps extends ModelState {}

class HomeTabs extends React.Component<HomeTabsProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TobTabBarWrapper {...props} />;
  };

  renderScreen = (item: CategoryProps) => {
    if (item.id === undefined) {
      return
    }
    createHomeModel(item.id)
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{tabBarLabel: item.name}}
        initialParams={{
          namespace: item.id
        }}
      />
    );
  };

  render() {
    const {myCategories} = this.props;
    return (
      <Tab.Navigator
        lazy
        tabBar={this.renderTabBar}
        pager={props => <ViewPagerAdapter {...props} />}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333',
        }}>
        {myCategories.map(this.renderScreen)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
