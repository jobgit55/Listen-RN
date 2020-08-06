import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgramProps} from '@/models/album';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';

interface ItemComponentProps {
  data: ProgramProps;
  index: number;
  onPress: (data: ProgramProps, index: number) => void;
}

class Item extends React.Component<ItemComponentProps> {
  onPress = () => {
    const {onPress, data, index} = this.props;
    if (typeof onPress === 'function') {
      onPress(data, index);
    }
  };

  render() {
    const {data, index} = this.props;
    return (
      <Touchable style={styles.item} onPress={this.onPress}>
        <Text style={styles.serial}>{index + 1}</Text>
        <View style={styles.container}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.info}>
            <View style={styles.iconView}>
              <IconFont name="yinle" color="#939393" />
              <Text style={styles.iconText}>{data.playVolume}</Text>
            </View>
            <View style={styles.iconView}>
              <IconFont name="clock" color="#939393" />
              <Text style={styles.iconText}>{data.duration}</Text>
            </View>
          </View>
        </View>
        <Text>{data.date}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serial: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  container: {
    flex: 1,
    marginHorizontal: 25,
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    marginHorizontal: 5,
    color: '#939393',
  },
});

export default Item;
