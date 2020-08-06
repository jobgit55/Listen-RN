import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ExploreProps} from '@/models/explore';
import VideoControls from 'react-native-video-custom-controls';

interface ExploreItemComponentProps {
  data: ExploreProps;
  paused: boolean;
  setCurrentId: (id: string) => void;
}

class Item extends React.Component<ExploreItemComponentProps> {
  onPlay = () => {
    const {data, setCurrentId} = this.props;
    setCurrentId(data.id);
  };

  onPause = () => {
    const {data, setCurrentId} = this.props;
    setCurrentId('');
  };

  render() {
    const {data, paused} = this.props;
    return (
      <View>
        <Text>{data.title}</Text>
        <VideoControls
          onPlay={this.onPlay}
          onPause={this.onPause}
          paused={paused}
          source={{uri: data.videoUrl}}
          style={styles.video}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    height: 220,
  },
});

export default Item;
