import React from 'react';
import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {ExploreProps} from '@/models/explore';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface ExploreComponentProps extends ModelState {
  navigation: RootStackNavigation;
}

interface ExploreComponentState {
  list: ExploreProps[];
  currentId: string;
}

class Explore extends React.Component<
  ExploreComponentProps,
  ExploreComponentState
> {
  state = {
    list: [],
    currentId: '',
  };
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'explore/fetchList',
      callback: (data: ExploreProps[]) => {
        this.setState({
          list: data,
        });
      },
    });
  }

  setCurrentId = (id: string) => {
    this.setState({
      currentId: id,
    });
    const {dispatch} = this.props;
    if (id) {
      dispatch({
        type: 'player/pause',
      });
    }
  };

  renderItem = ({item}: ListRenderItemInfo<ExploreProps>) => {
    const paused = item.id !== this.state.currentId;
    return (
      <Item data={item} paused={paused} setCurrentId={this.setCurrentId} />
    );
  };
  render() {
    const {list} = this.state;

    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        extraData={this.state.currentId}
      />
    );
  }
}

export default connector(Explore);
