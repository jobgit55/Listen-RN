import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Image,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, RootStackNavigation} from '@/navigator/index';
import realm, {ProgramRealm} from '@/config/realm';
import IconFont from '@/assets/iconfont';
import {formatTime} from '../utils';
import Touchable from '@/components/Touchable';

interface ListenProps {
  navigation: RootStackNavigation;
}

class Listen extends React.Component<ListenProps> {
  delete = (item: ProgramRealm) => {
    realm.write(() => {
      const program = realm.objects('Program').filtered(`id='${item.id}'`);
      realm.delete(program);
      this.setState({});
    });
  };

  renderItem = ({item}: ListRenderItemInfo<ProgramRealm>) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottom}>
            <IconFont name="clock" color="#999" size={14} />
            <Text style={styles.text}>{formatTime(item.duration)}</Text>
            <Text style={styles.rate}>played {item.rate}%</Text>
          </View>
        </View>
        <Touchable
          style={styles.deleteBtn}
          onPress={() => {
            this.delete(item);
          }}>
          <IconFont name="delete" color="red" size={20} />
        </Touchable>
      </View>
    );
  };

  render() {
    const programs = realm.objects<ProgramRealm>('Program');
    return <FlatList data={programs} renderItem={this.renderItem} />;
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 3,
    margin: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    color: '#999',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  rate: {
    marginLeft: 20,
    color: '#f6a624',
  },
  deleteBtn: {
    padding: 10,
    justifyContent: 'center',
  },
});

export default Listen;
