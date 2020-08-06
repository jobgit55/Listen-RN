import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {TabView, TabBar, SceneRendererProps} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
import {
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {ProgramProps} from '@/models/album';

interface RouteProps {
  key: string;
  title: string;
}

interface NavigationState {
  routes: RouteProps[];
  index: number;
}

export interface TabComponentProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (data: ProgramProps, index: number) => void;
}

class Tab extends React.Component<TabComponentProps, NavigationState> {
  state = {
    index: 1,
    routes: [
      {key: 'introduction', title: 'introduction'},
      {key: 'albums', title: 'albums'},
    ],
  };

  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };

  renderScene = ({route}: {route: RouteProps}) => {
    const {panRef, tapRef, nativeRef, onScrollDrag, onItemPress} = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <List
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onScrollDrag={onScrollDrag}
            onItemPress={onItemPress}
          />
        );
    }
  };

  renderTabBar = (
    props: SceneRendererProps & {navigationState: NavigationState},
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
      />
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 150,
  },
  label: {
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
