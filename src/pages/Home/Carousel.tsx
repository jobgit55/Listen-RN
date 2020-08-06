import React, {useState} from 'react';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';
import {CarouselProps} from '@/models/home';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

type ModelState = ConnectedProps<typeof connector>;

interface CarouselComponentProps extends ModelState {}

const mapStateToProps = ({home}: RootState) => ({
  data: home.carousels,
  activeCarouselIndex: home.activeCarouselIndex,
});

const connector = connect(mapStateToProps);

const sliderWidth = viewportWidth;
const slideWidth = wp(90);
export const slideHeight = hp(26);
const itemWidth = slideWidth + wp(2) * 2;

class Carousel extends React.Component<CarouselComponentProps> {
  renderItem = (
    {item}: {item: CarouselProps},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        showSpinner
        spinnerColor="rgba(0, 0, 0, .25)"
        {...parallaxProps}
      />
    );
  };

  onSnapToItem = (index: number) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
  };

  get pagination() {
    const {data, activeCarouselIndex} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          activeDotIndex={activeCarouselIndex}
          dotsLength={data.length}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          onSnapToItem={this.onSnapToItem}
          loop
          autoplay
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 8,
  },
  image: {...StyleSheet.absoluteFillObject, resizeMode: 'cover'},
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, .92)',
  },
});

export default connector(Carousel);
