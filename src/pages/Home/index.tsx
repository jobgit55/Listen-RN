import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel, {slideHeight} from './Carousel';
import Recommend from './Recommend';
import ChannelItem from './ChannelItem';
import {ChannelProps, RecommendProps} from '@/models/home';
import {HomeParamList} from '@/navigator/HomeTabs';
import {RouteProp} from '@react-navigation/native';

type ModelState = ConnectedProps<typeof connector>;

interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}

interface HomeState {
  refreshing: boolean;
}

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList, string>},
) => {
  const namespace = route.params.namespace;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    gradientVisible: modelState.gradientVisible,
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    loading: state.loading.effects[namespace + '/fetchChannels'],
  };
};

const connector = connect(mapStateToProps);

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchCarousels',
    });
    dispatch({
      type: namespace + '/fetchChannels',
    });
  }

  goAlbum = (data: ChannelProps | RecommendProps) => {
    const {navigation} = this.props
    navigation.navigate('Album', {item: data})
  };

  keyExtractor = (item: ChannelProps) => {
    return item.id;
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchChannels',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };

  onEndReached = () => {
    const {dispatch, loading, hasMore, namespace} = this.props;
    if (loading || !hasMore) return;
    dispatch({
      type: namespace + '/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };

  renderItem = ({item}: ListRenderItemInfo<ChannelProps>) => {
    return (
      <ChannelItem data={item} onPress={this.goAlbum} />
      // <View><Text>item</Text></View>
    );
  };

  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < slideHeight;
    const {dispatch, namespace, gradientVisible} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Recommend namespace={namespace} goAlbum={this.goAlbum} />
        </View>
      </View>
    );
  }

  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--- End ---</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>loading...</Text>
        </View>
      );
    }
  }

  get empty() {
    const {loading} = this.props;
    if (loading) return;
    return (
      <View style={styles.empty}>
        <Text>No channels to show...</Text>
      </View>
    );
  }

  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default connector(Home);
