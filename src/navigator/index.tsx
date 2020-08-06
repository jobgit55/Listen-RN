import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Animated, Platform, StyleSheet, StatusBar} from 'react-native';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import Detail from '@/pages/Detail';
import IconFont from '@/assets/iconfont';
import PlayView from '@/pages/views/PlayView';
import {NavigationState} from '@react-navigation/routers';
import {getActiveRouteName, navigationRef} from '../utils';
import Login from '@/pages/Login';

export type RootStackParamList = {
  BottomTabs: {screen?: string};
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
};

export type ModelStackParamList = {
  Root: undefined;
  Detail: {id: string};
  Login: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
export type ModelStackNavigation = StackNavigationProp<ModelStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();
const ModelStack = createStackNavigator<ModelStackParamList>();

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: route.params.opacity,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[styles.headerBackground, {opacity: route.params.opacity}]}
        />
      );
    },
  };
}

function RootStackScreen() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              headerStatusBarHeight: StatusBar.currentHeight,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: 'Category',
        }}
      />
      <Stack.Screen name="Album" component={Album} options={getAlbumOptions} />
    </Stack.Navigator>
  );
}

function ModelStackScreen() {
  return (
    <ModelStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#333',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
      }}>
      <ModelStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <ModelStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {backgroundColor: '#807c66'},
          headerBackImage: ({tintColor}) => (
            <IconFont
              name="moreunfold"
              size={30}
              color={tintColor}
              style={styles.headerBackImage}
            />
          ),
        }}
      />
      <ModelStack.Screen name="Login" component={Login} />
    </ModelStack.Navigator>
  );
}

class Navigator extends React.Component {
  state = {
    routeName: 'Root',
  };
  onStateChange = (state: NavigationState | undefined) => {
    if (typeof state !== 'undefined') {
      const routeName = getActiveRouteName(state);
      this.setState({routeName: routeName});
    }
  };
  render() {
    const {routeName} = this.state;
    return (
      <NavigationContainer
        ref={navigationRef}
        onStateChange={this.onStateChange}>
        <ModelStackScreen />
        <PlayView routeName={routeName} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});

export default Navigator;
