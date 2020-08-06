import React from 'react';
import {
  Animated,
  Text,
  View,
  Easing,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {viewportWidth} from '@/utils/index';
import Item from './Item';
import {connect} from 'react-redux';

export interface Message {
  id: number;
  title: string;
}

export interface LiveChatProps extends Message {
  trackIndex: number;
  isFree?: boolean;
}

interface LiveChatComponentProps {
  data: Message[];
  maxTrack: number;
  style: StyleProp<ViewStyle>;
}

interface LiveChatComponentState {
  data: Message[];
  list: LiveChatProps[][];
}

function getTrackIndex(list: LiveChatProps[][], maxTrack: number) {
  for (let i = 0; i < maxTrack; i++) {
    const liveChatOfTrack = list[i];
    if (!liveChatOfTrack || liveChatOfTrack.length === 0) {
      return i;
    }
    const lastLiveChatofTrack = liveChatOfTrack[liveChatOfTrack.length - 1];
    if (lastLiveChatofTrack.isFree) {
        return i
    }
  }
  return -1;
}

function addLiveChatToTrack(
  data: Message[],
  maxTrack: number,
  list: LiveChatProps[][],
) {
  for (let i = 0; i < data.length; i++) {
    const trackIndex = getTrackIndex(list, maxTrack);
    if (trackIndex < 0) {
      continue;
    }
    if (!list[trackIndex]) {
      list[trackIndex] = [];
    }

    const liveChat = {
      ...data[i],
      trackIndex,
    };
    list[trackIndex].push(liveChat);
  }
  return list;
}

class LiveChat extends React.Component<
  LiveChatComponentProps,
  LiveChatComponentState
> {
  state = {
    data: this.props.data,
    list: [this.props.data.map((item) => ({...item, trackIndex: 0}))],
  };

  static getDerivedStateFromProps(
    nextProps: LiveChatComponentProps,
    prevState: LiveChatComponentState,
  ) {
    const {data, maxTrack} = nextProps;
    if (data !== prevState.data) {
      return {
        data,
        list: addLiveChatToTrack(data, maxTrack, prevState.list),
      };
    }
    return null;
  }

  outSide = (data: LiveChatProps) => {
    const {list} = this.state;
    const newList = list.slice();
    if (newList.length > 0) {
      const {trackIndex} = data;
      newList[trackIndex] = newList[trackIndex].filter(
        (item) => item.id !== data.id,
      );
      this.setState({
        list: newList,
      });
    }
  };

  renderItem = (item: LiveChatProps[], index: number) => {
    return item.map((liveChat, index) => {
      return <Item key={liveChat.id} data={liveChat} outSide={this.outSide} />;
    });
  };

  render() {
    const {list} = this.state;
    const {style} = this.props;
    return (
      <View style={[styles.container, style]}>{list.map(this.renderItem)}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default LiveChat;
