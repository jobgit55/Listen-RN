import React from 'react';
import {Animated, Text, Easing} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {Message, LiveChatProps} from './index';

interface ItemComponentProps {
  data: LiveChatProps;
  outSide: (data: LiveChatProps) => void;
}

class Item extends React.PureComponent<ItemComponentProps> {
  translateX = new Animated.Value(0);
  componentDidMount() {
    const {outSide, data} = this.props;
    Animated.timing(this.translateX, {
      toValue: 10,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        outSide(data);
      }
    });
    this.translateX.addListener(({value}) => {
        if (value > 3) {
            data.isFree = true
        } 
    })
  }
  render() {
    const {data} = this.props;
    const width = data.title.length * 15;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: data.trackIndex * 30,
          transform: [
            {
              translateX: this.translateX.interpolate({
                inputRange: [0, 10],
                outputRange: [viewportWidth, -width],
              }),
            },
          ],
        }}>
        <Text>{data.title}</Text>
      </Animated.View>
    );
  }
}

export default Item;
