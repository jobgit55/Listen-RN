import React from 'react';
import {
  View,
  Text,
  Animated,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {ProgramProps} from '@/models/album';
import Item from './Item';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {TabComponentProps} from '../Tab';
import { indexOf } from 'lodash';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type ListComponentProps = ModelState & TabComponentProps;

class List extends React.Component<ListComponentProps> {
  onPress = (data: ProgramProps, index: number) => {
    const { onItemPress} = this.props
    onItemPress(data, index)
  };

  renderItem = ({item, index}: ListRenderItemInfo<ProgramProps>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  keyExtractor = (item: ProgramProps) => item.id;

  render() {
    const {list, panRef, tapRef, nativeRef, onScrollDrag} = this.props;
    return (
      <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef} waitFor={tapRef}>
        <Animated.FlatList
          style={styles.container}
          data={list}
          bounces={false}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onScrollBeginDrag={onScrollDrag}
          onScrollEndDrag={onScrollDrag}
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
