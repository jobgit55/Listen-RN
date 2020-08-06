import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ModelStackParamList, ModelStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';
import PlaySlider from './PlaySlider';
import {viewportWidth, viewportHeight} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';
import LiveChat, {Message} from '@/components/LiveChat';

const liveChatTexts = [
  'Lorem ipsum dolor sit amet',
  'consectetur adipiscing elit',
  'Suspendisse a augue iaculis',
  'mollis massa quis, sodales mauris',
  'Ut eget dui at sem convallis rhoncus',
  'Vivamus accumsan metus nec pharetra bibendum',
  'Vestibulum rhoncus mi sit amet arcu semper',
  'quis dignissim eros scelerisque.',
  'Fusce commodo turpis id augue porta malesuada',
  'Duis bibendum justo in lectus fringilla',
];

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

function getLiveChat(): string {
  return liveChatTexts[randomIndex(liveChatTexts.length)];
}

const mapStateToProps = ({player}: RootState) => {
  return {
    id: player.id,
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    thumbnailUrl: player.thumbnailUrl,
    previousId: player.previousId,
    nextId: player.nextId,
  };
};

const connector = connect(mapStateToProps);

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 180;
const SCALE = viewportWidth / IMAGE_WIDTH;

const PADDING_TOP = (viewportWidth - IMAGE_HEIGHT) / 2;

type ModelState = ConnectedProps<typeof connector>;

interface DetailComponentProps extends ModelState {
  navigation: ModelStackNavigation;
  route: RouteProp<ModelStackParamList, 'Detail'>;
}

interface DetailComponentState {
  liveChat: boolean;
  liveChatData: Message[];
}

class Detail extends React.Component<
  DetailComponentProps,
  DetailComponentState
> {
  state = {
    liveChat: false,
    liveChatData: [],
  };

  animation = new Animated.Value(1);

  componentDidMount() {
    const {dispatch, route, navigation, title, id} = this.props;
    if (route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchShow',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
    navigation.setOptions({
      headerTitle: title,
    });
    this.addLiveChat();
  }

  componentDidUpdate(prevProps: DetailComponentProps) {
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }

  toggle = () => {
    const {dispatch, playState} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };

  previous = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/previous',
    });
  };

  next = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/next',
    });
  };

  addLiveChat = () => {
    setInterval(() => {
      const {liveChat} = this.state;
      if (liveChat) {
        const id = Date.now();
        const title = getLiveChat();
        this.setState({
          liveChatData: [{id, title}],
        });
      }
    }, 500);
  };

  liveChat = () => {
    this.setState({
      liveChat: !this.state.liveChat,
    });
    Animated.timing(this.animation, {
      toValue: this.state.liveChat ? 1 : SCALE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {liveChat, liveChatData} = this.state;
    const {playState, previousId, nextId, thumbnailUrl} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Animated.Image
            source={{uri: thumbnailUrl}}
            style={[
              styles.image,
              {
                borderRadius: liveChat ? 0 : 8,
                transform: [{scale: this.animation}],
              },
            ]}
          />
        </View>
        {liveChat && (
          <>
            <LinearGradient
              colors={['rgba(128, 104, 102, .5)', '#807c66']}
              style={styles.linear}
            />
            <LiveChat
              data={liveChatData}
              maxTrack={5}
              style={{top: PADDING_TOP}}
            />
          </>
        )}
        <Touchable style={styles.livechatBtn} onPress={this.liveChat}>
          <Text style={styles.livechatText}>Live Chat</Text>
        </Touchable>
        <PlaySlider />
        <View style={styles.control}>
          <Touchable
            disabled={!previousId}
            onPress={this.previous}
            style={styles.button}>
            <IconFont name="ai-rew-left" size={30} color="#fff" />
          </Touchable>
          <Touchable onPress={this.toggle} style={styles.button}>
            <IconFont
              name={playState === 'playing' ? 'stop' : 'play'}
              size={40}
              color="#fff"
            />
          </Touchable>
          <Touchable
            disabled={!nextId}
            onPress={this.next}
            style={styles.button}>
            <IconFont name="ai-rew-right" size={30} color="#fff" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
  imageView: {
    alignItems: 'center',
    height: IMAGE_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  livechatBtn: {
    height: 20,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  livechatText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detail);
