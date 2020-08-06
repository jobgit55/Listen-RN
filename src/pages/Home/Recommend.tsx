import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';
import {RecommendProps} from '@/models/home';

type ModelState = ConnectedProps<typeof connector>;

const mapStateToProps = ({home}: RootState) => {
  return {
    recommends: home.recommends,
  };
};

const connector = connect(mapStateToProps);

interface RecommendComponentProps extends ModelState {
  namespace: string;
  goAlbum: (item: RecommendProps) => void;
}

class Recommend extends React.Component<RecommendComponentProps> {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch, namespace} = this.props;
    dispatch({type: namespace + '/fetchRecommends'});
  };

  keyExtractor = (item: RecommendProps) => {
    return item.id;
  };

  renderItem = ({item}: {item: RecommendProps}) => {
    const {goAlbum} = this.props;
    return (
      <Touchable
        style={styles.item}
        onPress={() => {
          goAlbum(item);
        }}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  render() {
    const {recommends} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <IconFont name="favorites-fill" />
            <Text style={styles.headerTitle}>Recommends</Text>
          </View>
          <View>
            <Text>More</Text>
          </View>
        </View>
        <FlatList
          style={styles.listContainer}
          numColumns={3}
          data={recommends}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <Touchable
          style={styles.refreshContainer}
          onPress={() => {
            this.fetch();
          }}>
          <IconFont name="refresh" color="red" />
          <Text style={styles.refreshText}>Refresh</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  refreshText: {
    marginLeft: 5,
  },
  listContainer: {
    padding: 10,
  },
});

export default connector(Recommend);
